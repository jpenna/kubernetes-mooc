# Storage

## emptyDir volumes

- Filesystem inside a pod
- Lifeclycle tied to the pod's
- Reserved from the node (moving pod to another node destroyes the volume)

### Use cases

- Cache (persists between container restarts)
- Sahre files between two containers in a pod

## Persistent Volumes

- Persistent volumes are a way to store data outside of a pod's lifecycle
- They are created and managed by the cluster administrator
- They are a resource in the cluster

```bash
# Create a directory on the node to use as local storage
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
# Give ownership to the bun user (uid/gid 1000)
docker exec k3d-k3s-default-agent-0 chown -R 1000:1000 /tmp/kube
```

### Claims

Persistent volume claims are a way to claim a persistent volume. Only the pods that are using the claim can access the volume.

## Resources

### Videos

[Kubernetes and Networks: Why is This So Dang Hard?(opens in a new tab)](https://www.youtube.com/watch?v=GgCA2USI5iQ)

### Articles

[Why is storage on Kubernetes is so hard?](https://softwareengineeringdaily.com/2019/01/11/why-is-storage-on-kubernetes-is-so-hard/)

### StatefulSets

StatefulSets are like Deployments, but with data that is stable between the pods (e.g. scaling 0 - 1 - 2 reuses the same volumes 0 - 1 - 2). The data is also attached to the pod and not shared between replicas.

Requires headless service for stable network identity: `ClusterIP: None`. The access must be done directly to the pods.

It accepts a `volumeClaimTemplates`. This template is used to the create the PV and PVC for each replica:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis-stset
spec:
  serviceName: redis-svc
  replicas: 2
  selector:
    matchLabels:
      app: redisapp
  template: ...
  volumeClaimTemplates:
    - metadata:
        name: redis-data-storage
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: local-path
        resources:
          requests:
            storage: 100Mi
```

By using `storageClassName: local-path`, k3s can dynamically provide the storage.

Each replica has it's own domain name: `redis-stset-0.redis-svc` | `redis-stset-1.redis-svc` | ...
