import { useState } from 'react';
import { User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { AccountSettingsModal } from './AccountSettingsModal';
import { HelpSupportModal } from './HelpSupportModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function ProfilePanel() {
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{currentUser?.displayName || 'User'}</div>
              <div className="text-sm text-gray-500">{currentUser?.email}</div>
            </div>
          </div>
        </div>
        <div className="p-2">
          <button 
            onClick={() => setShowAccountSettings(true)}
            className="w-full p-2 flex items-center gap-3 rounded-lg hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">Account Settings</span>
          </button>
          <button 
            onClick={() => setShowHelpSupport(true)}
            className="w-full p-2 flex items-center gap-3 rounded-lg hover:bg-gray-50"
          >
            <HelpCircle className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">Help & Support</span>
          </button>
          <button 
            onClick={handleSignOut}
            className="w-full p-2 flex items-center gap-3 rounded-lg hover:bg-gray-50 text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {showAccountSettings && (
        <AccountSettingsModal onClose={() => setShowAccountSettings(false)} />
      )}

      {showHelpSupport && (
        <HelpSupportModal onClose={() => setShowHelpSupport(false)} />
      )}
    </>
  );
}