import { Badge, SectionHead } from '../../components/ui/index'
import { TrendChart } from '../../components/charts/Charts'
import { useAuth } from '../../context/AuthContext'

const scoreTrend = [
  { month: 'Sep', value: 60 }, { month: 'Oct', value: 63 }, { month: 'Nov', value: 65 },
  { month: 'Dec', value: 64 }, { month: 'Jan', value: 68 }, { month: 'Feb', value: 72 },
  { month: 'Mar', value: 78 },
]

const CATEGORIES = [
  { name: 'Carbon Footprint', score: 82, icon: '🌍', desc: 'Your transport & energy emissions', color: '#3dbf62' },
  { name: 'Waste Reduction', score: 74, icon: '♻️', desc: 'Waste generated vs recycled', color: '#00b4a0' },
  { name: 'Water Conservation', score: 79, icon: '💧', desc: 'Daily water consumption habits', color: '#2492d1' },
  { name: 'Green Mobility', score: 88, icon: '🚲', desc: 'Cycling, walking, public transit use', color: '#e8a525' },
  { name: 'Sustainable Consumption', score: 68, icon: '🛍️', desc: 'Eco-conscious purchasing patterns', color: '#d9433e' },
  { name: 'Community Engagement', score: 75, icon: '🤝', desc: 'Participation in eco events & drives', color: '#8b5cf6' },
]

const PersonalSustainabilityScore = () => {
  const { user } = useAuth()
  const overallScore = 78
  const rank = 42

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🌱 Sustainability Score</h1>
        <p>Your personal sustainability performance, trends, and improvement areas</p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Personal Dashboard</Badge>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Overall Score', num: `${overallScore}/100`, sub: 'This month', cls: 'green-num' },
          { label: 'Campus Rank', num: `#${rank}`, sub: 'Out of 312 students', cls: 'green-num' },
          { label: 'Improvement', num: '+18', sub: 'Points since Sep', cls: 'green-num' },
          { label: 'Best Category', num: '88', sub: 'Green Mobility', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Big score display */}
      <div className="card animate-fade-slide" style={{ textAlign: 'center', padding: '2rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(61,191,98,0.08), rgba(0,180,160,0.08))' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Overall Sustainability Score</div>
        <div style={{ fontSize: '5rem', fontWeight: 900, background: 'linear-gradient(135deg, var(--green-500), var(--teal-400))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>{overallScore}</div>
        <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>/ 100</div>
        <div style={{ background: 'var(--green-100)', borderRadius: 999, height: 14, overflow: 'hidden', maxWidth: 400, margin: '0 auto', marginBottom: '0.75rem' }}>
          <div style={{ background: 'linear-gradient(90deg, var(--green-500), var(--teal-400))', width: `${overallScore}%`, height: '100%', borderRadius: 999, transition: 'width 1s ease' }} />
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--green-600)', fontWeight: 600 }}>
          {overallScore >= 85 ? '🌟 Excellent' : overallScore >= 70 ? '👍 Good — keep it up!' : '📈 Room to improve'}
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card animate-fade-slide">
          <SectionHead title="Score Trend (7 Months)" />
          <TrendChart data={scoreTrend} dataKey="value" color="#3dbf62" height={220} />
        </div>

        <div className="card animate-fade-slide">
          <SectionHead title="Category Breakdown" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
            {CATEGORIES.map(c => (
              <div key={c.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>{c.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{c.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.desc}</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, color: c.color, fontSize: '0.95rem' }}>{c.score}</span>
                </div>
                <div style={{ background: 'var(--green-100)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                  <div style={{ background: c.color, width: `${c.score}%`, height: '100%', borderRadius: 999, transition: 'width 0.6s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalSustainabilityScore
