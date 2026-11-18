package com.englishhub.app;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import java.util.Calendar;

/** Daily study reminder. Also re-schedules itself after the phone restarts. */
public class ReminderReceiver extends BroadcastReceiver {
    static final String ACTION_REMIND = "com.englishhub.app.REMIND";
    static final String[] MSGS = {
            "حان وقت جلسة الإنجليزية اليومية 🎧",
            "خمس دقائق استماع اليوم تصنع فرقاً كبيراً ✨",
            "حافظ على سلسلة أيامك! افتح درس اليوم 🔥",
            "جرّب محادثة قصيرة وتدرّب على النطق 🗣️",
            "كلمة اليوم بانتظارك 📚"
    };

    @Override
    public void onReceive(Context c, Intent i) {
        String a = i.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(a)) { schedule(c); return; }
        if (ACTION_REMIND.equals(a)) { show(c); schedule(c); }
    }

    static SharedPreferences prefs(Context c) { return c.getSharedPreferences("reminder", Context.MODE_PRIVATE); }

    static void save(Context c, boolean on, int h, int m) {
        prefs(c).edit().putBoolean("on", on).putInt("h", h).putInt("m", m).apply();
    }

    static void schedule(Context c) {
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        Intent it = new Intent(c, ReminderReceiver.class).setAction(ACTION_REMIND);
        PendingIntent pi = PendingIntent.getBroadcast(c, 5, it, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        if (am == null) return;
        am.cancel(pi);
        SharedPreferences p = prefs(c);
        if (!p.getBoolean("on", false)) return;
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, p.getInt("h", 20));
        cal.set(Calendar.MINUTE, p.getInt("m", 0));
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        if (cal.getTimeInMillis() <= System.currentTimeMillis() + 1000) cal.add(Calendar.DAY_OF_YEAR, 1);
        am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), pi);
    }

    static void show(Context c) {
        Notif.createChannels(c);
        Intent open = new Intent(c, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pi = PendingIntent.getActivity(c, 6, open, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        String msg = MSGS[Calendar.getInstance().get(Calendar.DAY_OF_YEAR) % MSGS.length];
        Notification n = new Notification.Builder(c, Notif.CH_REMINDER)
                .setSmallIcon(R.drawable.ic_stat)
                .setContentTitle("English Hub")
                .setContentText(msg)
                .setContentIntent(pi)
                .setAutoCancel(true)
                .build();
        NotificationManager nm = c.getSystemService(NotificationManager.class);
        try { if (nm != null) nm.notify(88, n); } catch (SecurityException ignored) { }
    }
}
