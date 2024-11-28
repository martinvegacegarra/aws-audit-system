export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface EC2Instance {
  InstanceId: string;
  InstanceType: string;
  State: {
    Name: string;
    Code: number;
  };
  LaunchTime: string;
  Tags: {
    Key: string;
    Value: string;
  }[];
}

export interface S3Bucket {
  Name: string;
  CreationDate: string;
  Region: string;
}

export interface IAMUser {
  UserName: string;
  UserId: string;
  CreateDate: string;
  Groups: string[];
}

export interface RDSInstance {
  DBInstanceIdentifier: string;
  Engine: string;
  DBInstanceStatus: string;
  Endpoint: {
    Address: string;
    Port: number;
  };
}

export interface LambdaFunction {
  FunctionName: string;
  Runtime: string;
  Role: string;
  Handler: string;
}

export interface ResourceCounts {
  ec2: number;
  s3: number;
  iam: number;
  rds: number;
  lambda: number;
}

export interface Activity {
  id: string;
  type: 'create' | 'update' | 'delete';
  resource: string;
  action: string;
  timestamp: string;
  user: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

export interface Filter {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith';
  value: string;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
}