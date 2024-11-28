import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  HomeIcon,
  ServerIcon,
  CloudIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  CogIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'EC2 Resources', href: '/resources/ec2', icon: ServerIcon },
  { name: 'S3 Buckets', href: '/resources/s3', icon: CloudIcon },
  { name: 'IAM', href: '/resources/iam', icon: ShieldCheckIcon },
  { name: 'RDS', href: '/resources/rds', icon: DatabaseIcon },
  { name: 'Lambda', href: '/resources/lambda', icon: CogIcon },
  { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
];

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="mt-5 px-2 space-y-1">
      {navigation.map((item) => {
        const isActive = router.pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              isActive
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon
              className={`mr-3 flex-shrink-0 h-6 w-6 ${
                isActive
                  ? 'text-gray-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              }`}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}