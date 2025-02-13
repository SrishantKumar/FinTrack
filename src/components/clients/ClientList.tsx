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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Client Profiles</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track your client relationships
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </button>
          <button
            onClick={() => generatePDF(clients, transactions)}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading clients...</p>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No clients found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Try adjusting your search or add a new client.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700">
                <img
                  src={client.image}
                  alt={client.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{client.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{client.company}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {client.status}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {client.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedClient && (
        <ClientProfile
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          transactions={transactions}
        />
      )}

      {showAddModal && (
        <AddClientModal
          onClose={() => setShowAddModal(false)}
          onAdd={(newClient) => {
            setClients([...clients, { ...newClient, id: (clients.length + 1).toString() }]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}