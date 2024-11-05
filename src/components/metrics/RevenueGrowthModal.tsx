import { X, Download, TrendingUp } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

const revenueData = [
  {
    id: 1,
    month: 'March 2024',
    revenue: 245000,
    growth: 24.5,
    sources: {
      'Product Sales': 180000,
      'Subscription': 45000,
      'Services': 20000
    }
  },
  {
    id: 2,
    month: 'February 2024',
    revenue: 196800,
    growth: 22.2,
    sources: {
      'Product Sales': 150000,
      'Subscription': 35000,
      'Services': 11800
    }
  }
];

interface RevenueGrowthModalProps {
  onClose: () => void;
}

export function RevenueGrowthModal({ onClose }: RevenueGrowthModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Revenue Growth Analysis
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Monthly revenue growth and sources
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => generatePDF('revenue-growth', revenueData)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">
                    Current Monthly Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">$245,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">Growth Rate</p>
                  <p className="text-lg font-semibold text-green-600 mt-1">
                    +24.5% vs Last Month
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {revenueData.map((month) => (
                <div key={month.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">{month.month}</h3>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">
                        +{month.growth}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(month.sources).map(([source, amount]) => (
                      <div key={source} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {source}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          ${amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}