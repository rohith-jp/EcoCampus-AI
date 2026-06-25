import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'
import AIService from '../../services/aiService'

const FACTORS = {
  transport: { car: 0.21, bus: 0.089, bike: 0, walk: 0, train: 0.041, auto: 0.12 },
  food: { vegan: 1.5, vegetarian: 2.5, mixed: 3.8, meatHeavy: 6.0 },
  energy: { low: 0.5, medium: 1.2, high: 2.1 },
}

const CarbonCalculator = () => {
  const [transport, setTransport] = useState({ mode: 'bus', kmPerDay: 10 })
  const [food, setFood] = useState('mixed')
  const [energy, setEnergy] = useState('medium')
  const [calculated, setCalculated] = useState(false)
  const [aiInsights, setAiInsights] = useState('')
  const [loadingInsights, setLoadingInsights] = useState(false)

  const calcTotal = () => {
    const transportCarbon = FACTORS.transport[transport.mode] * transport.kmPerDay * 365 / 1000
    const foodCarbon = FACTORS.food[food]
    const energyCarbon = FACTORS.energy[energy]
    return (transportCarbon + foodCarbon + energyCarbon).toFixed(2)
  }

  const total = calculated ? parseFloat(calcTotal()) : null
  const avgStudent = 4.2
  const compare = total ? Math.round((1 - total / avgStudent) * 100) : null

  const getAIInsights = async () => {
    setLoadingInsights(true)
    const prompt = `Based on my carbon footprint of ${total} tCO₂e/year with transport mode ${transport.mode} (${transport.kmPerDay} km/day), ${food} diet, and ${energy} energy usage, provide personalized recommendations to reduce my carbon footprint. Focus on actionable steps specific to my situation.`
    
    try {
      const insights = await AIService.sendMessage(prompt)
      setAiInsights(insights)
    } catch (error) {
      console.error('Error getting AI insights:', error)
      setAiInsights('Unable to generate AI insights at this time. Please try again later.')
    } finally {
      setLoadingInsights(false)
    }
  }

  const handleCalculate = () => {
    setCalculated(true)
    getAIInsights()
  }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🌍 Carbon Calculator</h1>
        <p>Calculate your personal carbon footprint and get AI-powered reduction tips</p>
        <div className="header-meta">
          <Badge variant="green">Personal Tool</Badge>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Your Footprint', num: total ? `${total}t` : '—', sub: 'tCO₂e / year', cls: 'green-num' },
          { label: 'Campus Average', num: `${avgStudent}t`, sub: 'tCO₂e / year', cls: 'green-num' },
          { label: 'vs Average', num: compare !== null ? `${compare > 0 ? '-' : '+'}${Math.abs(compare)}%` : '—', sub: compare !== null ? (compare > 0 ? 'Better than avg' : 'Above average') : 'Calculate first', cls: compare !== null && compare > 0 ? 'green-num' : 'amber-num' },
          { label: 'India Target', num: '2.0t', sub: 'Per capita by 2030', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card animate-fade-slide">
          <SectionHead title="🚗 Transportation" />
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>PRIMARY COMMUTE MODE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              {[
                { key: 'walk', label: '🚶 Walk' },
                { key: 'bike', label: '🚲 Cycle' },
                { key: 'bus', label: '🚌 Bus' },
                { key: 'train', label: '🚆 Train' },
                { key: 'auto', label: '🛺 Auto' },
                { key: 'car', label: '🚗 Car' },
              ].map(m => (
                <button key={m.key} onClick={() => setTransport(t => ({ ...t, mode: m.key }))}
                  style={{ padding: '0.6rem', borderRadius: 'var(--r-sm)', border: `1px solid ${transport.mode === m.key ? 'var(--green-400)' : 'var(--border)'}`, background: transport.mode === m.key ? 'var(--green-100)' : 'var(--green-50)', color: transport.mode === m.key ? 'var(--green-700)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>DAILY DISTANCE (KM)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="range" min={0} max={50} value={transport.kmPerDay}
                onChange={e => setTransport(t => ({ ...t, kmPerDay: Number(e.target.value) }))}
                style={{ flex: 1, accentColor: 'var(--green-500)' }} />
              <span style={{ fontWeight: 700, color: 'var(--green-600)', minWidth: 40 }}>{transport.kmPerDay} km</span>
            </div>
          </div>
        </div>

        <div className="card animate-fade-slide">
          <SectionHead title="🍽️ Diet & Lifestyle" />
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>DIET TYPE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { key: 'vegan', label: '🌱 Vegan', sub: '~1.5 tCO₂e/yr' },
                { key: 'vegetarian', label: '🥗 Vegetarian', sub: '~2.5 tCO₂e/yr' },
                { key: 'mixed', label: '🍱 Mixed (some meat)', sub: '~3.8 tCO₂e/yr' },
                { key: 'meatHeavy', label: '🥩 Meat-heavy', sub: '~6.0 tCO₂e/yr' },
              ].map(d => (
                <button key={d.key} onClick={() => setFood(d.key)}
                  style={{ padding: '0.6rem 0.9rem', borderRadius: 'var(--r-sm)', border: `1px solid ${food === d.key ? 'var(--green-400)' : 'var(--border)'}`, background: food === d.key ? 'var(--green-100)' : 'var(--green-50)', color: food === d.key ? 'var(--green-700)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', transition: 'all 0.2s' }}>
                  <span>{d.label}</span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 400, color: 'var(--text-muted)' }}>{d.sub}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>HOME ENERGY USE</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[['low', '🔋 Low'], ['medium', '⚡ Medium'], ['high', '🔌 High']].map(([k, l]) => (
                <button key={k} onClick={() => setEnergy(k)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--r-sm)', border: `1px solid ${energy === k ? 'var(--green-400)' : 'var(--border)'}`, background: energy === k ? 'var(--green-100)' : 'var(--green-50)', color: energy === k ? 'var(--green-700)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card animate-fade-slide" style={{ textAlign: 'center', padding: '1.5rem' }}>
        <button onClick={handleCalculate}
          style={{ padding: '0.75rem 2.5rem', borderRadius: 'var(--r-sm)', border: 'none', background: 'linear-gradient(135deg, var(--green-500), var(--teal-400))', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: total ? '1.5rem' : 0 }}>
          🌍 Calculate My Carbon Footprint
        </button>

        {total && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: total < 2 ? 'var(--green-500)' : total < 4 ? 'var(--amber-400)' : 'var(--red-400)', lineHeight: 1 }}>{total}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>tCO₂e / year</div>
              </div>
              <div style={{ textAlign: 'left', padding: '0.5rem 0' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Your footprint is {compare !== null && compare > 0 ? `${compare}% below` : `${Math.abs(compare || 0)}% above`} campus average</div>
                {[
                  total < 2 ? '🌟 Outstanding! You\'re a sustainability champion.' :
                  total < 3 ? '👍 Good work! Small changes can make you excellent.' :
                  total < 5 ? '⚠️ Above average. Focus on transport and diet.' :
                  '🚨 High footprint. Major changes needed — try our eco challenges!'
                ].map((tip, i) => <div key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tip}</div>)}
              </div>
            </div>
          </div>
        )}
      </div>

      {calculated && (
        <div className="card animate-fade-slide" style={{ marginTop: '1.5rem' }}>
          <SectionHead title="🤖 AI-Powered Personalized Recommendations" />
          {loadingInsights ? (
            <div style={{ 
              padding: '2rem', 
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.9rem'
            }}>
              <div className="eco-spinner" style={{ width: '30px', height: '30px', margin: '0 auto 1rem', borderWidth: '3px' }} />
              Generating personalized insights based on your carbon footprint...
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

export default CarbonCalculator
