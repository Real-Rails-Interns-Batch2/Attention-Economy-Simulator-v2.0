"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

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

  // 2. Simulator logic (Calling backend API instead of hardcoding)
  const runSimulation = async (params: any) => {
    const response = await fetch('http://localhost:8000/api/simulator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform_id: selectedId, ...params })
    });
    const result = await response.json();
    setSimResult(result);
  };

  useEffect(() => {
    if (selectedId) runSimulation(simParams);
  }, [selectedId, simParams]);

  if (!data) return <div>Loading...</div>;

  const activePlatform = data.find((p: any) => p.id === selectedId) || data[0];

  return (
    <div className={styles.root}>
      {/* HEADER - നിലനിർത്തുക */}
      <header className={styles.header}>
        <div className={styles.headerTitle}>Attention Economy Revenue Simulator</div>
      </header>

      {/* മാം ആവശ്യപ്പെട്ട Partition (Sidebar & Main Page) */}
      <main className="flex" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        
        {/* SIDEBAR: Sensitivity Sliders */}
        <aside className="w-1/4" style={{ width: '25%' }}>
          <div className={styles.card}>
            <h3>Sensitivity Controls</h3>
            <label>DAU (M): {simParams.dau}</label>
            <input type="range" min="10" max="3000" value={simParams.dau} 
              onChange={e => setSimParams({...simParams, dau: Number(e.target.value)})} />
            
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
              {/* ഇവിടെ നിങ്ങൾക്ക് Recharts ഉപയോഗിച്ച് Charts ചേർക്കാം */}
            </div>
          ) : <p>Running simulation...</p>}
        </section>
      </main>
    </div>
  );
}
