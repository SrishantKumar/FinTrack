import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Client } from '../components/clients/ClientList';

interface ClientReport {
  client: Client;
  transactions: any[];
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netAmount: number;
  };
}

export const generatePDF = (type: string, data: any) => {
  const doc = new jsPDF();
  const title = getTitle(type);
  
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

  switch (type) {
    case 'client-report':
      generateClientReport(doc, data as ClientReport);
      break;
    case 'cash-balance':
      generateCashBalanceReport(doc, data);
      break;
    case 'burn-rate':
      generateBurnRateReport(doc, data);
      break;
    case 'revenue-growth':
      generateRevenueReport(doc, data);
      break;
    case 'runway':
      generateRunwayReport(doc, data);
      break;
    case 'insights':
      generateClientReport(doc, data);
      break;
  }

  doc.save(`${type}-${new Date().getTime()}.pdf`);
};

const generateClientReport = (doc: jsPDF, data: ClientReport) => {
  // Client Information
  doc.setFontSize(14);
  doc.text('Client Information', 14, 35);
  
  const clientInfo = [
    ['Name', data.client.name],
    ['Company', data.client.company],
    ['Email', data.client.email],
    ['Category', data.client.category]
  ];

  autoTable(doc, {
    body: clientInfo,
    theme: 'plain',
    startY: 40
  });

  // Financial Summary
  const summaryStartY = (doc as any).lastAutoTable.finalY + 15;
  doc.text('Financial Summary', 14, summaryStartY);

  const summaryData = [
    ['Total Income', `$${data.summary.totalIncome.toLocaleString()}`],
    ['Total Expenses', `$${data.summary.totalExpenses.toLocaleString()}`],
    ['Net Amount', `$${data.summary.netAmount.toLocaleString()}`]
  ];

  autoTable(doc, {
    body: summaryData,
    theme: 'plain',
    startY: summaryStartY + 5
  });

  // Transactions
  const transactionsStartY = (doc as any).lastAutoTable.finalY + 15;
  doc.text('Transaction History', 14, transactionsStartY);

  const transactionData = data.transactions.map(t => [
    t.date,
    t.description,
    t.category,
    t.type === 'income' ? `+$${t.amount.toLocaleString()}` : `-$${t.amount.toLocaleString()}`
  ]);

  autoTable(doc, {
    head: [['Date', 'Description', 'Category', 'Amount']],
    body: transactionData,
    startY: transactionsStartY + 5,
    theme: 'grid'
  });
};

const getTitle = (type: string): string => {
  switch (type) {
    case 'client-report':
      return 'Client Financial Report';
    case 'cash-balance':
      return 'Cash Balance Report';
    case 'burn-rate':
      return 'Monthly Burn Rate Analysis';
    case 'revenue-growth':
      return 'Revenue Growth Report';
    case 'runway':
      return 'Runway Analysis Report';
    case 'insights':
      return 'Financial Insights Report';
    default:
      return 'Financial Report';
  }
};


function generateCashBalanceReport(_doc: jsPDF, _data: any) {
  throw new Error('Function not implemented.');
}

function generateBurnRateReport(_doc: jsPDF, _data: any) {
  throw new Error('Function not implemented.');
}

function generateRevenueReport(_doc: jsPDF, _data: any) {
  throw new Error('Function not implemented.');
}

function generateRunwayReport(_doc: jsPDF, _data: any) {
  throw new Error('Function not implemented.');
}
// ... rest of the existing PDF generation functions remain the same ...