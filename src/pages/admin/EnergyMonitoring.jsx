import { StatCard, Badge, SectionHead } from '../../components/ui/index'
import { TrendChart, PatternBarChart } from '../../components/charts/Charts'
import { mockPredictions } from '../../data/mockData'

const energyData = mockPredictions.electricity.historical.map(h => ({ month: h.month, value: h.actual }))

const buildingData = [
  { month: 'Main Building', value: 185 },
  { month: 'Library', value: 95 },
  { month: 'Labs', value: 120 },
  { month: 'Cafeteria', value: 55 },
  { month: 'Gym', value: 30 },
]

const BUILDINGS = [
  { name: 'Main Academic Building', usage: 185, capacity: 250, efficiency: 92, status: 'optimal' },
  { name: 'Science & Research Labs', usage: 120, capacity: 180, efficiency: 78, status: 'good' },
  { name: 'Central Library', usage: 95, capacity: 140, efficiency: 85, status: 'optimal' },
  { name: 'Student Cafeteria', usage: 55, capacity: 80, efficiency: 69, status: 'warning' },
  { name: 'Sports & Fitness Centre', usage: 30, capacity: 60, efficiency: 95, status: 'optimal' },
]

const statusColor = { optimal: 'var(--green-500)', good: 'var(--teal-400)', warning: 'var(--amber-400)' }

const EnergyMonitoring = () => (
  <div className="container">
    <div className="page-header animate-fade-slide">
      <h1>⚡ Energy Monitoring</h1>
      <p>Real-time energy consumption tracking across all campus buildings and infrastructure</p>
      <div className="header-meta">
        <div className="live-dot" />
        <Badge variant="green">Live Monitoring</Badge>
        <Badge variant="red">Admin Only</Badge>
      </div>
    </div>

    <div className="status-grid" style={{ marginBottom: '2rem' }}>
      {[
        { label: 'Total Usage', num: '485 kWh', sub: 'Current month', cls: 'green-num' },
        { label: 'vs Last Month', num: '-2%', sub: 'Improvement', cls: 'green-num' },
        { label: 'Peak Demand', num: '68 kW', sub: 'This week', cls: 'amber-num' },
        { label: 'Renewable Mix', num: '42%', sub: 'Solar + wind', cls: 'green-num' },
      ].map((item, i) => (
        <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="status-label">{item.label}</div>
          <div className={`status-num ${item.cls}`}>{item.num}</div>
          <div className="status-sublabel">{item.sub}</div>
        </div>
      ))}
    </div>

    <div className="grid-4" style={{ marginBottom: '2rem' }}>
      <StatCard label="Electricity" value="485" unit="kWh" icon="⚡" trend={-2} trendLabel="vs last month" />
      <StatCard label="Solar Generated" value="204" unit="kWh" icon="☀️" trend={8} trendLabel="vs last month" />
      <StatCard label="Grid Import" value="281" unit="kWh" icon="🔌" trend={-7} trendLabel="vs last month" />
      <StatCard label="Cost Saved" value="₹18.4k" unit="this month" icon="💰" trend={9} trendLabel="vs last month" />
    </div>

    <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
      <div className="card animate-fade-slide">
        <SectionHead title="Monthly Energy Consumption (kWh)" />
        <TrendChart data={energyData} dataKey="value" color="#e8a525" height={240} />
      </div>
      <div className="card animate-fade-slide">
        <SectionHead title="Usage by Building (kWh)" />
        <PatternBarChart data={buildingData} dataKey="value" color="#2492d1" height={240} />
      </div>
    </div>

    <div className="card animate-fade-slide" style={{ padding: 0, overflow: 'hidden' }}>
      <SectionHead title="Building Energy Dashboard" />
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ background: 'var(--green-50)', borderBottom: '1px solid var(--border)' }}>
            {['Building', 'Usage (kWh)', 'Capacity (kWh)', 'Efficiency', 'Status'].map(h => (
              <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BUILDINGS.map(b => (
            <tr key={b.name} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{b.name}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{b.usage}</td>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{b.capacity}</td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ flex: 1, background: 'var(--green-100)', borderRadius: 999, height: 6, overflow: 'hidden', minWidth: 80 }}>
                    <div style={{ background: statusColor[b.status], width: `${b.efficiency}%`, height: '100%', borderRadius: 999 }} />
                  </div>
                  <span style={{ fontWeight: 700, color: statusColor[b.status], minWidth: 36, fontSize: '0.85rem' }}>{b.efficiency}%</span>
                </div>
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <span style={{ background: statusColor[b.status] + '18', color: statusColor[b.status], border: `1px solid ${statusColor[b.status]}33`, padding: '3px 10px', borderRadius: 999, fontWeight: 600, fontSize: '0.76rem', textTransform: 'capitalize' }}>
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default EnergyMonitoring
