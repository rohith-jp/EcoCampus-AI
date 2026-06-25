import { useState, useRef, useEffect } from 'react'

const INITIAL_MESSAGES = [
  {
    role: 'ai',
    text: "Hello! I'm the EcoCampus AI Knowledge Assistant. I can answer questions about campus sustainability, resource usage, environmental best practices, and SDG goals. How can I help you today?",
  },
]

const SUGGESTED_QUESTIONS = [
  'What is our current sustainability score?',
  'How can we reduce electricity consumption?',
  'What SDGs are most relevant to our campus?',
  'Explain the food waste reduction strategies',
  'What are the benefits of solar panels?',
  'How does AI pattern detection work?',
]

const AI_RESPONSES = {
  'electricity': "Our campus uses **485 kWh** currently. Key reduction strategies include: LED lighting upgrades (15% savings), smart HVAC scheduling (22% savings), motion-sensor controls, and employee awareness programs. The AI predicts usage will reach 500 kWh in 3 months without intervention.",
  'water': "Current water consumption is **12,500 liters/month**, trending upward. Recommended actions: low-flow faucets (20% reduction), sensor-based taps, leak detection systems, and rainwater harvesting. Pattern detection flagged a 12% anomaly this week.",
  'food': "Food waste stands at **245 kg/month**, showing a positive 8% decline. Key strategies: improve meal planning with AI demand forecasting, right-size portion controls, implement composting stations, and engage students in food tracking programs.",
  'sustainability': "The campus sustainability score is **78/100**, up 3% vs last month. This reflects improvements in energy efficiency, waste reduction, and green transportation. AI predicts reaching 81 by Q2 with current trajectory.",
  'sdg': "Our campus primarily aligns with: **SDG 6** (Clean Water), **SDG 7** (Affordable Clean Energy), **SDG 11** (Sustainable Cities), **SDG 12** (Responsible Consumption), and **SDG 13** (Climate Action). Each recommendation maps to specific SDG targets.",
  'solar': "Solar panels on campus can generate **40-60 kWh/day** depending on placement and weather. Benefits include: zero-emission energy, 20-25 year lifespan, reduced grid dependence, cost savings after ~7-year payback period, and educational value.",
  'ai': "Pattern detection uses time-series analysis and anomaly detection algorithms. The system monitors 180 IoT sensors, applies statistical baselines, and flags deviations > 2 standard deviations. Current accuracy is 94% with < 2s response time.",
  'default': "That's a great sustainability question! Based on our campus data, I'd recommend checking the Pattern Detection and Recommendations sections for the latest AI-driven insights. Our system continuously learns from 180 IoT sensors to provide personalized guidance.",
}

function getAIResponse(text) {
  const lower = text.toLowerCase()
  if (lower.includes('electric') || lower.includes('energy') || lower.includes('power')) return AI_RESPONSES.electricity
  if (lower.includes('water') || lower.includes('liquid')) return AI_RESPONSES.water
  if (lower.includes('food') || lower.includes('waste') || lower.includes('cafeteria')) return AI_RESPONSES.food
  if (lower.includes('score') || lower.includes('sustainab')) return AI_RESPONSES.sustainability
  if (lower.includes('sdg') || lower.includes('goal')) return AI_RESPONSES.sdg
  if (lower.includes('solar') || lower.includes('panel') || lower.includes('renewable')) return AI_RESPONSES.solar
  if (lower.includes('ai') || lower.includes('pattern') || lower.includes('detect')) return AI_RESPONSES.ai
  return AI_RESPONSES.default
}

const SustainabilityAssistant = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (text) => {
    const q = (text || input).trim()
    if (!q) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: q }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(m => [...m, { role: 'ai', text: getAIResponse(q) }])
    }, 900 + Math.random() * 600)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>Knowledge Assistant</h1>
        <p>Ask sustainability questions and get AI-powered answers with contextual campus data</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Chat */}
        <div className="chat-box animate-fade-slide">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                <div className="sender">{m.role === 'ai' ? '🌱 EcoCampus AI' : '👤 You'}</div>
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg ai">
                <div className="sender">🌱 EcoCampus AI</div>
                <span style={{ opacity: 0.6 }}>Thinking…</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Ask about campus sustainability…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isTyping}
            />
            <button className="chat-send-btn" onClick={() => sendMessage()} disabled={isTyping || !input.trim()}>
              Send
            </button>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="card animate-fade-slide" style={{ animationDelay: '0.1s' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem' }}>
            💬 Suggested Questions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {SUGGESTED_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  textAlign: 'left', padding: '0.65rem 0.85rem', background: 'var(--green-50)',
                  border: '1px solid var(--green-100)', borderRadius: 'var(--r-md)',
                  fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: 'inherit', lineHeight: 1.45,
                }}
                onMouseEnter={e => e.target.style.background = 'var(--green-100)'}
                onMouseLeave={e => e.target.style.background = 'var(--green-50)'}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SustainabilityAssistant
