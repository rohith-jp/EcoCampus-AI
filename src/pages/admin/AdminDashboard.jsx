import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatCard, Badge, SectionHead } from '../../components/ui/index'
import { TrendChart, PatternBarChart } from '../../components/charts/Charts'
import { mockPredictions, mockPatterns, mockRecommendations } from '../../data/mockData'
import RealTimeSensorCard from '../../components/RealTimeSensorCard'
import SmartAlerts from '../../components/SmartAlerts'
import AIRecommendations from '../../components/AIRecommendations'
import AISustainabilityScore from '../../components/AISustainabilityScore'
import { useSensors } from '../../context/SensorContext'
import { useAuth } from '../../context/AuthContext'

const severityBadge = (s) => s === 'high' ? 'red' : s === 'medium' ? 'amber' : 'green'

const carbonTrend = [
  { month: 'Sep', value: 395 }, { month: 'Oct', value: 385 }, { month: 'Nov', value: 378 },
  { month: 'Dec', value: 370 }, { month: 'Jan', value: 365 }, { month: 'Feb', value: 361 },
  { month: 'Mar', value: 358 },
]

const SDG_QUICK = [
  { id: 'SDG 6', name: 'Clean Water', pct: 72, color: '#2492d1' },
  { id: 'SDG 7', name: 'Clean Energy', pct: 85, color: '#e8a525' },
  { id: 'SDG 12', name: 'Responsible Consumption', pct: 64, color: '#d9433e' },
  { id: 'SDG 13', name: 'Climate Action', pct: 78, color: '#3dbf62' },
]

const AdminDashboard = () => {
  const { user } = useAuth()
  const [time, setTime] = useState(new Date())
  const navigate = useNavigate()
  const { lastUpdate } = useSensors()

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const patterns = mockPatterns.slice(0, 3)
  const recs = mockRecommendations.slice(0, 3)

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🛡️ Admin Dashboard</h1>
        <p>Campus-wide sustainability oversight — Welcome back, <strong>{user?.fullName}</strong></p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Live Data</Badge>
          <Badge variant="red">Admin Access</Badge>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{time.toLocaleTimeString()} · Last update: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : 'Connecting...'}</span>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Total Users', num: '1,248', sub: 'Registered accounts', cls: 'green-num' },
          { label: 'Active Sessions', num: '84', sub: 'Currently online', cls: 'green-num' },
          { label: 'Open Alerts', num: '6', sub: 'Requiring attention', cls: 'red-num' },
          { label: 'System Uptime', num: '99.8%', sub: 'Past 30 days', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Campus Resource Metrics ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div className="section-head">
          <span className="section-title">Campus Sustainability Metrics Dashboard</span>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
            Data displayed is based on historical and simulated sustainability datasets for demonstration and AI analytics purposes.
          </p>
        </div>
        <div className="grid-4">
          <RealTimeSensorCard type="electricity" icon="⚡" label="Electricity Usage" color="#e8a525" />
          <RealTimeSensorCard type="water" icon="💧" label="Water Consumption" color="#2492d1" />
          <RealTimeSensorCard type="waste" icon="🍎" label="Waste Generation" color="#d9433e" />
          <RealTimeSensorCard type="carbonEmissions" icon="🌍" label="Carbon Emissions" color="#3dbf62" />
        </div>
      </section>

      {/* ── Smart Alerts ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <SectionHead title="🚨 Smart Alerts" action="View All →" onClick={() => navigate('/admin/notifications')} />
        <SmartAlerts limit={3} />
      </section>

      {/* ── AI Sustainability Score ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <AISustainabilityScore />
      </section>

      {/* ── Carbon Tracking Overview ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <SectionHead title="🌍 Carbon Tracking Overview" action="Full Report →" onClick={() => navigate('/admin/carbon')} />
        <div className="grid-4" style={{ marginBottom: '1rem' }}>
          <StatCard label="Total Emissions" value="358" unit="tCO₂e" icon="🏭" trend={-4} trendLabel="vs last month" />
          <StatCard label="Direct (Scope 1)" value="145" unit="tCO₂e" icon="🚗" trend={-8} trendLabel="vs last month" />
          <StatCard label="Indirect (Scope 2)" value="128" unit="tCO₂e" icon="⚡" trend={-5} trendLabel="vs last month" />
          <StatCard label="Net-Zero Target" value="2040" unit="goal year" icon="🎯" trend={null} trendLabel="" />
        </div>
        <div className="card animate-fade-slide">
          <SectionHead title="Monthly Carbon Trend (tCO₂e)" />
          <TrendChart data={carbonTrend} dataKey="value" color="#3dbf62" height={200} />
        </div>
      </section>

      {/* ── Energy / Water / Waste row ── */}
      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        <div className="card animate-fade-slide" style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/energy')}>
          <SectionHead title="⚡ Energy Overview" action="Details →" onClick={(e) => { e.stopPropagation(); navigate('/admin/energy') }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {[
              { label: 'Total Usage', value: '485 kWh', color: 'var(--amber-400)' },
              { label: 'Solar Generated', value: '204 kWh', color: 'var(--green-500)' },
              { label: 'Grid Import', value: '281 kWh', color: 'var(--text-muted)' },
              { label: 'Renewable Mix', value: '42%', color: 'var(--green-500)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card animate-fade-slide" style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/water')}>
          <SectionHead title="💧 Water Overview" action="Details →" onClick={(e) => { e.stopPropagation(); navigate('/admin/water') }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {[
              { label: 'Total Usage', value: '12.5k L', color: '#2492d1' },
              { label: 'Recycled Water', value: '3.5k L', color: 'var(--green-500)' },
              { label: 'vs Last Month', value: '+5%', color: 'var(--amber-400)' },
              { label: 'Per Capita', value: '38.5 L/day', color: 'var(--text-muted)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card animate-fade-slide" style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/waste')}>
          <SectionHead title="♻️ Waste Overview" action="Details →" onClick={(e) => { e.stopPropagation(); navigate('/admin/waste') }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {[
              { label: 'Total Waste', value: '245 kg', color: 'var(--text-primary)' },
              { label: 'Recycling Rate', value: '62%', color: 'var(--green-500)' },
              { label: 'Composted', value: '18%', color: 'var(--teal-400)' },
              { label: 'Landfill', value: '20%', color: 'var(--amber-400)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SDG Progress Overview ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <SectionHead title="🎯 SDG Progress Overview" action="Full Dashboard →" onClick={() => navigate('/admin/sdg')} />
        <div className="card animate-fade-slide">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', padding: '0.25rem 0' }}>
            {SDG_QUICK.map(s => (
              <div key={s.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: s.color + '22', color: s.color, border: `1px solid ${s.color}33`, padding: '2px 8px', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem' }}>{s.id}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{s.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: s.color, fontSize: '0.88rem' }}>{s.pct}%</span>
                </div>
                <div style={{ background: 'var(--green-100)', borderRadius: 999, height: 7, overflow: 'hidden' }}>
                  <div style={{ background: s.color, width: `${s.pct}%`, height: '100%', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Patterns & Recommendations ── */}
      <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
        <section>
          <SectionHead title="Recent Pattern Alerts" action="View All →" onClick={() => navigate('/patterns')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {patterns.map(p => (
              <div className="pattern-card animate-fade-slide" key={p.id}>
                <div className="pattern-icon">{p.icon}</div>
                <div className="pattern-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem', gap: '0.5rem' }}>
                    <div className="pattern-title">{p.title}</div>
                    <Badge variant={severityBadge(p.severity)}>{p.severity}</Badge>
                  </div>
                  <div className="pattern-desc">{p.description}</div>
                  {p.actionable && <div className="pattern-action">💡 {p.suggestedAction}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHead title="AI Recommendations" action="View All →" onClick={() => navigate('/recommendations')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recs.map(r => (
              <div className="rec-card animate-fade-slide" key={r.id}>
                <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div className="rec-meta">
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.action}</div>
                    <Badge variant={r.badgeVariant}>{r.impactPercentage}%</Badge>
                  </div>
                  <div style={{ fontSize: '0.77rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{r.sdg}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <span>Impact: {r.expectedImpact}</span>
                    <span>{r.difficulty} difficulty</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Admin Tools ── */}
      <section>
        <div className="section-head"><span className="section-title">Admin Tools</span></div>
        <div className="grid-3">
          {[
            { icon: '👥', title: 'User Management', desc: 'Manage registered users, roles, and access permissions across the platform.', link: '/admin/users' },
            { icon: '📋', title: 'Sustainability Reports', desc: 'Detailed SDG-aligned sustainability performance reports for the entire campus.', link: '/admin/sustainability' },
            { icon: '🌍', title: 'Carbon Tracking', desc: 'Monitor campus-wide emissions and track net-zero progress by scope.', link: '/admin/carbon' },
            { icon: '⚡', title: 'Energy Monitoring', desc: 'Real-time energy consumption tracking across all campus buildings.', link: '/admin/energy' },
            { icon: '💧', title: 'Water Monitoring', desc: 'Campus water usage analytics and conservation tracking by zone.', link: '/admin/water' },
            { icon: '🎯', title: 'SDG Dashboard', desc: 'Track progress against all 17 UN Sustainable Development Goals.', link: '/admin/sdg' },
          ].map(f => (
            <div className="card card-hoverable card-link animate-fade-slide" key={f.title} onClick={() => navigate(f.link)}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
              <span className="feature-link">Open →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
