import { createContext, useContext, useEffect, useState, } from "react";
import { useAuth } from "@/context/AuthContext";
import { getNotifications, getUnreadCount, } from "@/services/notification.service.api";
import notificationService from "@/services/notification.service";

interface Notification {
    id: number;
    title: string;
    body: string;
    type: string;
    referenceId?: number;
    isRead: boolean;
    createdAt: string;
}

interface NotificationPopup {
    title: string;
    body: string;
}

interface ContextType {
    notifications: Notification[];
    unreadCount: number;
    popup: NotificationPopup | null;
    setPopup: React.Dispatch<
        React.SetStateAction<NotificationPopup | null>
    >;
    refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<ContextType>(null!);

export const NotificationProvider = ({ children, }: { children: React.ReactNode; }) => {
    const { isAuthenticated, loading } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [popup, setPopup] = useState<NotificationPopup | null>(null);

    const refreshNotifications = async () => {
        console.log("🔄 Refresh Started");
        try {
            const [list, unread] = await Promise.all([
                getNotifications(),
                getUnreadCount(),
            ]);
            console.log("📋 Notifications:", list);
            console.log("🔴 Unread:", unread);
            setNotifications(list.notifications);
            setUnreadCount(unread.count);
            console.log("✅ State Updated");
        } catch (error) {
            console.error("❌ Refresh Error", error);
        }
    };

    useEffect(() => {

        const unsubscribe = notificationService.listenForeground((payload) => {
            setPopup({
                title: payload.notification?.title ?? "",
                body: payload.notification?.body ?? "",
            });
            refreshNotifications();
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) return;
        refreshNotifications();
    }, [loading, isAuthenticated]);

    return (

        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                popup,
                setPopup,
                refreshNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>

    );

};

export const useNotification = () => useContext(NotificationContext);