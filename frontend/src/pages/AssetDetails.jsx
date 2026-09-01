import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Server } from "lucide-react";
import { assetService } from "../services/assetService";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ResourceUsageChart from "../charts/ResourceUsageChart";
import NetworkChart from "../charts/NetworkChart";

export default function AssetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    assetService.getAssetById(id).then(setAsset).catch(() => setError("Unable to load asset details."));
  }, [id]);

  if (error) return <div className="error-banner">{error}</div>;
  if (!asset) return <LoadingSpinner text="Loading asset details..." />;

  return (
    <div>
      <button className="back-link" onClick={() => navigate("/assets")}><ArrowLeft size={17}/> Back to Assets</button>
      <div className="detail-hero">
        <div className="detail-title"><div className="large-icon"><Server /></div><div><h2>{asset.assetName}</h2><p>{asset.assetType} · {asset.ipAddress}</p></div></div>
        <StatusBadge status={asset.status} />
      </div>
      <div className="details-grid">
        <div className="detail-item"><span>IP Address</span><strong>{asset.ipAddress}</strong></div>
        <div className="detail-item"><span>Location</span><strong>{asset.location || "—"}</strong></div>
        <div className="detail-item"><span>CPU Usage</span><strong>{asset.cpuUsage ?? 0}%</strong></div>
        <div className="detail-item"><span>Memory Usage</span><strong>{asset.memoryUsage ?? 0}%</strong></div>
        <div className="detail-item"><span>Disk Usage</span><strong>{asset.diskUsage ?? 0}%</strong></div>
        <div className="detail-item"><span>Network Usage</span><strong>{asset.networkUsage ?? 0}%</strong></div>
      </div>
      <div className="chart-grid">
        <section className="panel chart-panel wide"><div className="panel-header"><div><h3>Resource Usage</h3><p>Current utilization</p></div></div><ResourceUsageChart assets={[asset]} /></section>
        <section className="panel chart-panel"><div className="panel-header"><div><h3>Network</h3><p>Current network usage</p></div></div><NetworkChart assets={[asset]} /></section>
      </div>
    </div>
  );
}