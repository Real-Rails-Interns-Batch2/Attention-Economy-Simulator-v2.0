"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ChartComponent from "../components/ChartComponent"; // Chart component ഇമ്പോർട്ട് ചെയ്തു

export default function AttentionEconomyDashboard() {
  const [data, setData] = useState<any>(null);
  const [selectedId, setSelectedId] = useState("youtube");
  const [simParams, setSimParams] = useState({ dau: 122, session: 40, ad_load: 12, cpm: 7.5 });
  const [simResult, setSimResult] = useState<any>(null);

  // 1. Fetch initial platform data
  useEffect(() => {
    fetch('http://localhost:8000/api/platforms')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  // 2. Simulator logic (Calling backend API)
  const runSimulation = async (params: any) => {
    try {
      const response = await fetch('http://localhost:8000/api/simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform_id: selectedId, ...params })
      });
      const result = await response.json();
      setSimResult(result);
    } catch (error) {
      console.error("Error running simulation:", error);
    }
  };

  useEffect(() => {
    if (selectedId) runSimulation(simParams);
  }, [selectedId, simParams]);

  if (!data) return <div>Loading...</div>;

  const activePlatform = data.find((p: any) => p.id === selectedId) || data[0];

  return (
    <div className={styles.root}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerTitle}>Attention Economy Revenue Simulator</div>
      </header>

      {/* Partition (Sidebar & Main Page) */}
      <main className="flex" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        
        {/* SIDEBAR: Sensitivity Sliders */}
        <aside className="w-1/4" style={{ width: '25%' }}>
          <div className={styles.card}>
            <h3>Sensitivity Controls</h3>
            <label>DAU (M): {simParams.dau}</label>
            <input type="range" min="10" max="3000" value={simParams.dau} 
              onChange={e => setSimParams({...simParams, dau: Number(e.target.value)})} />
            
            <br /><br />
            <label>Ad Load: {simParams.ad_load}</label>
            <input type="range" min="1" max="40" value={simParams.ad_load} 
              onChange={e => setSimParams({...simParams, ad_load: Number(e.target.value)})} />
          </div>
        </aside>

        {/* MAIN PAGE: Charts & Results */}
        <section className="w-3/4" style={{ width: '75%' }}>
          {simResult ? (
            <div className={styles.card}>
              <h2>Simulation Results for {activePlatform.name}</h2>
              <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <p>Daily Revenue: ${simResult.daily_revenue.toFixed(2)}</p>
                <p>Platform Net: ${simResult.platform_net.toFixed(2)}</p>
                <p>Creator Payout: ${simResult.creator_revenue.toFixed(2)}</p>
              </div>
              
              {/* Chart Component ഉപയോഗിക്കുന്നു */}
              <div style={{ marginTop: '20px' }}>
                <ChartComponent data={[{ name: 'Revenue', revenue: simResult.daily_revenue }]} />
              </div>
            </div>
          ) : <p>Running simulation...</p>}
        </section>
      </main>
    </div>
  );
}
