import { useEffect, useState } from "react";
import { incidentService } from "../services/incidentService";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";

export default function Incidents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    incidentService.getIncidents().then(data => setItems(Array.isArray(data) ? data : [])).catch(() => setError("Incident API is not available yet. Connect /incidents in incidentService.js.")).finally(() => setLoading(false));
  }, []);

  return <div><div className="page-heading"><div><h2>Security Incidents</h2><p>Track investigation and resolution of incidents.</p></div></div>
    {error && <div className="info-banner">{error}</div>}
    <section className="panel">{loading ? <LoadingSpinner text="Loading incidents..." /> : !items.length ? <div className="empty-state"><h3>No incidents available</h3><p>Connect your Spring Boot incident endpoint to populate this page.</p></div> :
      <div className="table-wrap"><table className="data-table"><thead><tr><th>ID</th><th>Title</th><th>Asset</th><th>Severity</th><th>Assigned To</th><th>Status</th><th>Created</th></tr></thead><tbody>{items.map(i => <tr key={i.id}><td>#{i.id}</td><td><strong>{i.title || "—"}</strong></td><td>{i.assetName || "—"}</td><td><StatusBadge status={i.severity}/></td><td>{i.assignedTo || "Unassigned"}</td><td><StatusBadge status={i.status}/></td><td>{i.createdAt ? new Date(i.createdAt).toLocaleString() : "—"}</td></tr>)}</tbody></table></div>}
    </section>
  </div>;
}