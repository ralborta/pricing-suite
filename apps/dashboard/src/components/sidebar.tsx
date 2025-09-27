"use client";

import {
  Gauge,
  Upload,
  Banknote,
  PlaySquare,
  Settings2,
  Newspaper,
  Cog,
  FileText,
  BarChart3,
  CircleHelp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "Dashboard", href: "/", icon: Gauge },
  { label: "Carga de Archivos", href: "/ingesta", icon: Upload },
  { label: "Conciliación Bancaria", href: "/conciliacion", icon: Banknote },
  { label: "Simulaciones", href: "/simulaciones", icon: PlaySquare },
  { label: "Rulesets", href: "/rulesets", icon: Settings2 },
  { label: "Publicaciones", href: "/publicaciones", icon: Newspaper },
  { label: "Configuración", href: "/configuracion", icon: Cog },
  { label: "PDF a Excel", href: "/pdf", icon: FileText },
  { label: "Reportes", href: "/reportes", icon: BarChart3 },
  { label: "Ayuda", href: "/ayuda", icon: CircleHelp },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 shrink-0 border-r bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="h-16 px-4 flex items-center border-b">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">AcuBat</span>
          <span className="text-lg font-semibold">Pricing Platform</span>
        </div>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-100 ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-xs text-gray-500">Vista general del call center</div>
    </aside>
  );
}


