import React, { createContext, useContext, useState } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatAmount: (amount: number) => string;
  convertAmount: (amount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const exchangeRates = {
  USD: 1,
  INR: 82.50,
  EUR: 0.92
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState('USD');

  const formatAmount = (amount: number): string => {
    const convertedAmount = convertAmount(amount);
    
    switch (currency) {
      case 'INR':
        return `₹${convertedAmount.toLocaleString('en-IN')}`;
      case 'EUR':
        return `€${convertedAmount.toLocaleString('de-DE')}`;
      default:
        return `$${convertedAmount.toLocaleString('en-US')}`;
    }
  };

  const convertAmount = (amount: number): number => {
    const inUSD = amount;
    const converted = inUSD * exchangeRates[currency as keyof typeof exchangeRates];
    return Math.round(converted * 100) / 100;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatAmount, convertAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}