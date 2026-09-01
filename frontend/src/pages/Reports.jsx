import { FileBarChart, ShieldAlert, Server, Activity } from "lucide-react";

const reports = [
  ["Asset Health Report", "Infrastructure status, utilization and availability.", Server],
  ["Security Alert Report", "Alert severity, frequency and affected assets.", ShieldAlert],
  ["Incident Report", "Open, investigating and resolved incidents.", FileBarChart],
  ["System Performance Report", "CPU, memory, disk and network trends.", Activity]
];

export default function Reports() {
  return <div><div className="page-heading"><div><h2>Reports</h2><p>Generate operational and security intelligence.</p></div></div>
    <div className="report-grid">{reports.map(([title, desc, Icon]) => <div className="report-card" key={title}><div className="report-icon"><Icon size={23}/></div><h3>{title}</h3><p>{desc}</p><button className="btn secondary">View Report</button></div>)}</div>
  </div>;
}