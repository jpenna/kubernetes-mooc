# Variables

## Secrets

Sentive information that is given to the containers at runtime.

Usage with SOPS and age.

```bash
# Generate a key
age-keygen -o key.txt

# Encrypt the secret
sops --encrypt \
       --age age16fc6a308hwul3dkkugmxf4vdvmgxul3p5fv375sdsuga0ulhc42s4d40xu \
       --encrypted-regex '^(data)$' \
       secret.yaml > secret.enc.yaml

# Decrypt the secret
export SOPS_AGE_KEY_FILE=$(pwd)/key.txt
sops --decrypt secret.enc.yaml > secret.yaml
# Or deploy without decoding
sops --decrypt secret.enc.yaml | kubectl apply -f -
```

## ConfigMaps

The server reads these at runtime and update at runtime.
