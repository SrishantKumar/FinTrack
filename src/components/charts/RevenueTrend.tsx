import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../../context/TransactionContext';
import { useCurrency } from '../../context/CurrencyContext';

export function RevenueTrend() {
  const { transactions } = useTransactions();
  const { formatAmount } = useCurrency();

  // Group transactions by month and calculate revenue
  const monthlyRevenue = transactions
    .filter(t => t.type === 'income')
    .reduce((acc: { [key: string]: number }, t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[monthKey] = (acc[monthKey] || 0) + t.amount;
      return acc;
    }, {});

  // Create data array for last 6 months
  const data = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const revenue = monthlyRevenue[monthKey] || 0;
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      revenue
    };
  }).reverse();

  // Calculate growth percentage
  const currentMonth = data[data.length - 1].revenue;
  const previousMonth = data[data.length - 2].revenue || 1; // Avoid division by zero
  const growthPercentage = ((currentMonth - previousMonth) / previousMonth) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last 6 months</p>
        </div>
        <div className="flex items-center gap-2">
          {growthPercentage >= 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
          )}
          <span className={`text-sm font-medium ${
            growthPercentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {growthPercentage.toFixed(1)}%
          </span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tickFormatter={(value) => formatAmount(value)}
            />
            <Tooltip 
              formatter={(value: number) => [formatAmount(value), 'Revenue']}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}