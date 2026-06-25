import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/index'
import { getSustainabilityScore } from '../services/api'
import { useSensors } from '../context/SensorContext'

const AISustainabilityScore = () => {
  const [scoreData, setScoreData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { sensorData } = useSensors()

  useEffect(() => {
    fetchScore()
  }, [sensorData])

  const fetchScore = async () => {
    try {
      setLoading(true)
      const data = await getSustainabilityScore()
      
      // Adjust score based on real-time sensor data
      if (sensorData) {
        const carbonScore = Math.max(0, 100 - (sensorData.carbonEmissions?.current / 400) * 100)
        const energyScore = Math.max(0, 100 - (sensorData.electricity?.current / 600) * 100)
        const waterScore = Math.max(0, 100 - (sensorData.water?.current / 15000) * 100)
        
        data.components.carbon.score = Math.round(carbonScore)
        data.components.energy.score = Math.round(energyScore)
        data.components.water.score = Math.round(waterScore)
        
        // Recalculate overall score
        data.overall = Math.round(
          data.components.carbon.score * data.components.carbon.weight +
          data.components.energy.score * data.components.energy.weight +
          data.components.water.score * data.components.water.weight +
          data.components.waste.score * data.components.waste.weight +
          data.components.sdg.score * data.components.sdg.weight
        )
        
        // Update grade
        data.grade = data.overall >= 90 ? 'A+' : 
                    data.overall >= 85 ? 'A' : 
                    data.overall >= 80 ? 'B+' : 
                    data.overall >= 75 ? 'B' : 
                    data.overall >= 70 ? 'C+' : 
                    data.overall >= 65 ? 'C' : 
                    data.overall >= 60 ? 'D' : 'F'
      }
      
      setScoreData(data)
    } catch (error) {
      console.error('Error fetching sustainability score:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'var(--green-500)'
    if (grade.startsWith('B')) return 'var(--teal-400)'
    if (grade.startsWith('C')) return 'var(--amber-400)'
    return 'var(--red-400)'
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return '📈'
      case 'declining': return '📉'
      default: return '➡️'
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return 'var(--green-500)'
      case 'declining': return 'var(--red-400)'
      default: return 'var(--text-muted)'
    }
  }

  if (loading) {
    return (
      <div className="card animate-fade-slide">
        <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--r-md)' }} />
      </div>
    )
  }

  if (!scoreData) {
    return (
      <div className="card animate-fade-slide">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>Unable to load score</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Please try again later
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card animate-fade-slide">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>🤖 AI Sustainability Score</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Real-time sustainability assessment powered by AI analysis
        </p>
      </div>

      {/* Overall Score Display */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '2rem', 
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, var(--green-50), var(--teal-50))',
        borderRadius: 'var(--r-md)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '4rem', 
            fontWeight: 900, 
            color: getGradeColor(scoreData.grade),
            lineHeight: 1
          }}>
            {scoreData.overall}
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Overall Score</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '5rem', 
            fontWeight: 900, 
            color: getGradeColor(scoreData.grade),
            lineHeight: 1
          }}>
            {scoreData.grade}
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Grade</div>
        </div>
      </div>

      {/* Component Scores */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Component Scores</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {Object.entries(scoreData.components).map(([key, component]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1rem' }}>
                    {key === 'carbon' ? '🌍' : 
                     key === 'energy' ? '⚡' : 
                     key === 'water' ? '💧' : 
                     key === 'waste' ? '♻️' : '🎯'}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: getTrendColor(component.trend) }}>
                    {getTrendIcon(component.trend)} {component.trend}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: component.score >= 75 ? 'var(--green-500)' : component.score >= 60 ? 'var(--amber-400)' : 'var(--red-400)' }}>
                    {component.score}
                  </span>
                  <Badge variant="sage" style={{ fontSize: '0.7rem' }}>
                    {Math.round(component.weight * 100)}%
                  </Badge>
                </div>
              </div>
              <div style={{ background: 'var(--green-100)', borderRadius: 999, height: 8, overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${component.score}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  style={{ 
                    background: component.score >= 75 ? 'var(--green-500)' : component.score >= 60 ? 'var(--amber-400)' : 'var(--red-400)', 
                    height: '100%', 
                    borderRadius: 999 
                  }} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>🤖 AI Insights</h4>
        <div style={{ 
          padding: '1rem', 
          background: 'var(--green-50)', 
          borderRadius: 'var(--r-sm)',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6
        }}>
          {scoreData.aiInsights.map((insight, index) => (
            <div key={index} style={{ marginBottom: '0.3rem' }}>
              • {insight}
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>💡 AI Improvement Suggestions</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {scoreData.improvementSuggestions.map((suggestion, index) => (
            <div key={index} style={{ 
              padding: '0.6rem', 
              background: 'var(--sage-50)', 
              borderRadius: 'var(--r-sm)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <span style={{ color: 'var(--green-500)', fontWeight: 700 }}>{index + 1}.</span>
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AISustainabilityScore
