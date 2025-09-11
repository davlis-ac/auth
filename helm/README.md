# Helm Charts and FluxCD Setup

This directory contains Helm charts for all components and FluxCD HelmRelease configurations.

## Helm Charts Created

### 1. `helm/auth-server/`
- **Purpose**: Express.js authentication server
- **Port**: 3000 (NodePort: 30000)
- **Features**: Health checks, configurable image tags

### 2. `helm/myapp/`
- **Purpose**: Second Express.js application
- **Port**: 4000 (ClusterIP)
- **Features**: Health checks, configurable image tags

### 3. `helm/oathkeeper-stack/`
- **Purpose**: ORY Oathkeeper with maester integration
- **Ports**: 4455 (proxy), 4456 (api)
- **Features**: 
  - Oathkeeper deployment with configurable config
  - Oathkeeper-maester for CRD-based rule management
  - RBAC configuration
  - Service accounts

## FluxCD HelmReleases

### 1. `fluxcd/releases/auth-server-helmrelease.yaml`
- Deploys auth-server using local Helm chart
- Namespace: `default`
- NodePort: 30000

### 2. `fluxcd/releases/myapp-helmrelease.yaml`
- Deploys myapp using local Helm chart  
- Namespace: `default`
- Service type: ClusterIP

### 3. `fluxcd/releases/oathkeeper-stack-helmrelease.yaml`
- Deploys Oathkeeper + maester using local Helm chart
- Namespace: `ory`
- NodePorts: 30455 (proxy), 30456 (api)

## Usage

### Manual Helm Installation
```bash
# Install auth-server
helm install auth-server ./helm/auth-server

# Install myapp
helm install myapp ./helm/myapp

# Install oathkeeper-stack
helm install oathkeeper-stack ./helm/oathkeeper-stack -n ory --create-namespace
```

### FluxCD GitOps Deployment
```bash
# Apply all FluxCD configurations
kubectl apply -f fluxcd/sources/
kubectl apply -f fluxcd/releases/
```

## Key Features

✅ **Helm Templates**: Full Helm chart structure with helpers, values, and templates
✅ **FluxCD Integration**: HelmRelease configurations for GitOps
✅ **Health Checks**: Liveness and readiness probes
✅ **Configurable**: Values.yaml for customization
✅ **RBAC**: Proper service accounts and permissions
✅ **Namespace Management**: Automatic namespace creation
✅ **Dependencies**: Proper dependency ordering

## Access Points

- **Auth Server**: `http://localhost:30000/api/json`
- **Oathkeeper Proxy**: `http://localhost:30455`
- **Oathkeeper API**: `http://localhost:30456`
- **MyApp**: Internal only (via Oathkeeper proxy)
