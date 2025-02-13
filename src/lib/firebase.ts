import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAgHKLux9oHRGof7l-ru5RWaVoEjjM1vx4",
  authDomain: "hacknomics.firebaseapp.com",
  projectId: "hacknomics",
  storageBucket: "hacknomics.appspot.com",
  messagingSenderId: "740484056581",
  appId: "1:740484056581:web:7a281ee5268e5da22b3e6c",
  measurementId: "G-C3KKL5E1NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics conditionally
const analytics = getAnalytics(app);

// Global error handler
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.code?.includes('firebase')) {
    console.error('Firebase Error:', event.reason);
  }
});

export { db, analytics };