"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartComponent({ data }: { data: any }) {
  // Logic for exporting the chart
  const exportChart = () => {
    alert("Export functionality will be implemented here.");
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <button onClick={exportChart} style={{ marginBottom: '10px', padding: '5px 10px' }}>
        Export Chart
      </button>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
