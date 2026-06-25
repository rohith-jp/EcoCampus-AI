import { StatCard, Badge, SectionHead } from '../../components/ui/index'
import { TrendChart, PatternBarChart } from '../../components/charts/Charts'

const wasteTrend = [
  { month: 'Jan', value: 320 }, { month: 'Feb', value: 310 }, { month: 'Mar', value: 305 },
  { month: 'Apr', value: 295 }, { month: 'May', value: 285 }, { month: 'Jun', value: 275 },
  { month: 'Jul', value: 268 }, { month: 'Aug', value: 260 }, { month: 'Sep', value: 255 },
  { month: 'Oct', value: 250 }, { month: 'Nov', value: 248 }, { month: 'Dec', value: 245 },
]

const wasteByType = [
  { month: 'Food Waste', value: 95 },
  { month: 'Paper', value: 58 },
  { month: 'Plastic', value: 42 },
  { month: 'E-Waste', value: 28 },
  { month: 'Glass', value: 14 },
  { month: 'Metal', value: 8 },
]

const BINS = [
  { location: 'Main Cafeteria', type: 'Food Waste', fillLevel: 82, status: 'critical', lastEmpty: '2h ago' },
  { location: 'Academic Block A', type: 'Mixed Recycling', fillLevel: 55, status: 'moderate', lastEmpty: '6h ago' },
  { location: 'Library Entrance', type: 'Paper', fillLevel: 38, status: 'good', lastEmpty: '8h ago' },
  { location: 'Science Labs', type: 'E-Waste', fillLevel: 71, status: 'high', lastEmpty: '1d ago' },
  { location: 'Sports Complex', type: 'Plastic', fillLevel: 28, status: 'good', lastEmpty: '5h ago' },
  { location: 'Admin Block', type: 'General', fillLevel: 64, status: 'moderate', lastEmpty: '4h ago' },
]

const fillColor = { critical: 'var(--red-400)', high: 'var(--amber-400)', moderate: 'var(--amber-400)', good: 'var(--green-500)' }

const WasteManagement = () => (
  <div className="container">
    <div className="page-header animate-fade-slide">
      <h1>♻️ Waste Management</h1>
      <p>Monitor and manage campus waste streams, recycling rates, and SDG 12 targets</p>
      <div className="header-meta">
        <div className="live-dot" />
        <Badge variant="green">Live Monitoring</Badge>
        <Badge variant="red">Admin Only</Badge>
      </div>
    </div>

    <div className="status-grid" style={{ marginBottom: '2rem' }}>
      {[
        { label: 'Total Waste', num: '245 kg', sub: 'This month', cls: 'green-num' },
        { label: 'Recycled', num: '62%', sub: 'Diversion rate', cls: 'green-num' },
        { label: 'Composted', num: '18%', sub: 'Organic waste', cls: 'green-num' },
        { label: 'Landfill', num: '20%', sub: 'Target: <15%', cls: 'amber-num' },
      ].map((item, i) => (
        <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="status-label">{item.label}</div>
          <div className={`status-num ${item.cls}`}>{item.num}</div>
          <div className="status-sublabel">{item.sub}</div>
        </div>
      ))}
    </div>

    <div className="grid-4" style={{ marginBottom: '2rem' }}>
      <StatCard label="Total Waste" value="245" unit="kg/month" icon="🗑️" trend={-8} trendLabel="vs last month" />
      <StatCard label="Recycling Rate" value="62" unit="%" icon="♻️" trend={5} trendLabel="vs last month" />
      <StatCard label="Composting" value="44" unit="kg" icon="🌱" trend={12} trendLabel="vs last month" />
      <StatCard label="CO₂ Avoided" value="1.2" unit="tCO₂e" icon="🌍" trend={7} trendLabel="vs last month" />
    </div>

    <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
      <div className="card animate-fade-slide">
        <SectionHead title="Monthly Waste Trend (kg)" />
        <TrendChart data={wasteTrend} dataKey="value" color="#00b4a0" height={240} />
      </div>
      <div className="card animate-fade-slide">
        <SectionHead title="Waste by Category (kg)" />
        <PatternBarChart data={wasteByType} dataKey="value" color="#2da050" height={240} />
      </div>
    </div>

    <div className="card animate-fade-slide" style={{ padding: 0, overflow: 'hidden' }}>
      <SectionHead title="Smart Bin Status Monitor" />
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ background: 'var(--green-50)', borderBottom: '1px solid var(--border)' }}>
            {['Location', 'Waste Type', 'Fill Level', 'Status', 'Last Emptied'].map(h => (
              <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BINS.map(b => (
            <tr key={b.location} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{b.location}</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{b.type}</td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ flex: 1, background: 'var(--green-100)', borderRadius: 999, height: 8, overflow: 'hidden', minWidth: 80 }}>
                    <div style={{ background: fillColor[b.status], width: `${b.fillLevel}%`, height: '100%', borderRadius: 999, transition: 'width 0.6s' }} />
                  </div>
                  <span style={{ fontWeight: 700, color: fillColor[b.status], minWidth: 36, fontSize: '0.85rem' }}>{b.fillLevel}%</span>
                </div>
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <span style={{ background: fillColor[b.status] + '18', color: fillColor[b.status], border: `1px solid ${fillColor[b.status]}33`, padding: '3px 10px', borderRadius: 999, fontWeight: 600, fontSize: '0.76rem', textTransform: 'capitalize' }}>
                  {b.status}
                </span>
              </td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{b.lastEmpty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default WasteManagement
