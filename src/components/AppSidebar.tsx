import { useState } from "react";
import { LayoutDashboard, Brain, BarChart3, Bell, Shield, ChevronDown, ChevronRight, Landmark, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarGroup {
  title: string;
  icon: React.ElementType;
  children?: { title: string; url: string }[];
  url?: string;
}

const sidebarGroups: SidebarGroup[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  {
    title: "Data Insights",
    icon: BarChart3,
    children: [
      { title: "Overview", url: "/data-insights" },
    ],
  },
  {
    title: "Traditional ML",
    icon: Brain,
    children: [
      { title: "Overview", url: "/traditional-ml" },
    ],
  },
  {
    title: "LLM Observability",
    icon: BarChart3,
    children: [
      { title: "Overview", url: "/llm-observability" },
    ],
  },
  {
    title: "Alerts",
    icon: Bell,
    children: [
      { title: "Active", url: "/alerts" },
    ],
  },
  { title: "Governance", icon: Shield, url: "/governance" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Traditional ML"]);

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex flex-col w-[220px] min-h-screen bg-sidebar border-r border-sidebar-border shrink-0">
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-sidebar-border">
        <Landmark className="w-6 h-6 text-primary" />
        <span className="text-foreground font-semibold text-base tracking-tight">
          BankAI <span className="text-muted-foreground font-normal text-sm">Analytics</span>
        </span>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {sidebarGroups.map((group) => {
          const hasChildren = !!group.children;
          const isExpanded = expandedGroups.includes(group.title);
          const Icon = group.icon;

          if (!hasChildren) {
            return (
              <NavLink
                key={group.title}
                to={group.url!}
                end
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                activeClassName="bg-sidebar-accent text-foreground"
              >
                <Icon className="w-4 h-4" />
                <span>{group.title}</span>
              </NavLink>
            );
          }

          return (
            <div key={group.title}>
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-[13px] font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{group.title}</span>
                </span>
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {isExpanded && (
                <div className="ml-4 pl-3 border-l border-sidebar-border space-y-0.5 mt-0.5">
                  {group.children!.map((child) => (
                    <NavLink
                      key={child.url}
                      to={child.url}
                      end
                      className="block px-3 py-1.5 rounded-md text-[13px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      activeClassName="text-primary font-medium bg-sidebar-accent"
                    >
                      {child.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-sidebar-border space-y-1">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
