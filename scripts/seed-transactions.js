import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAgHKLux9oHRGof7l-ru5RWaVoEjjM1vx4",
  authDomain: "hacknomics.firebaseapp.com",
  projectId: "hacknomics",
  storageBucket: "hacknomics.appspot.com",
  messagingSenderId: "740484056581",
  appId: "1:740484056581:web:7a281ee5268e5da22b3e6c",
  measurementId: "G-C3KKL5E1NX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleTransactions = [
  {
    date: '2024-03-15',
    description: 'Website Development - Srishant Kumar',
    amount: 25000,
    type: 'income',
    category: 'Technology',
    status: 'completed'
  },
  {
    date: '2024-03-14',
    description: 'UI/UX Design - Harshita Shankar',
    amount: 18000,
    type: 'income',
    category: 'Design',
    status: 'completed'
  },
  {
    date: '2024-03-13',
    description: 'Marketing Campaign - Rohan Kumar',
    amount: 15000,
    type: 'expense',
    category: 'Marketing',
    status: 'completed'
  },
  {
    date: '2024-03-12',
    description: 'Financial Analysis - Rayyan Seliya',
    amount: 20000,
    type: 'income',
    category: 'Finance',
    status: 'completed'
  },
  {
    date: '2024-03-11',
    description: 'Software Development - TechCorp Inc.',
    amount: 35000,
    type: 'income',
    category: 'Technology',
    status: 'completed'
  }
];

async function seedTransactions() {
  try {
    for (const transaction of sampleTransactions) {
      await addDoc(collection(db, 'transactions'), {
        ...transaction,
        timestamp: new Date().toISOString()
      });
      console.log('Added transaction:', transaction.description);
    }
    console.log('Successfully seeded transactions!');
  } catch (error) {
    console.error('Error seeding transactions:', error);
  }
}

seedTransactions();