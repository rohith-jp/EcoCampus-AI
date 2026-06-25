import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const ROLE_PATHS = { admin: '/admin/dashboard', faculty: '/faculty/dashboard', student: '/student/dashboard' }

// ─── Scroll Reveal Wrapper ────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 32 : direction === 'down' ? -32 : 0,
      x: direction === 'left' ? 32 : direction === 'right' ? -32 : 0,
      scale: direction === 'zoom' ? 0.92 : 1,
    },
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  }
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
const Counter = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const num = parseFloat(target)
    const duration = 2000
    const steps = 60
    const step = num / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, num)
      setCount(current % 1 === 0 ? current : parseFloat(current.toFixed(1)))
      if (current >= num) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

// ─── Floating Icon ────────────────────────────────────────────────────────────
const FloatingIcon = ({ emoji, style }) => (
  <motion.div
    style={{ position: 'absolute', fontSize: '1.8rem', pointerEvents: 'none', ...style }}
    animate={{ y: [0, -18, 0], rotate: [-3, 3, -3] }}
    transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    {emoji}
  </motion.div>
)

// ─── Section Label ─────────────────────────────────────────────────────────────
const SectionLabel = ({ text }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'linear-gradient(135deg, rgba(52,192,122,0.15), rgba(36,146,209,0.12))',
    border: '1px solid rgba(52,192,122,0.3)',
    borderRadius: '999px', padding: '6px 18px', marginBottom: '1.2rem',
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#34c07a',
  }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c07a', display: 'inline-block' }} />
    {text}
  </div>
)

// ─── Homepage Component ────────────────────────────────────────────────────────
const HomePage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const goToDashboard = () => {
    if (user) navigate(ROLE_PATHS[user.role] || '/login')
    else navigate('/login')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Features', id: 'features' },
  { label: 'Contact', id: 'contact' },
];

  return (
    <div style={{ background: '#050d10', color: '#e8f5f0', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 2rem', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(5,13,16,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(52,192,122,0.15)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #34c07a, #2492d1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', boxShadow: '0 0 20px rgba(52,192,122,0.4)',
          }}>🌱</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>
            Eco<span style={{ color: '#34c07a' }}>Campus</span> AI
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          className="hp-desktop-nav">
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background: 'none', border: 'none', color: 'rgba(232,245,240,0.75)',
              fontSize: '0.82rem', fontWeight: 600, padding: '6px 12px', cursor: 'pointer',
              borderRadius: 8, transition: 'color 0.2s, background 0.2s', fontFamily: 'inherit',
            }}
              onMouseEnter={e => { e.target.style.color = '#34c07a'; e.target.style.background = 'rgba(52,192,122,0.08)' }}
              onMouseLeave={e => { e.target.style.color = 'rgba(232,245,240,0.75)'; e.target.style.background = 'none' }}
            >
              {l.label}
            </button>
          ))}
          {user ? (
            <button onClick={() => goToDashboard()} style={{
              background: 'linear-gradient(135deg, #34c07a, #2492d1)',
              border: 'none', color: '#fff', fontSize: '0.82rem', fontWeight: 700,
              padding: '8px 18px', borderRadius: 999, cursor: 'pointer',
              marginLeft: 8, boxShadow: '0 0 20px rgba(52,192,122,0.25)', fontFamily: 'inherit',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Dashboard →
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
              <button onClick={() => navigate('/login')} style={{
                background: 'none', border: '1px solid rgba(52,192,122,0.4)', color: '#34c07a',
                fontSize: '0.82rem', fontWeight: 700, padding: '7px 16px', borderRadius: 999,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.background = 'rgba(52,192,122,0.1)' }}
                onMouseLeave={e => { e.target.style.background = 'none' }}
              >
                Sign In
              </button>
              <button onClick={() => navigate('/register')} style={{
                background: 'linear-gradient(135deg, #34c07a, #2492d1)',
                border: 'none', color: '#fff', fontSize: '0.82rem', fontWeight: 700,
                padding: '8px 18px', borderRadius: 999, cursor: 'pointer',
                boxShadow: '0 0 20px rgba(52,192,122,0.25)', fontFamily: 'inherit',
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => e.target.style.opacity = '0.85'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                Get Started →
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', background: 'none', border: '1px solid rgba(52,192,122,0.3)',
            color: '#34c07a', width: 40, height: 40, borderRadius: 8, cursor: 'pointer',
            fontSize: '1.1rem', alignItems: 'center', justifyContent: 'center',
          }}
          className="hp-mobile-btn"
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
              background: 'rgba(5,13,16,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(52,192,122,0.15)',
              padding: '1rem', display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{
                background: 'none', border: 'none', color: '#e8f5f0', fontSize: '0.9rem',
                fontWeight: 600, padding: '10px 16px', cursor: 'pointer', textAlign: 'left',
                borderRadius: 8, fontFamily: 'inherit', transition: 'background 0.2s',
              }}>
                {l.label}
              </button>
            ))}
            {user ? (
              <button onClick={() => goToDashboard()} style={{
                background: 'linear-gradient(135deg, #34c07a, #2492d1)',
                border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 700,
                padding: '10px 16px', borderRadius: 8, cursor: 'pointer',
                marginTop: 4, fontFamily: 'inherit',
              }}>
                Dashboard →
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} style={{
                  background: 'none', border: '1px solid rgba(52,192,122,0.4)', color: '#34c07a',
                  fontSize: '0.9rem', fontWeight: 700, padding: '10px 16px', borderRadius: 8,
                  cursor: 'pointer', marginTop: 4, fontFamily: 'inherit',
                }}>
                  Sign In
                </button>
                <button onClick={() => navigate('/register')} style={{
                  background: 'linear-gradient(135deg, #34c07a, #2492d1)',
                  border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 700,
                  padding: '10px 16px', borderRadius: 8, cursor: 'pointer',
                  marginTop: 4, fontFamily: 'inherit',
                }}>
                  Get Started
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section id="hero" style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', padding: '6rem 2rem 4rem',
      }}>
        {/* Gradient background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(52,192,122,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(36,146,209,0.1) 0%, transparent 55%), #050d10',
        }} />

        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.06,
          backgroundImage: 'linear-gradient(rgba(52,192,122,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(52,192,122,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Floating icons */}
        

        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '20%', left: '20%', width: 400, height: 400,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,192,122,0.08) 0%, transparent 70%)',
          zIndex: 0, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '15%', width: 300, height: 300,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(36,146,209,0.09) 0%, transparent 70%)',
          zIndex: 0, pointerEvents: 'none',
        }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 860 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(52,192,122,0.1)', border: '1px solid rgba(52,192,122,0.25)',
              borderRadius: 999, padding: '6px 18px', marginBottom: '1.5rem',
              fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#34c07a',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c07a', display: 'inline-block', boxShadow: '0 0 8px #34c07a' }} />
            IBM SkillsBuild × AICTE · AI for Sustainability
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
              fontWeight: 900, lineHeight: 1.1, marginBottom: '1.2rem',
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: '#fff' }}>Eco</span>
            <span style={{ background: 'linear-gradient(135deg, #34c07a, #2492d1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Campus
            </span>
            <span style={{ color: '#fff' }}> AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'rgba(232,245,240,0.7)',
              lineHeight: 1.55, marginBottom: '1rem', fontWeight: 500,
            }}
          >
            AI-Powered Smart Sustainability Platform for Educational Campuses
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              fontSize: '0.92rem', color: 'rgba(232,245,240,0.52)',
              lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 680, margin: '0 auto 2.5rem',
            }}
          >
            EcoCampus AI leverages Artificial Intelligence to help educational institutions monitor, analyze, and improve sustainability by optimizing energy consumption, reducing carbon emissions, managing waste, conserving water, and promoting environmentally responsible decision-making.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <HeroBtn primary onClick={() => goToDashboard()}>🚀 Explore Dashboard</HeroBtn>
            <HeroBtn onClick={() => scrollTo('about')}>Learn More ↓</HeroBtn>
            <HeroBtn onClick={() => scrollTo('ai-solution')}>View AI Features</HeroBtn>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 1, cursor: 'pointer' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          onClick={() => scrollTo('about')}
        >
          <div style={{
            width: 28, height: 44, borderRadius: 14,
            border: '2px solid rgba(52,192,122,0.4)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6px 0',
          }}>
            <div style={{ width: 4, height: 10, borderRadius: 2, background: '#34c07a' }} />
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '6rem 2rem', background: 'rgba(8,20,16,0.95)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="About the Project" />
              <h2 style={headingStyle}>What is EcoCampus AI?</h2>
              <p style={subStyle}>
                A next-generation AI sustainability platform purpose-built for educational institutions,
                transforming campuses into intelligent, resource-efficient ecosystems.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { icon: '🎯', title: 'Vision', text: 'To transform every educational campus into a fully intelligent, zero-waste, carbon-neutral smart environment by 2030 through the power of AI.' },
              { icon: '🚀', title: 'Mission', text: 'Empower institutions with real-time AI analytics, predictive intelligence, and automated sustainability recommendations to reduce their environmental impact.' },
              { icon: '📋', title: 'Objectives', text: 'Monitor 6 key sustainability metrics, deliver AI-driven predictions with 95%+ accuracy, and generate actionable insights for campus administrators and students.' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <GlassCard>
                  <div style={{ fontSize: '2rem', marginBottom: '0.9rem' }}>{card.icon}</div>
                  <h3 style={cardTitleStyle}>{card.title}</h3>
                  <p style={cardDescStyle}>{card.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '⚡', label: 'Smart Energy' },
              { icon: '🌍', label: 'Carbon Tracking' },
              { icon: '💧', label: 'Water Conservation' },
              { icon: '♻️', label: 'Waste Management' },
              { icon: '🧠', label: 'AI Analytics' },
              { icon: '📊', label: 'Sustainability Reports' },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08} direction="zoom">
                <motion.div
                  whileHover={{ scale: 1.05, background: 'rgba(52,192,122,0.12)' }}
                  style={{
                    textAlign: 'center', padding: '1.4rem 1rem',
                    border: '1px solid rgba(52,192,122,0.15)', borderRadius: 14,
                    background: 'rgba(52,192,122,0.05)', transition: 'background 0.2s',
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(232,245,240,0.8)' }}>{item.label}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ──────────────────────────────────────────────── */}
      <section id="problem" style={{ padding: '6rem 2rem', background: '#050d10' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="Problem Statement" />
              <h2 style={headingStyle}>Challenges Campuses Face Today</h2>
              <p style={subStyle}>AI-powered solutions targeting the five critical sustainability failures in modern educational institutions.</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: '⚡', color: '#f59e0b', title: 'High Energy Consumption',
                desc: 'Campus buildings consume 30–40% more energy than needed due to inefficient HVAC systems and poor occupancy scheduling.',
                impact: 'Annual costs exceed $5M for large universities',
                solution: 'AI predicts optimal energy schedules and auto-adjusts building systems in real time',
              },
              {
                icon: '💧', color: '#2492d1', title: 'Water Wastage',
                desc: 'Leaking pipes, over-irrigation, and unmonitored usage result in thousands of liters wasted daily across campus grounds.',
                impact: '25% of campus water is wasted on average',
                solution: 'Smart sensors + ML anomaly detection identify leaks within minutes',
              },
              {
                icon: '🗑️', color: '#ef4444', title: 'Poor Waste Management',
                desc: 'Lack of smart sorting, tracking, and recycling systems leads to recyclable materials ending up in landfills.',
                impact: '70% of recyclable campus waste is landfill-bound',
                solution: 'AI waste classification and smart bin routing maximize recycling rates',
              },
              {
                icon: '🌫️', color: '#a855f7', title: 'Carbon Emissions',
                desc: 'Vehicle fleets, HVAC systems, and power grid reliance generate substantial greenhouse gas emissions annually.',
                impact: 'Average campus emits 50,000 tonnes CO₂ per year',
                solution: 'Carbon footprint AI tracks every source and recommends reduction pathways',
              },
              {
                icon: '📉', color: '#10b981', title: 'Lack of Awareness',
                desc: 'Students and administrators lack real-time visibility into sustainability metrics and their own environmental impact.',
                impact: 'Behavioral change accounts for 20% of possible reduction',
                solution: 'Gamified dashboards and AI chatbot engage the campus community daily',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${card.color}30` }}
                  style={{
                    background: 'rgba(255,255,255,0.03)', border: `1px solid ${card.color}25`,
                    borderRadius: 18, padding: '1.8rem', transition: 'box-shadow 0.3s',
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${card.color}18`, border: `1px solid ${card.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', marginBottom: '1.1rem',
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{ ...cardTitleStyle, color: card.color }}>{card.title}</h3>
                  <p style={{ ...cardDescStyle, marginBottom: '1rem' }}>{card.desc}</p>
                  <div style={{
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 8, padding: '8px 12px', marginBottom: '0.7rem',
                    fontSize: '0.75rem', color: '#fca5a5', fontWeight: 600,
                  }}>
                    📊 Impact: {card.impact}
                  </div>
                  <div style={{
                    background: 'rgba(52,192,122,0.08)', border: '1px solid rgba(52,192,122,0.2)',
                    borderRadius: 8, padding: '8px 12px',
                    fontSize: '0.75rem', color: '#6ee7b7', fontWeight: 600,
                  }}>
                    🤖 {card.solution}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDG ALIGNMENT ──────────────────────────────────────────────────── */}
      <section id="sdgs" style={{ padding: '6rem 2rem', background: 'rgba(8,20,16,0.97)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="UN Sustainable Development Goals" />
              <h2 style={headingStyle}>SDG Alignment</h2>
              <p style={subStyle}>EcoCampus AI directly advances six UN Sustainable Development Goals through measurable, AI-driven campus action.</p>
            </div>
          </Reveal>

          <div style={{ marginBottom: '1.2rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34c07a', marginBottom: '1rem' }}>Primary SDGs</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              {[
                { num: 11, color: '#f99d26', title: 'Sustainable Cities & Communities', desc: 'Building smart, green campus communities with AI-optimized infrastructure and resource management.', contrib: 'Smart building monitoring and AI urban planning tools' },
                { num: 12, color: '#bf8b2e', title: 'Responsible Consumption & Production', desc: 'Reducing campus resource waste through predictive AI that optimizes consumption patterns before waste occurs.', contrib: 'AI waste classification and consumption forecasting' },
                { num: 13, color: '#3f7e44', title: 'Climate Action', desc: 'Directly cutting campus carbon footprints through AI-driven emission monitoring and targeted reduction plans.', contrib: 'Real-time carbon tracking and AI climate reports' },
              ].map((sdg, i) => (
                <Reveal key={sdg.num} delay={i * 0.12}>
                  <SDGCard {...sdg} primary />
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,245,240,0.4)', marginBottom: '1rem' }}>Secondary SDGs</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
              {[
                { num: 6, color: '#26bde2', title: 'Clean Water & Sanitation', desc: 'AI-powered water usage monitoring catches leaks and inefficiencies, conserving clean water resources.', contrib: 'Smart water meters and anomaly detection' },
                { num: 7, color: '#fcc30b', title: 'Affordable & Clean Energy', desc: 'Shifting campuses toward renewable energy with AI scheduling and solar panel optimization.', contrib: 'Energy optimization AI and renewable integration' },
                { num: 15, color: '#56c02b', title: 'Life on Land', desc: 'Reducing campus ecological footprint by managing green spaces and biodiversity through data-driven insights.', contrib: 'Green space monitoring and ecological impact scoring' },
              ].map((sdg, i) => (
                <Reveal key={sdg.num} delay={i * 0.12}>
                  <SDGCard {...sdg} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI SOLUTION ────────────────────────────────────────────────────── */}
      <section id="ai-solution" style={{ padding: '6rem 2rem', background: '#050d10' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="AI Capabilities" />
              <h2 style={headingStyle}>AI-Powered Solutions</h2>
              <p style={subStyle}>Eight intelligent AI modules working in concert to transform campus sustainability management.</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
            {[
              { icon: '🌍', title: 'Carbon Footprint Prediction', desc: 'ML models trained on campus emission patterns forecast CO₂ output 30 days ahead with 94% accuracy.', benefit: '40% reduction in untracked emissions' },
              { icon: '⚡', title: 'Energy Optimization', desc: 'Reinforcement learning agents automatically schedule and adjust HVAC, lighting, and lab equipment loads.', benefit: '30% energy savings per semester' },
              { icon: '🗑️', title: 'Waste Classification', desc: 'Computer vision AI identifies recyclable vs landfill materials at smart bin terminals across campus.', benefit: '65% recycling rate improvement' },
              { icon: '💧', title: 'Water Usage Prediction', desc: 'Time-series models predict peak demand periods, detect anomalies, and alert facilities teams to leaks.', benefit: '25% water conservation achieved' },
              { icon: '🤖', title: 'Sustainability Chatbot', desc: 'Conversational AI built on IBM Granite answers student and admin sustainability questions 24/7.', benefit: '500+ queries resolved daily' },
              { icon: '📈', title: 'Predictive Analytics', desc: 'Ensemble models surface hidden patterns in energy, water, and waste data before issues escalate.', benefit: '95% prediction accuracy' },
              { icon: '💡', title: 'Smart Recommendations', desc: 'AI generates prioritized, ROI-ranked sustainability actions tailored to each building and department.', benefit: 'Avg $120K annual savings per campus' },
              { icon: '📑', title: 'AI Reports', desc: 'Automated generation of SDG progress reports, executive summaries, and regulatory compliance docs.', benefit: '80% reduction in reporting time' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={(i % 4) * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(52,192,122,0.15)',
                    borderRadius: 18, padding: '1.7rem',
                    transition: 'box-shadow 0.3s',
                    cursor: 'default',
                  }}
                  whileHover2={{ boxShadow: '0 20px 40px rgba(52,192,122,0.1)' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.9rem' }}>{card.icon}</div>
                  <h3 style={cardTitleStyle}>{card.title}</h3>
                  <p style={{ ...cardDescStyle, marginBottom: '1rem' }}>{card.desc}</p>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(52,192,122,0.12), rgba(36,146,209,0.1))',
                    border: '1px solid rgba(52,192,122,0.2)',
                    borderRadius: 8, padding: '7px 12px',
                    fontSize: '0.73rem', fontWeight: 700, color: '#6ee7b7',
                  }}>
                    ✓ {card.benefit}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ───────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: '6rem 2rem', background: 'rgba(8,20,16,0.95)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="Key Features" />
              <h2 style={headingStyle}>Everything You Need</h2>
              <p style={subStyle}>A complete sustainability management suite built for campus administrators, researchers, and students.</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '📊', title: 'Dashboard Analytics', desc: 'Live sustainability metrics with interactive charts and trend analysis.' },
              { icon: '🌍', title: 'Carbon Tracker', desc: 'Scope 1, 2 & 3 emission monitoring per building and activity.' },
              { icon: '⚡', title: 'Energy Monitoring', desc: 'Real-time kWh tracking with AI-detected anomalies and forecasts.' },
              { icon: '💧', title: 'Water Monitoring', desc: 'Consumption trends, leak detection, and conservation targets.' },
              { icon: '♻️', title: 'Waste Management', desc: 'Smart waste stream routing and recycling rate optimization.' },
              { icon: '🤖', title: 'AI Chat Assistant', desc: 'Natural language interface for sustainability queries and guidance.' },
              { icon: '📑', title: 'Smart Reports', desc: 'Auto-generated SDG progress and compliance documentation.' },
              { icon: '🔔', title: 'Notifications', desc: 'Proactive alerts for threshold breaches and sustainability milestones.' },
              { icon: '🏆', title: 'Leaderboard', desc: 'Gamified department rankings to drive sustainable behavior change.' },
              { icon: '⚙️', title: 'Admin Dashboard', desc: 'Role-based access control and institution-wide configuration.' },
            ].map((feat, i) => (
              <Reveal key={feat.title} delay={(i % 5) * 0.07} direction="zoom">
                <motion.div
                  whileHover={{ scale: 1.04, background: 'rgba(52,192,122,0.08)' }}
                  style={{
                    padding: '1.5rem 1.2rem', textAlign: 'center',
                    border: '1px solid rgba(52,192,122,0.12)', borderRadius: 16,
                    background: 'rgba(255,255,255,0.02)', transition: 'background 0.2s',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.7rem' }}>{feat.icon}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'rgba(232,245,240,0.9)', marginBottom: '0.4rem' }}>{feat.title}</div>
                  <div style={{ fontSize: '0.73rem', color: 'rgba(232,245,240,0.45)', lineHeight: 1.55 }}>{feat.desc}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 2rem', background: '#050d10' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="Process" />
              <h2 style={headingStyle}>How It Works</h2>
              <p style={subStyle}>From raw campus sensor data to actionable sustainability intelligence in seven intelligent steps.</p>
            </div>
          </Reveal>

          <div style={{ position: 'relative' }}>
            {[
              { step: '01', icon: '📡', title: 'Campus Data Collection', desc: 'IoT sensors across 180+ campus nodes stream energy, water, waste, and environmental data in real time.' },
              { step: '02', icon: '🔄', title: 'AI Processing', desc: 'IBM Granite AI and custom ML models ingest, clean, and structure raw sensor streams for analysis.' },
              { step: '03', icon: '🔍', title: 'Data Analysis', desc: 'Pattern detection algorithms identify trends, anomalies, and correlations across all sustainability dimensions.' },
              { step: '04', icon: '🔮', title: 'Prediction', desc: 'Time-series forecasting models predict future resource consumption and emission trajectories.' },
              { step: '05', icon: '💡', title: 'Smart Recommendations', desc: 'AI generates prioritized, evidence-based sustainability actions ranked by impact and feasibility.' },
              { step: '06', icon: '📊', title: 'Interactive Dashboard', desc: 'Stakeholders explore live insights through intuitive visualizations and natural language queries.' },
              { step: '07', icon: '🌱', title: 'Sustainability Actions', desc: 'Campus teams implement AI-guided changes, and outcomes feed back into the learning loop.' },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.08}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(52,192,122,0.2), rgba(36,146,209,0.15))',
                      border: '2px solid rgba(52,192,122,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.4rem', flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    {i < 6 && (
                      <div style={{ width: 2, height: 32, background: 'linear-gradient(to bottom, rgba(52,192,122,0.3), rgba(52,192,122,0.05))', marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ paddingTop: 10 }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#34c07a', letterSpacing: '0.1em', marginBottom: 4 }}>STEP {item.step}</div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(232,245,240,0.55)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATISTICS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, rgba(52,192,122,0.08) 0%, rgba(36,146,209,0.06) 100%)', borderTop: '1px solid rgba(52,192,122,0.12)', borderBottom: '1px solid rgba(52,192,122,0.12)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionLabel text="Impact Numbers" />
              <h2 style={headingStyle}>Platform Statistics</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { target: 100, suffix: '+', label: 'Buildings Monitored' },
              { target: 1000, suffix: '+', label: 'Students Supported' },
              { target: 40, suffix: '%', label: 'Carbon Reduction' },
              { target: 30, suffix: '%', label: 'Energy Savings' },
              { target: 25, suffix: '%', label: 'Water Conservation' },
              { target: 95, suffix: '%', label: 'AI Accuracy' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div style={{ padding: '1.5rem 1rem' }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900,
                    background: 'linear-gradient(135deg, #34c07a, #2492d1)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    lineHeight: 1, marginBottom: '0.5rem',
                  }}>
                    <Counter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(232,245,240,0.55)', fontWeight: 600 }}>{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* ── EXPECTED IMPACT ─────────────────────────────────────────────────── */}
      <section id="impact" style={{ padding: '6rem 2rem', background: '#050d10' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="Expected Impact" />
              <h2 style={headingStyle}>Transformative Change</h2>
              <p style={subStyle}>EcoCampus AI drives measurable environmental, social, and economic outcomes across every campus it serves.</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: '🌍', color: '#34c07a', title: 'Environmental Impact',
                items: ['Lower greenhouse gas emissions across all scopes', 'Smarter waste sorting and zero-landfill targets', 'Cleaner campus air quality and biodiversity preservation', 'Significant water conservation and watershed protection'],
              },
              {
                icon: '👥', color: '#2492d1', title: 'Social Impact',
                items: ['Deep student climate awareness and behavior change', 'Data-driven sustainable living practices', 'Campus community engagement in green initiatives', 'Next-generation environmental leadership training'],
              },
              {
                icon: '💰', color: '#f59e0b', title: 'Economic Impact',
                items: ['Reduced operational costs across utilities and facilities', 'AI-optimized resource allocation and procurement', 'Better capital planning for sustainability investments', 'New green funding and grant eligibility'],
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${card.color}25`,
                    borderRadius: 20, padding: '2rem',
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: 16,
                    background: `${card.color}15`, border: `1px solid ${card.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.8rem', marginBottom: '1.2rem',
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{ ...cardTitleStyle, color: card.color, marginBottom: '1.2rem', fontSize: '1.15rem' }}>{card.title}</h3>
                  {card.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                      <span style={{ color: card.color, fontSize: '0.9rem', lineHeight: 1.6, flexShrink: 0 }}>✓</span>
                      <p style={{ fontSize: '0.84rem', color: 'rgba(232,245,240,0.65)', lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESPONSIBLE AI ──────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 2rem', background: 'rgba(8,20,16,0.97)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="Responsible AI" />
              <h2 style={headingStyle}>AI You Can Trust</h2>
              <p style={subStyle}>EcoCampus AI is built on the principles of responsible, ethical, and transparent artificial intelligence.</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '⚖️', color: '#a855f7', title: 'Fairness', desc: 'AI recommendations treat all departments, buildings, and user groups equitably. Bias is actively audited and removed from every model to ensure no community is disadvantaged in sustainability resource allocation.' },
              { icon: '🔍', color: '#2492d1', title: 'Transparency', desc: 'Every AI-generated insight is accompanied by a clear explanation of the data sources and reasoning behind it. We implement explainable AI (XAI) so stakeholders always understand why an action is recommended.' },
              { icon: '🔒', color: '#34c07a', title: 'Privacy', desc: 'Institutional sensor data and user information are handled under strict data governance policies. All personally identifiable information is anonymized, encrypted at rest, and never shared with third parties.' },
              { icon: '🌱', color: '#f59e0b', title: 'Ethics', desc: 'EcoCampus AI is built to serve the planet, not exploit it. We ensure AI energy costs are offset by the sustainability gains delivered, and all models are governed by Anthropic and IBM AI ethics frameworks.' },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <GlassCard style={{ borderColor: `${card.color}25`, padding: '1.8rem' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${card.color}15`, border: `1px solid ${card.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', marginBottom: '1rem',
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{ ...cardTitleStyle, color: card.color }}>{card.title}</h3>
                  <p style={cardDescStyle}>{card.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ECOCAMPUS ──────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 2rem', background: '#050d10' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="Why Choose Us" />
              <h2 style={headingStyle}>The EcoCampus Advantage</h2>
              <p style={subStyle}>Eight reasons why leading educational institutions choose EcoCampus AI for their sustainability journey.</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
            {[
              { icon: '🧠', title: 'AI-Powered Decisions', desc: 'Every recommendation is backed by data, not guesswork. IBM Granite AI and custom ML deliver evidence-based sustainability actions.' },
              { icon: '⚡', title: 'Real-Time Monitoring', desc: 'Sub-second latency from 180+ IoT endpoints means you always have the latest picture of campus sustainability health.' },
              { icon: '📈', title: 'Predictive Analytics', desc: 'Don\'t react to problems — anticipate them. Our forecasting models give you a 30-day sustainability outlook.' },
              { icon: '🌱', title: 'Resource Management', desc: 'Unified view of energy, water, waste, and carbon in one AI-connected platform, eliminating data silos.' },
              { icon: '🎯', title: 'Easy-to-Use Interface', desc: 'Designed for busy campus administrators. Clean dashboards, natural language queries, and one-click reports.' },
              { icon: '🔧', title: 'Scalable Architecture', desc: 'Built on cloud-native microservices. Scales from a single building to a multi-campus university system.' },
              { icon: '🤖', title: 'Smart Automation', desc: 'Set-and-forget AI agents that automatically adjust systems, send alerts, and generate compliance reports.' },
              { icon: '💡', title: 'Actionable Insights', desc: 'Not raw data, but specific next steps. Every insight in EcoCampus AI tells you exactly what to do and why.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.09}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(52,192,122,0.3)' }}
                  style={{
                    padding: '1.6rem', border: '1px solid rgba(52,192,122,0.12)',
                    borderRadius: 16, background: 'rgba(255,255,255,0.02)',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(232,245,240,0.5)', lineHeight: 1.65 }}>{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(52,192,122,0.12) 0%, rgba(36,146,209,0.08) 50%, transparent 80%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(52,192,122,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(52,192,122,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <SectionLabel text="Get Started" />
            <h2 style={{ ...headingStyle, fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1.2rem' }}>
              Ready to Build a Smarter,<br />More Sustainable Campus?
            </h2>
            <p style={{ ...subStyle, marginBottom: '2.5rem' }}>
              Join the institutions using EcoCampus AI to meet their sustainability goals, reduce costs, and educate the next generation of environmental leaders.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <HeroBtn primary onClick={() => goToDashboard()}>🚀 Launch Dashboard</HeroBtn>
              <HeroBtn onClick={() => scrollTo('features')}>Explore Features</HeroBtn>
              <HeroBtn onClick={() => window.open('mailto:ecocampus@example.com')}>Contact Us</HeroBtn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ padding: '3rem 2rem 2rem', borderTop: '1px solid rgba(52,192,122,0.12)', background: '#030a0d' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: 'linear-gradient(135deg, #34c07a, #2492d1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
                }}>🌱</div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                  EcoCampus AI
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(232,245,240,0.4)', lineHeight: 1.7, maxWidth: 220 }}>
                AI-Powered Smart Sustainability Platform for Educational Campuses.
              </p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(232,245,240,0.3)', marginTop: '0.8rem' }}>
                IBM SkillsBuild × AICTE<br />AI for Sustainability Virtual Internship
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(232,245,240,0.5)', marginBottom: '0.9rem' }}>Platform</h4>
              {['About', 'Features', 'SDGs', 'AI Solution', 'Technology', 'Impact'].map(l => (
                <FooterLink key={l} label={l} onClick={() => scrollTo(l.toLowerCase().replace(' ', '-'))} />
              ))}
            </div>

            {/* Resources */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(232,245,240,0.5)', marginBottom: '0.9rem' }}>Resources</h4>
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'GitHub', href: 'https://github.com' },
                { label: 'IBM SkillsBuild', href: 'https://skillsbuild.org' },
                { label: 'AICTE', href: 'https://aicte-india.org' },
              ].map(l => (
                <a key={l.label} href={l.href} style={{
                  display: 'block', fontSize: '0.82rem', color: 'rgba(232,245,240,0.45)',
                  textDecoration: 'none', marginBottom: '0.5rem', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#34c07a'}
                  onMouseLeave={e => e.target.style.color = 'rgba(232,245,240,0.45)'}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(232,245,240,0.5)', marginBottom: '0.9rem' }}>Contact</h4>
              <p style={{ fontSize: '0.8rem', color: 'rgba(232,245,240,0.45)', lineHeight: 1.6 }}>
                📧 ecocampus@example.com<br />
                🔗 linkedin.com/in/ecocampus<br />
                💻 github.com/ecocampus-ai
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(52,192,122,0.1)', paddingTop: '1.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '0.5rem',
          }}>
            <p style={{ fontSize: '0.73rem', color: 'rgba(232,245,240,0.3)' }}>
              © {new Date().getFullYear()} EcoCampus AI — IBM SkillsBuild & AICTE AI for Sustainability Virtual Internship
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Privacy', 'Terms', 'Accessibility'].map(l => (
                <a key={l} href="#" style={{ fontSize: '0.73rem', color: 'rgba(232,245,240,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#34c07a'}
                  onMouseLeave={e => e.target.style.color = 'rgba(232,245,240,0.3)'}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hp-desktop-nav { display: none !important; }
          .hp-mobile-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hp-mobile-btn { display: none !important; }
        }
      `}</style>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const HeroBtn = ({ children, primary, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      padding: '12px 24px', borderRadius: 999, cursor: 'pointer',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: '0.88rem', fontWeight: 700, border: 'none',
      background: primary ? 'linear-gradient(135deg, #34c07a, #2492d1)' : 'rgba(255,255,255,0.06)',
      color: primary ? '#fff' : 'rgba(232,245,240,0.8)',
      boxShadow: primary ? '0 0 30px rgba(52,192,122,0.3)' : 'none',
      outline: primary ? 'none' : '1px solid rgba(255,255,255,0.12)',
      transition: 'opacity 0.2s',
    }}
  >
    {children}
  </motion.button>
)

const GlassCard = ({ children, style }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(52,192,122,0.15)',
    borderRadius: 18, padding: '1.6rem',
    ...style,
  }}>
    {children}
  </div>
)

const SDGCard = ({ num, color, title, desc, contrib, primary }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: `0 16px 32px rgba(0,0,0,0.3), 0 0 0 1px ${color}40` }}
    style={{
      background: 'rgba(255,255,255,0.025)',
      border: `1px solid ${color}30`,
      borderRadius: 18, padding: '1.6rem',
      transition: 'box-shadow 0.3s',
      opacity: primary ? 1 : 0.85,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
      <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem', fontWeight: 900, color: '#fff',
        flexShrink: 0, letterSpacing: '-0.03em',
      }}>
        SDG<br />{num}
      </div>
      <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', lineHeight: 1.35 }}>{title}</h3>
    </div>
    <p style={{ fontSize: '0.8rem', color: 'rgba(232,245,240,0.5)', lineHeight: 1.6, marginBottom: '0.8rem' }}>{desc}</p>
    <div style={{
      background: `${color}12`, border: `1px solid ${color}25`,
      borderRadius: 8, padding: '7px 12px',
      fontSize: '0.72rem', fontWeight: 600, color: color,
    }}>
      🎯 {contrib}
    </div>
  </motion.div>
)

const FooterLink = ({ label, onClick }) => (
  <button onClick={onClick} style={{
    display: 'block', fontSize: '0.82rem', color: 'rgba(232,245,240,0.45)',
    background: 'none', border: 'none', padding: '0 0 8px', cursor: 'pointer',
    textAlign: 'left', fontFamily: 'inherit', transition: 'color 0.2s', width: '100%',
  }}
    onMouseEnter={e => e.target.style.color = '#34c07a'}
    onMouseLeave={e => e.target.style.color = 'rgba(232,245,240,0.45)'}
  >
    {label}
  </button>
)

// ─── Shared style tokens ──────────────────────────────────────────────────────
const headingStyle = {
  fontFamily: "'Syne', sans-serif",
  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
  fontWeight: 900, color: '#fff',
  letterSpacing: '-0.02em', lineHeight: 1.15,
  marginBottom: '1rem',
}

const subStyle = {
  fontSize: '0.95rem', color: 'rgba(232,245,240,0.5)',
  lineHeight: 1.7, maxWidth: 620, margin: '0 auto',
}

const cardTitleStyle = {
  fontFamily: "'Syne', sans-serif",
  fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem',
}

const cardDescStyle = {
  fontSize: '0.82rem', color: 'rgba(232,245,240,0.5)', lineHeight: 1.65,
}

export default HomePage
