import { StatCard, Badge, SectionHead } from '../../components/ui/index'
import { TrendChart, PatternBarChart } from '../../components/charts/Charts'

const carbonMonthly = [
  { month: 'Jan', value: 480 }, { month: 'Feb', value: 465 }, { month: 'Mar', value: 450 },
  { month: 'Apr', value: 430 }, { month: 'May', value: 415 }, { month: 'Jun', value: 400 },
  { month: 'Jul', value: 395 }, { month: 'Aug', value: 385 }, { month: 'Sep', value: 375 },
  { month: 'Oct', value: 370 }, { month: 'Nov', value: 365 }, { month: 'Dec', value: 358 },
]

const carbonBySource = [
  { month: 'Electricity', value: 180 },
  { month: 'Transport', value: 95 },
  { month: 'Heating', value: 48 },
  { month: 'Waste', value: 22 },
  { month: 'Water', value: 13 },
]

const SCOPE_DATA = [
  { scope: 'Scope 1', label: 'Direct Emissions', value: '145 tCO₂e', desc: 'On-site fuel combustion, owned vehicles', color: '#d9433e', pct: 40 },
  { scope: 'Scope 2', label: 'Indirect — Energy', value: '128 tCO₂e', desc: 'Purchased electricity and heating', color: '#e8a525', pct: 36 },
  { scope: 'Scope 3', label: 'Value Chain', value: '85 tCO₂e', desc: 'Business travel, waste, commuting', color: '#2492d1', pct: 24 },
]

const CarbonTracking = () => (
  <div className="container">
    <div className="page-header animate-fade-slide">
      <h1>🌍 Carbon Tracking</h1>
      <p>Campus-wide carbon emissions tracking and reduction goals aligned with net-zero targets</p>
      <div className="header-meta">
        <div className="live-dot" />
        <Badge variant="green">Live Monitoring</Badge>
        <Badge variant="red">Admin Only</Badge>
      </div>
    </div>

    <div className="status-grid" style={{ marginBottom: '2rem' }}>
      {[
        { label: 'Total Emissions', num: '358 tCO₂e', sub: 'Current month', cls: 'green-num' },
        { label: 'YoY Reduction', num: '12%', sub: 'Year over year', cls: 'green-num' },
        { label: 'Net-Zero Target', num: '2040', sub: 'Campus goal', cls: 'green-num' },
        { label: 'Offset Credits', num: '48 t', sub: 'Purchased this year', cls: 'green-num' },
      ].map((item, i) => (
        <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="status-label">{item.label}</div>
          <div className={`status-num ${item.cls}`}>{item.num}</div>
          <div className="status-sublabel">{item.sub}</div>
        </div>
      ))}
    </div>

    <div className="grid-4" style={{ marginBottom: '2rem' }}>
      <StatCard label="Direct Emissions" value="145" unit="tCO₂e" icon="🏭" trend={-8} trendLabel="vs last month" />
      <StatCard label="Energy Indirect" value="128" unit="tCO₂e" icon="⚡" trend={-5} trendLabel="vs last month" />
      <StatCard label="Value Chain" value="85" unit="tCO₂e" icon="🚗" trend={-3} trendLabel="vs last month" />
      <StatCard label="Carbon Intensity" value="0.74" unit="kg/m²" icon="📊" trend={-10} trendLabel="vs last year" />
    </div>

    <div className="card animate-fade-slide" style={{ marginBottom: '1.5rem' }}>
      <SectionHead title="Emissions by Scope (GHG Protocol)" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '0.5rem' }}>
        {SCOPE_DATA.map(s => (
          <div key={s.scope}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ background: s.color + '18', color: s.color, border: `1px solid ${s.color}33`, padding: '3px 10px', borderRadius: 999, fontWeight: 700, fontSize: '0.78rem' }}>{s.scope}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.label}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.pct}% of total</div>
              </div>
            </div>
            <div style={{ background: 'var(--green-100)', borderRadius: 999, height: 8, overflow: 'hidden' }}>
              <div style={{ background: s.color, width: `${s.pct}%`, height: '100%', borderRadius: 999, transition: 'width 0.6s' }} />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
      <div className="card animate-fade-slide">
        <SectionHead title="Monthly Carbon Trend (tCO₂e)" />
        <TrendChart data={carbonMonthly} dataKey="value" color="#3dbf62" height={240} />
      </div>
      <div className="card animate-fade-slide">
        <SectionHead title="Emissions by Source" />
        <PatternBarChart data={carbonBySource} dataKey="value" color="#d9433e" height={240} />
      </div>
    </div>

    <div className="card animate-fade-slide">
      <SectionHead title="Net-Zero Roadmap" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
        {[
          { year: '2025', milestone: 'Scope 1 & 2 baseline established', status: 'complete', color: 'var(--green-500)' },
          { year: '2027', milestone: '30% emissions reduction from 2023 baseline', status: 'in-progress', color: 'var(--amber-400)' },
          { year: '2030', milestone: '50% absolute reduction, 100% renewable electricity', status: 'upcoming', color: 'var(--text-muted)' },
          { year: '2035', milestone: 'Carbon neutral campus operations', status: 'upcoming', color: 'var(--text-muted)' },
          { year: '2040', milestone: 'Full net-zero across all scopes', status: 'upcoming', color: 'var(--text-muted)' },
        ].map(m => (
          <div key={m.year} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 52, height: 52, borderRadius: 'var(--r-sm)', background: m.status === 'complete' ? 'var(--green-100)' : m.status === 'in-progress' ? 'var(--amber-100)' : 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.82rem', color: m.color, flexShrink: 0, border: '1px solid var(--border)' }}>
              {m.year}
            </div>
            <div style={{ flex: 1, fontWeight: 500 }}>{m.milestone}</div>
            <span style={{ background: m.status === 'complete' ? 'var(--green-100)' : m.status === 'in-progress' ? 'var(--amber-100)' : 'var(--green-50)', color: m.color, padding: '3px 10px', borderRadius: 999, fontSize: '0.76rem', fontWeight: 600, flexShrink: 0 }}>
              {m.status === 'complete' ? '✓ Done' : m.status === 'in-progress' ? '⏳ In Progress' : 'Upcoming'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default CarbonTracking
