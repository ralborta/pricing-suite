import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
  intent?: "normal" | "warning" | "danger";
};

export function KpiCard({ title, value, delta, icon, intent = "normal" }: Props) {
  const deltaColor = intent === "danger" ? "text-red-600" : intent === "warning" ? "text-amber-600" : "text-emerald-600";
  const barColor = intent === "danger" ? "bg-red-500" : intent === "warning" ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="text-sm text-gray-500">{title}</div>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {delta && <div className={`text-xs mt-1 ${deltaColor}`}>{delta}</div>}
      <div className="mt-3 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full ${barColor}`} style={{ width: "85%" }} />
      </div>
    </div>
  );
}


