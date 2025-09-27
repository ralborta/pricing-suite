.PHONY: bootstrap dev dev-dashboard dev-engine lint test deploy

bootstrap:
	@echo "Installing workspace dependencies (pnpm)"
	pnpm install
	@echo "Bootstrap done. Configure envs in apps/dashboard/.env and apps/pricing-engine/.env"

dev: dev-dashboard dev-engine

dev-dashboard:
	@echo "Starting Next.js dashboard on http://localhost:3000"
	cd apps/dashboard && pnpm dev

dev-engine:
	@echo "Starting FastAPI engine on http://localhost:8000"
	cd apps/pricing-engine && uvicorn app.main:app --reload --port 8000

lint:
	@echo "Run linters per package (e.g., pnpm -C apps/dashboard lint)"

test:
	@echo "Run tests per package (engine + shared)"

deploy:
	@echo "Deploy via GitHub Actions (Vercel, Railway, n8n import)"


