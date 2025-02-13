import { useState } from 'react';
import { Bell, Settings, Users, AlertTriangle, PlayCircle } from 'lucide-react';
import { NotificationsPanel } from './NotificationsPanel';
import { SettingsPanel } from './SettingsPanel';
import { ThemeToggle } from './ThemeToggle';
import { AlertPanel } from '../alerts/AlertPanel';
import { AlertBadge } from '../alerts/AlertBadge';
import { OnboardingGuide } from '../onboarding/OnboardingGuide';
import { useAlerts } from '../../context/AlertContext';

export function Navbar() {
  const [activePanel, setActivePanel] = useState<
    'notifications' | 'settings' | 'team' | 'alerts' | null
  >(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { unreadCount } = useAlerts();

  const scrollToTeam = () => {
    const teamSection = document.getElementById('team-section');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
    setActivePanel(null);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img 
              src="https://i.imgur.com/LFHqrcJ.png" 
              alt="Hacknomics Logo"
              className="h-8 w-auto mr-3 animate-fadeIn"
            />
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400 animate-slideInRight">
              FinTrack By Hacknomics
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowOnboarding(true)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              title="Getting Started Guide"
            >
              <PlayCircle className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setActivePanel(activePanel === 'notifications' ? null : 'notifications')}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 relative"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && <AlertBadge count={unreadCount} />}
            </button>
            <button
              onClick={() => setActivePanel(activePanel === 'settings' ? null : 'settings')}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={scrollToTeam}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              title="Team"
            >
              <Users className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActivePanel(activePanel === 'alerts' ? null : 'alerts')}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              title="Alerts"
            >
              <AlertTriangle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {activePanel === 'notifications' && (
        <NotificationsPanel onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'settings' && (
        <SettingsPanel onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'alerts' && (
        <AlertPanel onClose={() => setActivePanel(null)} />
      )}
      {showOnboarding && (
        <OnboardingGuide onClose={() => setShowOnboarding(false)} />
      )}
    </nav>
  );
}