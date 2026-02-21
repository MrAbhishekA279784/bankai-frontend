import { DashboardLayout } from "@/components/DashboardLayout";
import { Bell, CheckCircle, AlertTriangle, Clock, XCircle } from "lucide-react";
import { useState } from "react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 ${className}`}>
      {children}
    </div>
  );
}

const activeAlerts = [
  { title: "PII Detected in LLM Response", severity: "Critical", time: "6 min ago", source: "LLM Monitor" },
  { title: "Biased Answer Flagged", severity: "High", time: "7 hours ago", source: "Bias Detector" },
  { title: "Data Drift Threshold Exceeded", severity: "Medium", time: "12 hours ago", source: "Drift Monitor" },
];

const alertHistory = [
  { title: "Model retraining completed", severity: "Info", time: "1 day ago", resolved: true },
  { title: "Token usage spike resolved", severity: "Medium", time: "2 days ago", resolved: true },
  { title: "Latency alert cleared", severity: "Low", time: "3 days ago", resolved: true },
  { title: "Unauthorized access attempt blocked", severity: "Critical", time: "4 days ago", resolved: true },
];

export default function Alerts() {
  const [tab, setTab] = useState<"active" | "history">("active");

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Alerts</h2>
        <div className="flex rounded-lg bg-secondary p-0.5 border border-border">
          {(["active", "history"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                tab === t ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "active" ? (
        <div className="space-y-3">
          {activeAlerts.map((alert, i) => (
            <Card key={i} className="border-destructive/20">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alert.severity === "Critical" ? "text-destructive" : alert.severity === "High" ? "text-warning" : "text-primary"
                  }`} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                      <span>{alert.source}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{alert.time}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  alert.severity === "Critical" ? "bg-destructive/15 text-destructive" :
                  alert.severity === "High" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"
                }`}>
                  {alert.severity}
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {alertHistory.map((alert, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-accent" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{alert.time}</span>
                      <span className="text-accent">Resolved</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  alert.severity === "Critical" ? "bg-destructive/15 text-destructive" :
                  alert.severity === "Medium" ? "bg-warning/15 text-warning" :
                  alert.severity === "Info" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"
                }`}>
                  {alert.severity}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
