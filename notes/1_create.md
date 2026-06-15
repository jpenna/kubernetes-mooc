# Kubernetes

* k3d cluster create -a 2
* kubectol cluster-info
* k3d cluster stop / start / delete

Create deployment:
* kubectl create deployment NAME --image=IMAGE

Local images:
* k3d image import <image-name>
> Must EDIT the deployment's imagePullPolicy from the default `Always` to `IfNotPresent` or `Never` to allow the local image to be used (check below)

Edit deployment after creation:
* kubectl edit deployment <deployment-name>

Get information:
* kubectl explain <RESOURCE>

List resources:
* kubectl get <RESOURCE>

See output:
* kubectl logs -f <RESOURCE>
