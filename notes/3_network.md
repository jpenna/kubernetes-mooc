# Network

```bash
kubectl get pods # get the pod

# Forward a port from the pod to the host (debugging purposes)
kubectl port-forward POD HOST_PORT:CONTAINER_PORT
```

Containers in the same pod can communicate using `localhost`. For containers to talk between them, we need to use Services.

## Services

Services work like a DNS that maps pods to HTTP/HTTPS addresses, so the access to pods is stable.

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
   - k3d maps host port 8082 → NodePort 30080

### ClusterIP

ClusterIP creates a stable IP address to a pod mapping a port in the cluster to a port in the pod. Other pods in the cluster can then access the pod via this IP address.

Without the ClusterIP, we can use the pod's IP address, but this is ephemeral.

```bash
kubectl get pods POD_NAME # Get the pod's IP_ADDRESS
kubectl exec -it my-busybox -- wget -qO - http://IP_ADDRESS:3000/todo # Have to include the port
```

## Ingress

Ingress is a resource type that allows to define rules for routing traffic to services.

## Gateway API
