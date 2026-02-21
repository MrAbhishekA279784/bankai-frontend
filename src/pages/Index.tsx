import { DashboardLayout } from "@/components/DashboardLayout";
import {
  AccuracyChart, PrecisionRecallChart, DriftChart, BiasChart, BiasLineChart,
  FraudChart, LLMRequestsChart, ErrorsDonut, TokenChart,
  CostChart, LatencyChart,
} from "@/components/charts/DashboardCharts";
import { AlertTriangle, ChevronDown, ChevronRight, ShieldAlert, TrendingUp, TrendingDown, ArrowDown } from "lucide-react";
import { useState } from "react";

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

const Index = () => {
  const [alertsExpanded, setAlertsExpanded] = useState(true);

  return (
    <DashboardLayout>
      <div className="flex gap-4">
        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Traditional ML Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Traditional ML Observability</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>← Today: May 11 - 21 →</span>
            </div>
          </div>

          {/* ML Grid - Left 2 cols */}
          <div className="grid grid-cols-3 gap-4">
            {/* Left 2 columns */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {/* Accuracy */}
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
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                  <span>May 1</span><span>May 21</span>
                </div>
              </Card>

              {/* Precision & Recall */}
              <Card>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">Precision & Recall</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">83.2%</Badge>
                    <Badge variant="success">85%</Badge>
                  </div>
                </div>
                <p className="metric-text text-foreground mb-2">83.2%</p>
                <PrecisionRecallChart />
                <div className="flex gap-3 mt-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Precision 83.2%</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent inline-block" /> Recall</span>
                </div>
              </Card>

              {/* Bias Analysis - Horizontal Bars */}
              <Card>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">Bias Analysis</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Fairness Score: High</span>
                    <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                    <span className="text-xs font-semibold text-accent">0.89</span>
                  </div>
                </div>
                <BiasChart />
              </Card>

              {/* Bias Analysis 2 */}
              <Card>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">Bias Analysis</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">High</span>
                    <span className="text-lg font-bold text-primary">0.89</span>
                  </div>
                </div>
                <p className="metric-text text-foreground mb-1">0.89</p>
                <BiasLineChart />
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                  <span>Baseline</span><span>May 21</span>
                </div>
              </Card>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Data Drift Detection */}
              <Card>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">Data Drift Detection</p>
                  <Badge variant="danger">
                    <ArrowDown className="w-3 h-3" /> Medium
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-0.5">KL Divergence 0.32</p>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs text-warning">Decreasing</span>
                  <span className="metric-text text-warning">0.32</span>
                </div>
                <DriftChart />
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                  <span>Training vs</span><span>May 12</span>
                </div>
              </Card>

              {/* Fraud Detection */}
              <Card>
                <p className="text-sm font-semibold text-foreground mb-2">Fraud Detection Model Performance</p>
                <FraudChart />
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                  <span>May 1</span><span>May 21</span>
                </div>
              </Card>
            </div>
          </div>

          {/* LLM Observability */}
          <div className="pt-2">
            <h2 className="text-base font-semibold text-foreground mb-4">LLM Observability</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* LLM Requests */}
            <Card>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-foreground">LLM Requests</p>
                <div className="flex items-center gap-2">
                  <Badge>3,210</Badge>
                  <TrendingUp className="w-3 h-3 text-accent" />
                </div>
              </div>
              <p className="metric-text text-foreground">3,210</p>
              <p className="text-xs text-muted-foreground mb-2">Total Requests</p>
              <LLMRequestsChart />
              <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                <span>May 1</span><span>May 2</span>
              </div>
            </Card>

            {/* Errors & Hallucinations */}
            <Card>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-foreground">Errors & Hallucinations</p>
                <div className="flex items-center gap-2">
                  <Badge variant="danger">310 Total Flagged</Badge>
                  <Badge variant="success">6.55%</Badge>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="metric-text text-foreground">310</p>
                  <p className="text-xs text-muted-foreground">Total Flagged</p>
                  <div className="mt-2 space-y-1 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-destructive" /> Errors</div>
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Live (60%)</div>
                  </div>
                </div>
                <div className="flex-1">
                  <ErrorsDonut />
                </div>
                <div className="flex flex-col justify-center gap-1 text-xs">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-destructive" /><span className="text-muted-foreground">810</span> <span className="text-foreground font-medium">726</span></div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-primary" /><span className="text-muted-foreground">Brains</span> <span className="text-foreground font-medium">322</span></div>
                  <p className="text-lg font-bold text-accent mt-1">6.15%</p>
                </div>
              </div>
            </Card>

            {/* Token Usage */}
            <Card>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-foreground">Token Usage</p>
                <Badge variant="success">430,676 today</Badge>
              </div>
              <p className="metric-text text-foreground">430,875</p>
              <p className="text-xs text-muted-foreground mb-2">Tokens Today</p>
              <TokenChart />
              <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                <span>May 1</span><span>May 2</span>
              </div>
            </Card>

            {/* Cost + Latency side by side */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">Cost</p>
                  <span className="text-xs text-muted-foreground">$12.40 ~</span>
                </div>
                <p className="metric-text text-foreground">$12.40</p>
                <p className="text-xs text-muted-foreground mb-1">Today</p>
                <CostChart />
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                  <span>May 1</span><span>May 21</span>
                </div>
              </Card>
              <Card>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">Latency</p>
                  <span className="text-xs text-muted-foreground">1.47 s</span>
                </div>
                <p className="metric-text text-foreground">1.47s</p>
                <LatencyChart />
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                  <span>May 1</span><span>May 21</span>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Safety Alerts Sidebar */}
        <div className="w-72 shrink-0 space-y-3">
          {/* Collapsible Safety Alerts */}
          <div className="rounded-xl border border-destructive/30 bg-card overflow-hidden glow-destructive">
            <button
              onClick={() => setAlertsExpanded(!alertsExpanded)}
              className="flex items-center justify-between w-full px-4 py-3 text-left"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-semibold text-foreground">Safety Alerts</span>
              </div>
              {alertsExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            </button>

            {alertsExpanded && (
              <div className="px-4 pb-4 space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <ShieldAlert className="w-3.5 h-3.5 text-destructive" />
                  <span className="font-semibold text-destructive">2 Active Alerts</span>
                </div>

                <div className="space-y-2.5">
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-glow" />
                      <p className="text-xs font-semibold text-foreground">PII Detected in LLM Response</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Flagged 17</p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                      <span>degradation from 100 ↓ 1 Prealerts</span>
                      <span className="text-primary">6min</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <span className="w-full h-1 rounded bg-destructive/40" />
                      <span className="w-2/3 h-1 rounded bg-primary/40" />
                    </div>
                  </div>

                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-glow" />
                      <p className="text-xs font-semibold text-foreground">Biased Answer Alert</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Flagged 18 in Prefrace</p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                      <span>~ 7 hour</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Second Safety Alerts Section */}
          <div className="rounded-xl border border-destructive/20 bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-semibold text-foreground">Safety Alerts</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="px-4 pb-3">
              <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-destructive" />
                  <p className="text-xs font-semibold text-foreground">PII Detected in LLM Response</p>
                </div>
                <p className="text-[10px] text-muted-foreground">1.0 touchpoints — 6 in mode</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
