import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatCard, Badge, SectionHead } from '../components/ui/index'
import { mockPredictions, mockPatterns, mockRecommendations } from '../data/mockData'
import RealTimeSensorCard from '../components/RealTimeSensorCard'
import SmartAlerts from '../components/SmartAlerts'
import AIRecommendations from '../components/AIRecommendations'
import { useSensors } from '../context/SensorContext'

const severityBadge = (s) => s === 'high' ? 'red' : s === 'medium' ? 'amber' : 'green'

const Dashboard = () => {
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
      {/* Page Header */}
      <div className="page-header animate-fade-slide">
        <h1>EcoCampus AI Dashboard</h1>
        <p>Real-time sustainability metrics powered by AI analysis</p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Live Data</Badge>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {time.toLocaleTimeString()} · Last update: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : 'Connecting...'}
          </span>
        </div>
      </div>

      {/* System Overview */}
      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Active Agents', num: '5/5', sub: 'All operational', cls: 'green-num' },
          { label: 'IoT Sensors', num: '180', sub: 'Data sources active', cls: 'green-num' },
          { label: 'Pattern Alerts', num: '6', sub: 'Requiring attention', cls: 'red-num' },
          { label: 'System Uptime', num: '99.8%', sub: 'Past 30 days', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Resource Metrics */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div className="section-head">
          <span className="section-title">Real-Time Resource Metrics</span>
        </div>
        <div className="grid-4">
          <RealTimeSensorCard type="electricity" icon="⚡" label="Electricity Usage" color="#e8a525" />
          <RealTimeSensorCard type="water" icon="💧" label="Water Consumption" color="#2492d1" />
          <RealTimeSensorCard type="waste" icon="🍎" label="Waste Generation" color="#d9433e" />
          <RealTimeSensorCard type="carbonEmissions" icon="�" label="Carbon Emissions" color="#3dbf62" />
        </div>
      </section>

      {/* Smart Alerts */}
      <section style={{ marginBottom: '2.5rem' }}>
        <SectionHead title="🚨 Smart Alerts" action="View All →" onClick={() => navigate('/admin/notifications')} />
        <SmartAlerts limit={3} />
      </section>

      {/* Patterns + Recommendations */}
      <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
        {/* Patterns */}
        <section>
          <SectionHead title="Recent Patterns Detected" action="View All →" onClick={() => navigate('/patterns')} />
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

        {/* Recommendations */}
        <section>
          <SectionHead title="AI Recommendations" action="View All →" onClick={() => navigate('/recommendations')} />
          <AIRecommendations limit={3} />
        </section>
      </div>

      {/* AI Features */}
      <section style={{ marginBottom: '1.5rem' }}>
        <div className="section-head"><span className="section-title">AI Features</span></div>
        <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
          {[
            { icon: '🔮', title: 'Predictions', desc: 'AI-powered forecasts for electricity, water, food waste, and sustainability metrics.', link: '/predictions' },
            { icon: '📈', title: 'Pattern Detection', desc: 'Identify anomalies and trends in resource usage automatically.', link: '/patterns' },
            { icon: '🤖', title: 'Knowledge Assistant', desc: 'Ask sustainability questions and get AI-powered answers with document retrieval.', link: '/assistant' },
          ].map(f => (
            <div className="card card-hoverable card-link animate-fade-slide" key={f.title} onClick={() => navigate(f.link)}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
              <span className="feature-link">Explore →</span>
            </div>
          ))}
        </div>
        <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
          {[
            { icon: '⚙️', title: 'AI Agents', desc: 'Five autonomous agents working together: Monitoring, Analysis, Recommendation, Reporting, and Alert.', link: '/agents' },
            { icon: '📄', title: 'Document Intelligence', desc: 'Extract key information and generate summaries from sustainability reports.', link: '/documents' },
          ].map(f => (
            <div className="card card-hoverable card-link animate-fade-slide" key={f.title} onClick={() => navigate(f.link)}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
              <span className="feature-link">Explore →</span>
            </div>
          ))}
        </div>
        <div className="grid-2">
          {[
            { icon: '✍️', title: 'Prompt Engineering', desc: 'See how different prompts guide AI behavior and produce better responses.', link: '/prompts' },
            { icon: '⚖️', title: 'Responsible AI', desc: 'Our commitment to fairness, transparency, and ethical AI practices.', link: '/responsible-ai' },
          ].map(f => (
            <div className="card card-hoverable card-link animate-fade-slide" key={f.title} onClick={() => navigate(f.link)}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
              <span className="feature-link">Explore →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
