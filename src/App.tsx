import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Index from "./pages/Index";
import TraditionalML from "./pages/TraditionalML";
import LLMObservability from "./pages/LLMObservability";
import Governance from "./pages/Governance";
import Alerts from "./pages/Alerts";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function RootRedirect() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === "Engineer" ? "/dashboard" : "/portal"} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["Engineer"]}><Index /></ProtectedRoute>} />
              <Route path="/data-insights" element={<ProtectedRoute allowedRoles={["Engineer"]}><Index /></ProtectedRoute>} />
              <Route path="/traditional-ml" element={<ProtectedRoute allowedRoles={["Engineer"]}><TraditionalML /></ProtectedRoute>} />
              <Route path="/llm-observability" element={<ProtectedRoute allowedRoles={["Engineer"]}><LLMObservability /></ProtectedRoute>} />
              <Route path="/governance" element={<ProtectedRoute allowedRoles={["Engineer"]}><Governance /></ProtectedRoute>} />
              <Route path="/alerts" element={<ProtectedRoute allowedRoles={["Engineer"]}><Alerts /></ProtectedRoute>} />
              <Route path="/portal" element={<ProtectedRoute allowedRoles={["User"]}><UserDashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
