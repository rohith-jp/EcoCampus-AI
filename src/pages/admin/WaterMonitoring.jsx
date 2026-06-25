import { StatCard, Badge, SectionHead } from '../../components/ui/index'
import { TrendChart, PatternBarChart } from '../../components/charts/Charts'
import { mockPredictions } from '../../data/mockData'

const waterData = mockPredictions.water.historical.map(h => ({ month: h.month, value: Math.round(h.actual / 1000 * 10) / 10 }))

const waterByZone = [
  { month: 'Academics', value: 4.8 },
  { month: 'Hostels', value: 3.2 },
  { month: 'Cafeteria', value: 2.1 },
  { month: 'Landscaping', value: 1.5 },
  { month: 'Labs', value: 0.9 },
]

const ZONES = [
  { name: 'Academic Block', daily: 4800, target: 4500, saved: 320, status: 'high' },
  { name: 'Student Hostels', daily: 3200, target: 3000, saved: 180, status: 'moderate' },
  { name: 'Food & Cafeteria', daily: 2100, target: 1800, saved: 95, status: 'high' },
  { name: 'Landscaping & Gardens', daily: 1500, target: 1200, saved: 420, status: 'low' },
  { name: 'Research Labs', daily: 900, target: 800, saved: 65, status: 'moderate' },
]

const usageColor = { high: 'var(--red-400)', moderate: 'var(--amber-400)', low: 'var(--green-500)' }

const WaterMonitoring = () => (
  <div className="container">
    <div className="page-header animate-fade-slide">
      <h1>💧 Water Monitoring</h1>
      <p>Campus water usage analytics, conservation tracking, and SDG 6 alignment</p>
      <div className="header-meta">
        <div className="live-dot" />
        <Badge variant="green">Live Monitoring</Badge>
        <Badge variant="red">Admin Only</Badge>
      </div>
    </div>

    <div className="status-grid" style={{ marginBottom: '2rem' }}>
      {[
        { label: 'Total Usage', num: '12.5k L', sub: 'This month', cls: 'green-num' },
        { label: 'vs Last Month', num: '+5%', sub: 'Needs attention', cls: 'amber-num' },
        { label: 'Recycled Water', num: '28%', sub: 'Of total usage', cls: 'green-num' },
        { label: 'Rainwater Collected', num: '1,840 L', sub: 'This month', cls: 'green-num' },
      ].map((item, i) => (
        <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="status-label">{item.label}</div>
          <div className={`status-num ${item.cls}`}>{item.num}</div>
          <div className="status-sublabel">{item.sub}</div>
        </div>
      ))}
    </div>

    <div className="grid-4" style={{ marginBottom: '2rem' }}>
      <StatCard label="Freshwater Usage" value="12.5" unit="k liters" icon="💧" trend={5} trendLabel="vs last month" />
      <StatCard label="Recycled Water" value="3.5" unit="k liters" icon="♻️" trend={12} trendLabel="vs last month" />
      <StatCard label="Rainwater Harvest" value="1.84" unit="k liters" icon="🌧️" trend={22} trendLabel="vs last month" />
      <StatCard label="Per Capita Usage" value="38.5" unit="L/person/day" icon="👤" trend={-3} trendLabel="vs last month" />
    </div>

    <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
      <div className="card animate-fade-slide">
        <SectionHead title="Monthly Water Usage Trend (k liters)" />
        <TrendChart data={waterData} dataKey="value" color="#2492d1" height={240} />
      </div>
      <div className="card animate-fade-slide">
        <SectionHead title="Usage by Zone (k liters)" />
        <PatternBarChart data={waterByZone} dataKey="value" color="#00b4a0" height={240} />
      </div>
    </div>

    <div className="card animate-fade-slide" style={{ padding: 0, overflow: 'hidden' }}>
      <SectionHead title="Zone Water Usage Monitor" />
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ background: 'var(--green-50)', borderBottom: '1px solid var(--border)' }}>
            {['Zone', 'Daily Usage (L)', 'Daily Target (L)', 'Saved This Month (L)', 'Usage Level'].map(h => (
              <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ZONES.map(z => (
            <tr key={z.name} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{z.name}</td>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: usageColor[z.status] }}>{z.daily.toLocaleString()}</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{z.target.toLocaleString()}</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--green-600)', fontWeight: 600 }}>{z.saved}</td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <span style={{ background: usageColor[z.status] + '18', color: usageColor[z.status], border: `1px solid ${usageColor[z.status]}33`, padding: '3px 10px', borderRadius: 999, fontWeight: 600, fontSize: '0.76rem', textTransform: 'capitalize' }}>
                  {z.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default WaterMonitoring
