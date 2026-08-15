function AssetCard({ asset }) {
    const getStatusClass = (status) => {
        if (status === "Active") {
            return "status-active";
        }

        if (status === "Warning") {
            return "status-warning";
        }

        return "status-critical";
    };

    const getUsageClass = (value) => {
        if (value >= 80) {
            return "usage-critical";
        }

        if (value >= 60) {
            return "usage-warning";
        }

        return "usage-normal";
    };

    return (
        <div className="asset-card">

            {/* Header */}
            <div className="asset-card-header">

                <div>
                    <h3>{asset.assetName}</h3>
                    <p>{asset.assetType}</p>
                </div>

                <span
                    className={`status-badge ${getStatusClass(asset.status)}`}
                >
                    {asset.status}
                </span>

            </div>

            {/* Asset Information */}
            <div className="asset-info">

                <div className="info-item">
                    <span>IP Address</span>
                    <strong>{asset.ipAddress}</strong>
                </div>

                <div className="info-item">
                    <span>Location</span>
                    <strong>{asset.location}</strong>
                </div>

            </div>

            {/* Resource Usage */}
            <div className="usage-section">

                <div className="usage-item">

                    <div className="usage-label">
                        <span>CPU Usage</span>
                        <strong>{asset.cpuUsage}%</strong>
                    </div>

                    <div className="progress-bar">
                        <div
                            className={`progress-fill ${getUsageClass(
                                asset.cpuUsage
                            )}`}
                            style={{ width: `${asset.cpuUsage}%` }}
                        ></div>
                    </div>

                </div>

                <div className="usage-item">

                    <div className="usage-label">
                        <span>Memory Usage</span>
                        <strong>{asset.memoryUsage}%</strong>
                    </div>

                    <div className="progress-bar">
                        <div
                            className={`progress-fill ${getUsageClass(
                                asset.memoryUsage
                            )}`}
                            style={{ width: `${asset.memoryUsage}%` }}
                        ></div>
                    </div>

                </div>

                <div className="usage-item">

                    <div className="usage-label">
                        <span>Disk Usage</span>
                        <strong>{asset.diskUsage}%</strong>
                    </div>

                    <div className="progress-bar">
                        <div
                            className={`progress-fill ${getUsageClass(
                                asset.diskUsage
                            )}`}
                            style={{ width: `${asset.diskUsage}%` }}
                        ></div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default AssetCard;