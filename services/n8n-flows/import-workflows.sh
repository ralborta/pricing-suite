#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${N8N_HOST:-}" || -z "${N8N_API_KEY:-}" ]]; then
  echo "Missing N8N_HOST or N8N_API_KEY env vars" >&2
  exit 1
fi

echo "Importing workflows into $N8N_HOST"
shopt -s nullglob
cd "$(dirname "$0")/workflows"
for workflow in WF-*.json; do
  echo "- Importing $workflow"
  curl -sS -X POST "$N8N_HOST/rest/workflows" \
    -H "X-N8N-API-KEY: $N8N_API_KEY" \
    -H "Content-Type: application/json" \
    --data-binary "@$workflow" >/dev/null
done
echo "Done."


