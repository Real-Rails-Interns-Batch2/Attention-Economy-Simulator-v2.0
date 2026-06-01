"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

/* ─────────────────────────── DATA ─────────────── */
const PLATFORMS = [
  { id: "youtube", name: "YouTube", icon: "▶️", category: "Video", dau: 122, session: 40, adLoad: 12, cpm: 7.5, creatorSplit: 55, color: "#f43f5e" },
  { id: "tiktok", name: "TikTok", icon: "🎵", category: "Short Video", dau: 150, session: 95, adLoad: 8, cpm: 3.5, creatorSplit: 20, color: "#06b6d4" },
  { id: "instagram", name: "Instagram", icon: "📸", category: "Social", dau: 500, session: 29, adLoad: 14, cpm: 8.2, creatorSplit: 15, color: "#8b5cf6" },
  { id: "facebook", name: "Facebook", icon: "🟦", category: "Social", dau: 2100, session: 31, adLoad: 16, cpm: 6.1, creatorSplit: 10, color: "#3b82f6" },
  { id: "twitter", name: "X / Twitter", icon: "🐦", category: "Microblogging", dau: 238, session: 30, adLoad: 10, cpm: 2.1, creatorSplit: 25, color: "#9ca3af" },
  { id: "snapchat", name: "Snapchat", icon: "👻", category: "Messaging", dau: 414, session: 26, adLoad: 9, cpm: 2.95, creatorSplit: 35, color: "#f59e0b" },
];

const VERTICAL_CPMS = [
  { label: "Finance / Crypto", value: 52 },
  { label: "Software / SaaS", value: 45 },
  { label: "Real Estate", value: 38 },
  { label: "E-Commerce", value: 15 },
  { label: "Gaming", value: 8 },
  { label: "Entertainment", value: 4 },
];

/* ─────────────────────────── COMPONENT ─────────────── */
export default function AttentionEconomyDashboard() {
  const [selectedId, setSelectedId] = useState("youtube");
  const activePlatform = PLATFORMS.find((p) => p.id === selectedId) || PLATFORMS[0];

  const [simDau, setSimDau] = useState(activePlatform.dau);
  const [simSession, setSimSession] = useState(activePlatform.session);
  const [simAdLoad, setSimAdLoad] = useState(activePlatform.adLoad);
  const [simCpm, setSimCpm] = useState(activePlatform.cpm);

  useEffect(() => {
    setSimDau(activePlatform.dau);
    setSimSession(activePlatform.session);
    setSimAdLoad(activePlatform.adLoad);
    setSimCpm(activePlatform.cpm);
  }, [activePlatform.id]);

  // Derived simulator metrics
  const totalHours = (simDau * 1000000 * simSession) / 60;
  const totalImpressions = totalHours * simAdLoad;
  const simDailyRev = (totalImpressions / 1000) * simCpm;
  const simCreatorRev = simDailyRev * (activePlatform.creatorSplit / 100);
  const simPlatformNet = simDailyRev - simCreatorRev;

  // Global aggregate metrics (static reference based on initial array)
  const globalDau = PLATFORMS.reduce((acc, p) => acc + p.dau, 0) / 1000; // in Billions
  const avgCpm = PLATFORMS.reduce((acc, p) => acc + p.cpm, 0) / PLATFORMS.length;
  const avgSession = PLATFORMS.reduce((acc, p) => acc + p.session, 0) / PLATFORMS.length;
  const totalRev = PLATFORMS.reduce((acc, p) => {
    const hrs = (p.dau * 1000000 * p.session) / 60;
    const imps = hrs * p.adLoad;
    return acc + (imps / 1000) * p.cpm;
  }, 0);

  return (
    <div className={styles.root}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerBrand}>
            <div className={styles.headerLogo}>⏱️</div>
            <div>
              <div className={styles.headerTitle}>Attention Economy Revenue Simulator</div>
              <div className={styles.headerSub}>REAL RAILS INTELLIGENCE LIBRARY · POC-45</div>
            </div>
          </div>
          <div className={styles.headerBadge}>
            <div className={styles.liveDot}></div>
            LIVE
          </div>
        </div>
      </header>

      {/* TICKER */}
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerLabel}>LIVE</div>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerContent}>
            <span className={styles.tickerItem}>Global ad spend 2024: $740B</span>
            <span className={styles.tickerDot}>•</span>
            <span className={styles.tickerItem}>Average person scrolls 300ft/day</span>
            <span className={styles.tickerDot}>•</span>
            <span className={styles.tickerItem}>TikTok avg session: 95 min/day</span>
            <span className={styles.tickerDot}>•</span>
            <span className={styles.tickerItem}>YouTube serves 500hrs video/min</span>
            <span className={styles.tickerDot}>•</span>
            <span className={styles.tickerItem}>Meta Q1 2024 revenue: $36.5B</span>
            <span className={styles.tickerDot}>•</span>
            <span className={styles.tickerItem}>CPM range: $0.50 - $52 by vertical</span>
            <span className={styles.tickerDot}>•</span>
            <span className={styles.tickerItem}>Creator economy market: $250B</span>
            {/* Duplicated for infinite scroll effect */}
            <span className={styles.tickerDot}>•</span>
            <span className={styles.tickerItem}>Global ad spend 2024: $740B</span>
            <span className={styles.tickerDot}>•</span>
            <span className={styles.tickerItem}>Average person scrolls 300ft/day</span>
          </div>
        </div>
      </div>

      {/* KPI SECTION */}
      <section className={styles.kpiSection}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>COMBINED DAILY AD REVENUE</div>
          <div className={styles.kpiValue} style={{ color: "#3b82f6" }}>${(totalRev / 1e6).toFixed(1)}M</div>
          <div className={styles.kpiSub}>Across 6 major platforms</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>TOTAL DAILY ACTIVE USERS</div>
          <div className={styles.kpiValue} style={{ color: "#06b6d4" }}>{globalDau.toFixed(1)}B</div>
          <div className={styles.kpiSub}>Combined audience</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>AVG CPM ACROSS PLATFORMS</div>
          <div className={styles.kpiValue} style={{ color: "#8b5cf6" }}>${avgCpm.toFixed(2)}</div>
          <div className={styles.kpiSub}>Per 1,000 impressions</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>AVG DAILY SESSION</div>
          <div className={styles.kpiValue} style={{ color: "#10b981" }}>{Math.round(avgSession)} min</div>
          <div className={styles.kpiSub}>Attention captured</div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className={styles.mainLayout}>
        <div className={styles.leftPane}>
          {/* REVENUE BARS */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Daily Revenue by Platform</div>
              <div className={styles.cardSub}>Estimated daily ad revenue based on DAU × session × CPM × ad load</div>
            </div>
            <div className={styles.barList}>
              {PLATFORMS.map((p, i) => {
                const hrs = (p.dau * 1000000 * p.session) / 60;
                const imps = hrs * p.adLoad;
                const rev = (imps / 1000) * p.cpm;
                // find max for scaling
                const maxRev = Math.max(...PLATFORMS.map(px => ((px.dau * 1000000 * px.session) / 60) * px.adLoad / 1000 * px.cpm));
                const widthPct = (rev / maxRev) * 100;
                
                return (
                  <div key={p.id} className={styles.barRow} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className={styles.barMeta}>
                      <div className={styles.barIcon}>{p.icon}</div>
                      <div className={styles.barName}>{p.name}</div>
                      <div className={styles.barRevenue}>${(rev / 1e6).toFixed(1)}M/day</div>
                    </div>
                    <div className={styles.barTrack}>
                      <div 
                        className={styles.barFill} 
                        style={{ backgroundColor: p.color, "--bar-width": `${widthPct}%` } as any}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIMULATOR */}
          <div className={styles.simPanel}>
            <div className={styles.simHeader}>
              <div className={styles.simIcon}>🎛️</div>
              <div>
                <div className={styles.simTitle}>Revenue Engine Simulator: {activePlatform.name}</div>
                <div className={styles.simSub}>Adjust the levers of the attention economy to see the financial impact.</div>
              </div>
            </div>

            <div className={styles.simControls}>
              <div className={styles.sliderControl}>
                <div className={styles.sliderHeader}>
                  <div className={styles.sliderLabel}>Daily Active Users (M)</div>
                  <div className={styles.sliderValue}>{simDau}M</div>
                </div>
                <div className={styles.sliderTrack}>
                  <div className={styles.sliderFill} style={{ backgroundColor: activePlatform.color, width: `${(simDau / 3000) * 100}%` }}></div>
                  <input type="range" className={styles.sliderInput} min="10" max="3000" value={simDau} onChange={e => setSimDau(Number(e.target.value))} />
                </div>
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderHeader}>
                  <div className={styles.sliderLabel}>Session Length (min)</div>
                  <div className={styles.sliderValue}>{simSession} min</div>
                </div>
                <div className={styles.sliderTrack}>
                  <div className={styles.sliderFill} style={{ backgroundColor: activePlatform.color, width: `${(simSession / 180) * 100}%` }}></div>
                  <input type="range" className={styles.sliderInput} min="5" max="180" value={simSession} onChange={e => setSimSession(Number(e.target.value))} />
                </div>
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderHeader}>
                  <div className={styles.sliderLabel}>Ad Load (Ads/hr)</div>
                  <div className={styles.sliderValue}>{simAdLoad}</div>
                </div>
                <div className={styles.sliderTrack}>
                  <div className={styles.sliderFill} style={{ backgroundColor: activePlatform.color, width: `${(simAdLoad / 40) * 100}%` }}></div>
                  <input type="range" className={styles.sliderInput} min="1" max="40" value={simAdLoad} onChange={e => setSimAdLoad(Number(e.target.value))} />
                </div>
              </div>
              <div className={styles.sliderControl}>
                <div className={styles.sliderHeader}>
                  <div className={styles.sliderLabel}>Average CPM ($)</div>
                  <div className={styles.sliderValue}>${simCpm.toFixed(2)}</div>
                </div>
                <div className={styles.sliderTrack}>
                  <div className={styles.sliderFill} style={{ backgroundColor: activePlatform.color, width: `${(simCpm / 20) * 100}%` }}></div>
                  <input type="range" className={styles.sliderInput} min="0.5" max="20" step="0.5" value={simCpm} onChange={e => setSimCpm(Number(e.target.value))} />
                </div>
              </div>
            </div>

            <div className={styles.simResults}>
              <div className={styles.resultCard}>
                <div className={styles.resultLabel}>Total Hours</div>
                <div className={styles.resultValue}>{(totalHours / 1e6).toFixed(1)}M</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultLabel}>Ad Impressions</div>
                <div className={styles.resultValue}>{(totalImpressions / 1e9).toFixed(2)}B</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultLabel}>Daily Revenue</div>
                <div className={styles.resultValue} style={{ color: "#10b981" }}>${(simDailyRev / 1e6).toFixed(1)}M</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultLabel}>Annual Run Rate</div>
                <div className={styles.resultValue} style={{ color: "#3b82f6" }}>${((simDailyRev * 365) / 1e9).toFixed(2)}B</div>
              </div>
            </div>

            <div className={styles.revenueBreakdown}>
              <div className={styles.bdTitle}>Revenue Split (Platform vs Creators)</div>
              <div className={styles.bdBar}>
                <div className={styles.bdPlatform} style={{ backgroundColor: activePlatform.color, width: `${100 - activePlatform.creatorSplit}%` }}></div>
                <div className={styles.bdCreator} style={{ width: `${activePlatform.creatorSplit}%` }}></div>
              </div>
              <div className={styles.bdLegend}>
                <div><span className={styles.bdDot} style={{ backgroundColor: activePlatform.color }}></span> Platform Net: ${(simPlatformNet / 1e6).toFixed(1)}M ({100 - activePlatform.creatorSplit}%)</div>
                <div><span className={styles.bdDot} style={{ backgroundColor: "#10b981" }}></span> Creator Payout: ${(simCreatorRev / 1e6).toFixed(1)}M ({activePlatform.creatorSplit}%)</div>
              </div>
            </div>
          </div>
          
          {/* PLATFORM CARDS */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Platform Intelligence</div>
              <div className={styles.cardSub}>Select a platform to load its metrics into the simulator.</div>
            </div>
            <div className={styles.platformGrid}>
              {PLATFORMS.map((p) => (
                <div 
                  key={p.id} 
                  className={`${styles.platformCard} ${selectedId === p.id ? styles.platformCardSelected : ""}`}
                  style={{ "--accent": p.color } as any}
                  onClick={() => setSelectedId(p.id)}
                >
                  <div className={styles.pcHeader}>
                    <div className={styles.pcIcon}>{p.icon}</div>
                    <div>
                      <div className={styles.pcName}>{p.name}</div>
                      <div className={styles.pcCategory}>{p.category}</div>
                    </div>
                  </div>
                  <div className={styles.pcStats}>
                    <div className={styles.pcStat}>
                      <div className={styles.pcStatLabel}>DAU</div>
                      <div className={styles.pcStatVal}>{p.dau}M</div>
                    </div>
                    <div className={styles.pcStat}>
                      <div className={styles.pcStatLabel}>Time</div>
                      <div className={styles.pcStatVal}>{p.session}m</div>
                    </div>
                    <div className={styles.pcStat}>
                      <div className={styles.pcStatLabel}>CPM</div>
                      <div className={styles.pcStatVal}>${p.cpm}</div>
                    </div>
                  </div>
                  <div className={styles.pcRevRow}>
                    <div className={styles.pcRevLabel}>Rev Share</div>
                    <div className={styles.pcRevCreator}>{p.creatorSplit}% to Creators</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className={styles.rightPane}>
          {/* ATTENTION VALUE INDEX */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Attention Value Index</div>
              <div className={styles.cardSub}>Revenue generated per user per minute</div>
            </div>
            <div className={styles.attentionTable}>
              <div className={styles.attTableHeader}>
                <div>Platform</div>
                <div>$/User/Min</div>
                <div>Rank</div>
              </div>
              {PLATFORMS.map(p => ({
                ...p,
                valPerMin: (p.adLoad / 60) * (p.cpm / 1000)
              }))
              .sort((a, b) => b.valPerMin - a.valPerMin)
              .map((p, i) => (
                <div key={p.id} className={styles.attTableRow} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div style={{ color: p.color, fontWeight: 600 }}>{p.icon} {p.name}</div>
                  <div className={styles.attTableVal}>${(p.valPerMin * 1000000).toFixed(4)}</div>
                  <div><span className={styles.attRank} style={{ backgroundColor: p.color }}>#{i + 1}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* CPM BY VERTICAL */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>CPM by Ad Vertical</div>
              <div className={styles.cardSub}>Industry average ranges</div>
            </div>
            <div className={styles.cpmList}>
              {VERTICAL_CPMS.map((v, i) => (
                <div key={i} className={styles.cpmRow}>
                  <div className={styles.cpmVertical}>{v.label}</div>
                  <div className={styles.cpmBar}>
                    <div className={styles.cpmFill} style={{ backgroundColor: "#3b82f6", "--bar-width": `${(v.value / 60) * 100}%` } as any}></div>
                  </div>
                  <div className={styles.cpmVal}>${v.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* INSIGHTS */}
          <div className={styles.insightPanel}>
            <div className={styles.insightTitle}><span className={styles.insightIcon}>💡</span> Why This Matters</div>
            <div className={styles.insightList}>
              <div className={styles.insightItem}>
                <div className={styles.insightEmoji}>📉</div>
                <div>
                  <div className={styles.insightItemTitle}>The Ad Load Ceiling</div>
                  <div className={styles.insightItemBody}>Platforms cannot infinitely increase ad load without severely damaging user retention.</div>
                </div>
              </div>
              <div className={styles.insightItem}>
                <div className={styles.insightEmoji}>⏱️</div>
                <div>
                  <div className={styles.insightItemTitle}>Session Dominance</div>
                  <div className={styles.insightItemBody}>TikTok offsets lower CPMs entirely through massive session lengths (95+ minutes).</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
