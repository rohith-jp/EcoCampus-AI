import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'
import { PatternBarChart } from '../../components/charts/Charts'
import AIService from '../../services/aiService'
import { useSensors } from '../../context/SensorContext'

const SDG_GOALS = [
  { id: 'SDG 1', name: 'No Poverty', icon: '🤝', progress: 45, color: '#E5243B', target: 70, metrics: ['Scholarships awarded', 'Financial aid programs'] },
  { id: 'SDG 2', name: 'Zero Hunger', icon: '🌾', progress: 52, color: '#DDA63A', target: 65, metrics: ['Food waste reduction', 'Campus food programs'] },
  { id: 'SDG 3', name: 'Good Health', icon: '💊', progress: 68, color: '#4C9F38', target: 80, metrics: ['Healthcare access', 'Mental health programs'] },
  { id: 'SDG 4', name: 'Quality Education', icon: '📚', progress: 88, color: '#C5192D', target: 90, metrics: ['Graduation rate', 'Research output'] },
  { id: 'SDG 5', name: 'Gender Equality', icon: '⚧', progress: 74, color: '#FF3A21', target: 80, metrics: ['Gender ratio', 'Leadership positions'] },
  { id: 'SDG 6', name: 'Clean Water', icon: '💧', progress: 72, color: '#2492d1', target: 85, metrics: ['Water consumption', 'Wastewater treatment'] },
  { id: 'SDG 7', name: 'Clean Energy', icon: '☀️', progress: 85, color: '#FCC30B', target: 90, metrics: ['Renewable energy %', 'Energy efficiency'] },
  { id: 'SDG 8', name: 'Decent Work', icon: '💼', progress: 61, color: '#A21942', target: 75, metrics: ['Employment rate', 'Fair wages'] },
  { id: 'SDG 9', name: 'Innovation', icon: '🏭', progress: 70, color: '#FD6925', target: 80, metrics: ['R&D investment', 'Sustainable tech'] },
  { id: 'SDG 10', name: 'Reduced Inequalities', icon: '⚖️', progress: 48, color: '#DD1367', target: 65, metrics: ['Inclusion programs', 'Accessibility'] },
  { id: 'SDG 11', name: 'Sustainable Cities', icon: '🏙️', progress: 76, color: '#FD9D24', target: 85, metrics: ['Green spaces', 'Sustainable transport'] },
  { id: 'SDG 12', name: 'Responsible Consumption', icon: '♻️', progress: 64, color: '#BF8B2E', target: 80, metrics: ['Recycling rate', 'Waste reduction'] },
  { id: 'SDG 13', name: 'Climate Action', icon: '🌍', progress: 78, color: '#3F7E44', target: 85, metrics: ['Carbon emissions', 'Climate education'] },
  { id: 'SDG 14', name: 'Life Below Water', icon: '🐋', progress: 38, color: '#0A97D9', target: 55, metrics: ['Water pollution', 'Marine conservation'] },
  { id: 'SDG 15', name: 'Life on Land', icon: '🌳', progress: 55, color: '#56C02B', target: 70, metrics: ['Biodiversity', 'Land conservation'] },
  { id: 'SDG 16', name: 'Peace & Justice', icon: '🕊️', progress: 80, color: '#00689D', target: 85, metrics: ['Safety incidents', 'Governance'] },
  { id: 'SDG 17', name: 'Partnerships', icon: '🌐', progress: 82, color: '#19486A', target: 90, metrics: ['Collaborations', 'Community engagement'] },
]

const overallBar = SDG_GOALS.map(g => ({ month: g.id.replace('SDG ', 'S'), value: g.progress }))

const SDGDashboard = () => {
  const [selectedSDG, setSelectedSDG] = useState(null)
  const [aiInsights, setAiInsights] = useState('')
  const [loadingInsights, setLoadingInsights] = useState(false)
  const { sensorData } = useSensors()
  
  const avgProgress = Math.round(SDG_GOALS.reduce((a, g) => a + g.progress, 0) / SDG_GOALS.length)
  const onTrack = SDG_GOALS.filter(g => g.progress >= g.target * 0.85).length

  const getSDGInsights = async (sdg) => {
    setLoadingInsights(true)
    setSelectedSDG(sdg)
    
    const prompt = `Analyze ${sdg.name} (${sdg.id}) progress at ${sdg.progress}% against target of ${sdg.target}%. Current metrics: ${sdg.metrics.join(', ')}. Provide specific recommendations to improve progress and explain how campus activities contribute to this SDG.`
    
    try {
      const insights = await AIService.sendMessage(prompt)
      setAiInsights(insights)
    } catch (error) {
      console.error('Error getting SDG insights:', error)
      setAiInsights('Unable to generate AI insights at this time.')
    } finally {
      setLoadingInsights(false)
    }
  }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🎯 SDG Dashboard</h1>
        <p>Track EcoCampus AI progress across all 17 UN Sustainable Development Goals</p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Live Tracking</Badge>
          <Badge variant="red">Admin Only</Badge>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Avg. SDG Progress', num: `${avgProgress}%`, sub: 'All 17 goals', cls: 'green-num' },
          { label: 'On Track', num: onTrack, sub: 'Goals meeting target', cls: 'green-num' },
          { label: 'Needs Attention', num: 17 - onTrack, sub: 'Below target pace', cls: 'amber-num' },
          { label: 'Priority SDGs', num: '6, 7, 13', sub: 'Campus focus areas', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="card animate-fade-slide" style={{ marginBottom: '1.5rem' }}>
        <SectionHead title="SDG Progress Overview" />
        <PatternBarChart data={overallBar} dataKey="value" color="#3dbf62" height={220} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {SDG_GOALS.map((g, i) => {
          const pct = Math.round((g.progress / g.target) * 100)
          const statusColor = g.progress >= g.target * 0.9 ? 'var(--green-500)' : g.progress >= g.target * 0.75 ? 'var(--amber-400)' : 'var(--red-400)'
          const isSelected = selectedSDG?.id === g.id
          return (
            <div 
              className="card animate-fade-slide card-hoverable" 
              key={g.id} 
              style={{ 
                animationDelay: `${i * 0.03}s`, 
                padding: '1rem',
                border: isSelected ? `2px solid ${g.color}` : '1px solid var(--border)',
                cursor: 'pointer'
              }}
              onClick={() => getSDGInsights(g)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: g.color + '22', border: `2px solid ${g.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {g.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.78rem', color: g.color }}>{g.id}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: statusColor, flexShrink: 0 }}>{g.progress}%</div>
              </div>
              <div style={{ background: 'var(--green-100)', borderRadius: 999, height: 6, overflow: 'hidden', marginBottom: '0.4rem' }}>
                <div style={{ background: g.color, width: `${g.progress}%`, height: '100%', borderRadius: 999, transition: 'width 0.6s' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>Target: {g.target}%</span>
                <span style={{ color: statusColor, fontWeight: 600 }}>{pct >= 100 ? '✓ Met' : `${pct}% to target`}</span>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                🤖 Click for AI insights
              </div>
            </div>
          )
        })}
      </div>

      {selectedSDG && (
        <div className="card animate-fade-slide" style={{ marginTop: '1.5rem' }}>
          <SectionHead title={`🤖 AI Analysis: ${selectedSDG.name} (${selectedSDG.id})`} />
          {loadingInsights ? (
            <div style={{ 
              padding: '2rem', 
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.9rem'
            }}>
              <div className="eco-spinner" style={{ width: '30px', height: '30px', margin: '0 auto 1rem', borderWidth: '3px' }} />
              Analyzing SDG progress and generating recommendations...
            </div>
          ) : aiInsights ? (
            <div style={{ 
              padding: '1.5rem', 
              background: 'var(--green-50)', 
              borderRadius: 'var(--r-sm)',
              lineHeight: 1.6,
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-wrap'
            }}>
              {aiInsights}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default SDGDashboard
