import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  metric: string;
  subtitle?: string;
  trend?: "up" | "down";
  trendValue?: string;
  variant?: "default" | "primary" | "accent" | "destructive" | "warning";
  children?: ReactNode;
}

const glowMap = {
  default: "",
  primary: "glow-primary",
  accent: "glow-accent",
  destructive: "glow-destructive",
  warning: "glow-warning",
};

const trendColorMap = {
  up: "text-accent",
  down: "text-destructive",
};

export function MetricCard({ title, metric, subtitle, trend, trendValue, variant = "default", children }: MetricCardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 flex flex-col gap-3 ${glowMap[variant]} transition-shadow hover:border-primary/30`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColorMap[trend]}`}>
            {trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {trendValue}
          </div>
        )}
      </div>
      <p className="metric-text text-foreground">{metric}</p>
      {children && <div className="flex-1 min-h-0">{children}</div>}
    </div>
  );
}
