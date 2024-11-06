import { useState } from 'react';
import { CheckCircle2, RefreshCw, Link, AlertCircle, X, Plus } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  provider: string;
  status: 'connected' | 'error' | 'disconnected';
  lastSync: string;
  error?: string;
}

interface ConnectModalProps {
  onClose: () => void;
  onConnect: (integration: Partial<Integration>) => void;
}

function ConnectModal({ onClose, onConnect }: ConnectModalProps) {
  const [selectedType, setSelectedType] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [loading, setLoading] = useState(false);

  const integrationTypes = [
    {
      type: 'bank',
      name: 'Bank Account',
      providers: ['Chase', 'Bank of America', 'Wells Fargo', 'Citibank']
    },
    {
      type: 'payment',
      name: 'Payment Gateway',
      providers: ['Stripe', 'PayPal', 'Square', 'Razorpay']
    },
    {
      type: 'accounting',
      name: 'Accounting Software',
      providers: ['QuickBooks', 'Xero', 'FreshBooks', 'Zoho Books']
    }
  ];

  const handleConnect = async () => {
    if (!selectedType || !selectedProvider) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onConnect({
        id: Math.random().toString(36).substr(2, 9),
        name: integrationTypes.find(i => i.type === selectedType)?.name || '',
        provider: selectedProvider,
        status: 'connected',
        lastSync: 'just now'
      });
      
      onClose();
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Connect New Integration
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Integration Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setSelectedProvider('');
              }}
              className="w-full rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select type</option>
              {integrationTypes.map((integration) => (
                <option key={integration.type} value={integration.type}>
                  {integration.name}
                </option>
              ))}
            </select>
          </div>

          {selectedType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Provider
              </label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select provider</option>
                {integrationTypes
                  .find(i => i.type === selectedType)
                  ?.providers.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            disabled={!selectedType || !selectedProvider || loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DataSyncStatus() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Bank Account',
      provider: 'Chase Business',
      status: 'connected',
      lastSync: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Payment Gateway',
      provider: 'Stripe',
      status: 'connected',
      lastSync: '5 minutes ago'
    },
    {
      id: '3',
      name: 'Accounting Software',
      provider: 'QuickBooks',
      status: 'error',
      lastSync: '1 hour ago',
      error: 'Authentication failed. Please reconnect.'
    }
  ]);

  const handleSync = async () => {
    setIsRefreshing(true);
    
    try {
      // Simulate sync delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update last sync times and potentially fix errors
      setIntegrations(prevIntegrations =>
        prevIntegrations.map(integration => ({
          ...integration,
          lastSync: 'just now',
          status: Math.random() > 0.1 ? 'connected' : 'error', // 10% chance of error for demo
          error: undefined
        }))
      );
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDisconnect = async (id: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIntegrations(prevIntegrations =>
        prevIntegrations.map(integration =>
          integration.id === id
            ? { ...integration, status: 'disconnected', lastSync: 'Never' }
            : integration
        )
      );
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  const handleReconnect = async (id: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIntegrations(prevIntegrations =>
        prevIntegrations.map(integration =>
          integration.id === id
            ? { ...integration, status: 'connected', lastSync: 'just now', error: undefined }
            : integration
        )
      );
    } catch (error) {
      console.error('Reconnect error:', error);
    }
  };

  const handleConnect = (newIntegration: Partial<Integration>) => {
    setIntegrations(prev => [...prev, newIntegration as Integration]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Data Integrations</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your connected accounts and data sources
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSync}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg transition-all ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Syncing...' : 'Sync Now'}
          </button>
          <button
            onClick={() => setShowConnectModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            <Plus className="h-4 w-4" />
            Add Integration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex flex-col p-4 border border-gray-100 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Link className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{integration.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{integration.provider}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1">
                {integration.status === 'connected' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
                )}
                <span className={`text-sm font-medium ${
                  integration.status === 'connected' 
                    ? 'text-green-500 dark:text-green-400' 
                    : 'text-red-500 dark:text-red-400'
                }`}>
                  {integration.status === 'connected' ? 'Connected' : 'Error'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {integration.status === 'connected' ? (
                  <button
                    onClick={() => handleDisconnect(integration.id)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => handleReconnect(integration.id)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Reconnect
                  </button>
                )}
              </div>
            </div>

            {integration.error && (
              <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                {integration.error}
              </p>
            )}

            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Last sync: {integration.lastSync}
            </span>
          </div>
        ))}
      </div>

      {showConnectModal && (
        <ConnectModal
          onClose={() => setShowConnectModal(false)}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
}