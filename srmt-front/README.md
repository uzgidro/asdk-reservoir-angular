# srmt-front-gitops

GitOps репозиторий для srmt-front.

## Структура

```
├── base/                    # Базовые манифесты
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
├── overlays/
│   ├── dev/                 # Dev окружение
│   │   └── kustomization.yaml
│   └── prod/                # Prod окружение
│       └── kustomization.yaml
└── apps/                    # ArgoCD Applications
    ├── srmt-front-dev.yaml
    └── srmt-front-prod.yaml
```

## Деплой ArgoCD Applications

```bash
kubectl apply -f apps/
```

## Доступ к сервису

```
# Из namespace dev/prod
http://srmt-front/

# Из другого namespace
http://srmt-front.dev/
http://srmt-front.prod/
```
