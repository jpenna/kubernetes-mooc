# Google Kubernetes Engine

## Install

```bash
# Login to Google Cloud
gcloud auth login

# Set the project
gcloud config set project k8s-mooc

# Install the plugin to talk to GKE
gcloud components install gke-gcloud-auth-plugin
```

## Create a cluster

```bash
# Enable the container API
gcloud services enable container.googleapis.com

# Create the cluster
gcloud container clusters create mooc-cluster --zone=us-central1-c --cluster-version=1.36 --disk-size=32 --num-nodes=4 --machine-type=e2-small
```

```bash
# Verify it points to the correct cluster
kubectl cluster-info

# If not pointed
gcloud container clusters get-credentials mooc-cluster --zone=us-central1-c
```

```bash
# View external IP of the services
kubectl get svc --watch
```

## Build for GKE

```bash
docker buildx build --platform linux/amd64,linux/arm64 \
  -t jpenna/k8s-mooc-ping:v7 \
  -f Dockerfile.ping . --push
```

## Gateway API

```bash
# Find the cluster name
gcloud container clusters list

# Enable the Gateway API in the cluster
gcloud container clusters update mooc-cluster --location=us-central1-c --gateway-api=standard
```
