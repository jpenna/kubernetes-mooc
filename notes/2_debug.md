# Debugging

```bash
kubectl describe deployment <deployment-name>
kubectl logs -f <deployment-name>
kubectl delete # delete a resource. If it's a "pod", it will be recreated.
kubectl get events
```

## Busybox

Deploy a busybox pod, which is a linux distro that can call from inside the cluster.

Check [pod.yaml](../manifests/debug/pod.yaml) for an example.

```bash
kubectl exec -it my-busybox -- wget -qO - http://todo-app-svc:2350/todo
kubectl exec -it my-busybox -- sh

# Delete the pod
kubectl delete pod/my-busybox
```

> When deploying stand-alone pods, if the pod crashes, the pod is gone. With deployments, Kubernetes recreates the pod.
