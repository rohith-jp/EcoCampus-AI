import { Badge, SectionHead } from '../../components/ui/index'

const EARNED = [
  { id: 1, icon: '🌱', title: 'First Steps', desc: 'Completed your first sustainability challenge', date: '2023-09-15', points: 25, rarity: 'common' },
  { id: 2, icon: '🚲', title: 'Green Commuter', desc: 'Cycled or walked to campus 20 days in a row', date: '2023-10-08', points: 75, rarity: 'uncommon' },
  { id: 3, icon: '♻️', title: 'Waste Warrior', desc: 'Zero plastic waste for a full week', date: '2023-11-20', points: 100, rarity: 'uncommon' },
  { id: 4, icon: '⚡', title: 'Energy Saver', desc: 'Reduced energy use by 20% for two weeks', date: '2024-01-10', points: 75, rarity: 'uncommon' },
  { id: 5, icon: '🏆', title: 'Top 50', desc: 'Ranked in the top 50 on the campus leaderboard', date: '2024-02-14', points: 150, rarity: 'rare' },
  { id: 6, icon: '🌿', title: 'Eco Scholar', desc: 'Achieved eco score above 75 for 3 consecutive months', date: '2024-03-01', points: 200, rarity: 'rare' },
]

const LOCKED = [
  { id: 7, icon: '🌍', title: 'Carbon Neutral', desc: 'Reach a carbon footprint below 2 tCO₂e/yr', points: 300, rarity: 'epic', hint: 'Reduce transport & food emissions' },
  { id: 8, icon: '🌟', title: 'Sustainability Champion', desc: 'Maintain eco score above 90 for 2 months', points: 500, rarity: 'legendary', hint: 'Score 90+ two months in a row' },
  { id: 9, icon: '🦋', title: 'Butterfly Effect', desc: 'Inspire 5 friends to join eco challenges', points: 250, rarity: 'epic', hint: 'Share challenges with classmates' },
  { id: 10, icon: '💧', title: 'Water Guardian', desc: 'Complete 3 water conservation challenges', points: 150, rarity: 'rare', hint: 'Join any water-related challenge' },
  { id: 11, icon: '🌞', title: 'Solar Advocate', desc: 'Submit a renewable energy campus proposal', points: 200, rarity: 'epic', hint: 'Visit AI Assistant for ideas' },
  { id: 12, icon: '🌲', title: 'Forest Friend', desc: 'Plant 5 trees and document each', points: 175, rarity: 'rare', hint: 'Join the Tree Planting Drive' },
]

const rarityColors = {
  common: { bg: 'var(--green-50)', border: 'var(--border)', label: '#888', text: 'Common' },
  uncommon: { bg: 'rgba(0,180,160,0.08)', border: 'rgba(0,180,160,0.3)', label: '#00b4a0', text: 'Uncommon' },
  rare: { bg: 'rgba(36,146,209,0.08)', border: 'rgba(36,146,209,0.3)', label: '#2492d1', text: 'Rare' },
  epic: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.3)', label: '#8b5cf6', text: 'Epic' },
  legendary: { bg: 'rgba(232,165,37,0.12)', border: 'rgba(232,165,37,0.4)', label: '#e8a525', text: 'Legendary' },
}

const BadgeCard = ({ item, locked }) => {
  const r = rarityColors[item.rarity]
  return (
    <div className="card animate-fade-slide" style={{ background: r.bg, border: `1.5px solid ${r.border}`, opacity: locked ? 0.7 : 1, textAlign: 'center', padding: '1.25rem 1rem', position: 'relative', overflow: 'hidden' }}>
      {locked && (
        <div style={{ position: 'absolute', top: 8, right: 8, fontSize: '0.9rem' }}>🔒</div>
      )}
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', filter: locked ? 'grayscale(0.7)' : 'none' }}>{item.icon}</div>
      <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.25rem' }}>{item.title}</div>
      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.6rem' }}>{item.desc}</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ background: r.label + '18', color: r.label, border: `1px solid ${r.label}33`, padding: '2px 8px', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem' }}>{r.text}</span>
        <span style={{ background: 'var(--green-100)', color: 'var(--green-700)', padding: '2px 8px', borderRadius: 999, fontWeight: 700, fontSize: '0.72rem' }}>+{item.points} pts</span>
      </div>
      {locked && item.hint && (
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>💡 {item.hint}</div>
      )}
      {!locked && item.date && (
        <div style={{ fontSize: '0.72rem', color: 'var(--green-600)', fontWeight: 600 }}>✓ Earned {item.date}</div>
      )}
    </div>
  )
}

const Achievements = () => {
  const totalPoints = EARNED.reduce((a, b) => a + b.points, 0)

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🏅 Achievements</h1>
        <p>Your sustainability badges, milestones, and progress toward unlocking new rewards</p>
        <div className="header-meta">
          <Badge variant="green">Student Access</Badge>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Badges Earned', num: EARNED.length, sub: `of ${EARNED.length + LOCKED.length} total`, cls: 'green-num' },
          { label: 'Points from Badges', num: totalPoints, sub: 'Achievement points', cls: 'green-num' },
          { label: 'Rarest Badge', num: '🌿', sub: 'Eco Scholar (Rare)', cls: 'green-num' },
          { label: 'Next Unlock', num: '💧', sub: 'Water Guardian', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="card animate-fade-slide" style={{ marginBottom: '1.5rem' }}>
        <SectionHead title="Badge Collection Progress" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
          <div style={{ flex: 1, background: 'var(--green-100)', borderRadius: 999, height: 12, overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(90deg, var(--green-500), var(--teal-400))', width: `${Math.round(EARNED.length / (EARNED.length + LOCKED.length) * 100)}%`, height: '100%', borderRadius: 999, transition: 'width 0.8s ease' }} />
          </div>
          <span style={{ fontWeight: 700, color: 'var(--green-600)', whiteSpace: 'nowrap' }}>{EARNED.length} / {EARNED.length + LOCKED.length}</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {Object.entries(rarityColors).map(([key, val]) => {
            const earnedCount = EARNED.filter(b => b.rarity === key).length
            return earnedCount > 0 ? (
              <span key={key} style={{ background: val.label + '18', color: val.label, border: `1px solid ${val.label}33`, padding: '2px 10px', borderRadius: 999, fontWeight: 600, fontSize: '0.75rem' }}>
                {val.text}: {earnedCount}
              </span>
            ) : null
          })}
        </div>
      </div>

      <SectionHead title={`✅ Earned Badges (${EARNED.length})`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem', marginTop: '0.75rem' }}>
        {EARNED.map(b => <BadgeCard key={b.id} item={b} locked={false} />)}
      </div>

      <SectionHead title={`🔒 Locked Badges (${LOCKED.length})`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
        {LOCKED.map(b => <BadgeCard key={b.id} item={b} locked={true} />)}
      </div>
    </div>
  )
}

export default Achievements
