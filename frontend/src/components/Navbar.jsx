function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-brand">
        <h2>SentinelCore</h2>
        <span>Security Operations Platform</span>
      </div>

      <div className="navbar-right">

        <div className="system-status">
          <span className="status-dot"></span>
          System Operational
        </div>

        <button className="notification-button">
          🔔 <span>3</span>
        </button>

        <div className="user-info">

          <div className="user-avatar">
            N
          </div>

          <div className="user-details">
            <strong>Administrator</strong>
            <span>Security Analyst</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;