import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function StatusChart({ assets }) {
  const counts = {};
  assets.forEach(a => {
    const s = String(a.status || "UNKNOWN").toUpperCase();
    counts[s] = (counts[s] || 0) + 1;
  });

  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));
  const cells = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#64748b", "#7c3aed"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={92} innerRadius={55}>
          {data.map((_, i) => <Cell key={i} fill={cells[i % cells.length]} />)}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
}