import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function ResourceUsageChart({ assets }) {
  const data = assets.slice(0, 12).map(a => ({
    name: a.assetName?.length > 12 ? `${a.assetName.slice(0, 12)}…` : a.assetName,
    CPU: Number(a.cpuUsage || 0),
    Memory: Number(a.memoryUsage || 0),
    Disk: Number(a.diskUsage || 0)
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 45 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="CPU" radius={[4,4,0,0]} />
        <Bar dataKey="Memory" radius={[4,4,0,0]} />
        <Bar dataKey="Disk" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}