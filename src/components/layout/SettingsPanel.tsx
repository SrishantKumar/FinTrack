import React, { useState } from 'react';
import { Settings, Bell, Shield, X } from 'lucide-react';
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
    dateFormat: 'DD/MM/YYYY'
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
            </div>
          )}

          {section === 'security' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Two-Factor Authentication
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={generalSettings.twoFactorAuth}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                    />
                    <span className="ml-2 text-sm text-gray-600">Enable two-factor authentication</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {section === 'notifications' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Notifications
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={generalSettings.emailNotifications}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    />
                    <span className="ml-2 text-sm text-gray-600">Receive email notifications</span>
                  </label>
                </div>
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

export function SettingsPanel() {
  const [selectedSection, setSelectedSection] = useState('');

  const settingsMenu = [
    {
      id: 'general',
      icon: Settings,
      label: 'General Settings',
      description: 'Account preferences and settings'
    },
    {
      id: 'security',
      icon: Shield,
      label: 'Security',
      description: 'Password and authentication settings'
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      description: 'Manage your notification preferences'
    }
  ];

  return (
    <>
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
        </div>
        <div className="p-2">
          {settingsMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSection(item.id)}
              className={`w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors ${
                selectedSection === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="p-2 bg-gray-100 rounded-lg">
                <item.icon className="h-4 w-4 text-gray-600" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  {item.label}
                </div>
                <div className="text-xs text-gray-500">
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <SettingsModal
        isOpen={selectedSection !== ''}
        onClose={() => setSelectedSection('')}
        section={selectedSection}
      />
    </>
  );
}