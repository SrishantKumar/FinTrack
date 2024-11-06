import { useState } from 'react';
import { Bell, ArrowUpRight } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'payment' | 'alert';
  isRead: boolean;
}

const allNotifications: Notification[] = [
  {
    id: 1,
    title: 'New Payment Received',
    description: 'Payment of $15,000 received from Srishant Kumar',
    time: '2 minutes ago',
    type: 'payment',
    isRead: false,
  },
  {
    id: 2,
    title: 'High Expense Alert',
    description: 'Monthly expenses exceeded budget by 15%',
    time: '1 hour ago',
    type: 'alert',
    isRead: true,
  },
  {
    id: 3,
    title: 'New Investment Opportunity',
    description: 'Review new investment proposal from potential partner',
    time: '2 hours ago',
    type: 'alert',
    isRead: false,
  },
  {
    id: 4,
    title: 'Payment Successful',
    description: 'Successfully paid $5,000 to vendor services',
    time: '3 hours ago',
    type: 'payment',
    isRead: true,
  },
  {
    id: 5,
    title: 'Budget Update',
    description: 'Q2 budget has been approved and updated',
    time: '5 hours ago',
    type: 'alert',
    isRead: false,
  }
];

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications);
  const [showAll, setShowAll] = useState(false);

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  return (
    <div className="absolute right-4 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              {notifications.some(n => !n.isRead) && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={markAllAsRead}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              Mark all as read
            </button>
          </div>
        </div>
      </div>

      <div className={`overflow-y-auto transition-all duration-300 ease-in-out ${showAll ? 'max-h-[60vh]' : 'max-h-[24rem]'}`}>
        {displayedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 transition-all duration-200 ${
              !notification.isRead ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex gap-3">
              <div
                className={`p-2 rounded-full transition-colors ${
                  notification.type === 'payment'
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'
                    : 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400'
                }`}
              >
                {notification.type === 'payment' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <Bell className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {notification.description}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">
                  {notification.time}
                </span>
              </div>
              {!notification.isRead && (
                <div className="h-2 w-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-2" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <button 
          onClick={() => setShowAll(!showAll)}
          className="w-full text-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          {showAll ? 'View all notifications' : `Show less (${notifications.length})`}
        </button>
      </div>
    </div>
  );
}