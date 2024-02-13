import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NotificationItem {
  notification_id: number;
  notification_type: string;
  notification_to: string;
  notification_to_userid: number;
  notification_message: string;
  notification_created_at: string;
  notification_is_read: boolean;
}

interface CountUnread {
  invoice: number;
  class_room: number;
}

type NotificationStore = {
  selectedNotification: NotificationItem;
  notificationList: NotificationItem[];
  setSelectedNotification: (data: NotificationItem) => void;
  setNotificationList: (data: NotificationItem[]) => void;
  emptyNotificationList: () => void;
  countUnreadNotification: CountUnread;
  setCountUnreadNotification: (data: CountUnread) => void;
};

const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      selectedNotification: {} as NotificationItem,
      notificationList: [],
      setSelectedNotification: (data) =>
        set(() => ({ selectedNotification: data })),
      setNotificationList: (data: NotificationItem[]) =>
        set(() => ({ notificationList: data })),
      emptyNotificationList: () => set(() => ({ notificationList: [] })),
      countUnreadNotification: {} as CountUnread,
      setCountUnreadNotification: (data) =>
        set(() => ({ countUnreadNotification: data })),
    }),
    {
      name: "notification-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useNotificationStore;
