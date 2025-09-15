# MyApp Oathkeeper Integration

This document explains how to use the Oathkeeper access rules feature in the myapp Helm chart.

## Configuration

The Oathkeeper rules are configured in `values.yaml` under the `oathkeeper` section:

```yaml
oathkeeper:
  enabled: true  # Enable/disable Oathkeeper rules
  rules:
    api:
      enabled: true
      name: "myapp-api-rule"
      urlPattern: "<https|http>://<.*>/myapp/v1<.*>"
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
      authenticator:
        handler: bearer_token
        config:
          check_session_url: "http://auth-server:3000/sessions/whoami"
      # ... additional configuration
```

## Available Rules

### 1. API Rule (`rules.api`)
- **Purpose**: Protects main API endpoints
- **URL Pattern**: `/myapp/v1/*`
- **Authentication**: Bearer token with session validation
- **Methods**: GET, POST, PUT, PATCH, DELETE

### 2. Health Rule (`rules.health`)
- **Purpose**: Health check endpoint
- **URL Pattern**: `/myapp/health/*` 
- **Authentication**: Anonymous (no auth required)
- **Methods**: GET

## Customization Examples

### Disable Oathkeeper Rules
```yaml
oathkeeper:
  enabled: false
```

### Custom Authentication Server
```yaml
oathkeeper:
  rules:
    api:
      authenticator:
        config:
          check_session_url: "http://custom-auth:8080/validate"
```

### Additional Headers
```yaml
oathkeeper:
  rules:
    api:
      mutator:
        config:
          headers:
            X-User: "{{ print .Subject }}"
            X-Service: "myapp"
            X-Version: "v1"
```

### Custom URL Patterns
```yaml
oathkeeper:
  rules:
    api:
      urlPattern: "<https|http>://<.*>/api/myapp<.*>"
```

## Deployment

Install with default Oathkeeper rules:
```bash
helm install myapp .helm/
```

Install with custom configuration:
```bash
helm install myapp .helm/ --set oathkeeper.rules.api.authenticator.config.check_session_url="http://custom-auth:9000/sessions"
```

Install without Oathkeeper rules:
```bash
helm install myapp .helm/ --set oathkeeper.enabled=false
```

## Generated Resources

When deployed, the chart creates:
- `myapp-api-rule` - Rule for API endpoints
- `myapp-health-rule` - Rule for health checks

Both rules automatically reference the deployed service and use proper Kubernetes labels for management.