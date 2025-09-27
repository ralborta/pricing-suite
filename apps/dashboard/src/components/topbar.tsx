"use client";

import { Bell, Settings, User, Search } from "lucide-react";

export function Topbar() {
  const today = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-16 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{today}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border bg-white">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              className="outline-none text-sm w-64"
              placeholder="Buscar productos, simulaciones..."
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Notificaciones">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Ajustes">
            <Settings className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border">
            <User className="h-4 w-4" />
            <div className="text-sm">
              <div className="font-medium">Administrador</div>
              <div className="text-gray-500 text-xs">admin@acubat.com</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


