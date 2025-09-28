# n8n Flows

Workflows listos para importar en n8n (JSON).

## Variables de entorno requeridas en n8n (Settings → Variables)
- BFF_URL
- BFF_API_KEY
- ENGINE_URL
- AGENT_ID
- WF_01_ID, WF_02_ID, WF_03_ID (IDs de los workflows cuando estén creados)
- REPORT_RECIPIENTS (array JSON, ej: ["pricing@empresa.com"]) 
- STORAGE_PROXY_URL (endpoint que sube archivos a Supabase)
- INGEST_MAP (JSON)
- VARIABLES_ENABLED (JSON)
- LAST_UPLOAD_URL (para pruebas de WF-02)

## Importación
- Opción A (UI): Workflows → Import → From URL → RAW de cada JSON en `workflows/`.
- Opción B (script):
```bash
export N8N_HOST="https://<tu-n8n>"
export N8N_API_KEY="<api-key>"
bash services/n8n-flows/import-workflows.sh
```

## Workflows
- WF-01-intake.json: intake manual/demo → upload a storage → POST `/api/agents/:id/run` → ejecuta WF-02.
- WF-02-normalize-validate.json: lee archivo (URL demo), aplica `ingest_map` y filtra `variables_enabled`, actualiza job y llama a WF-03.
- WF-03-pricing-run.json: llama a ENGINE `/pricing/preview`; si no hay flags críticos aplica `/pricing/apply`, si hay flags envía aviso.
- WF-04-scheduler-auto-reports.json: dos cron (agentes y reportes) que disparan WF-01 y `/api/reports/auto`.

## Datos de prueba
- test-data/items-demo.json: payload básico para `/pricing/preview`.
- Variables sugeridas:
```bash
VARIABLES_ENABLED='["sku","costo_base","iva_pct","markup_objetivo_pct"]'
INGEST_MAP='{"SKU":"sku","Costo":"costo_base"}'
REPORT_RECIPIENTS='["pricing@empresa.com"]'
```
