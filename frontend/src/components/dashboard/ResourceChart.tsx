import { useEffect, useRef } from 'react';
import useApi from '@/hooks/useApi';

interface ResourceData {
  name: string;
  count: number;
}

export default function ResourceChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useApi<ResourceData[]>('/resources/chart');

  useEffect(() => {
    if (!data || !chartRef.current) return;

    // Here you would typically use a charting library like Chart.js or D3.js
    // For now, we'll just show a placeholder
  }, [data]);

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="text-sm text-red-700">
          Error loading resource chart. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Resource Distribution
      </h3>
      <div ref={chartRef} className="h-64">
        <div className="flex items-center justify-center h-full text-gray-500">
          Chart placeholder - Implement with your preferred charting library
        </div>
      </div>
    </div>
  );
}