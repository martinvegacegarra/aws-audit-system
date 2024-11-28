import { useState } from 'react';
import { SearchIcon, FilterIcon } from '@heroicons/react/24/outline';

interface Filter {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith';
  value: string;
}

interface ResourceFilterProps {
  onFilterChange: (filters: Filter[]) => void;
  fields: { key: string; label: string }[];
}

export default function ResourceFilter({
  onFilterChange,
  fields,
}: ResourceFilterProps) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      const searchFilters = fields.map((field) => ({
        field: field.key,
        operator: 'contains' as const,
        value,
      }));
      onFilterChange(searchFilters);
    } else {
      onFilterChange([]);
    }
  };

  const handleAddFilter = (filter: Filter) => {
    const newFilters = [...filters, filter];
    setFilters(newFilters);
    onFilterChange(newFilters);
    setShowFilterModal(false);
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowFilterModal(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FilterIcon className="h-5 w-5 mr-2 text-gray-400" />
          Add Filter
        </button>
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <div
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              <span>
                {fields.find((f) => f.key === filter.field)?.label} {filter.operator}{' '}
                {filter.value}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveFilter(index)}
                className="ml-2 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
              >
                <span className="sr-only">Remove filter</span>
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {showFilterModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowFilterModal(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add Filter
                </h3>
                <div className="mt-5">
                  {/* Add filter form would go here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}