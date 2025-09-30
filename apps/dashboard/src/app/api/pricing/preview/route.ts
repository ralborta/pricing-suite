import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const ENGINE_URL = process.env.ENGINE_URL;
    const ENGINE_TOKEN = process.env.ENGINE_TOKEN;
    if (!ENGINE_URL || !ENGINE_TOKEN) {
      return NextResponse.json(
        { error: "MISSING_ENV", message: "ENGINE_URL y ENGINE_TOKEN requeridos" },
        { status: 500 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "INVALID_JSON", message: "Cuerpo de la petición no es JSON válido" },
        { status: 400 }
      );
    }

    if (!body || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "INVALID_PAYLOAD", message: "'items' debe ser un arreglo no vacío" },
        { status: 400 }
      );
    }
    if (typeof body.ruleset_version !== "string" || typeof body.channel !== "string") {
      return NextResponse.json(
        { error: "INVALID_PAYLOAD", message: "'ruleset_version' y 'channel' son requeridos" },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(`${ENGINE_URL}/pricing/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ENGINE_TOKEN}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = await res.json().catch(() => ({}));
      return NextResponse.json(json, { status: res.status });
    }

    const text = await res.text().catch(() => "");
    if (!res.ok) {
      return NextResponse.json(
        { error: "ENGINE_ERROR", message: text || "Error del engine" },
        { status: res.status }
      );
    }
    return NextResponse.json({ ok: true, data: text }, { status: 200 });
  } catch (e: any) {
    const isAbort = e?.name === "AbortError";
    return NextResponse.json(
      {
        error: isAbort ? "TIMEOUT" : "UPSTREAM_UNAVAILABLE",
        message: isAbort ? "Timeout al llamar al engine" : e?.message || "Fallo de red",
      },
      { status: 502 }
    );
  }
}





