import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ServerIcon,
  CloudIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

interface ResourceCounts {
  ec2: number;
  s3: number;
  iam: number;
  rds: number;
  lambda: number;
}

export default function ResourcesSummary() {
  const [counts, setCounts] = useState<ResourceCounts>({
    ec2: 0,
    s3: 0,
    iam: 0,
    rds: 0,
    lambda: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResourceCounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/resources/summary', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCounts(response.data);
      } catch (err) {
        setError('Failed to load resource counts');
      } finally {
        setLoading(false);
      }
    };

    fetchResourceCounts();
  }, []);

  const stats = [
    { name: 'EC2 Instances', value: counts.ec2, icon: ServerIcon },
    { name: 'S3 Buckets', value: counts.s3, icon: CloudIcon },
    { name: 'IAM Users & Roles', value: counts.iam, icon: ShieldCheckIcon },
    { name: 'RDS Databases', value: counts.rds, icon: DatabaseIcon },
    { name: 'Lambda Functions', value: counts.lambda, icon: CogIcon },
  ];

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white overflow-hidden shadow rounded-lg h-32"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gray-200 rounded-md"></div>
                  <div className="ml-5 w-full">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="mt-2 h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        Resources Overview
      </h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon
                    className="h-14 w-14 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      {item.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}