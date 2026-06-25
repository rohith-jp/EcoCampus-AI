import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'

const CHALLENGES = [
  { id: 1, title: 'Zero Plastic Week', icon: '🚫', points: 100, duration: '7 days', difficulty: 'medium', category: 'waste', progress: 80, status: 'active', desc: 'Go plastic-free for an entire week. Avoid single-use plastics in your daily routine.', sdg: 'SDG 12', participants: 148 },
  { id: 2, title: 'Walk to Campus', icon: '🚶', points: 50, duration: '30 days', difficulty: 'easy', category: 'transport', progress: 60, status: 'active', desc: 'Commit to walking or cycling to campus every day for a month.', sdg: 'SDG 13', participants: 214 },
  { id: 3, title: 'Energy Saver', icon: '💡', points: 75, duration: '14 days', difficulty: 'easy', category: 'energy', progress: 45, status: 'active', desc: 'Reduce your energy consumption by 20% — unplug devices, use natural light.', sdg: 'SDG 7', participants: 196 },
  { id: 4, title: 'Tree Planting Drive', icon: '🌳', points: 120, duration: 'One-time', difficulty: 'easy', category: 'nature', progress: 25, status: 'active', desc: 'Plant a tree on campus or in your neighborhood and document the journey.', sdg: 'SDG 15', participants: 87 },
  { id: 5, title: 'Meatless Month', icon: '🥗', points: 150, duration: '30 days', difficulty: 'hard', category: 'food', progress: 0, status: 'available', desc: 'Go vegetarian or vegan for the entire month. Track meals and log carbon savings.', sdg: 'SDG 12', participants: 62 },
  { id: 6, title: 'Water Audit', icon: '💧', points: 80, duration: '7 days', difficulty: 'medium', category: 'water', progress: 0, status: 'available', desc: 'Track and reduce your daily water usage by 30% using smart conservation techniques.', sdg: 'SDG 6', participants: 104 },
  { id: 7, title: 'E-Waste Collection', icon: '🔋', points: 60, duration: 'One-time', difficulty: 'easy', category: 'waste', progress: 100, status: 'completed', desc: 'Collect and responsibly dispose of 5+ items of electronic waste.', sdg: 'SDG 12', participants: 73 },
  { id: 8, title: 'Carpooling Week', icon: '🚗', points: 90, duration: '7 days', difficulty: 'medium', category: 'transport', progress: 100, status: 'completed', desc: 'Share rides with at least 2 other students every day for a week.', sdg: 'SDG 11', participants: 128 },
]

const difficultyColors = { easy: 'var(--green-500)', medium: 'var(--amber-400)', hard: 'var(--red-400)' }
const difficultyBadge = { easy: 'green', medium: 'amber', hard: 'red' }
const categoryColors = { waste: '#00b4a0', transport: '#2492d1', energy: '#e8a525', nature: '#3dbf62', food: '#d9433e', water: '#2492d1' }

const EcoChallenges = () => {
  const [filter, setFilter] = useState('all')

  const filtered = CHALLENGES.filter(c => filter === 'all' || c.status === filter)

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🏆 Eco Challenges</h1>
        <p>Join sustainability challenges, earn points, and make a real environmental impact</p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Student Access</Badge>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Active', num: CHALLENGES.filter(c => c.status === 'active').length, sub: 'In progress', cls: 'green-num' },
          { label: 'Completed', num: CHALLENGES.filter(c => c.status === 'completed').length, sub: 'This semester', cls: 'green-num' },
          { label: 'Points Earned', num: '330', sub: 'From challenges', cls: 'green-num' },
          { label: 'Available', num: CHALLENGES.filter(c => c.status === 'available').length, sub: 'Ready to join', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['all', 'active', 'available', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '0.45rem 1rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: filter === f ? 'var(--green-500)' : 'var(--green-50)', color: filter === f ? '#fff' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', textTransform: 'capitalize' }}>
              {f === 'all' ? 'All Challenges' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {filtered.map((c, i) => (
          <div key={c.id} className="card animate-fade-slide" style={{ animationDelay: `${i * 0.05}s`, borderLeft: `4px solid ${categoryColors[c.category]}`, opacity: c.status === 'completed' ? 0.85 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ fontSize: '2rem' }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.title}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{c.duration} · {c.participants} participants</div>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontWeight: 800, color: 'var(--green-500)', fontSize: '1.1rem' }}>+{c.points}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>points</div>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.85rem' }}>{c.desc}</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <Badge variant={difficultyBadge[c.difficulty]}>{c.difficulty}</Badge>
              <span style={{ background: categoryColors[c.category] + '18', color: categoryColors[c.category], border: `1px solid ${categoryColors[c.category]}33`, padding: '2px 8px', borderRadius: 999, fontWeight: 600, fontSize: '0.74rem' }}>{c.sdg}</span>
            </div>

            {c.status !== 'available' && (
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  <span>Progress</span><span>{c.progress}%</span>
                </div>
                <div style={{ background: 'var(--green-100)', borderRadius: 999, height: 7, overflow: 'hidden' }}>
                  <div style={{ background: c.status === 'completed' ? 'var(--green-500)' : `linear-gradient(90deg, var(--green-500), var(--teal-400))`, width: `${c.progress}%`, height: '100%', borderRadius: 999, transition: 'width 0.6s' }} />
                </div>
              </div>
            )}

            <button style={{
              width: '100%', padding: '0.5rem', borderRadius: 'var(--r-sm)',
              border: c.status === 'completed' ? '1px solid var(--border)' : '1px solid var(--green-400)',
              background: c.status === 'completed' ? 'var(--green-50)' : c.status === 'active' ? 'var(--green-100)' : 'linear-gradient(135deg, var(--green-500), var(--teal-400))',
              color: c.status === 'completed' ? 'var(--green-600)' : c.status === 'active' ? 'var(--green-700)' : '#fff',
              fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
            }}>
              {c.status === 'completed' ? '✓ Completed' : c.status === 'active' ? '📊 View Progress' : '🚀 Join Challenge'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EcoChallenges
