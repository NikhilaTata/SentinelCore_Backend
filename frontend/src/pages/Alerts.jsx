import { useEffect, useState } from "react";
import { alertService } from "../services/alertService";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    alertService.getAlerts().then(data => setAlerts(Array.isArray(data) ? data : [])).catch(() => setError("Alert API is not available yet. Connect /alerts in alertService.js.")).finally(() => setLoading(false));
  }, []);

  return <div><div className="page-heading"><div><h2>Security Alerts</h2><p>Review active security and infrastructure alerts.</p></div></div>
    {error && <div className="info-banner">{error}</div>}
    <section className="panel">{loading ? <LoadingSpinner text="Loading alerts..." /> : !alerts.length ? <div className="empty-state"><h3>No alerts available</h3><p>Once your Spring Boot alert endpoint is connected, alerts will appear here.</p></div> :
      <div className="table-wrap"><table className="data-table"><thead><tr><th>ID</th><th>Asset</th><th>Type</th><th>Severity</th><th>Message</th><th>Timestamp</th><th>Status</th></tr></thead><tbody>{alerts.map(a => <tr key={a.id}><td>#{a.id}</td><td><strong>{a.assetName || a.asset?.assetName || "—"}</strong></td><td>{a.alertType || "—"}</td><td><StatusBadge status={a.severity}/></td><td>{a.message || "—"}</td><td>{a.timestamp ? new Date(a.timestamp).toLocaleString() : "—"}</td><td><StatusBadge status={a.status}/></td></tr>)}</tbody></table></div>}
    </section>
  </div>;
}