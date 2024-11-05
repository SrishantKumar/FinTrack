import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePDF = (type: string, data: any) => {
  const doc = new jsPDF();
  const title = getTitle(type);
  
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

  switch (type) {
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
      generateInsightsReport(doc, data);
      break;
  }

  doc.save(`${type}-report.pdf`);
};

const getTitle = (type: string): string => {
  switch (type) {
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

const generateInsightsReport = (doc: jsPDF, data: any) => {
  // Cost Optimization Section
  doc.setFontSize(14);
  doc.text('Cost Optimization Insights', 14, 35);
  
  const costData = data.costOptimization.map((insight: any) => [
    insight.title,
    insight.description,
    insight.impact,
    insight.priority.toUpperCase()
  ]);

  autoTable(doc, {
    head: [['Initiative', 'Description', 'Impact', 'Priority']],
    body: costData,
    startY: 40,
    theme: 'grid'
  });

  // Growth Opportunities Section
  const growthStartY = (doc as any).lastAutoTable.finalY + 15;
  doc.text('Growth Opportunities', 14, growthStartY);

  const growthData = data.growth.map((insight: any) => [
    insight.title,
    insight.description,
    insight.impact,
    insight.priority.toUpperCase()
  ]);

  autoTable(doc, {
    head: [['Initiative', 'Description', 'Impact', 'Priority']],
    body: growthData,
    startY: growthStartY + 5,
    theme: 'grid'
  });

  // Benchmarks Section
  const benchmarkStartY = (doc as any).lastAutoTable.finalY + 15;
  doc.text('Industry Benchmarks', 14, benchmarkStartY);

  const benchmarkData = data.benchmarks.map((benchmark: any) => [
    benchmark.metric,
    benchmark.value,
    benchmark.benchmark,
    benchmark.status.toUpperCase()
  ]);

  autoTable(doc, {
    head: [['Metric', 'Current Value', 'Industry Average', 'Status']],
    body: benchmarkData,
    startY: benchmarkStartY + 5,
    theme: 'grid'
  });

  // Summary Section
  const summaryStartY = (doc as any).lastAutoTable.finalY + 15;
  doc.text('Financial Summary', 14, summaryStartY);

  const summaryData = [
    ['Total Income', `$${data.summary.totalIncome.toLocaleString()}`],
    ['Total Expenses', `$${data.summary.totalExpenses.toLocaleString()}`],
    ['Net Position', `$${(data.summary.totalIncome - data.summary.totalExpenses).toLocaleString()}`]
  ];

  autoTable(doc, {
    body: summaryData,
    startY: summaryStartY + 5,
    theme: 'plain'
  });
};

const generateCashBalanceReport = (doc: jsPDF, data: any) => {
  const tableData = data.map((transaction: any) => [
    transaction.date,
    transaction.description,
    `$${transaction.amount.toLocaleString()}`,
    `$${transaction.balance.toLocaleString()}`
  ]);

  autoTable(doc, {
    head: [['Date', 'Description', 'Amount', 'Balance']],
    body: tableData,
    startY: 35
  });
};

const generateBurnRateReport = (doc: jsPDF, data: any) => {
  data.forEach((month: any, index: number) => {
    const startY = 35 + (index * 60);
    
    doc.setFontSize(12);
    doc.text(month.month, 14, startY);
    
    const breakdownData = Object.entries(month.breakdown).map(([category, amount]) => [
      category,
      `$${(amount as number).toLocaleString()}`
    ]);

    autoTable(doc, {
      head: [['Category', 'Amount']],
      body: breakdownData,
      startY: startY + 5
    });
  });
};

const generateRevenueReport = (doc: jsPDF, data: any) => {
  data.forEach((month: any, index: number) => {
    const startY = 35 + (index * 60);
    
    doc.setFontSize(12);
    doc.text(`${month.month} (Growth: +${month.growth}%)`, 14, startY);
    
    const sourceData = Object.entries(month.sources).map(([source, amount]) => [
      source,
      `$${(amount as number).toLocaleString()}`
    ]);

    autoTable(doc, {
      head: [['Revenue Source', 'Amount']],
      body: sourceData,
      startY: startY + 5
    });
  });
};

const generateRunwayReport = (doc: jsPDF, data: any) => {
  // Current Status
  doc.setFontSize(12);
  doc.text('Current Status', 14, 35);
  
  const currentData = [
    ['Cash Balance', `$${data.current.cashBalance.toLocaleString()}`],
    ['Monthly Burn', `$${data.current.monthlyBurn.toLocaleString()}`],
    ['Runway', `${data.current.months} months`]
  ];

  autoTable(doc, {
    body: currentData,
    startY: 40
  });

  // Scenarios
  doc.text('Runway Scenarios', 14, 90);
  
  const scenarioData = data.scenarios.map((scenario: any) => [
    scenario.name,
    `$${scenario.burnRate.toLocaleString()}`,
    `${scenario.runway} months`
  ]);

  autoTable(doc, {
    head: [['Scenario', 'Monthly Burn', 'Runway']],
    body: scenarioData,
    startY: 95
  });
};