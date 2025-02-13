import { useState } from 'react';
import { Download } from 'lucide-react';
import { Transaction } from '../clients/ClientList';
import { generatePDF } from '../utils/pdfGenerator';

interface InsightsPanelProps {
  transactions: Transaction[];
}

export function InsightsPanel({ transactions }: InsightsPanelProps) {
  const [activeTab, setActiveTab] = useState<'costs' | 'growth' | 'benchmarks'>('costs');

  const handleExportInsights = () => {
    generatePDF([], transactions);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Insights & Recommendations</h2>
        <button 
          onClick={handleExportInsights}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
        >
          <Download className="h-4 w-4" />
          Export Insights
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('costs')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === 'costs'
              ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Cost Optimization
        </button>
        <button
          onClick={() => setActiveTab('growth')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === 'growth'
              ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Growth Opportunities
        </button>
        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === 'benchmarks'
              ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Industry Benchmarks
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'costs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cost Optimization</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Recommendations to reduce expenses and improve efficiency
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Growth Opportunities</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Potential areas for revenue growth and expansion
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Industry Benchmarks</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Compare your performance with industry standards
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}