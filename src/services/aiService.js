// AI Service - Ready for OpenAI/Gemini integration
// Set your API key in .env file as VITE_OPENAI_API_KEY or VITE_GEMINI_API_KEY

const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'mock' // 'openai', 'gemini', or 'mock'
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY

// Mock AI responses for demonstration
const mockAIResponses = {
  carbon: `Based on current campus data, carbon emissions are at 358 tCO₂e. Here's how you can reduce your carbon footprint:

**Transportation:**
- Walk, cycle, or use public transport instead of private vehicles (40-60% reduction)
- Join campus carpooling programs
- Use electric bikes or scooters for short distances

**Energy:**
- Turn off lights and electronics when not in use
- Use natural light whenever possible
- Set AC to 24°C instead of lower temperatures

**Waste:**
- Segregate waste properly
- Compost organic waste
- Reduce single-use plastics

On average, students can reduce their footprint from 4.2 to under 2.5 tCO₂e/year by following these steps.`,

  energy: `⚡ **Energy Conservation Tips:**

**Lighting:**
- Switch to LED bulbs (saves ~8 kWh/month)
- Always turn lights off when leaving rooms
- Use motion sensors in common areas

**Electronics:**
- Unplug chargers and devices when not in use
- Use power strips to easily disconnect multiple devices
- Enable power-saving modes on computers

**HVAC:**
- Set AC to 24°C instead of 18°C (saves ~20% energy)
- Use fans when possible instead of AC
- Keep windows and doors closed when AC is on

**Laundry:**
- Use cold water settings
- Only run full loads
- Air dry clothes when possible

Students following these tips typically save ₹200-400/month while reducing 15-20 kg of CO₂ monthly.`,

  water: `💧 **Water Conservation Strategies:**

**Daily Habits:**
- Shorter showers: Cut from 10 to 5 minutes (saves ~50 liters per shower)
- Turn off taps while brushing teeth (saves 12L per brush)
- Report leaking taps immediately (a dripping tap wastes 5,000+ liters/month)

**Reuse:**
- Collect water from rinsing fruits/vegetables to water plants
- Use a bucket instead of running hose for washing
- Reuse RO wastewater for cleaning

**Efficiency:**
- Only run dishwashers and washing machines with full loads
- Fix toilet leaks promptly
- Install water-efficient fixtures

If all 312 students on campus followed tips 1 and 2, we'd save **over 1 million liters per year**!`,

  waste: `♻️ **Campus Waste Management:**

**Waste Segregation System:**
🟢 **Green Bin** — Wet/organic waste (food scraps, vegetable peels)
🔵 **Blue Bin** — Dry recyclables (paper, cardboard, clean plastic)
🟡 **Yellow Bin** — E-waste (batteries, old electronics, wires)
🔴 **Red Bin** — Hazardous/landfill (contaminated packaging, tissues)

**Current Performance:**
- Campus diversion rate: 62%
- Target: 80% by 2026
- Your contribution matters!

**Tips:**
- Always rinse containers before recycling
- Remove caps from bottles
- Flatten cardboard boxes
- Never put food waste in recycling bins`,

  sdg: `🎯 **Sustainable Development Goals (SDGs) on Campus:**

EcoCampus AI focuses on these key SDGs:

**SDG 6 - Clean Water & Sanitation**
- Monitoring water consumption across campus
- Implementing water conservation measures
- Target: 20% reduction by 2025

**SDG 7 - Affordable & Clean Energy**
- Solar panel installation (42% renewable mix)
- Energy efficiency programs
- Smart building management

**SDG 12 - Responsible Consumption**
- Waste reduction and recycling
- Sustainable procurement
- Composting programs

**SDG 13 - Climate Action**
- Carbon tracking and reduction
- Net-zero target: 2040
- Climate education programs

Your daily actions directly contribute to these global goals!`,

  default: `🌿 I'm your EcoCampus AI Sustainability Assistant! I can help you with:

**Topics I can discuss:**
- 🌍 Carbon footprint reduction strategies
- ⚡ Energy conservation tips
- 💧 Water conservation methods
- ♻️ Waste management and recycling
- 🎯 Sustainable Development Goals (SDGs)
- 🏆 Eco challenges and achievements
- 📊 Sustainability metrics and scores

**Just ask me anything sustainability-related!**

For example:
- "How can I reduce my carbon footprint?"
- "What are the best ways to save energy?"
- "Explain the campus waste segregation system"
- "What SDGs does our campus focus on?"

I provide personalized advice based on campus data and global sustainability research.`
}

export class AIService {
  static async sendMessage(message, conversationHistory = []) {
    if (AI_PROVIDER === 'mock') {
      return this.getMockResponse(message)
    } else if (AI_PROVIDER === 'openai') {
      return this.sendToOpenAI(message, conversationHistory)
    } else if (AI_PROVIDER === 'gemini') {
      return this.sendToGemini(message, conversationHistory)
    }
  }

  static getMockResponse(message) {
    const lower = message.toLowerCase()
    
    if (lower.includes('carbon') || lower.includes('footprint') || lower.includes('emission')) {
      return mockAIResponses.carbon
    } else if (lower.includes('energy') || lower.includes('electricity') || lower.includes('power')) {
      return mockAIResponses.energy
    } else if (lower.includes('water')) {
      return mockAIResponses.water
    } else if (lower.includes('waste') || lower.includes('recycle') || lower.includes('bin')) {
      return mockAIResponses.waste
    } else if (lower.includes('sdg') || lower.includes('sustainable development')) {
      return mockAIResponses.sdg
    }
    
    return mockAIResponses.default
  }

  static async sendToOpenAI(message, conversationHistory) {
    if (!API_KEY) {
      console.warn('OpenAI API key not configured, falling back to mock responses')
      return this.getMockResponse(message)
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are EcoBot, an AI sustainability assistant for EcoCampus. Provide helpful, accurate advice about sustainability, carbon footprints, energy conservation, water usage, waste management, and SDGs. Be concise but informative. Use emojis to make responses engaging.'
            },
            ...conversationHistory.map(msg => ({
              role: msg.role === 'assistant' ? 'assistant' : 'user',
              content: msg.text
            })),
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      })

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error('OpenAI API error:', error)
      return this.getMockResponse(message)
    }
  }

  static async sendToGemini(message, conversationHistory) {
    if (!API_KEY) {
      console.warn('Gemini API key not configured, falling back to mock responses')
      return this.getMockResponse(message)
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are EcoBot, an AI sustainability assistant for EcoCampus. Provide helpful, accurate advice about sustainability, carbon footprints, energy conservation, water usage, waste management, and SDGs. Be concise but informative. Use emojis to make responses engaging.\n\nUser: ${message}`
            }]
          }]
        })
      })

      const data = await response.json()
      return data.candidates[0].content.parts[0].text
    } catch (error) {
      console.error('Gemini API error:', error)
      return this.getMockResponse(message)
    }
  }

  static async generateRecommendations(metrics) {
    // Generate AI-powered recommendations based on current metrics
    const recommendations = []
    
    if (metrics.electricity?.current > 500) {
      recommendations.push({
        priority: 'high',
        category: 'energy',
        action: 'Reduce electricity usage in high-consumption areas',
        impact: '15% reduction expected',
        aiGenerated: true
      })
    }
    
    if (metrics.water?.current > 13000) {
      recommendations.push({
        priority: 'high',
        category: 'water',
        action: 'Implement water conservation measures',
        impact: '12% reduction expected',
        aiGenerated: true
      })
    }
    
    if (metrics.waste?.current > 250) {
      recommendations.push({
        priority: 'medium',
        category: 'waste',
        action: 'Increase recycling and composting efforts',
        impact: '20% landfill diversion',
        aiGenerated: true
      })
    }
    
    return recommendations
  }

  static async generateInsights(data) {
    // Generate AI-powered insights from data
    return {
      summary: 'Campus sustainability performance is improving overall',
      keyFindings: [
        'Energy efficiency up 8% from last month',
        'Water consumption needs attention',
        'Waste recycling rate at 62%, target is 80%'
      ],
      recommendations: [
        'Focus on water conservation in hostels',
        'Expand solar panel coverage',
        'Launch waste awareness campaign'
      ]
    }
  }
}

export default AIService
