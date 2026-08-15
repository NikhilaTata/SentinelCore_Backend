function Reports() {
  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Security Reports</h1>
          <p>View infrastructure health and security analytics.</p>
        </div>

        <button className="primary-button">
          ⬇ Generate Report
        </button>
      </div>

      <div className="report-grid">

        <div className="report-card">
          <h2>Asset Health Report</h2>
          <p>
            Overview of CPU, memory and disk usage across monitored assets.
          </p>
          <button>View Report →</button>
        </div>

        <div className="report-card">
          <h2>Incident Report</h2>
          <p>
            Summary of incidents, severity levels and resolution status.
          </p>
          <button>View Report →</button>
        </div>

        <div className="report-card">
          <h2>Security Report</h2>
          <p>
            Security alerts and overall infrastructure security status.
          </p>
          <button>View Report →</button>
        </div>

      </div>

      <div className="table-card report-summary">

        <div className="table-header">
          <h2>System Summary</h2>
        </div>

        <div className="summary-grid">

          <div>
            <span>Total Assets</span>
            <strong>0</strong>
          </div>

          <div>
            <span>Active Assets</span>
            <strong>0</strong>
          </div>

          <div>
            <span>Security Alerts</span>
            <strong>0</strong>
          </div>

          <div>
            <span>Incidents</span>
            <strong>0</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;