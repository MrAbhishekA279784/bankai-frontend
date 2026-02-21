import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertTriangle, ShieldAlert, FileText, Eye, Flag, Clock } from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 ${className}`}>
      {children}
    </div>
  );
}

const auditLogs = [
  { action: "LLM Response Logged", user: "system", time: "2 min ago", type: "info" },
  { action: "Model Version Updated to v1.4", user: "admin@bank.com", time: "1 hour ago", type: "warning" },
  { action: "Drift Threshold Triggered", user: "monitor", time: "3 hours ago", type: "danger" },
  { action: "RLS Policy Updated", user: "admin@bank.com", time: "5 hours ago", type: "info" },
  { action: "New User Role Assigned", user: "admin@bank.com", time: "1 day ago", type: "info" },
];

const safetyAlerts = [
  { title: "PII Detected in LLM Response", severity: "Critical", time: "6 min ago", flagged: 17 },
  { title: "Biased Answer Flagged", severity: "High", time: "7 hours ago", flagged: 18 },
  { title: "Toxic Content Detected", severity: "Medium", time: "1 day ago", flagged: 3 },
];

const anomalies = [
  { metric: "Token spike detected", value: "+340%", status: "danger" as const },
  { metric: "Unusual login pattern", value: "3 attempts", status: "warning" as const },
  { metric: "Model latency surge", value: "4.2s", status: "warning" as const },
];

export default function Governance() {
  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold text-foreground mb-4">Governance & Compliance</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Audit Logs */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Audit Logs</p>
          </div>
          <div className="space-y-2">
            {auditLogs.map((log, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    log.type === "danger" ? "bg-destructive" : log.type === "warning" ? "bg-warning" : "bg-primary"
                  }`} />
                  <span className="text-xs text-foreground">{log.action}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>{log.user}</span>
                  <Clock className="w-3 h-3" />
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Safety Alerts */}
        <Card className="border-destructive/30">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-destructive" />
            <p className="text-sm font-semibold text-foreground">Safety Alerts</p>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-destructive/15 text-destructive text-[10px] font-semibold">
              {safetyAlerts.length} Active
            </span>
          </div>
          <div className="space-y-2.5">
            {safetyAlerts.map((alert, i) => (
              <div key={i} className="rounded-lg bg-destructive/5 border border-destructive/15 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-glow" />
                  <p className="text-xs font-semibold text-foreground">{alert.title}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Severity: <span className="text-destructive font-medium">{alert.severity}</span></span>
                  <span>Flagged: {alert.flagged}</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Risk Monitoring */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-warning" />
            <p className="text-sm font-semibold text-foreground">Risk Monitoring</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Model Version</span>
              <span className="text-sm font-semibold text-foreground">Loan Model v1.4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Risk Level</span>
              <span className="px-2 py-0.5 rounded-full bg-warning/15 text-warning text-[10px] font-semibold">Medium</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Compliance Score</span>
              <span className="text-sm font-semibold text-accent">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Last Audit</span>
              <span className="text-sm text-foreground">Feb 14, 2026</span>
            </div>
          </div>
        </Card>

        {/* Anomalous Flags */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Flag className="w-4 h-4 text-destructive" />
            <p className="text-sm font-semibold text-foreground">Anomalous Flags</p>
          </div>
          <div className="space-y-2">
            {anomalies.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs text-foreground">{a.metric}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  a.status === "danger" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"
                }`}>
                  {a.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
