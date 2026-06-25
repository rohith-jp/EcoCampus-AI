import { motion } from 'framer-motion'
import { useSensors } from '../context/SensorContext'

const RealTimeSensorCard = ({ type, icon, label, color }) => {
  const { getSensorWithChange, loading } = useSensors()
  const sensor = getSensorWithChange(type)

  if (loading || !sensor) {
    return (
      <div className="stat-card animate-fade-slide">
        <div className="skeleton" style={{ height: '100px', borderRadius: 'var(--r-md)' }} />
      </div>
    )
  }

  const { current, previous, change, isPositive, isNegative, timestamp } = sensor
  const changeColor = isNegative ? 'var(--green-500)' : isPositive ? 'var(--red-400)' : 'var(--text-muted)'
  const changeIcon = isNegative ? '↓' : isPositive ? '↑' : '→'

  return (
    <motion.div
      className="stat-card animate-fade-slide"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="stat-label">{label}</div>
      <div className="stat-row">
        <div className="stat-value" style={{ color }}>{current.toFixed(1)}</div>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-unit">{sensor.unit}</div>
      <div className="stat-trend" style={{ color: changeColor }}>
        {changeIcon} {Math.abs(change)}% vs last update
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
        Updated: {new Date(timestamp).toLocaleTimeString()}
      </div>
    </motion.div>
  )
}

export default RealTimeSensorCard
