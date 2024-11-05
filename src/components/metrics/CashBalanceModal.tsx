import { X, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { generatePDF } from '../utils/pdfGenerator';

interface CashBalanceModalProps {
  onClose: () => void;
}

export function CashBalanceModal({ onClose }: CashBalanceModalProps) {
  const { transactions, cashBalance } = useTransactions();

  // Calculate 30-day change
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const handleExport = () => {
    const exportData = recentTransactions.map(t => ({
      ...t,
      balance: cashBalance // You might want to calculate running balance here
    }));
    generatePDF('cash-balance', exportData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Cash Balance Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              View all your cash transactions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleExport}
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

        <div className="p-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">
                Current Balance
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${cashBalance.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-300px)]">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="pb-3 text-sm font-medium text-gray-500">
                    Description
                  </th>
                  <th className="pb-3 text-sm font-medium text-gray-500 text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="py-4 text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-full ${
                            transaction.type === 'income'
                              ? 'bg-green-100'
                              : 'bg-red-100'
                          }`}
                        >
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="h-3 w-3 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 text-red-600" />
                          )}
                        </div>
                        <span className="text-sm text-gray-900">
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`py-4 text-sm font-medium text-right ${
                        transaction.type === 'income'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}$
                      {transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}