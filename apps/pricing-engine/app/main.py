from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

app = FastAPI(title="Pricing Engine", version="0.1.0")

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

@app.post("/pricing/preview")
def preview(req: PreviewRequest) -> Dict[str, Any]:
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


