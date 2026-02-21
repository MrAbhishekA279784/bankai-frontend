import { DashboardLayout } from "@/components/DashboardLayout";
import { AccuracyChart, PrecisionRecallChart, DriftChart, BiasChart, BiasLineChart, FraudChart } from "@/components/charts/DashboardCharts";
import { TrendingUp, TrendingDown, ArrowDown } from "lucide-react";

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

export default function TraditionalML() {
  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold text-foreground mb-4">Traditional ML Observability</h2>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-foreground">Accuracy</p>
            <div className="flex items-center gap-2">
              <Badge variant="success">91.4%</Badge>
              <Badge variant="success">85%</Badge>
            </div>
          </div>
          <p className="metric-text text-foreground mb-2">85.6%</p>
          <AccuracyChart />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-foreground">Precision & Recall</p>
            <div className="flex items-center gap-2">
              <Badge variant="success">83.2%</Badge>
            </div>
          </div>
          <p className="metric-text text-foreground mb-2">83.2%</p>
          <PrecisionRecallChart />
          <div className="flex gap-3 mt-2 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Precision</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent inline-block" /> Recall</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-foreground">Data Drift Detection</p>
            <Badge variant="danger"><ArrowDown className="w-3 h-3" /> Medium</Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-0.5">KL Divergence 0.32</p>
          <p className="metric-text text-warning mb-2">0.32</p>
          <DriftChart />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-foreground">Bias Analysis</p>
            <span className="text-xs font-semibold text-accent">0.89</span>
          </div>
          <BiasChart />
          <BiasLineChart />
        </Card>

        <Card className="col-span-2">
          <p className="text-sm font-semibold text-foreground mb-2">Fraud Detection Model Performance</p>
          <FraudChart />
        </Card>
      </div>
    </DashboardLayout>
  );
}
