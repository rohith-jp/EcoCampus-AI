import { useState, useRef, useEffect } from 'react'
import { Badge, SectionHead } from '../components/ui/index'
import AIService from '../services/aiService'

const SUGGESTED_PROMPTS = [
  { icon: '🌍', text: 'How can I reduce my carbon footprint on campus?' },
  { icon: '⚡', text: 'What are the best ways to save energy in my hostel room?' },
  { icon: '♻️', text: 'Explain the campus waste segregation system' },
  { icon: '💧', text: 'Give me 5 tips to conserve water daily' },
  { icon: '🚲', text: 'What sustainable transport options are available on campus?' },
  { icon: '🌱', text: 'How does my eco score get calculated?' },
]

const INITIAL_MESSAGES = [
  {
    id: 1, role: 'assistant',
    text: 'Hello! 🌿 I\'m your **EcoCampus AI Sustainability Assistant**. I\'m here to help you understand sustainability topics, reduce your environmental impact, and make the most of EcoCampus AI\'s features.\n\nYou can ask me about carbon footprints, energy conservation, SDGs, eco challenges, or anything sustainability-related. How can I help you today?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
]

const formatText = (text) => {
  return text.split('\n').map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    return <p key={i} style={{ margin: '0 0 0.3rem', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: bold }} />
  })
}

const AIChatbot = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), role: 'user', text: text.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      const conversationHistory = messages.map(m => ({ role: m.role, text: m.text }))
      const response = await AIService.sendMessage(text, conversationHistory)
      
      const aiMsg = {
        id: Date.now() + 1, role: 'assistant',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(m => [...m, aiMsg])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMsg = {
        id: Date.now() + 1, role: 'assistant',
        text: 'Sorry, I encountered an error. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(m => [...m, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const clearConversation = () => {
    setMessages(INITIAL_MESSAGES)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🤖 AI Sustainability Chatbot</h1>
        <p>Ask anything about sustainability, get personalized eco insights, and discover ways to green your lifestyle</p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">AI Powered</Badge>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Chat window */}
        <div className="card animate-fade-slide" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'linear-gradient(135deg, rgba(61,191,98,0.06), rgba(0,180,160,0.06))' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--green-500), var(--teal-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>🌿</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>EcoBot — Sustainability Assistant</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-500)' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Online · AI-powered · EcoCampus v2</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 400, maxHeight: 520 }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: m.role === 'assistant' ? 'linear-gradient(135deg, var(--green-500), var(--teal-400))' : 'var(--green-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: m.role === 'assistant' ? '1rem' : '0.82rem', fontWeight: 700, color: m.role === 'assistant' ? '#fff' : 'var(--green-700)', flexShrink: 0 }}>
                  {m.role === 'assistant' ? '🌿' : 'You'}
                </div>
                <div style={{ maxWidth: '78%' }}>
                  <div style={{ background: m.role === 'user' ? 'linear-gradient(135deg, var(--green-500), var(--teal-400))' : 'var(--green-50)', color: m.role === 'user' ? '#fff' : 'var(--text-primary)', border: m.role === 'assistant' ? '1px solid var(--border)' : 'none', borderRadius: m.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px', padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                    {formatText(m.text)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', textAlign: m.role === 'user' ? 'right' : 'left' }}>{m.time}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--green-500), var(--teal-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🌿</div>
                <div style={{ background: 'var(--green-50)', border: '1px solid var(--border)', borderRadius: '4px 18px 18px 18px', padding: '0.75rem 1.1rem' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: 16 }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-400)', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-end' }}>
              <button
                onClick={startVoiceInput}
                disabled={isListening}
                style={{ padding: '0.65rem 0.9rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: isListening ? 'var(--red-100)' : 'var(--green-50)', color: isListening ? 'var(--red-400)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', cursor: isListening ? 'not-allowed' : 'pointer', transition: 'all 0.2s', flexShrink: 0 }}
                title="Voice input"
              >
                {isListening ? '🔴' : '🎤'}
              </button>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about sustainability, carbon footprint, eco tips..."
                rows={1}
                style={{ flex: 1, padding: '0.65rem 0.9rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none', resize: 'none', lineHeight: 1.5 }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                style={{ padding: '0.65rem 1.1rem', borderRadius: 'var(--r-sm)', border: 'none', background: input.trim() && !loading ? 'linear-gradient(135deg, var(--green-500), var(--teal-400))' : 'var(--border)', color: input.trim() && !loading ? '#fff' : 'var(--text-muted)', fontWeight: 700, fontSize: '1rem', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', transition: 'all 0.2s', flexShrink: 0 }}
              >➤</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Press Enter to send · Shift+Enter for new line · 🎤 Voice input supported</div>
              <button
                onClick={clearConversation}
                style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear conversation
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card animate-fade-slide">
            <SectionHead title="💡 Suggested Prompts" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              {SUGGESTED_PROMPTS.map((p, i) => (
                <button key={i} onClick={() => sendMessage(p.text)}
                  style={{ padding: '0.55rem 0.75rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.78rem', cursor: 'pointer', textAlign: 'left', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', transition: 'all 0.15s', lineHeight: 1.4 }}>
                  <span style={{ flexShrink: 0 }}>{p.icon}</span>
                  <span>{p.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card animate-fade-slide">
            <SectionHead title="📊 Chat Stats" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
              {[
                { label: 'Messages', value: messages.length },
                { label: 'Questions asked', value: messages.filter(m => m.role === 'user').length },
                { label: 'Topics covered', value: new Set(messages.filter(m => m.role === 'user').map(m => m.text.slice(0, 10))).size },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--green-600)' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card animate-fade-slide" style={{ background: 'linear-gradient(135deg, rgba(61,191,98,0.08), rgba(0,180,160,0.08))', border: '1px solid rgba(61,191,98,0.2)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: 'var(--green-600)' }}>🌿 About EcoBot</div>
              EcoBot is powered by EcoCampus AI and trained on sustainability data, campus metrics, and SDG frameworks. It helps students, faculty, and admins make data-driven eco decisions.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default AIChatbot
