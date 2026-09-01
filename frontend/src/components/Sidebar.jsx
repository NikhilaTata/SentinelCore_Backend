import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Server, Bell, ShieldAlert, FileText,
  ClipboardList, Settings, LogOut, X, ShieldCheck
} from "lucide-react";
import { authService } from "../services/authService";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assets", label: "Assets", icon: Server },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/incidents", label: "Incidents", icon: ShieldAlert },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/audit-logs", label: "Audit Logs", icon: ClipboardList },
  { to: "/settings", label: "Settings", icon: Settings }
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  function logout() {
    authService.logout();
    navigate("/login");
  }

  return (
    <>
      {open && <div className="mobile-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><ShieldCheck size={23} /></div>
          <div>
            <strong>SentinelCore</strong>
            <span>Security Operations</span>
          </div>
          <button className="mobile-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="nav-section-title">MAIN MENU</div>
        <nav className="sidebar-nav">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <div className="admin-card">
          <div className="avatar">A</div>
          <div className="admin-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>
    </>
  );
}