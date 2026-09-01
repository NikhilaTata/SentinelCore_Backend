import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function AssetTable({ assets, onDelete }) {
  const navigate = useNavigate();

  if (!assets.length) {
    return <div className="empty-state"><h3>No assets found</h3><p>Try changing your search/filter or register a new asset.</p></div>;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead><tr>
          <th>ID</th><th>Name</th><th>Type</th><th>IP Address</th><th>Location</th>
          <th>CPU</th><th>Memory</th><th>Disk</th><th>Network</th><th>Status</th><th>Created</th><th>Action</th>
        </tr></thead>
        <tbody>
          {assets.map((a) => (
            <tr key={a.id}>
              <td>#{a.id}</td>
              <td><strong>{a.assetName}</strong></td>
              <td><span className="type-pill">{a.assetType}</span></td>
              <td className="mono">{a.ipAddress}</td>
              <td>{a.location || "—"}</td>
              <td><Usage value={a.cpuUsage} /></td>
              <td><Usage value={a.memoryUsage} /></td>
              <td><Usage value={a.diskUsage} /></td>
              <td>{a.networkUsage ?? 0}%</td>
              <td><StatusBadge status={a.status} /></td>
              <td>{a.createdDate ? new Date(a.createdDate).toLocaleDateString() : "—"}</td>
              <td>
                <div className="row-actions">
                  <button className="table-action" title="View" onClick={() => navigate(`/assets/${a.id}`)}><Eye size={16} /></button>
                  <button className="table-action delete" title="Delete" onClick={() => onDelete(a)}><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Usage({ value }) {
  const n = Number(value ?? 0);
  return <span className={n >= 80 ? "usage-high" : n >= 60 ? "usage-medium" : ""}>{n}%</span>;
}