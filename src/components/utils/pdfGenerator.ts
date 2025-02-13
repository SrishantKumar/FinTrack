import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Client, Transaction } from '../clients/ClientList';

export const generatePDF = (clients: readonly Client[], transactions: readonly Transaction[]) => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text('Client Report', 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

  // Generate client table
  const clientData = clients.map(client => [
    client.name,
    client.company,
    client.email,
    client.category,
    client.status
  ]);

  autoTable(doc, {
    head: [['Name', 'Company', 'Email', 'Category', 'Status']],
    body: clientData,
    startY: 35,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  // Generate transaction summary
  const clientTransactionSummary = clients.map(client => {
    const clientTransactions = transactions.filter(t => 
      t.description.toLowerCase().includes(client.name.toLowerCase()) ||
      t.description.toLowerCase().includes(client.company.toLowerCase())
    );

    const totalIncome = clientTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = clientTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return [
      client.name,
      totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      totalExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      (totalIncome - totalExpense).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    ];
  });

  const finalY = (doc as any).lastAutoTable.finalY || 35;

  doc.setFontSize(14);
  doc.text('Transaction Summary', 14, finalY + 15);

  autoTable(doc, {
    head: [['Client', 'Total Income', 'Total Expense', 'Net Amount']],
    body: clientTransactionSummary,
    startY: finalY + 20,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  doc.save('client-report.pdf');
};