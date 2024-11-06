import { useAlerts } from '../../context/AlertContext';

export function AlertBadge() {
  const { unreadCount } = useAlerts();

  if (unreadCount === 0) return null;

  return (
    <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
      <span className="text-xs font-medium text-white">
        {unreadCount > 9 ? '9+' : unreadCount}
      </span>
    </div>
  );
}