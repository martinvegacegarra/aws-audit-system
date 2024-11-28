# API Documentation

## Autenticación

### POST /api/auth/login
Autenticar usuario con credenciales AWS.

**Request:**
```json
{
  "accessKeyId": "string",
  "secretAccessKey": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "expiresIn": 86400
}
```

### GET /api/auth/validate
Validar token JWT.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
{
  "valid": true
}
```

## Recursos EC2

### GET /api/resources/ec2
Obtener inventario completo de recursos EC2.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
{
  "instances": [],
  "images": [],
  "volumes": [],
  "snapshots": [],
  "vpcs": [],
  "subnets": [],
  "securityGroups": [],
  "networkAcls": []
}
```

### GET /api/resources/ec2/instances
Obtener lista de instancias EC2.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
[
  {
    "InstanceId": "string",
    "InstanceType": "string",
    "State": {
      "Name": "string",
      "Code": number
    },
    "Tags": []
  }
]
```

### GET /api/resources/ec2/images
Obtener lista de AMIs.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
[
  {
    "ImageId": "string",
    "Name": "string",
    "State": "string",
    "Tags": []
  }
]
```

## Recursos S3

### GET /api/resources/s3/buckets
Obtener lista de buckets S3.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
[
  {
    "Name": "string",
    "CreationDate": "string",
    "Region": "string"
  }
]
```

## Recursos IAM

### GET /api/resources/iam/users
Obtener lista de usuarios IAM.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
[
  {
    "UserName": "string",
    "UserId": "string",
    "CreateDate": "string",
    "Groups": []
  }
]
```

### GET /api/resources/iam/roles
Obtener lista de roles IAM.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
[
  {
    "RoleName": "string",
    "RoleId": "string",
    "Arn": "string",
    "CreateDate": "string"
  }
]
```

## Recursos RDS

### GET /api/resources/rds/instances
Obtener lista de instancias RDS.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
[
  {
    "DBInstanceIdentifier": "string",
    "Engine": "string",
    "DBInstanceStatus": "string",
    "Endpoint": {}
  }
]
```

## Recursos Lambda

### GET /api/resources/lambda/functions
Obtener lista de funciones Lambda.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
[
  {
    "FunctionName": "string",
    "Runtime": "string",
    "Role": "string",
    "Handler": "string"
  }
]
```

## Reportes

### GET /api/reports/generate
Generar reporte personalizado.

**Headers:**
- Authorization: Bearer {token}

**Query Parameters:**
- services: string[] (comma-separated list of AWS services)
- format: "csv" | "pdf" | "excel"
- region: string (AWS region)

**Response:**
- File download

## Errores

La API utiliza los siguientes códigos de estado HTTP:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Formato de error:
```json
{
  "error": "string",
  "details": "string"
}
```