export default function StatusBadge({ status }) {
  const value = String(status || "UNKNOWN").toUpperCase();
  const cls =
    value.includes("OFFLINE") || value.includes("CRITICAL") || value.includes("DOWN")
      ? "danger"
      : value.includes("WARNING") || value.includes("HIGH")
      ? "warning"
      : value.includes("ACTIVE") || value.includes("ONLINE") || value.includes("UP")
      ? "success"
      : "neutral";

  return <span className={`status-badge ${cls}`}><i />{value}</span>;
}