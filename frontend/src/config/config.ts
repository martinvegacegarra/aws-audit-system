const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 30000,
  },
  auth: {
    tokenKey: process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'aws_audit_token',
  },
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  },
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes in milliseconds
  },
};

export default config;