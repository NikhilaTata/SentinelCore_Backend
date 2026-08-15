import { useEffect, useState } from "react";
import axios from "axios";
import AssetCard from "../components/AssetCard";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get("http://localhost:8080/assets");

      setAssets(response.data);
    } catch (err) {
      console.error("Error loading assets:", err);
      setError(
        "Unable to connect to the backend. Make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.assetName?.toLowerCase().includes(search.toLowerCase()) ||
      asset.ipAddress?.toLowerCase().includes(search.toLowerCase()) ||
      asset.location?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || asset.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container">

      {/* Page Header */}
      <div className="page-header">

        <div>
          <h1>Asset Management</h1>

          <p>
            Monitor and manage all infrastructure assets.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={fetchAssets}
        >
          ↻ Refresh
        </button>

      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            🖥️
          </div>

          <div>
            <span>Total Assets</span>
            <strong>{assets.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active-icon">
            ✓
          </div>

          <div>
            <span>Active</span>
            <strong>
              {assets.filter(
                (asset) => asset.status === "Active"
              ).length}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning-icon">
            ⚠️
          </div>

          <div>
            <span>Warnings</span>
            <strong>
              {assets.filter(
                (asset) => asset.status === "Warning"
              ).length}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon critical-icon">
            🚨
          </div>

          <div>
            <span>Critical</span>
            <strong>
              {assets.filter(
                (asset) =>
                  asset.status === "Critical"
              ).length}
            </strong>
          </div>
        </div>

      </div>

      {/* Search and Filter */}
      <div className="asset-controls">

        <input
          type="text"
          placeholder="Search by name, IP address or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Warning">Warning</option>
          <option value="Critical">Critical</option>
        </select>

      </div>

      {/* Loading */}
      {loading && (
        <div className="loading">
          Loading assets...
        </div>
      )}

      {/* Backend Error */}
      {!loading && error && (
        <div className="error-message">
          <h3>⚠️ Backend Connection Error</h3>
          <p>{error}</p>
          <button
            className="secondary-button"
            onClick={fetchAssets}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Asset Cards */}
      {!loading && !error && (
        <div className="asset-grid">

          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                🖥️
              </div>

              <h3>No assets found</h3>

              <p>
                There are no assets matching your search.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Assets;