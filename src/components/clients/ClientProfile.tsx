import { useState } from 'react';
import { X, Mail, Building, Tag } from 'lucide-react';
import { Client, Transaction } from './ClientList';
import { useCurrency } from '../../context/CurrencyContext';
import { generatePDF } from '../utils/pdfGenerator';

interface ClientProfileProps {
  client: Client;
  onClose: () => void;
  transactions: Transaction[];
}

export function ClientProfile({ client, onClose, transactions }: ClientProfileProps) {
  const { formatAmount } = useCurrency();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');

  const clientTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(client.name.toLowerCase()) ||
    t.description.toLowerCase().includes(client.company.toLowerCase())
  );

  const handleGeneratePDF = () => {
    const clientData = [client];
    generatePDF(clientData, clientTransactions);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{client.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {client.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Building className="h-4 w-4" />
                {client.company}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                {client.category}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: <span className="font-medium">{client.status}</span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'transactions'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Transactions
              </button>
            </div>

            {activeTab === 'overview' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Total Income
                    </h3>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatAmount(
                        clientTransactions
                          .filter(t => t.type === 'income')
                          .reduce((sum, t) => sum + t.amount, 0)
                      )}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Total Expenses
                    </h3>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatAmount(
                        clientTransactions
                          .filter(t => t.type === 'expense')
                          .reduce((sum, t) => sum + t.amount, 0)
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleGeneratePDF}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Generate Report
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {clientTransactions.length > 0 ? (
                  clientTransactions.map(transaction => (
                    <div
                      key={transaction.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p
                        className={`font-medium ${
                          transaction.type === 'income'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatAmount(transaction.amount)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No transactions found for this client
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}