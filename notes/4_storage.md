# Storage

## emptyDir volumes

- Filesystem inside a pod
- Lifeclycle tied to the pod's
- Reserved from the node (moving pod to another node destroyes the volume)

### Use cases

- Cache (persists between container restarts)
- Sahre files between two containers in a pod


## Resources

### Videos
[Kubernetes and Networks: Why is This So Dang Hard?(opens in a new tab)](https://www.youtube.com/watch?v=GgCA2USI5iQ)

### Articles
[Why is storage on Kubernetes is so hard?](https://softwareengineeringdaily.com/2019/01/11/why-is-storage-on-kubernetes-is-so-hard/)
