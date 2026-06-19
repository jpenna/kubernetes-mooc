# Database: DBaaS vs. Self-managed Postgres

When the app needs Postgres on GKE there are two widely-used options:

1. **DBaaS** — a managed database such as [Google Cloud SQL for PostgreSQL](https://cloud.google.com/sql/docs/postgres).
2. **Self-managed** — our own Postgres image as a `StatefulSet`, using a `PersistentVolumeClaim` so GKE provisions a `PersistentVolume` (backed by a Persistent Disk) for us.

Both are common in production. The trade-off is essentially **money for convenience**: Cloud SQL costs more but removes operational burden; self-managed is cheap but you own the operations.

## Pros / Cons

### Initialization (work to get started)

- **Cloud SQL**: provision an instance via console / [`gcloud sql instances create`](https://cloud.google.com/sql/docs/postgres/create-instance) / Terraform. No StatefulSet or volume wiring. Connect through the [Cloud SQL Auth Proxy](https://cloud.google.com/sql/docs/postgres/connect-auth-proxy) sidecar or [Private IP](https://cloud.google.com/sql/docs/postgres/private-ip).
- **Self-managed**: write a [`StatefulSet`](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) + [`PersistentVolumeClaim`](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) (+ `Service`, `Secret`, `ConfigMap`). GKE auto-provisions the `PersistentVolume` from a [`StorageClass`](https://kubernetes.io/docs/concepts/storage/storage-classes/). More YAML, more to get right — but it's exactly what this course teaches.

### Cost

- **Self-managed**: pay only for the [GCE Persistent Disk](https://cloud.google.com/compute/disks-image-pricing) backing the PV (a few cents/GB-month) plus the CPU/RAM the Postgres pod uses from the node pool you already pay for. Near-free on top of an existing cluster.
- **Cloud SQL**: pay for a dedicated instance (vCPU + RAM billed continuously, even at idle), storage, and extras like HA (~2×) and backup retention. See [Cloud SQL pricing](https://cloud.google.com/sql/pricing). The expensive option for a learning project.

### Maintenance & operations

- **Cloud SQL** wins decisively. Google handles OS/Postgres patching, [minor-version upgrades](https://cloud.google.com/sql/docs/postgres/maintenance), failover, and monitoring.
- **Self-managed**: you own patching the image, version upgrades (tricky with on-disk data-format changes), tuning, monitoring, and recovery. A pod reschedule is fine — the PVC re-attaches — but node/zone failures and disk corruption are on you.

### High availability

- **Cloud SQL**: flip a flag for [regional HA](https://cloud.google.com/sql/docs/postgres/high-availability) with automatic failover to a standby.
- **Self-managed**: a single Postgres pod is a single point of failure. The PVC/PV survives pod restarts, but true HA means running replication yourself — e.g. an operator like [CloudNativePG](https://cloudnative-pg.io/) or [Patroni](https://github.com/patroni/patroni) — which adds real complexity.

### Backups

- **Cloud SQL**: built-in [automated backups](https://cloud.google.com/sql/docs/postgres/backup-recovery/backups) plus [point-in-time recovery](https://cloud.google.com/sql/docs/postgres/backup-recovery/pitr) via WAL archiving. Toggle on, set retention, restore from console/CLI. Lives off-cluster and survives cluster deletion.
- **Self-managed**: you build it — a [`pg_dump`](https://www.postgresql.org/docs/current/app-pgdump.html) `CronJob`, or [Volume Snapshots](https://kubernetes.io/docs/concepts/storage/volume-snapshots/) of the PV ([GKE supports them](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/volume-snapshots)). More work to wire up and, critically, to *test restores*. Easy to think you have backups until you need one.

### Portability / lock-in

- **Self-managed** is portable — the same StatefulSet runs on any Kubernetes (k3d, minikube, EKS, on-prem). No vendor lock-in.
- **Cloud SQL** ties you to GCP; moving means an export/import migration.

## Summary

| Dimension      | Cloud SQL (DBaaS)        | Self-managed + PVC          |
| -------------- | ------------------------ | --------------------------- |
| Init work      | Low (provision instance) | Higher (StatefulSet + PVC)  |
| Cost           | Higher (24/7 instance)   | Near-free on existing nodes |
| Maintenance    | Managed by Google        | You own it                  |
| HA / failover  | Built-in flag            | DIY (operator/replication)  |
| Backups        | Automated + PITR         | DIY (pg_dump / snapshots)   |
| Portability    | GCP lock-in              | Runs anywhere               |
| Learning value | Hides the hard parts     | Teaches StatefulSets/PVCs   |

**One-liner:** PVC trades ongoing operational burden for low cost and learning value; Cloud SQL trades money for near-zero maintenance and turnkey backups/HA.

For the MOOC exercises, **self-managed Postgres + PVC** fits best — it's what the course teaches, it's nearly free on the existing node pool, and it stays portable. Reach for **Cloud SQL** once production-like HA, PITR, and hands-off patching matter more than cost.

## Resources

- [Cloud SQL for PostgreSQL docs](https://cloud.google.com/sql/docs/postgres)
- [Connecting from GKE with the Auth Proxy](https://cloud.google.com/sql/docs/postgres/connect-kubernetes-engine)
- [Kubernetes StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [Volume Snapshots](https://kubernetes.io/docs/concepts/storage/volume-snapshots/)
- [CloudNativePG operator](https://cloudnative-pg.io/)
