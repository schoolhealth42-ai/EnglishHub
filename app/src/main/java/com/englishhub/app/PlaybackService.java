package com.englishhub.app;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.IBinder;

/** Keeps the app alive while audio plays in the background and shows play/pause controls. */
public class PlaybackService extends Service {
    static final String ACTION_UPDATE = "com.englishhub.app.UPDATE";
    static final String ACTION_TOGGLE = "com.englishhub.app.TOGGLE";
    static final String ACTION_STOP = "com.englishhub.app.STOP";
    static final int NID = 77;
    static volatile boolean running = false;

    String title = "English Hub", sub = "";
    boolean playing = true;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Notif.createChannels(this);
        String a = intent == null ? ACTION_UPDATE : intent.getAction();
        if (ACTION_TOGGLE.equals(a)) {
            MainActivity.sendJs("window.__mediaCmd&&__mediaCmd('toggle')");
            playing = !playing;
            post();
            return START_NOT_STICKY;
        }
        if (ACTION_STOP.equals(a)) {
            MainActivity.sendJs("window.__mediaCmd&&__mediaCmd('pause')");
            stopForeground(STOP_FOREGROUND_REMOVE);
            stopSelf();
            running = false;
            return START_NOT_STICKY;
        }
        if (intent != null) {
            playing = intent.getBooleanExtra("playing", true);
            String t = intent.getStringExtra("title");
            String s = intent.getStringExtra("sub");
            if (t != null) title = t;
            if (s != null) sub = s;
        }
        post();
        running = true;
        return START_NOT_STICKY;
    }

    void post() {
        Notification n = build();
        if (Build.VERSION.SDK_INT >= 29) {
            startForeground(NID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK);
        } else {
            startForeground(NID, n);
        }
    }

    Notification build() {
        int fl = PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT;
        Intent open = new Intent(this, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent piOpen = PendingIntent.getActivity(this, 1, open, fl);
        PendingIntent piToggle = PendingIntent.getService(this, 2, new Intent(this, PlaybackService.class).setAction(ACTION_TOGGLE), fl);
        PendingIntent piStop = PendingIntent.getService(this, 3, new Intent(this, PlaybackService.class).setAction(ACTION_STOP), fl);

        Notification.Builder b = new Notification.Builder(this, Notif.CH_PLAYBACK)
                .setSmallIcon(R.drawable.ic_stat)
                .setContentTitle(title)
                .setContentText(sub == null || sub.isEmpty() ? (playing ? "يعمل الآن" : "متوقف مؤقتاً") : sub)
                .setContentIntent(piOpen)
                .setOngoing(playing)
                .setOnlyAlertOnce(true)
                .setVisibility(Notification.VISIBILITY_PUBLIC)
                .setCategory(Notification.CATEGORY_TRANSPORT)
                .addAction(new Notification.Action.Builder(null,
                        playing ? "إيقاف مؤقت" : "تشغيل", piToggle).build())
                .addAction(new Notification.Action.Builder(null, "إغلاق", piStop).build())
                .setStyle(new Notification.MediaStyle().setShowActionsInCompactView(0, 1));
        return b.build();
    }

    @Override
    public void onDestroy() {
        running = false;
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) { return null; }
}
