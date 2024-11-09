import { useState, useEffect } from 'react';
import { Search, Plus, Users, Download } from 'lucide-react';
import { ClientProfile } from './ClientProfile';
import { AddClientModal } from './AddClientModal';
import { generatePDF } from '../utils/pdfGenerator';
import { useTransactions } from '../../context/TransactionContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  image: string;
  category: string;
  status: 'active' | 'inactive';
}

// Add Transaction interface
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending';
  category: string;
}

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Srishant Kumar',
    email: 'Srishant054@gmail.com',
    company: 'TechCorp Inc.',
    image: 'https://i.imgur.com/CC0IGFA.jpeg',
    category: 'Technology',
    status: 'active'
  },
  {
    id: '2',
    name: 'Harshita Shankar',
    email: 'shankarharshita99@gmail.com',
    company: 'Design Solutions',
    image: 'https://i.imgur.com/85imDjd.jpeg',
    category: 'Design',
    status: 'active'
  },
  {
    id: '3',
    name: 'Rohan Kumar',
    email: 'rohan18126@gmail.com',
    company: 'Marketing Pro',
    image: 'https://i.imgur.com/XeFwRGj.jpeg',
    category: 'Marketing',
    status: 'active'
  },
  {
    id: '4',
    name: 'Rayyan Seliya',
    email: 'rayyanseliya786@gmail.com',
    company: 'Finance Analytics',
    image: 'https://i.imgur.com/JP9r3dA.jpeg',
    category: 'Finance',
    status: 'active'
  }
];

export function ClientList() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { transactions, setTransactions } = useTransactions();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsRef = collection(db, 'transactions');
        const q = query(transactionsRef, where('status', '==', 'completed'));
        const snapshot = await getDocs(q);
        
        const fetchedTransactions: Transaction[] = snapshot.docs.map(doc => ({
          id: doc.id,
          date: doc.data().date,
          description: doc.data().description,
          amount: doc.data().amount,
          type: doc.data().type as 'income' | 'expense',
          status: doc.data().status as 'completed' | 'pending',
          category: doc.data().category
        }));

        setTransactions(fetchedTransactions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [setTransactions]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportClientData = (client: Client) => {
    const clientTransactions = transactions.filter(t => 
      t.description.toLowerCase().includes(client.name.toLowerCase()) ||
      t.description.toLowerCase().includes(client.company.toLowerCase())
    );

    const exportData = {
      client,
      transactions: clientTransactions,
      summary: {
        totalIncome: clientTransactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0),
        totalExpenses: clientTransactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)
      }
    };

    generatePDF('client-report', exportData);
  };

  const handleAddClient = (newClient: Client) => {
    setClients(prev => [...prev, newClient]);
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading clients...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Client Profiles
            </h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Client
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={client.image}
                alt={client.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {client.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {client.company}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {client.category}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                client.status === 'active'
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedClient(client)}
                className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
              >
                View Profile
              </button>
              <button
                onClick={() => handleExportClientData(client)}
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedClient && (
        <ClientProfile
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}

      {showAddModal && (
        <AddClientModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddClient}
        />
      )}
    </div>
  );
}