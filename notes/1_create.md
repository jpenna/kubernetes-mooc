# Kubernetes

## Cluster

```bash
k3d cluster create -a 2
kubectol cluster-info
k3d cluster stop      # stop cluster
k3d cluster start     # start cluster
k3d cluster delete    # delete cluster

# With ports exposed
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
# Create a directory on the node to use as local storage
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
```

## Deployments

```bash
kubectl create deployment NAME --image=IMAGE
kubectl delete deployment NAME
kubectl edit deployment <deployment-name> # edit deployment after creation
```

Create a YAML file for the deployment. Check [deployment.yaml](../manifests/deployment.yaml) for an example.

```bash
kubectl apply -f <deployment-name>.yaml
kubectl delete -f manifests/deployment.yaml # delete deployment
kubectl apply -f https://.../deployment.yaml # apply deployment from URL
```

## Resources

```bash
kubectl explain <RESOURCE> # get information about a resource
kubectl get <RESOURCE> # list resources
kubectl logs -f <RESOURCE> # see output
```

## Images

Local images:

```bash
k3d image import <image-name>
# Must EDIT the deployment's imagePullPolicy from the default `Always` to `IfNotPresent` or `Never` to allow the local image to be used (check above)
```

Update the image:

```bash
kubectl set image deployment/my-app kubernetes-mooc=kubernetes-mooc:v2
```

## Scaling

```bash
kubectl scale deployment <deployment-name> --replicas=2
```
