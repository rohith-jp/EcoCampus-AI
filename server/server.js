import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Simulated IoT sensor data store
let sensorData = {
  carbonEmissions: { current: 358, previous: 372, unit: 'tCO₂e', timestamp: new Date() },
  electricity: { current: 485, previous: 495, unit: 'kWh', timestamp: new Date() },
  water: { current: 12500, previous: 11900, unit: 'liters', timestamp: new Date() },
  waste: { current: 245, previous: 267, unit: 'kg', timestamp: new Date() },
  aqi: { current: 42, previous: 45, unit: 'AQI', timestamp: new Date() },
  temperature: { current: 28, previous: 27, unit: '°C', timestamp: new Date() },
  humidity: { current: 65, previous: 62, unit: '%', timestamp: new Date() }
}

// Simulate real-time sensor updates
function simulateSensorData() {
  const variation = () => (Math.random() - 0.5) * 10
  
  sensorData.carbonEmissions = {
    current: Math.max(300, Math.min(400, sensorData.carbonEmissions.current + variation())),
    previous: sensorData.carbonEmissions.current,
    unit: 'tCO₂e',
    timestamp: new Date()
  }
  
  sensorData.electricity = {
    current: Math.max(400, Math.min(600, sensorData.electricity.current + variation() * 2)),
    previous: sensorData.electricity.current,
    unit: 'kWh',
    timestamp: new Date()
  }
  
  sensorData.water = {
    current: Math.max(10000, Math.min(15000, sensorData.water.current + variation() * 50)),
    previous: sensorData.water.current,
    unit: 'liters',
    timestamp: new Date()
  }
  
  sensorData.waste = {
    current: Math.max(200, Math.min(300, sensorData.waste.current + variation())),
    previous: sensorData.waste.current,
    unit: 'kg',
    timestamp: new Date()
  }
  
  sensorData.aqi = {
    current: Math.max(20, Math.min(100, sensorData.aqi.current + variation())),
    previous: sensorData.aqi.current,
    unit: 'AQI',
    timestamp: new Date()
  }
  
  sensorData.temperature = {
    current: Math.max(20, Math.min(35, sensorData.temperature.current + variation() * 0.5)),
    previous: sensorData.temperature.current,
    unit: '°C',
    timestamp: new Date()
  }
  
  sensorData.humidity = {
    current: Math.max(40, Math.min(90, sensorData.humidity.current + variation())),
    previous: sensorData.humidity.current,
    unit: '%',
    timestamp: new Date()
  }
}

// Update sensor data every 30 seconds
setInterval(simulateSensorData, 30000)

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

app.get('/api/sensors', (req, res) => {
  res.json(sensorData)
})

app.get('/api/sensors/:type', (req, res) => {
  const { type } = req.params
  if (sensorData[type]) {
    res.json(sensorData[type])
  } else {
    res.status(404).json({ error: 'Sensor type not found' })
  }
})

// AI Chat endpoint (placeholder for actual AI integration)
app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory } = req.body
  
  // Simulate AI response delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Placeholder response - in production, integrate with OpenAI/Gemini
  const responses = {
    carbon: 'Based on current campus data, carbon emissions are at 358 tCO₂e. To reduce this, focus on renewable energy adoption and transportation optimization.',
    energy: 'Current electricity usage is 485 kWh. Consider implementing LED lighting upgrades and smart HVAC systems to reduce consumption.',
    water: 'Water consumption is at 12,500 liters. Installing low-flow fixtures and fixing leaks can significantly reduce usage.',
    default: 'I can help you with sustainability questions about carbon emissions, energy usage, water conservation, waste management, and SDGs. What would you like to know?'
  }
  
  const lowerMessage = message.toLowerCase()
  let response = responses.default
  
  if (lowerMessage.includes('carbon') || lowerMessage.includes('emission')) {
    response = responses.carbon
  } else if (lowerMessage.includes('energy') || lowerMessage.includes('electricity')) {
    response = responses.energy
  } else if (lowerMessage.includes('water')) {
    response = responses.water
  }
  
  res.json({
    response,
    timestamp: new Date(),
    confidence: 0.85
  })
})

// Predictive analytics endpoint
app.get('/api/predictions/:type', (req, res) => {
  const { type } = req.params
  const horizon = req.query.horizon || '7' // days
  
  // Generate mock predictions based on historical patterns
  const predictions = []
  const baseValue = sensorData[type]?.current || 100
  
  for (let i = 1; i <= parseInt(horizon); i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      predicted: baseValue + (Math.random() - 0.5) * 20,
      confidence: Math.max(0.7, 0.95 - (i * 0.03)),
      lowerBound: baseValue * 0.85,
      upperBound: baseValue * 1.15
    })
  }
  
  res.json({ predictions, type, horizon })
})

// Smart alerts endpoint
app.get('/api/alerts', (req, res) => {
  const alerts = []
  
  // Generate alerts based on thresholds
  if (sensorData.carbonEmissions.current > 380) {
    alerts.push({
      id: 1,
      severity: 'high',
      type: 'carbon',
      message: 'Carbon emissions exceeding threshold',
      value: sensorData.carbonEmissions.current,
      threshold: 380,
      timestamp: new Date(),
      aiExplanation: 'Carbon emissions have spiked due to increased energy consumption from HVAC systems during peak hours.',
      recommendedActions: ['Reduce HVAC usage during peak hours', 'Increase renewable energy usage', 'Promote carpooling']
    })
  }
  
  if (sensorData.water.current > 14000) {
    alerts.push({
      id: 2,
      severity: 'medium',
      type: 'water',
      message: 'Water consumption above normal levels',
      value: sensorData.water.current,
      threshold: 14000,
      timestamp: new Date(),
      aiExplanation: 'Water usage has increased likely due to seasonal factors and potential leaks in the system.',
      recommendedActions: ['Inspect for leaks', 'Implement water conservation measures', 'Install smart meters']
    })
  }
  
  if (sensorData.aqi.current > 60) {
    alerts.push({
      id: 3,
      severity: 'medium',
      type: 'air',
      message: 'Air quality deteriorating',
      value: sensorData.aqi.current,
      threshold: 60,
      timestamp: new Date(),
      aiExplanation: 'Air quality index has increased due to vehicular emissions and construction activities nearby.',
      recommendedActions: ['Increase green cover', 'Promote electric vehicles', 'Monitor construction dust']
    })
  }
  
  res.json(alerts)
})

// Recommendations endpoint
app.get('/api/recommendations', (req, res) => {
  const recommendations = [
    {
      id: 1,
      priority: 'high',
      category: 'energy',
      action: 'Reduce electricity usage in Building A',
      impact: '15% reduction',
      sdg: 'SDG 7 - Clean Energy',
      estimatedSavings: '72 kWh/month',
      difficulty: 'Medium',
      aiGenerated: true,
      reasoning: 'Building A shows 20% higher consumption than similar buildings during peak hours.'
    },
    {
      id: 2,
      priority: 'high',
      category: 'waste',
      action: 'Increase recycling in Block C',
      impact: '25% reduction in landfill waste',
      sdg: 'SDG 12 - Responsible Consumption',
      estimatedSavings: '45 kg/month',
      difficulty: 'Low',
      aiGenerated: true,
      reasoning: 'Block C has the lowest recycling rate at 45%, compared to campus average of 62%.'
    },
    {
      id: 3,
      priority: 'medium',
      category: 'water',
      action: 'Reduce water consumption in Hostel 2',
      impact: '12% reduction',
      sdg: 'SDG 6 - Clean Water',
      estimatedSavings: '1,500 liters/month',
      difficulty: 'Low',
      aiGenerated: true,
      reasoning: 'Hostel 2 shows 18% higher per capita water usage than other hostels.'
    }
  ]
  
  res.json(recommendations)
})

// Sustainability score endpoint
app.get('/api/sustainability-score', (req, res) => {
  const score = {
    overall: 78,
    grade: 'B+',
    components: {
      carbon: { score: 72, weight: 0.25, trend: 'improving' },
      energy: { score: 85, weight: 0.25, trend: 'stable' },
      water: { score: 68, weight: 0.20, trend: 'declining' },
      waste: { score: 82, weight: 0.20, trend: 'improving' },
      sdg: { score: 79, weight: 0.10, trend: 'improving' }
    },
    aiInsights: [
      'Water efficiency needs immediate attention - down 5% from last month',
      'Energy performance is strong due to recent solar panel installation',
      'Waste management improved significantly after composting program launch'
    ],
    improvementSuggestions: [
      'Implement water audit in Hostel 2',
      'Expand solar panel coverage to Building B',
      'Launch awareness campaign for water conservation'
    ],
    timestamp: new Date()
  }
  
  res.json(score)
})

app.listen(PORT, () => {
  console.log(`EcoCampus Server running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
})
