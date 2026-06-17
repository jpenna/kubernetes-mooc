# Encryption

Run `.sops.sh enc` to encrypt the db.yaml file.
Run `.sops.sh dec` to decrypt the db.secret file.

Needs to decrypt the db.yaml file before deploying.

# Setup the database

```bash
kubectl exec -it postgres-stset-0 -- psql -U postgres -d postgres -c "CREATE TABLE todos (id SERIAL PRIMARY KEY, text VARCHAR(255) NOT NULL, completed BOOLEAN NOT NULL DEFAULT FALSE)"
```
