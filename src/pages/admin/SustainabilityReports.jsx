import { useState } from 'react'
import { StatCard, Badge, SectionHead } from '../../components/ui/index'
import { TrendChart, PatternBarChart } from '../../components/charts/Charts'
import { mockPredictions } from '../../data/mockData'
import ReportService from '../../services/reportService'
import { useSensors } from '../../context/SensorContext'

const REPORTS = [
  { id: 1, title: 'Q1 2024 Sustainability Report', date: '2024-03-31', status: 'published', sdg: 'SDG 7, 13', size: '2.4 MB' },
  { id: 2, title: 'Annual Campus Carbon Audit', date: '2024-01-15', status: 'published', sdg: 'SDG 13', size: '4.1 MB' },
  { id: 3, title: 'Energy Efficiency Review', date: '2024-02-20', status: 'draft', sdg: 'SDG 7', size: '1.8 MB' },
  { id: 4, title: 'Water Conservation Assessment', date: '2024-02-28', status: 'review', sdg: 'SDG 6', size: '1.2 MB' },
  { id: 5, title: 'Waste Reduction Initiative', date: '2024-03-10', status: 'published', sdg: 'SDG 12', size: '0.9 MB' },
]

const SDG_PROGRESS = [
  { sdg: 'SDG 6', name: 'Clean Water', progress: 72, color: '#2492d1' },
  { sdg: 'SDG 7', name: 'Clean Energy', progress: 85, color: '#e8a525' },
  { sdg: 'SDG 12', name: 'Responsible Consumption', progress: 64, color: '#d9433e' },
  { sdg: 'SDG 13', name: 'Climate Action', progress: 78, color: '#3dbf62' },
  { sdg: 'SDG 15', name: 'Life on Land', progress: 55, color: '#00b4a0' },
]

const SustainabilityReports = () => {
  const [tab, setTab] = useState('overview')
  const [generating, setGenerating] = useState(false)
  const [dateRange, setDateRange] = useState('month')
  const { sensorData } = useSensors()
  const scoreData = mockPredictions.sustainability.historical.map(h => ({ month: h.month, value: h.actual }))

  const handleGenerateReport = async (format) => {
    setGenerating(true)
    try {
      const reportData = await ReportService.generateReportData()
      
      // Add real-time sensor data to report
      if (sensorData) {
        reportData.metrics = {
          ...reportData.metrics,
          'Carbon Emissions': `${sensorData.carbonEmissions?.current?.toFixed(1) || 358} tCO₂e`,
          'Electricity Usage': `${sensorData.electricity?.current?.toFixed(1) || 485} kWh`,
          'Water Consumption': `${(sensorData.water?.current / 1000).toFixed(1) || 12.5}k liters`,
          'Waste Generation': `${sensorData.waste?.current?.toFixed(1) || 245} kg`,
          'Air Quality Index': `${sensorData.aqi?.current || 42} AQI`,
          'Temperature': `${sensorData.temperature?.current || 28}°C`,
          'Humidity': `${sensorData.humidity?.current || 65}%`
        }
      }
      
      const filename = `ecocampus-report-${dateRange}-${new Date().toISOString().split('T')[0]}`
      
      if (format === 'pdf') {
        const doc = await ReportService.generatePDFReport(reportData, 'EcoCampus Sustainability Report')
        doc.save(`${filename}.pdf`)
      } else if (format === 'excel') {
        await ReportService.generateExcelReport(reportData, `${filename}.xlsx`)
      } else if (format === 'csv') {
        await ReportService.generateCSVReport(reportData, `${filename}.csv`)
      }
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🌿 Sustainability Reports</h1>
        <p>Detailed SDG-aligned sustainability performance reports for EcoCampus AI</p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Live Data</Badge>
          <Badge variant="red">Admin Only</Badge>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Overall Score', num: '78/100', sub: 'Campus sustainability', cls: 'green-num' },
          { label: 'Reports Published', num: '3', sub: 'This quarter', cls: 'green-num' },
          { label: 'SDGs Tracked', num: '5', sub: 'Active targets', cls: 'green-num' },
          { label: 'Carbon Reduced', num: '12%', sub: 'Year over year', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        {[['overview', 'Overview'], ['sdg', 'SDG Progress'], ['reports', 'Report Library'], ['generate', 'Generate Reports']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding: '0.6rem 1.2rem', border: 'none', background: 'transparent',
            fontWeight: tab === key ? 700 : 500,
            color: tab === key ? 'var(--green-600)' : 'var(--text-muted)',
            borderBottom: tab === key ? '2px solid var(--green-500)' : '2px solid transparent',
            cursor: 'pointer', fontSize: '0.88rem', marginBottom: '-1px',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <div className="grid-4" style={{ marginBottom: '2rem' }}>
            <StatCard label="Electricity Usage" value={mockPredictions.electricity.currentValue} unit="kWh" icon="⚡" trend={-2} trendLabel="vs last month" />
            <StatCard label="Water Consumption" value="12.5" unit="k liters" icon="💧" trend={5} trendLabel="vs last month" />
            <StatCard label="Food Waste" value={mockPredictions.foodWaste.currentValue} unit="kg" icon="🍎" trend={-8} trendLabel="vs last month" />
            <StatCard label="Sustainability Score" value={mockPredictions.sustainability.currentValue} unit="/100" icon="🌿" trend={3} trendLabel="vs last month" />
          </div>
          <div className="card animate-fade-slide">
            <SectionHead title="Sustainability Score Trend (12 Months)" />
            <TrendChart data={scoreData} dataKey="value" color="#3dbf62" height={260} />
          </div>
        </>
      )}

      {tab === 'sdg' && (
        <div className="card animate-fade-slide">
          <SectionHead title="SDG Progress Tracker" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0.5rem 0' }}>
            {SDG_PROGRESS.map(s => (
              <div key={s.sdg}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ background: s.color + '22', color: s.color, border: `1px solid ${s.color}44`, padding: '3px 10px', borderRadius: 999, fontWeight: 700, fontSize: '0.78rem' }}>{s.sdg}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: s.color, fontSize: '1rem' }}>{s.progress}%</span>
                </div>
                <div style={{ background: 'var(--green-100)', borderRadius: 999, height: 10, overflow: 'hidden' }}>
                  <div style={{ background: s.color, width: `${s.progress}%`, height: '100%', borderRadius: 999, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'reports' && (
        <div className="card animate-fade-slide" style={{ padding: 0, overflow: 'hidden' }}>
          <SectionHead title="Report Library" />
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--green-50)', borderBottom: '1px solid var(--border)' }}>
                {['Report Title', 'Date', 'SDGs', 'Status', 'Size', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REPORTS.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{r.title}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{r.date}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{r.sdg}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <Badge variant={r.status === 'published' ? 'green' : r.status === 'review' ? 'amber' : 'green'}>{r.status}</Badge>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{r.size}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ padding: '3px 10px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.76rem', cursor: 'pointer', color: 'var(--green-700)', fontWeight: 600 }}>View</button>
                      <button style={{ padding: '3px 10px', borderRadius: 'var(--r-sm)', border: '1px solid var(--green-400)', background: 'var(--green-100)', fontSize: '0.76rem', cursor: 'pointer', color: 'var(--green-700)', fontWeight: 600 }}>Export</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'generate' && (
        <div className="card animate-fade-slide">
          <SectionHead title="Generate Custom Reports" />
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>📊 Report Configuration</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Generate comprehensive sustainability reports with AI-powered insights and real-time data.
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Date Range
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['day', 'week', 'month', 'custom'].map(range => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--r-sm)',
                      border: '1px solid var(--border)',
                      background: dateRange === range ? 'linear-gradient(135deg, var(--green-500), var(--teal-400))' : 'white',
                      color: dateRange === range ? 'white' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Export Format
              </label>
              <div className="grid-3">
                {[
                  { format: 'pdf', icon: '📄', name: 'PDF Document', desc: 'Professional formatted report with charts' },
                  { format: 'excel', icon: '📊', name: 'Excel Spreadsheet', desc: 'Data tables with multiple sheets' },
                  { format: 'csv', icon: '📋', name: 'CSV File', desc: 'Raw data for analysis' }
                ].map(f => (
                  <button
                    key={f.format}
                    onClick={() => handleGenerateReport(f.format)}
                    disabled={generating}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--r-md)',
                      border: '1px solid var(--border)',
                      background: 'white',
                      cursor: generating ? 'not-allowed' : 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      opacity: generating ? 0.6 : 1
                    }}
                    className="card-hoverable"
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{f.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{f.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {generating && (
              <div style={{ 
                padding: '1rem', 
                background: 'var(--green-50)', 
                borderRadius: 'var(--r-sm)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                fontSize: '0.85rem',
                color: 'var(--green-700)'
              }}>
                <div className="eco-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                Generating report with AI insights and real-time data...
              </div>
            )}

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--sage-100)', borderRadius: 'var(--r-sm)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--sage-600)' }}>
                🤖 AI-Enhanced Reports Include:
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <li>Real-time sensor data from IoT devices</li>
                <li>AI-generated insights and recommendations</li>
                <li>SDG progress tracking with detailed metrics</li>
                <li>Predictive analytics and forecasting</li>
                <li>Carbon footprint analysis</li>
                <li>Interactive charts and visualizations</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SustainabilityReports
