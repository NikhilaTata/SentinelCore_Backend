import { useEffect, useMemo, useState } from "react";
import { Server, Wifi, AlertTriangle, PowerOff, ShieldAlert, Siren, RefreshCw } from "lucide-react";
import { assetService } from "../services/assetService";
import SummaryCard from "../components/SummaryCard";
import AssetTable from "../components/AssetTable";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import ResourceUsageChart from "../charts/ResourceUsageChart";
import StatusChart from "../charts/StatusChart";
import NetworkChart from "../charts/NetworkChart";

export default function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await assetService.getAssets();
      setAssets(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to connect to SentinelCore backend at http://localhost:8080.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const stats = useMemo(() => {
    const online = assets.filter(a => ["ONLINE","UP","ACTIVE"].includes(String(a.status).toUpperCase())).length;
    const warning = assets.filter(a => String(a.status).toUpperCase().includes("WARNING")).length;
    const offline = assets.filter(a => ["OFFLINE","DOWN","INACTIVE"].includes(String(a.status).toUpperCase())).length;
    const critical = assets.filter(a => Number(a.cpuUsage) >= 90 || Number(a.memoryUsage) >= 90 || Number(a.diskUsage) >= 90).length;
    return { online, warning, offline, critical };
  }, [assets]);

  async function remove(asset) {
    if (!confirm(`Delete ${asset.assetName}?`)) return;
    try {
      await assetService.deleteAsset(asset.id);
      setToast("Asset deleted successfully.");
      load();
    } catch {
      setToast("Failed to delete asset.");
    }
  }

  return (
    <div>
      <div className="page-heading">
        <div><h2>Good evening, Admin</h2><p>Here's what's happening across your infrastructure.</p></div>
        <button className="btn secondary" onClick={load}><RefreshCw size={16}/> Refresh</button>
      </div>

      {error && <div className="error-banner">{error}<button onClick={load}>Retry</button></div>}

      {loading ? <LoadingSpinner text="Loading SentinelCore data..." /> : <>
        <div className="summary-grid">
          <SummaryCard title="Total Assets" value={assets.length} icon={Server} detail="Registered infrastructure" />
          <SummaryCard title="Online Assets" value={stats.online} icon={Wifi} tone="green" detail="Healthy / active" />
          <SummaryCard title="Warning Assets" value={stats.warning} icon={AlertTriangle} tone="orange" detail="Needs attention" />
          <SummaryCard title="Offline Assets" value={stats.offline} icon={PowerOff} tone="red" detail="Requires action" />
          <SummaryCard title="Critical Alerts" value={stats.critical} icon={ShieldAlert} tone="red" detail="High resource usage" />
          <SummaryCard title="Open Incidents" value="—" icon={Siren} detail="Connect incident API" />
        </div>

        <div className="chart-grid">
          <section className="panel chart-panel wide"><div className="panel-header"><div><h3>Resource Usage by Asset</h3><p>CPU, memory and disk utilization</p></div></div><ResourceUsageChart assets={assets} /></section>
          <section className="panel chart-panel"><div className="panel-header"><div><h3>Asset Status</h3><p>Current infrastructure state</p></div></div><StatusChart assets={assets} /></section>
          <section className="panel chart-panel wide"><div className="panel-header"><div><h3>Network Usage</h3><p>Network utilization across assets</p></div></div><NetworkChart assets={assets} /></section>
        </div>

        <section className="panel">
          <div className="panel-header"><div><h3>Current Assets</h3><p>Live asset inventory from Spring Boot API</p></div></div>
          <AssetTable assets={assets.slice(0, 10)} onDelete={remove} />
        </section>
      </>}

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}