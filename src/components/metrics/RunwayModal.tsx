import { X, Download, Clock } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

const runwayData = {
  current: {
    months: 18,
    cashBalance: 245000,
    monthlyBurn: 32000,
    projectedExpenses: [
      { month: 'April 2024', amount: 32000 },
      { month: 'May 2024', amount: 33000 },
      { month: 'June 2024', amount: 33500 },
      { month: 'July 2024', amount: 34000 }
    ]
  },
  scenarios: [
    {
      name: 'Conservative',
      runway: 15,
      burnRate: 35000
    },
    {
      name: 'Moderate',
      runway: 18,
      burnRate: 32000
    },
    {
      name: 'Optimistic',
      runway: 22,
      burnRate: 28000
    }
  ]
};

interface RunwayModalProps {
  onClose: () => void;
}

export function RunwayModal({ onClose }: RunwayModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Runway Analysis
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Detailed cash runway projections
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => generatePDF('runway', runwayData)}
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
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">
                    Current Runway
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    18 months
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600 font-medium">Cash Balance</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    $245,000
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">
                  Projected Monthly Expenses
                </h3>
                <div className="space-y-3">
                  {runwayData.current.projectedExpenses.map((expense) => (
                    <div key={expense.month} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{expense.month}</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${expense.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">
                  Runway Scenarios
                </h3>
                <div className="space-y-3">
                  {runwayData.scenarios.map((scenario) => (
                    <div key={scenario.name} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {scenario.name}
                        </span>
                        <span className="text-xs text-gray-500 block">
                          ${scenario.burnRate.toLocaleString()}/month
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {scenario.runway} months
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}