n8n Flows

Workflows importables para el MVP de Pricing.

Variables de entorno en n8n (Settings → Variables)
- BFF_URL
- BFF_API_KEY
- ENGINE_URL
- AGENT_ID
- WF_01_ID, WF_02_ID, WF_03_ID (IDs cuando estén creados)
- REPORT_FROM, REPORT_RECIPIENTS (array JSON o string)
- INGEST_MAP, VARIABLES_ENABLED
- LAST_UPLOAD_URL (para pruebas)
- STORAGE_PROXY_URL (si usas proxy para subir a Supabase Storage)

Importación
- Terminal (recomendado):
  - export N8N_API_KEY=...
  - export N8N_URL=https://tu-instancia-n8n
  - bash services/n8n-flows/import-workflows.sh
- UI n8n: Workflows → Import → From URL y usa los RAW de cada JSON.

Descripción
- WF-01 Intake: trigger manual → sube archivo (proxy Storage) → notifica al BFF → ejecuta WF-02.
- WF-02 Normalize & Validate: obtiene CSV/XLSX → aplica ingest_map/variables_enabled → actualiza job → ejecuta WF-03.
- WF-03 Pricing Run: ENGINE /pricing/preview → si no hay flags críticos → ENGINE /pricing/apply; si no, notifica revisión.
- WF-04 Scheduler & Auto-Reports: cron por agentes y cron de reportes automáticos.

Datos de prueba
- samples/intake.csv: 5 SKUs con costos simples.
- Variables sugeridas:
  - N8N_VAR_INGEST_MAP='{"SKU":"sku","Costo":"costo_base","IVA":"iva_pct"}'
  - N8N_VAR_VARIABLES_ENABLED='["sku","costo_base","iva_pct","markup_objetivo_pct"]'


