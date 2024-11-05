import React from 'react';
import { X, Download, TrendingDown } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

const burnRateData = [
  {
    id: 1,
    month: 'March 2024',
    amount: 32000,
    change: -8.2,
    breakdown: {
      payroll: 20000,
      marketing: 5000,
      infrastructure: 4000,
      office: 3000
    }
  },
  {
    id: 2,
    month: 'February 2024',
    amount: 34800,
    change: -2.5,
    breakdown: {
      payroll: 22000,
      marketing: 5500,
      infrastructure: 4300,
      office: 3000
    }
  }
];

interface BurnRateModalProps {
  onClose: () => void;
}

export function BurnRateModal({ onClose }: BurnRateModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Monthly Burn Rate Analysis
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Detailed breakdown of monthly expenses
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => generatePDF('burn-rate', burnRateData)}
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
            <div className="bg-red-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">
                    Current Monthly Burn Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">$32,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-red-600 font-medium">Monthly Change</p>
                  <p className="text-lg font-semibold text-green-600 mt-1">
                    -8.2% vs Last Month
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {burnRateData.map((month) => (
                <div key={month.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">{month.month}</h3>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-500">
                        ${month.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(month.breakdown).map(([category, amount]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">
                          {category}
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