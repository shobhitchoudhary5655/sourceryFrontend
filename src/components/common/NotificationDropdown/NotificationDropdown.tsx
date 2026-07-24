import { markAsRead, markAllRead, deleteNotification, } from '@/services/notification.service.api';
import { useNotification } from "@/context/NotificationContext";
import { Bell, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Notification {
  id: number;
  title: string;
  body: string;
  type: string;
  referenceId?: number;
  isRead: boolean;
  createdAt: string;
}

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { notifications, unreadCount, refreshNotifications } = useNotification();

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
      await refreshNotifications();
    }
    console.log(notification);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true)
      await deleteNotification(id);
      await refreshNotifications();
    }
    finally {
      setLoading(false)
    }
  };

  const handleMarkAllRead = async () => {
    await markAllRead();
    await refreshNotifications();
  };

  // useEffect(() => {
  //   refreshNotifications();

  //   const interval = setInterval(() => {
  //     refreshNotifications();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (open) {
      refreshNotifications();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handler = () => { refreshNotifications(); };

    window.addEventListener("new-notification", handler);

    return () => {
      window.removeEventListener("new-notification", handler);
    };


  }, []);

  return (
    <div ref={dropdownRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl bg-gray-100 text-gray-700
          transition hover:bg-[#F4EDFF] hover:text-[#7F26FD]
          focus:outline-none focus:ring-2 focus:ring-[#7F26FD]/30
        "
        aria-label="Open notifications"
        aria-expanded={open}
      >
        <div className="relative">

          <Bell size={19} />

          {unreadCount > 0 && (

            <span
              className="
            absolute
            -top-2
            -right-2
            h-5
            min-w-5
            rounded-full
            bg-red-500
            text-white
            text-[10px]
            flex
            items-center
            justify-center
            px-1
        "
            >
              {unreadCount}
            </span>

          )}

        </div>
      </button>

      {open && (
        <div
          className="
            fixed left-3 right-3 top-[76px]
            z-[60] overflow-hidden
            rounded-xl border bg-white shadow-lg
            sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-80
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold text-gray-800">
              Notifications
            </h3>

            <button
              onClick={handleMarkAllRead}
              className="text-xs text-[#7F26FD] font-medium"
            >
              Mark all
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 sm:hidden"
            >
              <X size={18} />
            </button>
          </div>

          {/* NOTIFICATION LIST */}
          <div className="max-h-[60vh] overflow-y-auto sm:max-h-80">
            {loading ? (
              <div className="p-4 text-center">
                Loading...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`border-b p-4 cursor-pointer hover:bg-gray-50 ${!item.isRead ? 'bg-purple-50' : ''
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4
                        className={
                          item.isRead
                            ? 'text-gray-700'
                            : 'font-semibold text-black'
                        }
                      >
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.body}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="ml-3 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;