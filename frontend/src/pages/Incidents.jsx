function Incidents() {
  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Incident Management</h1>
          <p>Track, investigate and resolve security incidents.</p>
        </div>

        <button className="primary-button">
          + Create Incident
        </button>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon critical-icon">🚨</div>
          <div>
            <span>Open Incidents</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning-icon">🔍</div>
          <div>
            <span>Investigating</span>
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
          <h2>Incidents</h2>

          <select>
            <option>All Incidents</option>
            <option>Open</option>
            <option>Investigating</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>No incidents found</h3>
          <p>Security incidents will appear here.</p>
        </div>

      </div>

    </div>
  );
}

export default Incidents;