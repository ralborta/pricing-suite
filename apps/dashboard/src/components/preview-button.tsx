"use client";

import { useState } from "react";

export function PreviewButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const run = async () => {
    setLoading(true);
    setResult(null);
    const payload = {
      ruleset_version: "v1.0",
      channel: "retail",
      modules_enabled: ["costos", "impuestos", "redondeo"],
      variables_enabled: ["sku", "costo_base", "iva_pct", "markup_objetivo_pct"],
      on_missing_variable: "warn",
      defaults: { iva_pct: 0.21, markup_objetivo_pct: 0.35 },
      items: [{ sku: "ABC-1", costo_base: 1000, iva_pct: 0.21, markup_objetivo_pct: 0.35 }],
    };
    const res = await fetch("/api/pricing/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setResult(json);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={run} disabled={loading} className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50">
        {loading ? "Ejecutando preview..." : "Probar preview"}
      </button>
      {result && (
        <pre className="text-xs bg-gray-50 border rounded p-2 overflow-auto max-h-64">
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
