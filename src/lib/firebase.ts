import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

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

// Initialize Auth with persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .catch(error => {
    console.error("Auth persistence error:", error.message);
  });

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics conditionally
const analytics = getAnalytics(app);

// Error handling wrapper for Firebase operations
const handleFirebaseError = (error: any) => {
  if (error?.code === 'installations/request-failed') {
    console.error('Installation error handled:', error.message);
    return;
  }
  throw error;
};

// Global error handler
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.code?.includes('firebase') || event.reason?.code?.includes('auth')) {
    handleFirebaseError(event.reason);
    event.preventDefault();
  }
});

export { auth, db, analytics };
export default app;