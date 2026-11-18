package com.englishhub.app;

import android.Manifest;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainActivity extends Activity {

    static final String HOST = "appassets.androidplatform.net";
    static final String START_URL = "https://" + HOST + "/assets/index.html";
    static final int REQ_SPEECH = 11;
    static final int REQ_NOTIF = 12;

    static WeakReference<MainActivity> current = new WeakReference<>(null);

    WebView web;
    FrameLayout root;
    WebViewAssetLoader loader;
    TextToSpeech tts;
    boolean ttsReady = false;
    View customView;
    WebChromeClient.CustomViewCallback customCallback;
    String pendingSpeechId;

    final ExecutorService pool = Executors.newFixedThreadPool(4);
    final Handler main = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        current = new WeakReference<>(this);
        Notif.createChannels(this);

        root = new FrameLayout(this);
        root.setBackgroundColor(Color.parseColor("#0f172a"));
        web = new WebView(this);
        root.addView(web, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        s.setAllowFileAccess(false);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setTextZoom(100);

        loader = new WebViewAssetLoader.Builder()
                .setDomain(HOST)
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        web.setWebViewClient(new WebViewClientCompat() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return loader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                if (!request.isForMainFrame()) return false;
                Uri u = request.getUrl();
                if (HOST.equals(u.getHost())) return false;
                openUrl(u.toString());
                return true;
            }
        });

        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onShowCustomView(View view, CustomViewCallback callback) {
                if (customView != null) { callback.onCustomViewHidden(); return; }
                customView = view;
                customCallback = callback;
                root.addView(view, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                web.setVisibility(View.GONE);
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
                getWindow().getDecorView().setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
            }

            @Override
            public void onHideCustomView() { hideCustom(); }
        });

        web.addJavascriptInterface(new Bridge(), "Android");
        web.loadUrl(START_URL);

        tts = new TextToSpeech(this, status -> {
            ttsReady = status == TextToSpeech.SUCCESS;
            if (ttsReady) {
                tts.setLanguage(Locale.US);
                tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                    @Override public void onStart(String id) { }
                    @Override public void onDone(String id) { js("window.__ttsDone&&__ttsDone(" + JSONObject.quote(id) + ")"); }
                    @Override public void onError(String id) { js("window.__ttsDone&&__ttsDone(" + JSONObject.quote(id) + ")"); }
                });
            }
        });
    }

    void hideCustom() {
        if (customView == null) return;
        root.removeView(customView);
        customView = null;
        if (customCallback != null) customCallback.onCustomViewHidden();
        customCallback = null;
        web.setVisibility(View.VISIBLE);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
    }

    static void sendJs(String code) {
        MainActivity a = current.get();
        if (a != null) a.js(code);
    }

    void js(String code) {
        main.post(() -> { if (web != null) web.evaluateJavascript(code, null); });
    }

    void openUrl(String url) {
        try {
            Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(i);
        } catch (Exception e) {
            Toast.makeText(this, "تعذر فتح الرابط", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (customView != null) { hideCustom(); return; }
        web.evaluateJavascript("(window.__back&&window.__back())?'1':'0'", v -> {
            if (v == null || !v.contains("1")) moveTaskToBack(true);
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQ_SPEECH) {
            String id = pendingSpeechId == null ? "" : pendingSpeechId;
            pendingSpeechId = null;
            if (resultCode == RESULT_OK && data != null) {
                ArrayList<String> res = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                if (res != null && !res.isEmpty()) {
                    JSONArray arr = new JSONArray(res);
                    js("window.__sr&&__sr(" + JSONObject.quote(id) + ",true," + JSONObject.quote(res.get(0)) + "," + arr + ")");
                    return;
                }
            }
            js("window.__sr&&__sr(" + JSONObject.quote(id) + ",false,'',[])");
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQ_NOTIF) {
            boolean ok = grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED;
            js("window.__notifPerm&&__notifPerm(" + ok + ")");
        }
    }

    @Override
    protected void onDestroy() {
        try { if (tts != null) tts.shutdown(); } catch (Exception ignored) { }
        try { stopService(new Intent(this, PlaybackService.class)); } catch (Exception ignored) { }
        pool.shutdownNow();
        if (web != null) { web.destroy(); web = null; }
        super.onDestroy();
    }

    // ---------- network helper (no CORS limits) ----------
    static String httpGet(String urlStr, int maxBytes) throws Exception {
        String url = urlStr;
        for (int hop = 0; hop < 6; hop++) {
            HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
            c.setInstanceFollowRedirects(false);
            c.setConnectTimeout(15000);
            c.setReadTimeout(25000);
            c.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36 EnglishHub/1.0");
            c.setRequestProperty("Accept-Language", "en-US,en;q=0.9");
            c.setRequestProperty("Accept", "*/*");
            int code = c.getResponseCode();
            if (code >= 300 && code < 400) {
                String loc = c.getHeaderField("Location");
                c.disconnect();
                if (loc == null) throw new Exception("redirect");
                url = new URL(new URL(url), loc).toString();
                continue;
            }
            if (code >= 400) { c.disconnect(); throw new HttpErr(code); }
            Charset cs = Charset.forName("UTF-8");
            String ct = c.getContentType();
            if (ct != null) {
                Matcher m = Pattern.compile("charset=([\\w\\-]+)", Pattern.CASE_INSENSITIVE).matcher(ct);
                if (m.find()) { try { cs = Charset.forName(m.group(1)); } catch (Exception ignored) { } }
            }
            try (InputStream in = c.getInputStream()) {
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                byte[] buf = new byte[16384];
                int n, total = 0;
                while ((n = in.read(buf)) > 0) {
                    out.write(buf, 0, n);
                    total += n;
                    if (maxBytes > 0 && total >= maxBytes) break;
                }
                return new String(out.toByteArray(), cs);
            } finally {
                c.disconnect();
            }
        }
        throw new Exception("too many redirects");
    }

    static class HttpErr extends Exception {
        final int code;
        HttpErr(int c) { super("HTTP " + c); code = c; }
    }

    // ---------- JavaScript bridge ----------
    class Bridge {

        @JavascriptInterface
        public void fetch(String id, String url, int maxBytes) {
            pool.execute(() -> {
                try {
                    String body = httpGet(url, maxBytes);
                    js("window.__nf&&__nf(" + JSONObject.quote(id) + ",200," + JSONObject.quote(body) + ")");
                } catch (HttpErr e) {
                    js("window.__nf&&__nf(" + JSONObject.quote(id) + "," + e.code + ",'')");
                } catch (Throwable e) {
                    js("window.__nf&&__nf(" + JSONObject.quote(id) + ",0,'')");
                }
            });
        }

        @JavascriptInterface
        public boolean ttsAvailable() { return ttsReady; }

        @JavascriptInterface
        public void speak(String text, String lang, float rate, float pitch, String id) {
            main.post(() -> {
                if (!ttsReady) { js("window.__ttsDone&&__ttsDone(" + JSONObject.quote(id) + ")"); return; }
                Locale loc = "en-GB".equals(lang) ? Locale.UK : ("en-AU".equals(lang) ? new Locale("en", "AU") : Locale.US);
                tts.setLanguage(loc);
                try {
                    Set<Voice> voices = tts.getVoices();
                    if (voices != null) {
                        Voice best = null;
                        for (Voice v : voices) {
                            if (v.getLocale() != null && v.getLocale().equals(loc) && !v.isNetworkConnectionRequired()) {
                                if (best == null || v.getQuality() > best.getQuality()) best = v;
                            }
                        }
                        if (best != null) tts.setVoice(best);
                    }
                } catch (Exception ignored) { }
                tts.setSpeechRate(rate);
                tts.setPitch(pitch);
                Bundle b = new Bundle();
                tts.speak(text, TextToSpeech.QUEUE_FLUSH, b, id);
            });
        }

        @JavascriptInterface
        public void stopSpeak() { main.post(() -> { if (ttsReady) tts.stop(); }); }

        @JavascriptInterface
        public void listen(String id, String lang) {
            main.post(() -> {
                pendingSpeechId = id;
                Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
                i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, lang);
                i.putExtra(RecognizerIntent.EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE, lang);
                i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5);
                i.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speak in English…");
                try {
                    startActivityForResult(i, REQ_SPEECH);
                } catch (ActivityNotFoundException e) {
                    pendingSpeechId = null;
                    js("window.__sr&&__sr(" + JSONObject.quote(id) + ",false,'NO_ENGINE',[])");
                }
            });
        }

        @JavascriptInterface
        public void openExternal(String url) { main.post(() -> openUrl(url)); }

        @JavascriptInterface
        public void share(String text) {
            main.post(() -> {
                Intent i = new Intent(Intent.ACTION_SEND);
                i.setType("text/plain");
                i.putExtra(Intent.EXTRA_TEXT, text);
                startActivity(Intent.createChooser(i, "مشاركة"));
            });
        }

        @JavascriptInterface
        public void copy(String text) {
            main.post(() -> {
                ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                if (cm != null) cm.setPrimaryClip(ClipData.newPlainText("EnglishHub", text));
                Toast.makeText(MainActivity.this, "تم النسخ", Toast.LENGTH_SHORT).show();
            });
        }

        @JavascriptInterface
        public void toast(String msg) { main.post(() -> Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show()); }

        @JavascriptInterface
        public void keepScreenOn(boolean on) {
            main.post(() -> {
                if (on) getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            });
        }

        @JavascriptInterface
        public void setBars(String color) {
            main.post(() -> {
                try {
                    int c = Color.parseColor(color);
                    getWindow().setStatusBarColor(c);
                    getWindow().setNavigationBarColor(c);
                    root.setBackgroundColor(c);
                    boolean light = (Color.red(c) * 299 + Color.green(c) * 587 + Color.blue(c) * 114) / 1000 > 150;
                    View d = getWindow().getDecorView();
                    int f = d.getSystemUiVisibility();
                    if (light) f |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                    else f &= ~(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
                    d.setSystemUiVisibility(f);
                } catch (Exception ignored) { }
            });
        }

        @JavascriptInterface
        public void media(boolean playing, String title, String subtitle, boolean background) {
            main.post(() -> {
                Intent i = new Intent(MainActivity.this, PlaybackService.class);
                if (!background) { stopService(i); return; }
                i.setAction(PlaybackService.ACTION_UPDATE);
                i.putExtra("playing", playing);
                i.putExtra("title", title);
                i.putExtra("sub", subtitle);
                try {
                    if (playing) startForegroundService(i);
                    else if (PlaybackService.running) startService(i);
                } catch (Exception ignored) { }
            });
        }

        @JavascriptInterface
        public void mediaStop() {
            main.post(() -> stopService(new Intent(MainActivity.this, PlaybackService.class)));
        }

        @JavascriptInterface
        public void setReminder(boolean on, int hour, int minute) {
            ReminderReceiver.save(MainActivity.this, on, hour, minute);
            ReminderReceiver.schedule(MainActivity.this);
        }

        @JavascriptInterface
        public void testReminder() { ReminderReceiver.show(MainActivity.this); }

        @JavascriptInterface
        public boolean needNotifPermission() {
            return Build.VERSION.SDK_INT >= 33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED;
        }

        @JavascriptInterface
        public void requestNotifPermission() {
            main.post(() -> {
                if (Build.VERSION.SDK_INT >= 33) requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, REQ_NOTIF);
                else js("window.__notifPerm&&__notifPerm(true)");
            });
        }

        @JavascriptInterface
        public String version() {
            try { return getPackageManager().getPackageInfo(getPackageName(), 0).versionName; }
            catch (Exception e) { return "1.0"; }
        }

        @JavascriptInterface
        public void clearCache() { main.post(() -> { web.clearCache(true); }); }

        @JavascriptInterface
        public void exitApp() { main.post(() -> finishAndRemoveTask()); }
    }
}
