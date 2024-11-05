import React, { useState } from 'react';
import { TrendingUp, DollarSign, Target, LineChart, ArrowRight, Download } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { generatePDF } from '../utils/pdfGenerator';

const insights = {
  costOptimization: [
    {
      title: 'Reduce Cloud Infrastructure Costs',
      description: 'Switch to reserved instances to save up to 25% on cloud spending',
      impact: '$2,400/month savings',
      priority: 'high'
    },
    {
      title: 'Optimize Marketing Spend',
      description: 'Focus on channels with highest ROI based on last quarter data',
      impact: '15% better ROI',
      priority: 'medium'
    }
  ],
  growth: [
    {
      title: 'Increase Customer Lifetime Value',
      description: 'Implement premium features to drive user upgrades',
      impact: '+30% revenue potential',
      priority: 'high'
    },
    {
      title: 'Expand Market Reach',
      description: 'Target enterprise segment based on current usage patterns',
      impact: '2x market size',
      priority: 'medium'
    }
  ],
  benchmarks: [
    {
      metric: 'Gross Margin',
      value: '72%',
      benchmark: '65%',
      status: 'above'
    },
    {
      metric: 'CAC Payback',
      value: '8 months',
      benchmark: '12 months',
      status: 'above'
    },
    {
      metric: 'Revenue Growth',
      value: '15%',
      benchmark: '20%',
      status: 'below'
    }
  ]
};

export function InsightsPanel() {
  const [activeTab, setActiveTab] = useState<'costs' | 'growth' | 'benchmarks'>('costs');
  const { totalExpenses, totalIncome } = useTransactions();

  const handleExportInsights = () => {
    const exportData = {
      costOptimization: insights.costOptimization,
      growth: insights.growth,
      benchmarks: insights.benchmarks,
      summary: {
        totalExpenses,
        totalIncome,
        date: new Date().toISOString()
      }
    };
    
    generatePDF('insights', exportData);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 dark:bg-red-900/50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/50';
      default:
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/50';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'above' 
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Insights & Recommendations
          </h2>
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
      </div>

      <div className="p-6">
        {activeTab === 'costs' && (
          <div className="space-y-6">
            {insights.costOptimization.map((insight, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {insight.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                      {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {insight.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                    <Target className="h-4 w-4" />
                    {insight.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-6">
            {insights.growth.map((insight, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {insight.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                      {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {insight.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                    <Target className="h-4 w-4" />
                    {insight.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.benchmarks.map((benchmark, index) => (
              <div key={index} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {benchmark.metric}
                  </span>
                  <LineChart className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {benchmark.value}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Industry avg:
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {benchmark.benchmark}
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${getStatusColor(benchmark.status)}`}>
                    <ArrowRight className={`h-4 w-4 ${
                      benchmark.status === 'above' ? 'rotate-[-45deg]' : 'rotate-45deg'
                    }`} />
                    <span className="text-sm font-medium">
                      {benchmark.status === 'above' ? 'Above' : 'Below'} avg
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}