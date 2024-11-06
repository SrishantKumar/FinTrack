import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';
import { TransactionProvider } from './context/TransactionContext';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AlertProvider } from './context/AlertContext';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CurrencyProvider>
          <TransactionProvider>
            <AlertProvider>
              <App />
            </AlertProvider>
          </TransactionProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);