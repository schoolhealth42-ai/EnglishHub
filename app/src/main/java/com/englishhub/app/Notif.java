package com.englishhub.app;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;

final class Notif {
    static final String CH_PLAYBACK = "playback";
    static final String CH_REMINDER = "reminder";

    static void createChannels(Context c) {
        NotificationManager nm = c.getSystemService(NotificationManager.class);
        if (nm == null) return;
        NotificationChannel p = new NotificationChannel(CH_PLAYBACK, "التشغيل", NotificationManager.IMPORTANCE_LOW);
        p.setDescription("التحكم بتشغيل البودكاست والراديو");
        p.setShowBadge(false);
        nm.createNotificationChannel(p);
        NotificationChannel r = new NotificationChannel(CH_REMINDER, "تذكير يومي", NotificationManager.IMPORTANCE_DEFAULT);
        r.setDescription("تذكير بموعد التعلّم اليومي");
        nm.createNotificationChannel(r);
    }
}
