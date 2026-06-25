import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Sensor data APIs
export const getSensors = async () => {
  const response = await api.get('/sensors')
  return response.data
}

export const getSensorData = async (type) => {
  const response = await api.get(`/sensors/${type}`)
  return response.data
}

// AI Chat API
export const sendChatMessage = async (message, conversationHistory = []) => {
  const response = await api.post('/chat', { message, conversationHistory })
  return response.data
}

// Predictive Analytics API
export const getPredictions = async (type, horizon = 7) => {
  const response = await api.get(`/predictions/${type}?horizon=${horizon}`)
  return response.data
}

// Alerts API
export const getAlerts = async () => {
  const response = await api.get('/alerts')
  return response.data
}

// Recommendations API
export const getRecommendations = async () => {
  const response = await api.get('/recommendations')
  return response.data
}

// Sustainability Score API
export const getSustainabilityScore = async () => {
  const response = await api.get('/sustainability-score')
  return response.data
}

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health')
  return response.data
}

export default api
