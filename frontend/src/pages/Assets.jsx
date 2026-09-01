import { useEffect, useMemo, useState } from "react";
import { Plus, Search, RotateCcw } from "lucide-react";
import { assetService } from "../services/assetService";
import AssetTable from "../components/AssetTable";
import AssetForm from "../components/AssetForm";
import ConfirmDialog from "../components/ConfirmDialog";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await assetService.getAssets();
      setAssets(Array.isArray(data) ? data : []);
    } catch { setToast("Unable to load assets from backend."); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => assets.filter(a => {
    const text = `${a.assetName} ${a.ipAddress} ${a.location} ${a.assetType}`.toLowerCase();
    return (!search || text.includes(search.toLowerCase()))
      && (!status || String(a.status).toUpperCase() === status)
      && (!type || String(a.assetType).toUpperCase() === type);
  }), [assets, search, status, type]);

  async function create(asset) {
    try {
      await assetService.createAsset(asset);
      setShowForm(false);
      setToast("Asset added successfully.");
      load();
    } catch { setToast("Failed to add asset. Check your Spring Boot API."); }
  }

  async function remove() {
    if (!deleteTarget) return;
    try {
      await assetService.deleteAsset(deleteTarget.id);
      setToast("Asset deleted successfully.");
      setDeleteTarget(null);
      load();
    } catch { setToast("Failed to delete asset."); }
  }

  return (
    <div>
      <div className="page-heading">
        <div><h2>Asset Management</h2><p>Monitor, register and manage your infrastructure.</p></div>
        <button className="btn primary" onClick={() => setShowForm(v => !v)}><Plus size={17}/> Register New Asset</button>
      </div>

      {showForm && <section className="panel form-panel"><div className="panel-header"><div><h3>Register New Asset</h3><p>Add a monitored asset to SentinelCore.</p></div></div><AssetForm onSubmit={create} onCancel={() => setShowForm(false)} /></section>}

      <section className="panel">
        <div className="filter-bar">
          <div className="search-input"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search assets..." /></div>
          <select value={status} onChange={e => setStatus(e.target.value)}><option value="">All Status</option><option>ONLINE</option><option>WARNING</option><option>OFFLINE</option><option>ACTIVE</option><option>INACTIVE</option></select>
          <select value={type} onChange={e => setType(e.target.value)}><option value="">All Types</option><option>SERVER</option><option>ROUTER</option><option>DATABASE</option><option>NETWORK</option><option>STORAGE</option><option>SECURITY</option><option>COMPUTER</option></select>
          <button className="btn secondary" onClick={() => {setSearch("");setStatus("");setType("");}}><RotateCcw size={16}/> Reset</button>
        </div>
        {loading ? <LoadingSpinner text="Loading assets..." /> : <AssetTable assets={filtered} onDelete={setDeleteTarget} />}
      </section>

      <ConfirmDialog open={Boolean(deleteTarget)} title="Delete asset?" message={`This will permanently remove ${deleteTarget?.assetName || "this asset"} from SentinelCore.`} onCancel={() => setDeleteTarget(null)} onConfirm={remove} />
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}