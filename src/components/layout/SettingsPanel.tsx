import { useState } from 'react';
import { Settings, Bell, X } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
}

function SettingsModal({ isOpen, onClose, section }: SettingsModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { currency, setCurrency } = useCurrency();

  // General Settings Form State
  const [generalSettings, setGeneralSettings] = useState({
    language: 'en',
    timezone: 'IST',
    currency: currency,
    dateFormat: 'DD/MM/YYYY',
    twoFactorAuth: true,
    loginAlerts: true
  });

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Update currency in context
      setCurrency(generalSettings.currency);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError('Failed to update settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {section.charAt(0).toUpperCase() + section.slice(1)} Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
              {success}
            </div>
          )}

          {section === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  value={generalSettings.language}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full rounded-lg border-gray-200 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={generalSettings.timezone}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full rounded-lg border-gray-200 focus:ring-blue-500"
                >
                  <option value="IST">India Standard Time (IST)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  value={generalSettings.currency}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full rounded-lg border-gray-200 focus:ring-blue-500"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Security
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={generalSettings.twoFactorAuth}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Enable Two-Factor Authentication</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={generalSettings.loginAlerts}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, loginAlerts: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Email alerts for new login attempts</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {section === 'notifications' && (
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Email Notifications</span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Receive email notifications for important updates and alerts
                </p>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Push Notifications</span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Receive push notifications for real-time updates
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

interface SettingsPanelProps {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Settings</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Close
        </button>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Currency
          </label>
          <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Format
          </label>
          <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );
}