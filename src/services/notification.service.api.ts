import api from "./api";

export interface Notification {
    id: number;
    title: string;
    body: string;
    type: string;
    referenceId?: number;
    isRead: boolean;
    createdAt: string;
}

export const saveFCMToken = async (token: string) => {
    const response = await api.post("/notification/token", { token, });
    return response.data;
};

export const removeFCMToken = async (token: string) => {
    const response = await api.delete("/notification/token", { data: { token, }, });
    return response.data;
};

export const getNotifications = async () => {
    const response = await api.get("/notification");
    return response.data;
};

export const getUnreadCount = async () => {
    const response = await api.get("/notification/unread-count");
    return response.data;
};

export const markAsRead = async (id: number) => {
    const response = await api.patch(`/notification/${id}/read`);
    return response.data;
};

export const markAllRead = async () => {
    const response = await api.patch("/notification/read-all");
    return response.data;
};

export const deleteNotification = async (id: number) => {
    const response = await api.delete(`/notification/${id}`);
    return response.data;
};