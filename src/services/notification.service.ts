import { getToken, onMessage, } from "firebase/messaging";
import { messaging } from "@/firebase/firebase";

class NotificationService {

    async requestPermission() {
        console.log("requestPermission called");
        const permission = await Notification.requestPermission();
        console.log(permission);
        return permission === "granted";
    }

    async getFCMToken() {
        try {
            const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            });
            return token ?? "";
        } catch (error) {
            console.error("getFCMToken Error:", error);
            return "";
        }
    }

    listenForeground(callback?: (payload: any) => void) {
        console.log("✅ listenForeground started");
        return onMessage(messaging, async (payload) => {
            console.log("🔥 FCM Received", payload);
            const title = payload.notification?.title ?? "";
            const body = payload.notification?.body ?? "";
            // Show desktop notification
            if (Notification.permission === "granted") {
                if ("serviceWorker" in navigator) {
                    const registration = await navigator.serviceWorker.ready;
                    registration.showNotification(title, {
                        body,
                        icon: "/logo.png",
                        badge: "/logo.png",
                        data: payload.data,
                    });
                } else {
                    new Notification(title, {
                        body,
                        icon: "/logo.png",
                    });
                }
            }
            callback?.(payload);
        });
    }
}

export default new NotificationService();