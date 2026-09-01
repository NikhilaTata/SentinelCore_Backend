import { useState } from "react";

const initial = {
  assetName: "",
  assetType: "SERVER",
  ipAddress: "",
  location: "",
  cpuUsage: "",
  memoryUsage: "",
  diskUsage: "",
  networkUsage: "",
  status: "ONLINE"
};

export default function AssetForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function submit(e) {
    e.preventDefault();
    setError("");

    if (!form.assetName.trim() || !form.assetType || !form.ipAddress.trim()) {
      setError("Asset Name, Asset Type and IP Address are required.");
      return;
    }

    const fields = ["cpuUsage", "memoryUsage", "diskUsage", "networkUsage"];
    for (const field of fields) {
      if (form[field] !== "" && (Number(form[field]) < 0 || Number(form[field]) > 100)) {
        setError(`${field} must be between 0 and 100.`);
        return;
      }
    }

    onSubmit({
      ...form,
      cpuUsage: form.cpuUsage === "" ? 0 : Number(form.cpuUsage),
      memoryUsage: form.memoryUsage === "" ? 0 : Number(form.memoryUsage),
      diskUsage: form.diskUsage === "" ? 0 : Number(form.diskUsage),
      networkUsage: form.networkUsage === "" ? 0 : Number(form.networkUsage)
    });
    setForm(initial);
  }

  return (
    <form className="asset-form" onSubmit={submit}>
      {error && <div className="form-error">{error}</div>}
      <div className="form-grid">
        <label>Asset Name *<input name="assetName" value={form.assetName} onChange={change} placeholder="e.g. WebServer-01" /></label>
        <label>Asset Type *<select name="assetType" value={form.assetType} onChange={change}>
          <option>SERVER</option><option>ROUTER</option><option>DATABASE</option>
          <option>NETWORK</option><option>STORAGE</option><option>SECURITY</option><option>COMPUTER</option>
        </select></label>
        <label>IP Address *<input name="ipAddress" value={form.ipAddress} onChange={change} placeholder="192.168.1.10" /></label>
        <label>Location<input name="location" value={form.location} onChange={change} placeholder="Hyderabad" /></label>
        <label>CPU Usage %<input type="number" min="0" max="100" name="cpuUsage" value={form.cpuUsage} onChange={change} placeholder="45" /></label>
        <label>Memory Usage %<input type="number" min="0" max="100" name="memoryUsage" value={form.memoryUsage} onChange={change} placeholder="60" /></label>
        <label>Disk Usage %<input type="number" min="0" max="100" name="diskUsage" value={form.diskUsage} onChange={change} placeholder="70" /></label>
        <label>Network Usage %<input type="number" min="0" max="100" name="networkUsage" value={form.networkUsage} onChange={change} placeholder="25" /></label>
        <label>Status<select name="status" value={form.status} onChange={change}>
          <option>ONLINE</option><option>WARNING</option><option>OFFLINE</option><option>ACTIVE</option><option>INACTIVE</option>
        </select></label>
      </div>
      <div className="form-actions">
        {onCancel && <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn primary">Add Asset</button>
      </div>
    </form>
  );
}