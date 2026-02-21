import { useState } from "react";
import { Filter, Download, Bookmark, Calendar } from "lucide-react";

const timeFilters = ["Custom", "24H", "7D", "1M", "3M"];

export function TopBar() {
  const [activeFilter, setActiveFilter] = useState("24H");

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          Unified <span className="font-bold">Observability Dashboard</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-secondary rounded-lg p-0.5 border border-border">
          {timeFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "Custom" && <Calendar className="w-3 h-3" />}
              {f}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-foreground bg-secondary border border-border hover:bg-muted transition-colors">
          <Filter className="w-3.5 h-3.5" />
          Show Filters
        </button>
        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-foreground bg-secondary border border-border hover:bg-muted transition-colors">
          <Bookmark className="w-3.5 h-3.5" />
          Saved Filters
        </button>
      </div>
    </header>
  );
}
