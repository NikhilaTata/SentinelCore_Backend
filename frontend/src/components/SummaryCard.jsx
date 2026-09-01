import { ArrowUpRight } from "lucide-react";

export default function SummaryCard({ title, value, icon: Icon, tone = "default", detail }) {
  return (
    <div className={`summary-card ${tone}`}>
      <div className="summary-top">
        <div className="summary-icon"><Icon size={20} /></div>
        <ArrowUpRight size={17} className="muted" />
      </div>
      <div className="summary-value">{value}</div>
      <div className="summary-title">{title}</div>
      {detail && <div className="summary-detail">{detail}</div>}
    </div>
  );
}