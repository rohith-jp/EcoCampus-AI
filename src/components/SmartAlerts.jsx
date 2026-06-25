import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from './ui/index'
import { getAlerts } from '../services/api'

const SmartAlerts = ({ limit = 5 }) => {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState(new Set())

  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const fetchAlerts = async () => {
    try {
      setLoading(false)
      const data = await getAlerts()
      setAlerts(data)
    } catch (error) {
      console.error('Error fetching alerts:', error)
      setLoading(false)
    }
  }

  const dismissAlert = (id) => {
    setDismissed(new Set([...dismissed, id]))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return { bg: 'var(--red-100)', border: '#fbd7d7', text: 'var(--red-600)' }
      case 'medium': return { bg: 'var(--amber-100)', border: '#fde8d8', text: '#7a4f00' }
      case 'low': return { bg: 'var(--green-100)', border: '#d4f4db', text: 'var(--green-700)' }
      default: return { bg: 'var(--sage-100)', border: 'var(--border)', text: 'var(--text-secondary)' }
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return '🚨'
      case 'medium': return '⚠️'
      case 'low': return 'ℹ️'
      default: return '📢'
    }
  }

  const activeAlerts = alerts.filter(a => !dismissed.has(a.id)).slice(0, limit)

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton" style={{ height: '120px', borderRadius: 'var(--r-md)' }} />
        ))}
      </div>
    )
  }

  if (activeAlerts.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>All Systems Normal</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          No active alerts requiring attention
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <AnimatePresence>
        {activeAlerts.map((alert, index) => {
          const colors = getSeverityColor(alert.severity)
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="card animate-fade-slide"
              style={{
                borderLeft: `4px solid ${colors.border}`,
                background: colors.bg,
                padding: '1.2rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{getSeverityIcon(alert.severity)}</span>
                  <Badge variant={alert.severity === 'high' ? 'red' : alert.severity === 'medium' ? 'amber' : 'green'}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '0.2rem'
                  }}
                  title="Dismiss alert"
                >
                  ×
                </button>
              </div>

              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem', color: colors.text }}>
                {alert.message}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Current: <strong>{alert.value}</strong> · Threshold: {alert.threshold}
              </div>

              {alert.aiExplanation && (
                <div style={{
                  background: 'white',
                  padding: '0.6rem',
                  borderRadius: 'var(--r-sm)',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ fontWeight: 600, fontSize: '0.7rem', color: 'var(--green-600)', marginBottom: '0.2rem' }}>
                    🤖 AI Analysis
                  </div>
                  {alert.aiExplanation}
                </div>
              )}

              {alert.recommendedActions && alert.recommendedActions.length > 0 && (
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Recommended Actions:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {alert.recommendedActions.map((action, i) => (
                      <li key={i} style={{ marginBottom: '0.2rem' }}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {new Date(alert.timestamp).toLocaleString()}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default SmartAlerts
