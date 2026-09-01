import { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  return <div><div className="page-heading"><div><h2>Settings</h2><p>Configure your SentinelCore workspace.</p></div></div>
    <section className="panel settings-panel"><h3>General Settings</h3>
      <label>Organization Name<input defaultValue="SentinelCore" /></label>
      <label>Administrator Email<input type="email" defaultValue="admin@sentinelcore.com" /></label>
      <label>API Base URL<input defaultValue={import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"} readOnly /></label>
      <div className="setting-row"><div><strong>Automatic monitoring refresh</strong><p>Refresh dashboard data when this option is enabled.</p></div><input type="checkbox" defaultChecked /></div>
      <button className="btn primary" onClick={() => setSaved(true)}>{saved ? "Saved" : "Save Settings"}</button>
    </section>
  </div>;
}