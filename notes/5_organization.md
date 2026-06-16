# Organization

## Namespaces

Namespaces are used to separate resource sin the same cluster.

```bash
# Create a new namespace
kubectl create namespace <namespace-name>

# View all namespaces
kubectl get pods --all-namespaces

# View the kube-system namespace
kubectl get pods -n kube-system

# Configure default namespace (this isn't the recommended appoach)
kubectl config set-context --current --namespace=<name>
```

Use the namespace:

```yaml
# ...
metadata:
  namespace: example-namespace
  name: example
# ...
```

## Labels

Labels can be used to group resources. Almost anything can be labeled. They can be used in Selectors.

```yaml
# ...
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hashgenerator
  template:
    metadata:
      labels:
        app: hashgenerator
# ...
```

```bash
# Add a label to a pod
kubectl label po hashgenerator-dep-7b9b88f8bf-lvcv4 importance=great

# Filter by label
kubectl get pod -l importance=great
```

## Selectors

Selectors are used to select resources based on their labels.

```yaml
# Select a node to deploy based on the node's labels
    ...
    spec:
      containers:
        - name: hashgenerator
          image: jakousa/dwk-app1:b7fc18de2376da80ff0cfc72cf581a9f94d10e64
      nodeSelector:
        networkquality: excellent # Only nodes with the label networkquality=excellent will be selected
```

```bash
# This node will now be selected
kubectl label nodes k3d-k3s-default-agent-1 networkquality=excellent
```
