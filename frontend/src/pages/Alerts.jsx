function Alerts() {
  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Security Alerts</h1>
          <p>Monitor and manage security alerts across your infrastructure.</p>
        </div>

        <button className="secondary-button">
          ↻ Refresh
        </button>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon critical-icon">🚨</div>
          <div>
            <span>Critical Alerts</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning-icon">⚠️</div>
          <div>
            <span>Warnings</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active-icon">✓</div>
          <div>
            <span>Resolved</span>
            <strong>0</strong>
          </div>
        </div>

      </div>

      <div className="table-card">

        <div className="table-header">
          <h2>Recent Alerts</h2>

          <select>
            <option>All Alerts</option>
            <option>Critical</option>
            <option>Warning</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="empty-state">
          <div className="empty-icon">🔔</div>
          <h3>No alerts available</h3>
          <p>Security alerts will appear here when detected.</p>
        </div>

      </div>

    </div>
  );
}

export default Alerts;