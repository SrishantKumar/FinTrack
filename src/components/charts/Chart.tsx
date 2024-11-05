
interface ChartProps {
  data: number[];
  labels: string[];
  className?: string;
}

export function Chart({ data, labels, className = '' }: ChartProps) {
  const max = Math.max(...data);
  
  return (
    <div className={`h-64 flex items-end gap-2 ${className}`}>
      {data.map((value, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div 
            className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors"
            style={{ height: `${(value / max) * 100}%` }}
          />
          <span className="text-xs text-gray-500 mt-2">{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}