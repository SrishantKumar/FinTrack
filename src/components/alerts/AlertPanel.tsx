import { useAlerts } from '../../context/AlertContext';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

interface AlertPanelProps {
  onClose: () => void;
}

export function AlertPanel({ onClose }: AlertPanelProps) {
  const { alerts, markAsRead, dismissAlert } = useAlerts();

  if (alerts.length === 0) {
    return (
      <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Alerts</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Close
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-500 dark:text-gray-400">No active alerts</p>
        </div>
      </div>
    );
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'danger':
        return 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800';
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Alerts</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Close
        </button>
      </div>
      <div className="max-h-[400px] overflow-y-auto p-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 border-l-4 ${getAlertStyles(alert.type)} ${
              !alert.isRead ? 'bg-opacity-100' : 'bg-opacity-50'
            }`}
            onClick={() => markAsRead(alert.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {alert.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {alert.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissAlert(alert.id);
                }}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {!alert.isRead && (
              <div className="mt-2 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs">Click to mark as read</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}