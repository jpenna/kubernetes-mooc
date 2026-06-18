# Helm

Kubernetes package manager.

## Install

```bash
brew install helm
```

## Usage

```bash
helm install my-release my-chart
```

Create the configuration files for the charts. Check the [manifests/monitoring](../manifests/monitoring) directory for examples.

```bash
helm upgrade --install prom prometheus-community/prometheus \
  --namespace monitoring \
  --create-namespace \
  --values ./manifests/monitoring/prom-values.yaml

helm upgrade --install loki grafana/loki \
  --namespace monitoring \
  --values ./manifests/monitoring/loki-values.yaml

helm upgrade --install k8smon grafana/k8s-monitoring \
  --namespace monitoring \
  --values ./manifests/monitoring/k8smon-values.yaml

helm upgrade --install grafana grafana/grafana \
  --namespace monitoring \
  --values ./manifests/monitoring/grafana-values.yaml
```

Confirm installation:

```bash
helm list --namespace monitoring
kubectl get svc --namespace monitoring
kubectl get pods --namespace monitoring
```

Delete helm resources:

```bash
helm list --namespace monitoring
helm delete [name]
# Custom resource definitions can be left, but they don't do anything on their own.
```

## Grafana

Port forward to Grafana:

```bash
kubectl port-forward --namespace monitoring svc/grafana 3000:80
```
