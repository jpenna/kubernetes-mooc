#!/bin/bash


SOPS_AGE_KEY_FILE=$(pwd)/key.txt
AGE_KEY="age16fc6a308hwul3dkkugmxf4vdvmgxul3p5fv375sdsuga0ulhc42s4d40xu"
SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

# Expect `enc` or `dec` as first argument
if [ "$1" == "enc" ]; then
  echo "Encrypting db.yaml"
  sops --output-type=yaml --input-type=yaml --encrypt --age $AGE_KEY --encrypted-regex '^(data)$' $SCRIPT_DIR/db.yaml > $SCRIPT_DIR/db.secret
  exit 0
elif [ "$1" == "dec" ]; then

  echo "Decrypting db.secret"
  sops --output-type=yaml --input-type=yaml --decrypt $SCRIPT_DIR/db.secret > $SCRIPT_DIR/db.yaml
  exit 0
fi

echo "Usage: $0 [enc|dec]"
exit 1
