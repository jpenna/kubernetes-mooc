# Encryption

Run `.sops.sh enc` to encrypt the db.yaml file.
Run `.sops.sh dec` to decrypt the db.secret file.

Needs to decrypt the db.yaml file before deploying.

# Setup the database

```bash
kubectl exec -it postgres-stset-0 -- psql -U postgres -d postgres -c "CREATE TABLE pings (id SERIAL PRIMARY KEY)"
```
