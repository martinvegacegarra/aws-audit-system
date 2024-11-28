import { useState } from 'react';
import axios from 'axios';
import config from '@/config/config';

const services = [
  { id: 'ec2', name: 'EC2' },
  { id: 's3', name: 'S3' },
  { id: 'iam', name: 'IAM' },
  { id: 'rds', name: 'RDS' },
  { id: 'lambda', name: 'Lambda' },
];

const formats = [
  { id: 'json', name: 'JSON' },
  { id: 'csv', name: 'CSV' },
  { id: 'excel', name: 'Excel' },
];

export default function ReportsPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleGenerateReport = async () => {
    if (selectedServices.length === 0) {
      setError('Please select at least one service');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem(config.auth.tokenKey);
      const response = await axios.get(
        `${config.api.baseUrl}/api/reports/generate`,
        {
          params: {
            services: selectedServices.join(','),
            format: selectedFormat,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: selectedFormat === 'json' ? 'json' : 'blob',
        }
      );

      if (selectedFormat === 'json') {
        // Display JSON in a new window
        const jsonString = JSON.stringify(response.data, null, 2);
        const win = window.open('', '_blank');
        win?.document.write(`<pre>${jsonString}</pre>`);
      } else {
        // Download file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `aws-report.${selectedFormat === 'excel' ? 'xlsx' : selectedFormat}`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      setError('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Generate Report</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Select Services
                </h3>
                <div className="mt-4 space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center">
                      <input
                        id={service.id}
                        name={service.id}
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={service.id}
                        className="ml-3 text-sm text-gray-700"
                      >
                        {service.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Select Format
                </h3>
                <div className="mt-4 space-y-4">
                  {formats.map((format) => (
                    <div key={format.id} className="flex items-center">
                      <input
                        id={format.id}
                        name="format"
                        type="radio"
                        checked={selectedFormat === format.id}
                        onChange={() => setSelectedFormat(format.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor={format.id}
                        className="ml-3 text-sm text-gray-700"
                      >
                        {format.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={handleGenerateReport}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Report'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}