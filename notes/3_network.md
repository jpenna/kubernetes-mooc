# Network

```bash
kubectl get pods # get the pod

# Forward a port from the pod to the host (debugging purposes)
kubectl port-forward POD HOST_PORT:CONTAINER_PORT 
```

## Services

Services do the bridge between requesters and the pods (external and internal).

1. Create a service manifest. Check example in [service.yaml](../manifests/service.yaml)
2. Apply the service manifest.

```yaml
  ports:
    - name: http
      nodePort: 30080 # This is the port that is available outside. Value for nodePort can be between 30000-32767
      protocol: TCP
      port: 1234 # This is a port that is available to the cluster, in this case it can be ~ anything
      targetPort: 3000 # This is the target port
```

Access:

1. From within the cluster: `hashresponse-svc:1234`
2. From your local machine: `localhost:8082`
   * k3d maps host port 8082 → NodePort 30080

## Networks

## Gateway API
