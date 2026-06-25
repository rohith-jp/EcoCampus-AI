import { useState } from 'react'
import { Badge } from '../components/ui/index'
import { mockRecommendations } from '../data/mockData'
import AIRecommendations from '../components/AIRecommendations'

const categories = ['all', 'food_waste', 'water', 'electricity', 'paper', 'transportation']
const difficultyColor = { Low: 'green', Medium: 'amber', High: 'red' }

const Recommendations = () => {
  const [filter, setFilter] = useState('all')
  const [useAI, setUseAI] = useState(true)

  const filtered = filter === 'all' ? mockRecommendations : mockRecommendations.filter(r => r.category === filter)

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>AI Recommendations</h1>
        <p>Actionable sustainability improvements ranked by impact and feasibility</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <button
            onClick={() => setUseAI(true)}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: 'var(--r-sm)', 
              border: '1px solid var(--border)', 
              background: useAI ? 'linear-gradient(135deg, var(--green-500), var(--teal-400))' : 'white',
              color: useAI ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🤖 AI-Powered
          </button>
          <button
            onClick={() => setUseAI(false)}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: 'var(--r-sm)', 
              border: '1px solid var(--border)', 
              background: !useAI ? 'linear-gradient(135deg, var(--green-500), var(--teal-400))' : 'white',
              color: !useAI ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            📋 Static List
          </button>
        </div>
      </div>

      {useAI ? (
        <div className="card animate-fade-slide">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>🤖 AI-Generated Recommendations</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              These recommendations are dynamically generated based on real-time sensor data and AI analysis.
            </p>
          </div>
          <AIRecommendations limit={10} />
        </div>
      ) : (
        <>
          {/* Category filter */}
          <div className="prompt-tabs">
            {categories.map(c => (
              <button
                key={c}
                className={`prompt-tab${filter === c ? ' active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c === 'all' ? '🌿 All' : c === 'food_waste' ? '🍎 Food Waste' : c === 'water' ? '💧 Water' : c === 'electricity' ? '⚡ Electricity' : c === 'paper' ? '📄 Paper' : '🚴 Transport'}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((r, i) => (
              <div className="card card-hoverable animate-fade-slide" key={r.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{r.icon}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', flex: 1, marginRight: '0.5rem' }}>{r.action}</div>
                  <Badge variant={r.badgeVariant}>{r.impactPercentage}% impact</Badge>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--green-600)', fontWeight: 600, marginBottom: '0.5rem' }}>{r.sdg}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.55 }}>{r.description}</div>

                {/* Benefits */}
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
                  {r.benefits.map(b => (
                    <li key={b} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0' }}>
                      <span style={{ color: 'var(--green-400)', fontSize: '0.7rem' }}>✓</span> {b}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                  <span>⏱ {r.timeToImplement}</span>
                  <Badge variant={difficultyColor[r.difficulty] || 'sage'}>{r.difficulty}</Badge>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Recommendations
