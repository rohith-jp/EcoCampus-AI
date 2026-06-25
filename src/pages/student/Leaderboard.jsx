import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'

const LEADERBOARD = [
  { rank: 1, name: 'Ananya Roy', course: 'ENV 402', score: 96, carbon: 1.6, challenges: 12, badge: '🌟', trend: '↑' },
  { rank: 2, name: 'Arjun Kumar', course: 'ENV 301', score: 92, carbon: 1.8, challenges: 11, badge: '🥇', trend: '↑' },
  { rank: 3, name: 'Priya Sharma', course: 'ENV 302', score: 87, carbon: 2.1, challenges: 9, badge: '🥈', trend: '→' },
  { rank: 4, name: 'Dev Patel', course: 'ENV 301', score: 85, carbon: 2.2, challenges: 10, badge: '🥉', trend: '↑' },
  { rank: 5, name: 'Meera Nair', course: 'ENV 302', score: 82, carbon: 2.4, challenges: 8, badge: '4️⃣', trend: '↑' },
  { rank: 6, name: 'Kiran Das', course: 'ENV 301', score: 79, carbon: 2.6, challenges: 7, badge: '5️⃣', trend: '→' },
  { rank: 7, name: 'Zara Khan', course: 'ENV 402', score: 77, carbon: 2.7, challenges: 8, badge: '6️⃣', trend: '↑' },
  { rank: 8, name: 'Ravi Menon', course: 'ENV 302', score: 75, carbon: 2.9, challenges: 6, badge: '7️⃣', trend: '↓' },
  { rank: 9, name: 'Sneha Patel', course: 'ENV 302', score: 71, carbon: 3.1, challenges: 5, badge: '8️⃣', trend: '→' },
  { rank: 10, name: 'Amit Singh', course: 'ENV 301', score: 70, carbon: 3.2, challenges: 5, badge: '9️⃣', trend: '↓' },
  // Current user at rank 42
  { rank: 42, name: 'Student User ⭐ (You)', course: 'ENV 301', score: 78, carbon: 2.1, challenges: 5, badge: '42', trend: '↑', isMe: true },
]

const TOP3 = LEADERBOARD.slice(0, 3)
const REST = LEADERBOARD.slice(3)

const trendColor = { '↑': 'var(--green-500)', '→': 'var(--amber-400)', '↓': 'var(--red-400)' }

const Leaderboard = () => {
  const [period, setPeriod] = useState('monthly')
  const [category, setCategory] = useState('overall')

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🥇 Leaderboard</h1>
        <p>See how you rank among peers in campus sustainability performance</p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Live Rankings</Badge>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Your Rank', num: '#42', sub: 'Out of 312 students', cls: 'green-num' },
          { label: 'Your Score', num: '78', sub: 'Eco points', cls: 'green-num' },
          { label: 'Top 10%?', num: 'No', sub: 'Need 85+ to qualify', cls: 'amber-num' },
          { label: 'Points to #40', num: '+2', sub: 'Almost there!', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['weekly', 'monthly', 'semester'].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ padding: '0.4rem 0.85rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: period === p ? 'var(--green-500)' : 'var(--green-50)', color: period === p ? '#fff' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'capitalize' }}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['overall', 'carbon', 'challenges'].map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                style={{ padding: '0.4rem 0.85rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: category === cat ? 'var(--teal-400)' : 'var(--green-50)', color: category === cat ? '#fff' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'capitalize' }}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Podium */}
      <div className="card animate-fade-slide" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(61,191,98,0.06), rgba(0,180,160,0.06))' }}>
        <SectionHead title="🏆 Top 3 Champions" />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '1.5rem', padding: '1rem 0' }}>
          {[TOP3[1], TOP3[0], TOP3[2]].map((s, i) => {
            const heights = [110, 140, 90]
            const colors = ['#c0c0c0', '#ffd700', '#cd7f32']
            const ranks = [2, 1, 3]
            return (
              <div key={s.rank} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{s.badge}</div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.25rem' }}>{s.name.split(' ')[0]}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{s.score} pts</div>
                <div style={{ width: 80, height: heights[i], background: `linear-gradient(180deg, ${colors[i]}44, ${colors[i]}22)`, border: `2px solid ${colors[i]}66`, borderRadius: 'var(--r-sm) var(--r-sm) 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, color: colors[i] }}>
                  {ranks[i]}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Full table */}
      <div className="card animate-fade-slide" style={{ padding: 0, overflow: 'hidden' }}>
        <SectionHead title={`Rankings — ${period.charAt(0).toUpperCase() + period.slice(1)}`} />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'var(--green-50)', borderBottom: '1px solid var(--border)' }}>
              {['Rank', 'Student', 'Course', 'Eco Score', 'Carbon (t/yr)', 'Challenges', 'Trend'].map(h => (
                <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...LEADERBOARD.slice(0, 10), LEADERBOARD[LEADERBOARD.length - 1]].map((s) => (
              <tr key={s.rank} style={{ borderBottom: '1px solid var(--border)', background: s.isMe ? 'rgba(61,191,98,0.07)' : 'transparent', fontWeight: s.isMe ? 700 : 400 }}>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ fontWeight: 800, color: s.rank <= 3 ? ['#e8a525', '#ffd700', '#cd7f32'][s.rank - 1] : 'var(--text-muted)' }}>#{s.rank}</span>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: s.isMe ? 'var(--green-200)' : 'var(--green-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--green-700)', fontSize: '0.78rem', flexShrink: 0 }}>
                      {s.name[0]}
                    </div>
                    <span>{s.name}</span>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{s.course}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ fontWeight: 700, color: s.score >= 85 ? 'var(--green-500)' : s.score >= 70 ? 'var(--amber-400)' : 'var(--red-400)', fontSize: '1rem' }}>{s.score}</span>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{s.carbon}</td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{s.challenges}</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: trendColor[s.trend], fontSize: '1.1rem' }}>{s.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
