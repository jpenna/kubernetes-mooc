#!/bin/bash
set -euo pipefail

BACKEND_URL="${BACKEND_URL:-http://todo-backend-svc:2351}"

location=$(
  curl -sI "https://en.wikipedia.org/wiki/Special:Random" \
    | grep -i "^location:" \
    | cut -d' ' -f2- \
    | tr -d '\r\n'
)

curl -sS -X POST "${BACKEND_URL}/todos/wiki" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"${location}\"}"
