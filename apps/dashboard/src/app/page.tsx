import { KpiCard } from "@/components/kpi-card";
import { PhoneCall, Clock, TrendingUp, Users, AlertTriangle, Percent } from "lucide-react";
import { DashboardCharts } from "@/components/dashboard-charts";

const lineData = [
  { name: "Lun", value: 25 },
  { name: "Mar", value: 32 },
  { name: "Mié", value: 40 },
  { name: "Jue", value: 28 },
  { name: "Vie", value: 52 },
  { name: "Sáb", value: 36 },
  { name: "Dom", value: 58 },
];

const pieData = [
  { name: "Óptimo (≥20%)", value: 72, color: "#10B981" },
  { name: "Advertencia (10-20%)", value: 18, color: "#F59E0B" },
  { name: "Crítico (<10%)", value: 10, color: "#EF4444" },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Resumen de actividad de la plataforma de pricing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
        <KpiCard title="Total de Productos" value="1,247" delta="+12% Mejorando" icon={<PhoneCall className="h-4 w-4 text-gray-400" />} />
        <KpiCard title="Margen Promedio" value="35.2%" delta="+5% Mejorando" icon={<Percent className="h-4 w-4 text-gray-400" />} />
        <KpiCard title="Tasa de Éxito" value="87%" delta="+8% Mejorando" icon={<TrendingUp className="h-4 w-4 text-gray-400" />} />
        <KpiCard title="Productos Críticos" value="89" delta="-3% Necesita atención" icon={<AlertTriangle className="h-4 w-4 text-gray-400" />} intent="warning" />
        <KpiCard title="Simulaciones" value="23" delta="-15% Mejorando" icon={<Users className="h-4 w-4 text-gray-400" />} intent="danger" />
        <KpiCard title="Tiempo Total" value="94h 12m" delta="+7% Mejorando" icon={<Clock className="h-4 w-4 text-gray-400" />} />
      </div>

      <DashboardCharts />
    </div>
  );
}
