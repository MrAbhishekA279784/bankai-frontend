import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, Legend,
} from "recharts";

// Theme-aware tooltip that reads CSS variables at render time
function useChartTooltipStyle() {
  return {
    contentStyle: {
      backgroundColor: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "8px",
      fontSize: "12px",
      color: "hsl(var(--foreground))",
    },
    labelStyle: {
      color: "hsl(var(--foreground))",
    },
    itemStyle: {
      color: "hsl(var(--foreground))",
    },
  };
}

// Accuracy line chart
const accuracyData = Array.from({ length: 21 }, (_, i) => ({
  name: `May ${i + 1}`,
  value: 82 + Math.random() * 4 + (i * 0.15),
}));

export function AccuracyChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={accuracyData}>
        <defs>
          <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(160 75% 52%)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="hsl(160 75% 52%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={{ fontSize: 9, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} interval={19} />
        <YAxis domain={[80, 90]} tick={{ fontSize: 9, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} hide />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey="value" stroke="hsl(160 75% 52%)" fill="url(#accGrad)" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Precision Recall
const prData = [
  { name: "Loan", precision: 87, recall: 82 },
  { name: "Fraud", precision: 92, recall: 88 },
  { name: "Credit", precision: 85, recall: 79 },
  { name: "Risk", precision: 90, recall: 86 },
];

export function PrecisionRecallChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={prData} barGap={2}>
        <XAxis dataKey="name" tick={{ fontSize: 9, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="precision" fill="hsl(195 100% 50%)" radius={[2, 2, 0, 0]} barSize={10} />
        <Bar dataKey="recall" fill="hsl(160 75% 52%)" radius={[2, 2, 0, 0]} barSize={10} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Data Drift
const driftData = [
  { name: "Free", value: 0.08 }, { name: "Past", value: 0.15 },
  { name: "In", value: 0.12 }, { name: "Short", value: 0.25 },
  { name: "Inactive", value: 0.18 }, { name: "Diverse", value: 0.32 },
  { name: "Saver", value: 0.1 },
];

export function DriftChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={driftData}>
        <XAxis dataKey="name" tick={{ fontSize: 8, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="value" radius={[2, 2, 0, 0]} barSize={14}>
          {driftData.map((entry, i) => (
            <Cell key={i} fill={entry.value > 0.25 ? "hsl(0 85% 65%)" : entry.value > 0.15 ? "hsl(42 100% 68%)" : "hsl(195 100% 50%)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Bias heatmap bars
const biasBarData = [
  { name: "Younger", male: 18.3, female: 10.4, other: 5 },
  { name: "Worker", male: 16.3, female: 1.63, other: 3.2 },
];

export function BiasChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={biasBarData} layout="vertical" barGap={1}>
        <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} hide />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} width={50} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="male" stackId="a" fill="hsl(195 100% 50%)" barSize={16} radius={[0, 0, 0, 0]} />
        <Bar dataKey="female" stackId="a" fill="hsl(42 100% 68%)" barSize={16} />
        <Bar dataKey="other" stackId="a" fill="hsl(160 75% 52%)" barSize={16} radius={[0, 2, 2, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Bias Analysis line
const biasLineData = Array.from({ length: 21 }, (_, i) => ({
  name: `May ${i + 1}`,
  score: 0.85 + Math.random() * 0.08,
}));

export function BiasLineChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={biasLineData}>
        <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="score" radius={[1, 1, 0, 0]} barSize={6}>
          {biasLineData.map((entry, i) => (
            <Cell key={i} fill={entry.score > 0.9 ? "hsl(160 75% 52%)" : "hsl(195 100% 50%)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Fraud detection
const fraudData = Array.from({ length: 21 }, (_, i) => ({
  name: `May ${i + 1}`,
  value: 420 + Math.sin(i / 3) * 50 + Math.random() * 30,
  alert: i === 14,
}));

export function FraudChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={130}>
      <AreaChart data={fraudData}>
        <defs>
          <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(160 75% 52%)" stopOpacity={0.25} />
            <stop offset="100%" stopColor="hsl(160 75% 52%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={{ fontSize: 8, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} interval={19} />
        <YAxis tick={{ fontSize: 9, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} hide />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey="value" stroke="hsl(160 75% 52%)" fill="url(#fraudGrad)" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// LLM Requests
const llmReqData = Array.from({ length: 21 }, (_, i) => ({
  name: `May ${i + 1}`,
  value: 100 + Math.random() * 300 + i * 10,
}));

export function LLMRequestsChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={100}>
      <AreaChart data={llmReqData}>
        <defs>
          <linearGradient id="llmGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(195 100% 50%)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="hsl(195 100% 50%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={{ fontSize: 8, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} interval={19} />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey="value" stroke="hsl(160 75% 52%)" fill="url(#llmGrad)" strokeWidth={1.5} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Errors donut
const errorData = [
  { name: "Hallucinations", value: 112 },
  { name: "Errors", value: 810 },
  { name: "Brains", value: 322 },
];
const donutColors = ["hsl(42 100% 68%)", "hsl(0 85% 65%)", "hsl(195 100% 50%)"];

export function ErrorsDonut() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={140}>
      <PieChart>
        <Pie data={errorData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0} label={({ name, value }) => `${value}`} labelLine={false}>
          {errorData.map((_, i) => (
            <Cell key={i} fill={donutColors[i]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Token usage bar
const tokenData = Array.from({ length: 21 }, (_, i) => ({
  name: `May ${i + 1}`,
  tokens: 15000 + Math.random() * 25000,
}));

export function TokenChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={tokenData}>
        <XAxis dataKey="name" tick={{ fontSize: 8, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} interval={19} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="tokens" radius={[1, 1, 0, 0]} barSize={6}>
          {tokenData.map((entry, i) => (
            <Cell key={i} fill={entry.tokens > 30000 ? "hsl(160 75% 52%)" : "hsl(195 100% 50%)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Cost
const costData = Array.from({ length: 21 }, (_, i) => ({
  name: `May ${i + 1}`,
  value: 8 + Math.random() * 8,
}));

export function CostChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={costData}>
        <defs>
          <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(42 100% 68%)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="hsl(42 100% 68%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey="value" stroke="hsl(42 100% 68%)" fill="url(#costGrad)" strokeWidth={1.5} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Latency
const latencyData = Array.from({ length: 21 }, (_, i) => ({
  name: `May ${i + 1}`,
  value: 1.1 + Math.random() * 0.8,
}));

export function LatencyChart() {
  const tooltipStyle = useChartTooltipStyle();
  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart data={latencyData}>
        <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
        <Tooltip {...tooltipStyle} />
        <Line type="monotone" dataKey="value" stroke="hsl(270 60% 65%)" strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
