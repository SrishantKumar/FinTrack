import { useState } from 'react';
import { Bell, Settings, User, Users } from 'lucide-react';
import { NotificationsPanel } from './NotificationsPanel';
import { SettingsPanel } from './SettingsPanel';
import { ProfilePanel } from './ProfilePanel';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [activePanel, setActivePanel] = useState<
    'notifications' | 'settings' | 'profile' | 'team' | null
  >(null);

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
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 animate-slideInRight">
              FinTrack By Hacknomics
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              className={`p-2 rounded-lg transition-colors ${
                activePanel === 'team'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
              }`}
              onClick={scrollToTeam}
            >
              <Users className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                activePanel === 'notifications'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
              }`}
              onClick={() =>
                setActivePanel(
                  activePanel === 'notifications' ? null : 'notifications'
                )
              }
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                activePanel === 'settings'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
              }`}
              onClick={() =>
                setActivePanel(activePanel === 'settings' ? null : 'settings')
              }
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                activePanel === 'profile'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
              }`}
              onClick={() =>
                setActivePanel(activePanel === 'profile' ? null : 'profile')
              }
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Panels */}
      {activePanel === 'notifications' && <NotificationsPanel />}
      {activePanel === 'settings' && <SettingsPanel />}
      {activePanel === 'profile' && <ProfilePanel />}
    </nav>
  );
}