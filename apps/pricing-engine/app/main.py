from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Header, HTTPException, status
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime
from uuid import uuid4
import os

app = FastAPI(title="Pricing Engine", version="0.1.0")

# CORS configuration via ENV: ENGINE_CORS_ORIGINS as comma-separated list
origins_env = os.getenv("ENGINE_CORS_ORIGINS", "").strip()
allowed_origins = [o.strip() for o in origins_env.split(",") if o.strip()] or ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=86400,
)

class PricingItem(BaseModel):
    sku: str
    costo_base: float
    flete: float | None = 0
    iva_pct: float | None = 0.21
    markup_objetivo_pct: float | None = 0.35

class PreviewRequest(BaseModel):
    ruleset_version: str
    channel: str
    modules_enabled: List[str]
    variables_enabled: List[str]
    on_missing_variable: str = "warn"
    defaults: Dict[str, Any] = {}
    items: List[PricingItem]

@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}

def _require_bearer(auth_header: Optional[str]) -> None:
    expected = os.getenv("ENGINE_TOKEN", "").strip()
    if not expected:
        return  # si no hay token configurado, no se exige (útil en dev)
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token")
    token = auth_header.removeprefix("Bearer ").strip()
    if token != expected:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token")


@app.post("/pricing/preview")
def preview(req: PreviewRequest, authorization: Optional[str] = Header(default=None)) -> Dict[str, Any]:
    _require_bearer(authorization)
    out_items: List[Dict[str, Any]] = []
    for it in req.items:
        costo = it.costo_base + (it.flete or 0)
        precio_obj = costo * (1 + (it.markup_objetivo_pct or 0.35))
        precio_final = precio_obj * (1 + (it.iva_pct or 0.21))
        margen_pct = (precio_final - costo) / precio_final if precio_final else 0
        out_items.append({
            "sku": it.sku,
            "precio_final": round(precio_final, 2),
            "margen_pct": round(margen_pct, 4),
            "flags": []
        })
    return {
        "version_id": "V-demo",
        "items": out_items,
        "inputs_snapshot": {
            "channel": req.channel,
            "modules_enabled": req.modules_enabled
        }
    }

@app.post("/pricing/apply")
def apply(req: PreviewRequest, authorization: Optional[str] = Header(default=None)) -> Dict[str, Any]:
    _require_bearer(authorization)
    """Aplica los precios calculados.

    Implementación mínima: replica la lógica de preview y retorna metadatos
    de aplicación (id de operación y timestamp). En una implementación real
    aquí se persiste en una base de datos o se emiten eventos.
    """
    out_items: List[Dict[str, Any]] = []
    for it in req.items:
        costo = it.costo_base + (it.flete or 0)
        precio_obj = costo * (1 + (it.markup_objetivo_pct or 0.35))
        precio_final = precio_obj * (1 + (it.iva_pct or 0.21))
        margen_pct = (precio_final - costo) / precio_final if precio_final else 0
        out_items.append({
            "sku": it.sku,
            "precio_final": round(precio_final, 2),
            "margen_pct": round(margen_pct, 4),
            "flags": ["applied"],
        })

    operation_id = f"apply-{uuid4()}"
    return {
        "operation_id": operation_id,
        "applied_at": datetime.utcnow().isoformat() + "Z",
        "version_id": "V-demo",
        "items": out_items,
        "inputs_snapshot": {
            "channel": req.channel,
            "modules_enabled": req.modules_enabled,
        },
    }







