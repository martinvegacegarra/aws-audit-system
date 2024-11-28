# AWS Audit System

Un sistema web completo para auditar y reportar recursos de AWS. Este sistema proporciona una interfaz moderna y fácil de usar para gestionar y monitorear todos los recursos de AWS en una cuenta.

## Características

### Funcionalidades Principales
- Autenticación segura usando AWS IAM roles/users
- Escaneo completo de recursos AWS
- Dashboard interactivo con visualizaciones
- Sistema de filtros dinámicos
- Exportación de reportes en múltiples formatos
- Sistema de búsqueda global
- Agrupación por regiones y servicios

### Recursos Monitoreados
- EC2 (instancias, AMIs, volúmenes, snapshots)
- Redes (VPCs, subredes, security groups, ACLs)
- IAM (usuarios, roles, políticas)
- S3 (buckets, políticas)
- RDS (bases de datos, snapshots)
- Lambda functions
- CloudWatch (logs, alarmas)
- Route53 (dominios, registros)

### Características Técnicas
- Frontend moderno con React/Next.js y TypeScript
- Backend robusto en Node.js con AWS SDK v3
- Diseño responsivo con Tailwind CSS
- Sistema de caché para optimizar rendimiento
- Manejo asíncrono de consultas pesadas
- Sistema de logs detallado
- Documentación completa de la API

## Estructura del Proyecto

```
aws-audit-system/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuraciones y variables de entorno
│   │   ├── controllers/    # Controladores de rutas
│   │   ├── middleware/     # Middleware (auth, validación, errores)
│   │   ├── models/         # Modelos de datos
│   │   ├── routes/         # Definición de rutas API
│   │   ├── services/       # Lógica de negocio y AWS SDK
│   │   └── utils/          # Utilidades (logger, cache, etc.)
│   ├── tests/              # Tests unitarios y de integración
│   ├── .env.example        # Ejemplo de variables de entorno
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React reutilizables
│   │   │   ├── auth/      # Componentes de autenticación
│   │   │   ├── dashboard/ # Componentes del dashboard
│   │   │   ├── layout/    # Componentes de estructura
│   │   │   └── resources/ # Componentes de recursos
│   │   ├── hooks/         # Custom hooks (auth, api, etc.)
│   │   ├── pages/         # Páginas de Next.js
│   │   ├── styles/        # Estilos globales y Tailwind
│   │   ├── types/         # Definiciones TypeScript
│   │   └── utils/         # Utilidades (fecha, formato, etc.)
│   ├── public/            # Archivos estáticos
│   ├── .env.example       # Ejemplo de variables de entorno
│   └── package.json
├── docs/                  # Documentación
│   ├── api.md            # Documentación de la API
│   └── setup.md          # Guía de configuración
└── README.md
```

## Requisitos

### Sistema
- Node.js 16+
- npm o yarn
- Git

### AWS
- Cuenta AWS con acceso programático
- Credenciales con permisos para:
  - EC2: DescribeInstances, DescribeImages, etc.
  - IAM: ListUsers, ListRoles, etc.
  - S3: ListBuckets, GetBucketPolicy, etc.
  - RDS: DescribeDBInstances, etc.
  - Lambda: ListFunctions, etc.
  - CloudWatch: GetMetricData, etc.

## Instalación

1. Clonar el repositorio:
```bash
git clone [url-repositorio]
cd aws-audit-system
```

2. Configurar el backend:
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales
```

3. Configurar el frontend:
```bash
cd ../frontend
npm install
cp .env.example .env.local
# Editar .env.local con la configuración
```

## Configuración

### Variables de Entorno Backend
```env
# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Cache
CACHE_TTL=3600

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Variables de Entorno Frontend
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Auth
NEXT_PUBLIC_JWT_STORAGE_KEY=aws_audit_token

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

## Desarrollo

1. Iniciar el backend en modo desarrollo:
```bash
cd backend
npm run dev
```

2. Iniciar el frontend en modo desarrollo:
```bash
cd frontend
npm run dev
```

3. Acceder a la aplicación:
- Frontend: http://localhost:3000
- API: http://localhost:3000/api

## Scripts Disponibles

### Backend
- `npm run dev`: Iniciar en modo desarrollo
- `npm start`: Iniciar en modo producción
- `npm test`: Ejecutar tests
- `npm run lint`: Verificar estilo de código

### Frontend
- `npm run dev`: Iniciar en modo desarrollo
- `npm run build`: Construir para producción
- `npm start`: Iniciar en modo producción
- `npm run lint`: Verificar estilo de código

## Seguridad

### Autenticación y Autorización
- Autenticación basada en JWT
- Validación de credenciales AWS
- Control de acceso basado en roles
- Sesiones configurables

### Protección de Datos
- Encriptación de datos sensibles
- Sanitización de inputs
- Validación de parámetros
- Headers de seguridad HTTP

### Monitoreo
- Registro detallado de acciones
- Alertas de seguridad
- Rate limiting
- Protección contra ataques comunes

## API Documentation

La documentación detallada de la API está disponible en `/docs/api.md`, incluyendo:
- Endpoints disponibles
- Parámetros requeridos
- Ejemplos de respuestas
- Códigos de error
- Autenticación y autorización

## Contribuir

1. Fork el repositorio
2. Crear una rama para tu feature:
```bash
git checkout -b feature/amazing-feature
```
3. Commit tus cambios:
```bash
git commit -m 'Add amazing feature'
```
4. Push a la rama:
```bash
git push origin feature/amazing-feature
```
5. Abrir un Pull Request

### Guías de Contribución
- Seguir el estilo de código existente
- Añadir tests para nuevas funcionalidades
- Actualizar la documentación
- Seguir el flujo de git convencional

## Soporte

Si encuentras un bug o tienes una sugerencia:
1. Revisa los issues existentes
2. Abre un nuevo issue con:
   - Descripción detallada
   - Pasos para reproducir (si es un bug)
   - Logs relevantes
   - Capturas de pantalla (si aplica)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Autores

- Nombre del Autor - [email@example.com](mailto:email@example.com)

## Agradecimientos

- AWS SDK Team
- React/Next.js Community
- Tailwind CSS Team