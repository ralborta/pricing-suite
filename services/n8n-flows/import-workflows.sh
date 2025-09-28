#!/usr/bin/env bash
set -euo pipefail

N8N_URL=${N8N_URL:-"https://ralborta.app.n8n.cloud"}
if [[ -z "${N8N_API_KEY:-}" ]]; then
  echo "Missing N8N_API_KEY env var" >&2
  exit 1
fi

cd "$(dirname "$0")/workflows"
for workflow in WF-*.json; do
  echo "Importing $workflow to $N8N_URL"
  curl -sS -X POST "$N8N_URL/rest/workflows" \
    -H "X-N8N-API-KEY: $N8N_API_KEY" \
    -H "Content-Type: application/json" \
    --data-binary @"$workflow" | jq '.name // "ok"' || true
done


