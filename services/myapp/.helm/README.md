# MyApp Helm Chart

This directory contains the Helm chart for the myapp service.

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
cd /path/to/myapp
helm install myapp .helm/
```

### Install with custom values
```bash
helm install myapp .helm/ --set image.tag=v2
```

### Upgrade
```bash
helm upgrade myapp .helm/
```

### Uninstall
```bash
helm uninstall myapp
```

## Configuration

Key configuration values in `values.yaml`:

- **image.repository**: `myapp` - Docker image name
- **image.tag**: `v1` - Docker image tag
- **service.type**: `ClusterIP` - Service type (internal)
- **service.port**: `4000` - Application port
- **healthCheck.path**: `/myapp/v1/api` - Health check endpoint
- **oathkeeper.enabled**: `true` - Enable Oathkeeper access rules
- **oathkeeper.rules.api**: Configuration for API endpoint protection
- **oathkeeper.rules.health**: Configuration for health check access

## Service Details

- **Port**: 4000
- **Type**: Simple API application
- **Main Endpoint**: `/myapp/v1/api`
- **Access**: Internal only (via proxy)

## Development

Build and test the Docker image:
```bash
docker build -t myapp:v1 .
docker run -p 4000:4000 myapp:v1
```

Test the API:
```bash
curl http://localhost:4000/myapp/v1/api
```

## Oathkeeper Integration

The chart includes built-in Oathkeeper access rules. See [OATHKEEPER.md](OATHKEEPER.md) for detailed configuration options.

Quick examples:
```bash
# Deploy with Oathkeeper rules (default)
helm install myapp .helm/

# Deploy without Oathkeeper rules
helm install myapp .helm/ --set oathkeeper.enabled=false

# Custom session validation URL
helm install myapp .helm/ --set oathkeeper.rules.api.authenticator.config.check_session_url="http://custom-auth:8080/validate"
```