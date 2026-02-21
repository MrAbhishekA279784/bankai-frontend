import { DashboardLayout } from "@/components/DashboardLayout";
import { LLMRequestsChart, ErrorsDonut, TokenChart, CostChart, LatencyChart } from "@/components/charts/DashboardCharts";
import { TrendingUp, Activity } from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 ${className}`}>
      {children}
    </div>
  );
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "danger" }) {
  const colors = {
    default: "bg-primary/15 text-primary",
    success: "bg-accent/15 text-accent",
    warning: "bg-warning/15 text-warning",
    danger: "bg-destructive/15 text-destructive",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${colors[variant]}`}>
      {children}
    </span>
  );
}

export default function LLMObservability() {
  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold text-foreground mb-4">LLM Observability</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* LLM Requests */}
        <Card>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-foreground">LLM Requests</p>
            <Badge>3,210</Badge>
          </div>
          <p className="metric-text text-foreground">3,210</p>
          <p className="text-xs text-muted-foreground mb-2">Total Requests</p>
          <LLMRequestsChart />
        </Card>

        {/* Errors & Hallucinations */}
        <Card>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-foreground">Errors & Hallucinations</p>
            <Badge variant="danger">310 Flagged</Badge>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="metric-text text-foreground">310</p>
              <p className="text-xs text-muted-foreground">Total Flagged</p>
            </div>
            <div className="flex-1">
              <ErrorsDonut />
            </div>
          </div>
        </Card>

        {/* Token Usage */}
        <Card>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-foreground">Token Usage</p>
            <Badge variant="success">430,676</Badge>
          </div>
          <p className="metric-text text-foreground">430,875</p>
          <p className="text-xs text-muted-foreground mb-2">Tokens Today</p>
          <TokenChart />
        </Card>

        {/* Cost */}
        <Card>
          <p className="text-sm font-semibold text-foreground mb-1">Cost</p>
          <p className="metric-text text-foreground">$12.40</p>
          <p className="text-xs text-muted-foreground mb-2">Today</p>
          <CostChart />
        </Card>

        {/* Latency */}
        <Card>
          <p className="text-sm font-semibold text-foreground mb-1">Latency</p>
          <p className="metric-text text-foreground">1.47s</p>
          <p className="text-xs text-muted-foreground mb-2">Average</p>
          <LatencyChart />
        </Card>

        {/* Throughput */}
        <Card>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-foreground">Throughput</p>
            <Activity className="w-4 h-4 text-accent" />
          </div>
          <p className="metric-text text-foreground">5.3</p>
          <p className="text-xs text-muted-foreground mb-2">req/sec</p>
          <div className="mt-4 space-y-2">
            {[
              { label: "Peak", value: "12.1 req/s", pct: 100 },
              { label: "Avg", value: "5.3 req/s", pct: 44 },
              { label: "Min", value: "1.2 req/s", pct: 10 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
                  <span>{item.label}</span>
                  <span className="text-foreground font-medium">{item.value}</span>
                </div>
                <div className="w-full h-1.5 rounded bg-secondary">
                  <div className="h-full rounded bg-accent" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Response Quality */}
        <Card className="col-span-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Response Quality Score</p>
            <Badge variant="success">Good</Badge>
          </div>
          <div className="flex items-center gap-6">
            <p className="metric-text text-foreground">8.6 <span className="text-lg text-muted-foreground font-normal">/ 10</span></p>
            <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: "86%" }} />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
