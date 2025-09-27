#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${N8N_HOST:-}" || -z "${N8N_API_KEY:-}" ]]; then
  echo "Missing N8N_HOST or N8N_API_KEY env vars" >&2
  exit 1
fi

echo "Importing workflows to $N8N_HOST"
npx -y n8n import:workflow --separate --input=services/n8n-flows/workflows --yes


