Pricing Suite (MVP)

Suite modular y auditable para pricing: UI+BFF (Vercel), Engine (Railway), DB (Supabase), orquestación (n8n) y módulos de competencia/IA opcionales.

Estructura

```
pricing-suite/
├─ apps/
│  ├─ dashboard/                 # Next.js UI + API routes (BFF)
│  └─ pricing-engine/            # FastAPI: /preview /apply /diff /reports
├─ services/
│  ├─ n8n-flows/                 # WF-01..WF-04 .json + scripts import/export
│  └─ comp-scraper/              # opcional
├─ packages/
│  ├─ db/                        # migraciones SQL Supabase + seeds
│  ├─ shared/                    # DTOs/types, utils
│  └─ report-templates/          # plantillas React/HTML para PDF
├─ .github/workflows/            # CI/CD
└─ README.md
```

Requisitos
- Node.js >= 18.18, pnpm 9
- Python 3.11+

Comandos
- `pnpm i` o `make bootstrap`
- `make dev` (dashboard 3000, engine 8000)

ENV
- Vercel (dashboard): `ENGINE_URL`, `ENGINE_TOKEN`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE`, `RESEND_API_KEY`, `PUBLIC_BASE_URL`
- Engine (Railway): `SUPABASE_*`, `RESEND_API_KEY`, `OPENAI_API_KEY?`, `STORAGE_BUCKET`
- n8n: `N8N_HOST`, `WEBHOOK_SECRET`, credenciales (GitHub/IMAP/Drive)

Diagrama alto nivel

```
[Intake (GitHub/Email/Drive)] -> n8n WF-01..03 -> BFF (Vercel) -> Engine (FastAPI)
                                            └-> Supabase (DB/Storage)
Engine -> /preview|/apply -> precios/versiones -> Reportes (CSV/PDF)
```


