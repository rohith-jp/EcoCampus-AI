import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { getPredictions } from '../services/api'

const PredictiveChart = ({ type, color = '#3dbf62', unit = '' }) => {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [horizon, setHorizon] = useState(7)

  useEffect(() => {
    fetchPredictions()
  }, [type, horizon])

  const fetchPredictions = async () => {
    try {
      setLoading(true)
      const data = await getPredictions(type, horizon)
      setPredictions(data.predictions || [])
    } catch (error) {
      console.error('Error fetching predictions:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="skeleton" style={{ height: '280px', borderRadius: 'var(--r-md)' }} />
    )
  }

  const chartData = predictions.map(p => ({
    date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    predicted: p.predicted,
    lowerBound: p.lowerBound,
    upperBound: p.upperBound,
    confidence: p.confidence
  }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Forecast
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            AI-powered predictions with confidence intervals
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[7, 30, 90].map(h => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--border)',
                background: horizon === h ? color : 'white',
                color: horizon === h ? 'white' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
            {h}d
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--text-muted)"
            fontSize={12}
          />
          <YAxis 
            stroke="var(--text-muted)"
            fontSize={12}
            label={{ value: unit, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-sm)',
              fontSize: '0.8rem'
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="upperBound"
            stroke={color}
            strokeOpacity={0.3}
            fill={color}
            fillOpacity={0.1}
            name="Upper Bound"
          />
          <Area
            type="monotone"
            dataKey="lowerBound"
            stroke={color}
            strokeOpacity={0.3}
            fill={color}
            fillOpacity={0.1}
            name="Lower Bound"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
            name="Predicted"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--green-50)', borderRadius: 'var(--r-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <strong>📊 Forecast Insights:</strong> Predictions are based on historical data patterns and AI models. 
        The shaded area represents the confidence interval (likely range of values). 
        Average confidence: {predictions.length > 0 ? (predictions.reduce((a, b) => a + b.confidence, 0) / predictions.length * 100).toFixed(0) : 0}%
      </div>
    </div>
  )
}

export default PredictiveChart
