import { useState } from 'react';
import { CheckCircle2, RefreshCw, Link, AlertCircle } from 'lucide-react';

interface Integration {
  name: string;
  provider: string;
  status: 'connected' | 'error';
  lastSync: string;
}

export function DataSyncStatus() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      name: 'Bank Account',
      provider: 'Chase Business',
      status: 'connected',
      lastSync: '2 minutes ago'
    },
    {
      name: 'Payment Gateway',
      provider: 'Stripe',
      status: 'connected',
      lastSync: '5 minutes ago'
    },
    {
      name: 'Accounting Software',
      provider: 'QuickBooks',
      status: 'error',
      lastSync: '1 hour ago'
    }
  ]);

  const handleSync = async () => {
    setIsRefreshing(true);
    
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update last sync times
    setIntegrations(prevIntegrations =>
      prevIntegrations.map(integration => ({
        ...integration,
        lastSync: 'just now'
      }))
    );
    
    setIsRefreshing(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Data Integrations</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your connected accounts and data sources</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isRefreshing}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all ${
            isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Link className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{integration.name}</h3>
                <p className="text-sm text-gray-500">{integration.provider}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                {integration.status === 'connected' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  integration.status === 'connected' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {integration.status === 'connected' ? 'Connected' : 'Error'}
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                Last sync: {integration.lastSync}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}