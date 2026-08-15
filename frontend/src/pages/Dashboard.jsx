import { useEffect, useState } from "react";
import api from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

function Dashboard() {

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        try {
            const response = await api.get("/assets");
            setAssets(response.data);
        } catch (error) {
            console.error("Error loading assets:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalAssets = assets.length;

    const activeAssets = assets.filter(
        asset => asset.status === "Active"
    ).length;

    const warningAssets = assets.filter(
        asset => asset.status === "Warning"
    ).length;

    const criticalAssets = assets.filter(
        asset => asset.status === "Critical"
    ).length;

    const average = (field) => {
        if (assets.length === 0) return 0;

        return Math.round(
            assets.reduce(
                (sum, asset) =>
                    sum + Number(asset[field] || 0),
                0
            ) / assets.length
        );
    };

    const cpuUsage = average("cpuUsage");
    const memoryUsage = average("memoryUsage");
    const diskUsage = average("diskUsage");

    const statusData = [
        {
            name: "Active",
            value: activeAssets
        },
        {
            name: "Warning",
            value: warningAssets
        },
        {
            name: "Critical",
            value: criticalAssets
        }
    ];

    const usageData = [
        {
            name: "CPU",
            usage: cpuUsage
        },
        {
            name: "Memory",
            usage: memoryUsage
        },
        {
            name: "Disk",
            usage: diskUsage
        }
    ];

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading">
                    Loading SentinelCore dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">

            {/* Header */}

            <div className="page-header">

                <div>
                    <h1>Security Operations Dashboard</h1>

                    <p>
                        Real-time infrastructure monitoring and
                        security overview.
                    </p>
                </div>

                <button
                    className="secondary-button"
                    onClick={loadAssets}
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
                        <p>Total Assets</p>
                        <h2>{totalAssets}</h2>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        ✓
                    </div>

                    <div>
                        <p>Active Assets</p>
                        <h2>{activeAssets}</h2>
                    </div>

                </div>


                <div className="stat-card warning-card">

                    <div className="stat-icon">
                        ⚠️
                    </div>

                    <div>
                        <p>Warnings</p>
                        <h2>{warningAssets}</h2>
                    </div>

                </div>


                <div className="stat-card danger-card">

                    <div className="stat-icon">
                        🚨
                    </div>

                    <div>
                        <p>Critical</p>
                        <h2>{criticalAssets}</h2>
                    </div>

                </div>

            </div>


            {/* Charts */}

            <div className="dashboard-grid">


                {/* Asset Status */}

                <div className="chart-card">

                    <div className="card-title">

                        <h2>Asset Status</h2>

                        <span>
                            Live
                        </span>

                    </div>

                    <div className="chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={280}
                        >

                            <PieChart>

                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    label
                                >

                                    {statusData.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                            />
                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                {/* Resource Usage */}

                <div className="chart-card">

                    <div className="card-title">

                        <h2>Resource Usage</h2>

                        <span>
                            Average
                        </span>

                    </div>

                    <div className="chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={280}
                        >

                            <BarChart
                                data={usageData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="name"
                                />

                                <YAxis
                                    domain={[0, 100]}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="usage"
                                    radius={[8, 8, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>


            {/* System Health */}

            <div className="health-card">

                <div className="card-title">

                    <h2>System Health</h2>

                    <span>
                        Current average
                    </span>

                </div>


                <div className="health-grid">


                    {/* CPU */}

                    <div>

                        <div className="health-label">

                            <span>
                                CPU Usage
                            </span>

                            <strong>
                                {cpuUsage}%
                            </strong>

                        </div>

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${cpuUsage}%`
                                }}
                            />

                        </div>

                    </div>


                    {/* Memory */}

                    <div>

                        <div className="health-label">

                            <span>
                                Memory Usage
                            </span>

                            <strong>
                                {memoryUsage}%
                            </strong>

                        </div>

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${memoryUsage}%`
                                }}
                            />

                        </div>

                    </div>


                    {/* Disk */}

                    <div>

                        <div className="health-label">

                            <span>
                                Disk Usage
                            </span>

                            <strong>
                                {diskUsage}%
                            </strong>

                        </div>

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${diskUsage}%`
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* Recent Assets */}

            <div className="table-card">

                <div className="table-header">

                    <h2>
                        Monitored Assets
                    </h2>

                    <span>
                        {assets.length} assets
                    </span>

                </div>

                <div className="table-wrapper">

                    <table>

                        <thead>

                            <tr>
                                <th>Asset</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>CPU</th>
                                <th>Memory</th>
                                <th>Disk</th>
                            </tr>

                        </thead>

                        <tbody>

                            {assets.slice(0, 5).map(
                                asset => (

                                    <tr key={asset.id}>

                                        <td>
                                            <strong>
                                                {asset.assetName}
                                            </strong>
                                        </td>

                                        <td>
                                            {asset.assetType}
                                        </td>

                                        <td>
                                            {asset.location}
                                        </td>

                                        <td>

                                            <span
                                                className={`status-badge ${
                                                    asset.status === "Active"
                                                        ? "status-active"
                                                        : asset.status === "Warning"
                                                        ? "status-warning"
                                                        : "status-critical"
                                                }`}
                                            >
                                                {asset.status}
                                            </span>

                                        </td>

                                        <td>
                                            {asset.cpuUsage}%
                                        </td>

                                        <td>
                                            {asset.memoryUsage}%
                                        </td>

                                        <td>
                                            {asset.diskUsage}%
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                    {assets.length === 0 && (
                        <div className="empty-state">
                            No assets available.
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;