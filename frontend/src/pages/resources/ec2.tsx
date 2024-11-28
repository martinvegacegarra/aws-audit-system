import { useState } from 'react';
import ResourceTable from '@/components/resources/ResourceTable';
import ResourceFilter from '@/components/resources/ResourceFilter';
import useApi from '@/hooks/useApi';

const columns = [
  { key: 'InstanceId', label: 'Instance ID', sortable: true },
  { key: 'InstanceType', label: 'Type', sortable: true },
  {
    key: 'State',
    label: 'State',
    sortable: true,
    render: (state: { Name: string }) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          state.Name === 'running'
            ? 'bg-green-100 text-green-800'
            : state.Name === 'stopped'
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {state.Name}
      </span>
    ),
  },
  { key: 'LaunchTime', label: 'Launch Time', sortable: true },
  {
    key: 'Tags',
    label: 'Name',
    sortable: true,
    render: (tags: { Key: string; Value: string }[]) =>
      tags?.find((tag) => tag.Key === 'Name')?.Value || '-',
  },
];

const fields = [
  { key: 'InstanceId', label: 'Instance ID' },
  { key: 'InstanceType', label: 'Instance Type' },
  { key: 'State.Name', label: 'State' },
  { key: 'Tags.Name', label: 'Name' },
];

export default function EC2Page() {
  const [filters, setFilters] = useState([]);
  const { data, isLoading, isError } = useApi('/resources/ec2/instances');

  const handleFilterChange = (newFilters: any[]) => {
    setFilters(newFilters);
  };

  const filteredData = data?.filter((item: any) => {
    if (filters.length === 0) return true;
    return filters.some((filter: any) => {
      const value = filter.field.split('.').reduce((obj: any, key: string) => obj?.[key], item);
      if (!value) return false;
      
      switch (filter.operator) {
        case 'contains':
          return value.toLowerCase().includes(filter.value.toLowerCase());
        case 'equals':
          return value.toLowerCase() === filter.value.toLowerCase();
        case 'startsWith':
          return value.toLowerCase().startsWith(filter.value.toLowerCase());
        case 'endsWith':
          return value.toLowerCase().endsWith(filter.value.toLowerCase());
        default:
          return false;
      }
    });
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">EC2 Instances</h1>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <ResourceFilter onFilterChange={handleFilterChange} fields={fields} />
          
          <div className="mt-4">
            <ResourceTable
              columns={columns}
              data={filteredData || []}
              loading={isLoading}
              error={isError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}