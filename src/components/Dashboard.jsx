import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");

        // Agar token nahi hai to login pe bhej do
        if (!token) {
          navigate("/");
          return;
        }

        const res = await fetch(`${API_BASE}/dashboard/metrics`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const data = await res.json();
        setMetrics(data);

      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Unified Observability Dashboard
      </h1>

      <div className="space-y-4">
        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="font-semibold">
            Total Chats: {metrics?.llmMetrics?.totalChats || 0}
          </h2>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="font-semibold">
            Total Tokens: {metrics?.llmMetrics?.totalTokens || 0}
          </h2>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="font-semibold">
            Hallucination Rate: {metrics?.llmMetrics?.hallucinationRate || 0}%
          </h2>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="font-semibold">
            Total Loans: {metrics?.loanMetrics?.totalLoans || 0}
          </h2>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="font-semibold">
            Active Alerts: {metrics?.alerts?.activeAlerts || 0}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;