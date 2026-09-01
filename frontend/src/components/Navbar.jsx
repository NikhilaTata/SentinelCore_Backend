import { useLocation } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

const titles = {
  "/dashboard": ["Dashboard", "Infrastructure overview and system health"],
  "/assets": ["Assets", "Monitor and manage infrastructure assets"],
  "/alerts": ["Alerts", "Security alerts and notifications"],
  "/incidents": ["Incidents", "Track and resolve security incidents"],
  "/reports": ["Reports", "Operational and security reports"],
  "/audit-logs": ["Audit Logs", "Review platform activity"],
  "/settings": ["Settings", "Configure SentinelCore"]
};

export default function Navbar({ onMenu }) {
  const { pathname } = useLocation();
  const title = titles[pathname]?.[0] || "SentinelCore";
  const subtitle = titles[pathname]?.[1] || "Enterprise Security Operations Platform";

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenu}><Menu size={22} /></button>
      <div className="top-title">
        <h1>{title}</h1>
        <span>{subtitle}</span>
      </div>

      <div className="top-actions">
        <div className="global-search">
          <Search size={17} />
          <input placeholder="Search..." />
          <kbd>Ctrl K</kbd>
        </div>
        <button className="icon-btn notification-btn" title="Notifications">
          <Bell size={20} />
          <span>3</span>
        </button>
        <div className="user-menu">
          <div className="avatar small">A</div>
          <div className="user-text"><strong>Admin</strong><span>Security Admin</span></div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}