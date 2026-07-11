import { ReactNode } from "react";
import { clsx } from "clsx";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  trendLabel?: string;
  color?: "blue" | "green" | "amber" | "red";
  isLive?: boolean;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  trendLabel = "vs last month",
  color = "blue",
  isLive = false 
}: StatCardProps) {
  
  const colorMap = {
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border-blue-200 shadow-blue-100/50",
    green: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 border-emerald-200 shadow-emerald-100/50",
    amber: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 border-amber-200 shadow-amber-100/50",
    red: "bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600 border-rose-200 shadow-rose-100/50",
  };

  const trendColor = trend === "up" ? "text-emerald-600" : trend === "down" ? "text-rose-600" : "text-slate-500";
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[hsl(var(--border))] hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
      {isLive && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-glow shadow-lg shadow-emerald-500/50" />
        </div>
      )}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-black text-[hsl(var(--muted-foreground))] mb-1">{title}</p>
          <h3 className="text-2xl font-black text-[hsl(var(--foreground))]">{value}</h3>
        </div>
        <div className={clsx("p-3 rounded-2xl border shadow-sm transition-transform group-hover:scale-110", colorMap[color])}>
          <div className="animate-pulse-slow">
            {icon}
          </div>
        </div>
      </div>
      
      {(trend || trendValue) && (
        <div className="mt-4 flex items-center text-sm">
          <span className={clsx("font-black flex items-center gap-1", trendColor)}>
            <TrendIcon className="w-4 h-4" />
            {trendValue}
          </span>
          <span className="text-[hsl(var(--muted-foreground))] ml-2">{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
