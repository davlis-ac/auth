# Services

This directory contains the individual service packages for the authentication system.

## Structure

```
services/
├── auth-server/           # Authentication server service
│   ├── .helm/             # Individual Helm chart
│   │   ├── Chart.yaml     # Helm chart metadata
│   │   ├── values.yaml    # Default values
│   │   ├── templates/     # Kubernetes templates
│   │   └── README.md      # Helm chart documentation
│   ├── package.json       # Auth server dependencies
│   ├── server.js          # Auth server application
│   └── Dockerfile         # Auth server container image
├── myapp/                 # Sample application service
│   ├── .helm/             # Individual Helm chart
│   │   ├── Chart.yaml     # Helm chart metadata
│   │   ├── values.yaml    # Default values
│   │   ├── templates/     # Kubernetes templates
│   │   └── README.md      # Helm chart documentation
│   ├── package.json       # MyApp dependencies
│   ├── myapp.js           # MyApp application
│   └── Dockerfile         # MyApp container image
└── oathkeeper-myapp-rules.yaml  # Oathkeeper access rules
```

## Services

### auth-server
- **Port**: 3000
- **Description**: Authentication server with session management endpoints
- **Main endpoints**:
  - `/sessions/whoami` - Session validation endpoint

### myapp
- **Port**: 4000
- **Description**: Simple Express application with API endpoints
- **Main endpoints**:
  - `/myapp/v1/api` - Sample API endpoint

## Building and Running

### Individual Services

Build and run auth-server:
```bash
cd auth-server
npm install
npm start
```

Build and run myapp:
```bash
cd myapp
npm install
npm start
```

### Using Docker

Build auth-server image:
```bash
cd auth-server
docker build -t auth-server:v1 .
docker run -p 3000:3000 auth-server:v1
```

Build myapp image:
```bash
cd myapp
docker build -t myapp:v1 .
docker run -p 4000:4000 myapp:v1
```

### Using Helm

Each service has its own Helm chart in the `.helm/` directory:

Install auth-server via Helm:
```bash
cd auth-server
helm install auth-server .helm/
```

Install myapp via Helm:
```bash
cd myapp  
helm install myapp .helm/
```

Uninstall services:
```bash
helm uninstall auth-server
helm uninstall myapp
```

## Dependencies

Both services use:
- Node.js 22
- Express.js ^4.18.2