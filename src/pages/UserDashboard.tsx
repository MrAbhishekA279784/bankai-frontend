import { useState } from "react";
import { Send, Bot, User, Landmark } from "lucide-react";

function GaugeChart({ value }: { value: number }) {
  const angle = (value / 100) * 180;
  const color = value > 70 ? "hsl(160 75% 52%)" : value > 40 ? "hsl(42 100% 68%)" : "hsl(0 85% 65%)";
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-48 h-28">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="hsl(220 20% 18%)" strokeWidth="16" strokeLinecap="round" />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 251.2} 251.2`}
        />
        <text x="100" y="95" textAnchor="middle" className="text-3xl font-bold" fill="hsl(210 40% 93%)" fontSize="28">
          {value}%
        </text>
      </svg>
      <p className="text-sm font-medium text-foreground mt-1">
        {value > 70 ? "Likely Approved" : value > 40 ? "Under Review" : "Likely Rejected"}
      </p>
    </div>
  );
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function UserDashboard() {
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [approvalScore, setApprovalScore] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I'm BankAI Assistant. I can help you with loan eligibility questions, explain our products, or guide you through the application process. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  const checkEligibility = () => {
    const inc = parseFloat(income) || 0;
    const ag = parseInt(age) || 0;
    const cs = parseInt(creditScore) || 0;
    const la = parseFloat(loanAmount) || 0;

    let score = 50;
    if (cs > 750) score += 25; else if (cs > 650) score += 15; else score -= 10;
    if (inc > 80000) score += 15; else if (inc > 50000) score += 8;
    if (la < inc * 3) score += 10; else if (la > inc * 5) score -= 15;
    if (ag >= 25 && ag <= 55) score += 5;
    score = Math.max(0, Math.min(100, score));
    setApprovalScore(score);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      const responses = [
        "Based on your profile, I'd recommend our Standard Home Loan with competitive interest rates starting at 6.5% APR.",
        "Your credit score plays a significant role in determining loan eligibility. A score above 750 typically qualifies for our premium rates.",
        "For the loan amount you're considering, you'll need a minimum annual income of $50,000 and a clean credit history.",
        "I can help you understand the different loan products we offer. Would you like to know about personal loans, home loans, or business loans?",
      ];
      const reply: ChatMessage = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <Landmark className="w-6 h-6 text-primary" />
          <span className="text-foreground font-semibold">BankAI <span className="text-muted-foreground font-normal text-sm">Portal</span></span>
        </div>
        <a href="/login" onClick={(e) => { e.preventDefault(); localStorage.removeItem("bankai_user"); window.location.href = "/login"; }} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Logout</a>
      </header>

      <div className="flex h-[calc(100vh-49px)]">
        {/* Left Panel - Loan Prediction */}
        <div className="w-1/2 border-r border-border p-6 overflow-auto">
          <h2 className="text-lg font-semibold text-foreground mb-4">Loan Prediction</h2>
          <div className="space-y-4">
            {[
              { label: "Annual Income ($)", value: income, set: setIncome, placeholder: "e.g. 75000" },
              { label: "Age", value: age, set: setAge, placeholder: "e.g. 35" },
              { label: "Credit Score", value: creditScore, set: setCreditScore, placeholder: "e.g. 720" },
              { label: "Loan Amount ($)", value: loanAmount, set: setLoanAmount, placeholder: "e.g. 200000" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full h-11 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            ))}
            <button
              onClick={checkEligibility}
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Check Eligibility
            </button>
          </div>

          {approvalScore !== null && (
            <div className="mt-6 rounded-xl border border-border bg-card p-6 flex flex-col items-center">
              <p className="text-sm font-semibold text-foreground mb-3">Approval Probability</p>
              <GaugeChart value={approvalScore} />
            </div>
          )}
        </div>

        {/* Right Panel - Chat */}
        <div className="w-1/2 flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">BankAI Assistant</h2>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground border border-border"
                }`}>
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about loans, eligibility..."
                className="flex-1 h-10 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={sendMessage}
                className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
