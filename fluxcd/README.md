# FluxCD GitOps Setup for Auth POC

This directory contains the FluxCD configuration for deploying:
- ORY Oathkeeper (with maester)
- Auth Server
- MyApp

## Directory Structure

```
fluxcd/
├── sources/
│   ├── ory-helm-repository.yaml      # ORY Helm repository
│   ├── git-repository.yaml           # Git repository source
│   └── ory-sources-kustomization.yaml # Kustomization for sources
├── releases/
│   ├── oathkeeper-maester.yaml       # Oathkeeper-maester Helm release
│   ├── oathkeeper.yaml               # Oathkeeper Helm release
│   ├── auth-apps-kustomization.yaml  # Kustomization for apps
│   └── ory-kustomization.yaml        # Kustomization for ORY releases
└── kustomize/
    ├── auth-server.yaml               # Auth server deployment
    ├── myapp.yaml                     # MyApp deployment
    ├── oathkeeper-rules.yaml          # Oathkeeper access rules (CRDs)
    └── kustomization.yaml             # Kustomization config
```

## Prerequisites

1. FluxCD installed in your cluster
2. Git repository configured with FluxCD
3. Docker images built and available

## Deployment Order

1. **Sources**: Helm repositories and Git sources
2. **ORY Releases**: Oathkeeper and Oathkeeper-maester via Helm
3. **Apps**: Auth server, MyApp, and access rules via Kustomize

## Manual Application (for testing)

```bash
# Apply sources first
kubectl apply -f fluxcd/sources/

# Apply ORY releases
kubectl apply -f fluxcd/releases/

# Apply apps
kubectl apply -k fluxcd/kustomize/
```

## FluxCD Bootstrap

To use with FluxCD, push this repository to Git and configure FluxCD to watch it:

```bash
flux create source git auth-poc \
  --url=https://github.com/yourusername/auth-poc \
  --branch=main

flux create kustomization ory-sources \
  --source=auth-poc \
  --path="./fluxcd/sources" \
  --prune=true

flux create kustomization ory-releases \
  --source=auth-poc \
  --path="./fluxcd/releases" \
  --prune=true \
  --depends-on=ory-sources

flux create kustomization auth-apps \
  --source=auth-poc \
  --path="./fluxcd/kustomize" \
  --prune=true \
  --depends-on=ory-releases
```

## Access

- **Oathkeeper Proxy**: `http://localhost:30455`
- **Oathkeeper API**: `http://localhost:30456`
- **Auth Server**: `http://localhost:30000`
