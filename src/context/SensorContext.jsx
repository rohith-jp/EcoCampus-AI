import { createContext, useContext, useState, useEffect } from 'react'
import { getSensors } from '../services/api'

const SensorContext = createContext(null)

export const SensorProvider = ({ children }) => {
  const [sensorData, setSensorData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchSensorData = async () => {
    try {
      setLoading(true)
      const data = await getSensors()
      setSensorData(data)
      setLastUpdate(new Date())
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching sensor data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSensorData()
    
    // Refresh sensor data every 30 seconds
    const interval = setInterval(fetchSensorData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const calculatePercentageChange = (current, previous) => {
    if (!previous || previous === 0) return 0
    const change = ((current - previous) / previous) * 100
    return Math.round(change * 10) / 10
  }

  const getSensorWithChange = (type) => {
    if (!sensorData || !sensorData[type]) return null
    
    const data = sensorData[type]
    const change = calculatePercentageChange(data.current, data.previous)
    
    return {
      ...data,
      change,
      isPositive: change > 0,
      isNegative: change < 0
    }
  }

  return (
    <SensorContext.Provider value={{
      sensorData,
      loading,
      error,
      lastUpdate,
      fetchSensorData,
      getSensorWithChange,
      calculatePercentageChange
    }}>
      {children}
    </SensorContext.Provider>
  )
}

export const useSensors = () => {
  const context = useContext(SensorContext)
  if (!context) {
    throw new Error('useSensors must be used within SensorProvider')
  }
  return context
}
