import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-section-title">
        MAIN MENU
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/">
          <span>📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/assets">
          <span>🖥️</span>
          <span>Assets</span>
        </NavLink>

        <NavLink to="/alerts">
          <span>🔔</span>
          <span>Alerts</span>
        </NavLink>

        <NavLink to="/incidents">
          <span>🚨</span>
          <span>Incidents</span>
        </NavLink>

        <NavLink to="/reports">
          <span>📈</span>
          <span>Reports</span>
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;