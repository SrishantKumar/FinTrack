import { useState } from 'react';
import { Book, CheckCircle2, Target } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { useCurrency } from '../../context/CurrencyContext';

interface Module {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  content: string;
  tips: string[];
}

const modules: Module[] = [
  {
    id: 'basics',
    title: 'Understanding Cash Burn',
    description: 'Learn the fundamentals of cash burn and its impact on your startup',
    completed: false,
    content: 'Cash burn rate is the pace at which a company spends its cash reserves...',
    tips: [
      'Track all expenses meticulously',
      'Categorize spending by necessity',
      'Identify recurring costs'
    ]
  },
  {
    id: 'optimization',
    title: 'Expense Optimization',
    description: 'Strategies to reduce unnecessary expenses',
    completed: false,
    content: 'Start by analyzing your largest expense categories...',
    tips: [
      'Negotiate with vendors for better rates',
      'Consider remote work options',
      'Review subscription services monthly'
    ]
  },
  {
    id: 'runway',
    title: 'Extending Runway',
    description: 'Techniques to make your cash last longer',
    completed: false,
    content: 'Your runway is directly impacted by your burn rate...',
    tips: [
      'Build an emergency fund',
      'Create multiple revenue streams',
      'Implement lean startup methodologies'
    ]
  }
];

export function CashBurnEducation() {
  const { totalExpenses, cashBalance } = useTransactions();
  useCurrency();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const handleModuleCompletion = (moduleId: string) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      newSet.add(moduleId);
      return newSet;
    });
  };

  const calculateProgress = () => {
    return (completedModules.size / modules.length) * 100;
  };

  const getRecommendations = () => {
    const burnRate = totalExpenses / 6; // Last 6 months average
    const runway = cashBalance / (burnRate || 1);

    if (runway < 6) {
      return [
        'Critical: Consider immediate cost-cutting measures',
        'Review all non-essential expenses',
        'Explore emergency funding options'
      ];
    } else if (runway < 12) {
      return [
        'Monitor expenses closely',
        'Identify potential areas for cost reduction',
        'Build additional revenue streams'
      ];
    }
    return [
      'Maintain current fiscal discipline',
      'Plan for future growth opportunities',
      'Build emergency reserves'
    ];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cash Burn Management
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn to optimize your startup's financial efficiency
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-32 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {calculateProgress()}% Complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                activeModule === module.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
              }`}
              onClick={() => setActiveModule(module.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Book className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                {completedModules.has(module.id) && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                )}
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                {module.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {module.description}
              </p>
            </div>
          ))}
        </div>

        {activeModule && (
          <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {modules.find(m => m.id === activeModule)?.title}
              </h3>
              <button
                onClick={() => handleModuleCompletion(activeModule)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Mark as Complete
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {modules.find(m => m.id === activeModule)?.content}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Key Takeaways
              </h4>
              <ul className="space-y-2">
                {modules
                  .find(m => m.id === activeModule)
                  ?.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                      {tip}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
          Personalized Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getRecommendations().map((recommendation, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Action Item {index + 1}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}