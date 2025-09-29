"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

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

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">Productos por Día</h3>
            <p className="text-xs text-gray-500">Últimos 7 días de actividad</p>
          </div>
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">Distribución de Márgenes</h3>
            <p className="text-xs text-gray-500">Estado de rentabilidad por producto</p>
          </div>
        </div>
        <div className="mt-4 h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={4}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-2 grid grid-cols-1 gap-1 text-sm">
          {pieData.map((d) => (
            <li key={d.name} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
              <span className="text-gray-700">{d.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


