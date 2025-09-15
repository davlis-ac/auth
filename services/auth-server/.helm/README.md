# Auth Server Helm Chart

This directory contains the Helm chart for the auth-server service.

## Structure

```
.helm/
├── Chart.yaml          # Chart metadata
├── values.yaml         # Default configuration values
└── templates/          # Kubernetes resource templates
    ├── _helpers.tpl    # Template helpers
    ├── deployment.yaml # Deployment configuration
    └── service.yaml    # Service configuration
```

## Usage

### Install locally
```bash
cd /path/to/auth-server
helm install auth-server .helm/
```

### Install with custom values
```bash
helm install auth-server .helm/ --set image.tag=v2
```

### Upgrade
```bash
helm upgrade auth-server .helm/
```

### Uninstall
```bash
helm uninstall auth-server
```

## Configuration

Key configuration values in `values.yaml`:

- **image.repository**: `auth-server` - Docker image name
- **image.tag**: `v1` - Docker image tag
- **service.type**: `NodePort` - Service type
- **service.port**: `3000` - Application port
- **service.nodePort**: `30000` - External NodePort
- **healthCheck.path**: `/health` - Health check endpoint

## Service Details

- **Port**: 3000
- **Type**: Authentication server
- **Main Endpoint**: `/sessions/whoami`
- **External Access**: `http://localhost:30000`

## Development

Build and test the Docker image:
```bash
docker build -t auth-server:v1 .
docker run -p 3000:3000 auth-server:v1
```