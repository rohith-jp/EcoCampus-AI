import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/index'
import { getRecommendations } from '../services/api'
import { useSensors } from '../context/SensorContext'

const AIRecommendations = ({ limit = 5 }) => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const { sensorData } = useSensors()

  useEffect(() => {
    fetchRecommendations()
  }, [sensorData])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      const data = await getRecommendations()
      setRecommendations(data.slice(0, limit))
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--red-400)'
      case 'medium': return 'var(--amber-400)'
      case 'low': return 'var(--green-500)'
      default: return 'var(--text-muted)'
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'red'
      case 'medium': return 'amber'
      case 'low': return 'green'
      default: return 'sage'
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton" style={{ height: '100px', borderRadius: 'var(--r-md)' }} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.id}
          className="rec-card animate-fade-slide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>
            {rec.category === 'energy' ? '⚡' : 
             rec.category === 'water' ? '💧' : 
             rec.category === 'waste' ? '♻️' : 
             rec.category === 'carbon' ? '🌍' : '💡'}
          </div>
          <div style={{ flex: 1 }}>
            <div className="rec-meta">
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rec.action}</div>
              <Badge variant={getPriorityBadge(rec.priority)}>{rec.priority}</Badge>
            </div>
            <div style={{ fontSize: '0.77rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              {rec.sdg || 'SDG-aligned recommendation'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              <span>Impact: {rec.impact || rec.estimatedSavings}</span>
              <span>{rec.difficulty || 'Medium'} difficulty</span>
            </div>
            {rec.aiGenerated && (
              <div style={{ 
                fontSize: '0.7rem', 
                color: 'var(--green-600)', 
                marginTop: '0.4rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <span>🤖</span> AI-generated
              </div>
            )}
            {rec.reasoning && (
              <div style={{ 
                fontSize: '0.74rem', 
                color: 'var(--text-secondary)', 
                marginTop: '0.3rem',
                fontStyle: 'italic',
                lineHeight: 1.4
              }}>
                "{rec.reasoning}"
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default AIRecommendations
