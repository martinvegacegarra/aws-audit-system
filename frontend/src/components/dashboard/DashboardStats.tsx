import {
  ServerIcon,
  CloudIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import useApi from '@/hooks/useApi';

interface ResourceCounts {
  ec2: number;
  s3: number;
  iam: number;
  rds: number;
  lambda: number;
}

export default function DashboardStats() {
  const { data, isLoading, isError } = useApi<ResourceCounts>('/resources/counts');

  const stats = [
    { name: 'EC2 Instances', value: data?.ec2 || 0, icon: ServerIcon },
    { name: 'S3 Buckets', value: data?.s3 || 0, icon: CloudIcon },
    { name: 'IAM Users & Roles', value: data?.iam || 0, icon: ShieldCheckIcon },
    { name: 'RDS Databases', value: data?.rds || 0, icon: DatabaseIcon },
    { name: 'Lambda Functions', value: data?.lambda || 0, icon: CogIcon },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg animate-pulse"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="text-sm text-red-700">
          Error loading resource counts. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-10 w-10 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}