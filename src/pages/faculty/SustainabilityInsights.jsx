import { Badge, SectionHead } from '../../components/ui/index'
import { mockRecommendations, mockPatterns } from '../../data/mockData'

const INSIGHTS = [
  {
    id: 1, icon: '📉', type: 'trend', title: 'Carbon Footprint Declining', impact: 'high',
    detail: 'Students in ENV 301 have reduced their average carbon footprint by 18% over the past semester, driven by increased active commuting and reduced meat consumption.',
    action: 'Share best practices with ENV 302 cohort',
    sdg: 'SDG 13 — Climate Action',
    color: 'var(--green-500)',
  },
  {
    id: 2, icon: '⚠️', type: 'alert', title: 'Waste Reduction Stalling', impact: 'medium',
    detail: 'Food waste metrics have plateaued for 6 weeks. The cafeteria partnership module has shown less engagement than expected this semester.',
    action: 'Introduce waste audit exercise in Week 11',
    sdg: 'SDG 12 — Responsible Consumption',
    color: 'var(--amber-400)',
  },
  {
    id: 3, icon: '💡', type: 'opportunity', title: 'Peer Learning Opportunity', impact: 'medium',
    detail: 'Top performers (Arjun, Ananya) have innovative sustainability projects that could inspire peers. A peer showcase event could lift average scores by ~8 points.',
    action: 'Schedule peer sustainability showcase in Week 12',
    sdg: 'SDG 4 — Quality Education',
    color: 'var(--teal-400)',
  },
  {
    id: 4, icon: '🌱', type: 'achievement', title: 'Energy Conservation Milestone', impact: 'high',
    detail: 'Your ENV 401 students collectively hit the 500 kWh saved milestone, exceeding the semester target by 22%. Excellent engagement with the smart building module.',
    action: 'Issue achievement certificates and share with admin',
    sdg: 'SDG 7 — Affordable and Clean Energy',
    color: 'var(--green-500)',
  },
  {
    id: 5, icon: '📊', type: 'trend', title: 'Water Awareness Gap', impact: 'low',
    detail: 'Water conservation module engagement is the lowest across all sustainability topics (72% completion). Students report difficulty connecting it to daily campus life.',
    action: 'Add campus water audit field activity',
    sdg: 'SDG 6 — Clean Water',
    color: 'var(--blue-400, #2492d1)',
  },
]

const impactColors = { high: 'green', medium: 'amber', low: 'green' }
const typeColors = { trend: '#2492d1', alert: '#e8a525', opportunity: '#00b4a0', achievement: '#3dbf62' }

const SustainabilityInsights = () => (
  <div className="container">
    <div className="page-header animate-fade-slide">
      <h1>💡 Sustainability Insights</h1>
      <p>AI-powered insights and recommendations to improve course sustainability outcomes</p>
      <div className="header-meta">
        <div className="live-dot" />
        <Badge variant="green">AI Generated</Badge>
        <Badge variant="green">Faculty Access</Badge>
      </div>
    </div>

    <div className="status-grid" style={{ marginBottom: '2rem' }}>
      {[
        { label: 'AI Insights', num: INSIGHTS.length, sub: 'Generated this week', cls: 'green-num' },
        { label: 'High Impact', num: INSIGHTS.filter(i => i.impact === 'high').length, sub: 'Priority actions', cls: 'green-num' },
        { label: 'Opportunities', num: INSIGHTS.filter(i => i.type === 'opportunity').length, sub: 'Areas to improve', cls: 'green-num' },
        { label: 'Alerts', num: INSIGHTS.filter(i => i.type === 'alert').length, sub: 'Needs attention', cls: 'amber-num' },
      ].map((item, i) => (
        <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="status-label">{item.label}</div>
          <div className={`status-num ${item.cls}`}>{item.num}</div>
          <div className="status-sublabel">{item.sub}</div>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
      {INSIGHTS.map((ins, i) => (
        <div key={ins.id} className="card animate-fade-slide" style={{ animationDelay: `${i * 0.07}s`, borderLeft: `4px solid ${ins.color}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{ins.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{ins.title}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ background: typeColors[ins.type] + '18', color: typeColors[ins.type], border: `1px solid ${typeColors[ins.type]}33`, padding: '2px 8px', borderRadius: 999, fontWeight: 600, fontSize: '0.74rem', textTransform: 'capitalize' }}>{ins.type}</span>
                  <Badge variant={impactColors[ins.impact]}>{ins.impact} impact</Badge>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{ins.detail}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ background: ins.color + '12', borderRadius: 'var(--r-sm)', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: ins.color, fontWeight: 600 }}>💡 Suggested: {ins.action}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{ins.sdg}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="card animate-fade-slide">
      <SectionHead title="AI Course Recommendations" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
        {mockRecommendations.slice(0, 4).map(r => (
          <div className="rec-card" key={r.id}>
            <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{r.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="rec-meta">
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.action}</div>
                <Badge variant={r.badgeVariant}>{r.impactPercentage}%</Badge>
              </div>
              <div style={{ fontSize: '0.77rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{r.sdg}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Expected impact: {r.expectedImpact} · {r.difficulty} difficulty</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default SustainabilityInsights
