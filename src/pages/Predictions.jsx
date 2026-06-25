import { useState } from 'react'
import { StatCard, ConfidenceBar } from '../components/ui/index'
import { ComparisonChart } from '../components/charts/Charts'
import PredictiveChart from '../components/PredictiveChart'
import { mockPredictions } from '../data/mockData'

const tabs = [
  { key: 'electricity', label: '⚡ Electricity' },
  { key: 'water', label: '💧 Water' },
  { key: 'foodWaste', label: '🍎 Food Waste' },
  { key: 'sustainability', label: '🌿 Sustainability Score' },
]

const Predictions = () => {
  const [active, setActive] = useState('electricity')
  const [useRealTime, setUseRealTime] = useState(true)
  const pred = mockPredictions[active]

  // Merge historical + predicted into one array for ComparisonChart
  const chartData = [
    ...pred.historical.map(h => ({ month: h.month, actual: h.actual })),
    ...pred.predictions.map(p => ({ month: p.month, predicted: p.predicted })),
  ]

  const nextMonth = pred.predictions[0]

  const typeMapping = {
    electricity: 'electricity',
    water: 'water',
    foodWaste: 'waste',
    sustainability: 'sustainability'
  }

  const colorMapping = {
    electricity: '#e8a525',
    water: '#2492d1',
    foodWaste: '#d9433e',
    sustainability: '#3dbf62'
  }

  const unitMapping = {
    electricity: 'kWh',
    water: 'liters',
    foodWaste: 'kg',
    sustainability: '/100'
  }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>AI Predictions</h1>
        <p>Forecast resource usage with confidence-weighted machine learning models</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <button
            onClick={() => setUseRealTime(true)}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: 'var(--r-sm)', 
              border: '1px solid var(--border)', 
              background: useRealTime ? 'linear-gradient(135deg, var(--green-500), var(--teal-400))' : 'white',
              color: useRealTime ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🤖 Real-Time AI Forecast
          </button>
          <button
            onClick={() => setUseRealTime(false)}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: 'var(--r-sm)', 
              border: '1px solid var(--border)', 
              background: !useRealTime ? 'linear-gradient(135deg, var(--green-500), var(--teal-400))' : 'white',
              color: !useRealTime ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            📊 Historical Analysis
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="pred-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`pred-tab${active === t.key ? ' active' : ''}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {useRealTime ? (
        <div className="card animate-fade-slide">
          <PredictiveChart 
            type={typeMapping[active]} 
            color={colorMapping[active]}
            unit={unitMapping[active]}
          />
        </div>
      ) : (
        <>
          {/* Stats row */}
          <div className="grid-4" style={{ marginBottom: '2rem' }}>
            <StatCard label="Current Value" value={pred.currentValue} unit={pred.unit} icon={pred.icon} />
            <StatCard label="AI Confidence" value={`${Math.round(pred.confidenceScore * 100)}%`} unit="score" icon="🎯" />
            <StatCard label="Next Month Forecast" value={nextMonth.predicted} unit={pred.unit} icon="📅" />
            <StatCard
              label="Monthly Trend"
              value={pred.monthlyTrend === 'up' ? '↑' : '↓'}
              unit={pred.monthlyTrend === 'up' ? 'Increasing' : 'Decreasing'}
              icon="📊"
            />
          </div>

          {/* Chart */}
          <div className="card animate-fade-slide">
            <div className="section-title" style={{ marginBottom: '0.5rem' }}>
              {pred.resourceName} — Historical + Predicted
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Solid line = actual data · Dashed line = AI forecast
            </p>
            <ConfidenceBar value={pred.confidenceScore} />
            <div className="chart-wrap chart-wrap-lg">
              <ComparisonChart data={chartData} height={340} />
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span style={{ width: 24, height: 3, background: '#3dbf62', borderRadius: 2, display: 'inline-block' }} />
                Historical
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span style={{ width: 24, height: 3, background: '#e8a525', borderRadius: 2, display: 'inline-block', borderTop: '2px dashed #e8a525' }} />
                Predicted
              </span>
            </div>
          </div>

          {/* 3-Month Forecast Cards */}
          <div style={{ marginTop: '2rem' }}>
            <div className="section-title" style={{ marginBottom: '1rem' }}>3-Month Forecast</div>
            <div className="grid-3">
              {pred.predictions.map((p, i) => (
                <div className="card animate-fade-slide" key={p.month} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                    {p.month}
                  </div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {p.predicted}
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'inherit', marginLeft: 6 }}>{pred.unit}</span>
                  </div>
                  <ConfidenceBar value={p.confidence} label="Forecast confidence" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Predictions
