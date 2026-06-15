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
```

### Claims

Persistent volume claims are a way to claim a persistent volume. Only the pods that are using the claim can access the volume.


## Resources

### Videos
[Kubernetes and Networks: Why is This So Dang Hard?(opens in a new tab)](https://www.youtube.com/watch?v=GgCA2USI5iQ)

### Articles
[Why is storage on Kubernetes is so hard?](https://softwareengineeringdaily.com/2019/01/11/why-is-storage-on-kubernetes-is-so-hard/)
