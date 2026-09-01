import { useState } from "react";
import { Search } from "lucide-react";

const sample = [
  { time: "—", user: "Admin", action: "System", resource: "SentinelCore", description: "Audit API ready for backend connection." }
];

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const rows = sample.filter(x => `${x.user} ${x.action} ${x.resource} ${x.description}`.toLowerCase().includes(search.toLowerCase()));

  return <div><div className="page-heading"><div><h2>Audit Logs</h2><p>Review administrative and platform activity.</p></div></div>
    <section className="panel"><div className="filter-bar"><div className="search-input"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search audit logs..." /></div></div>
      <div className="table-wrap"><table className="data-table"><thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Resource</th><th>Description</th></tr></thead><tbody>{rows.map((r,i)=><tr key={i}><td>{r.time}</td><td>{r.user}</td><td>{r.action}</td><td>{r.resource}</td><td>{r.description}</td></tr>)}</tbody></table></div>
    </section>
  </div>;
}