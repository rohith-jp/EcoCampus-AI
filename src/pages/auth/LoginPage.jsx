import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ROLE_PATHS = { admin: '/admin/dashboard', faculty: '/faculty/dashboard', student: '/student/dashboard' }

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.email) return setError('Email is required.')
    if (!form.password) return setError('Password is required.')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const res = login(form.email, form.password, form.remember)
    setLoading(false)
    if (!res.success) return setError(res.error)
    navigate(ROLE_PATHS[res.user.role] || '/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="nav-brand-icon" style={{ width: 52, height: 52, fontSize: 26, borderRadius: 16 }}>🌱</div>
          <h1 className="auth-title">EcoCampus AI</h1>
          <p className="auth-subtitle">Sustainable Intelligence Platform</p>
        </div>

        <h2 className="auth-heading">Welcome Back</h2>
        <p className="auth-desc">Sign in to your account to continue</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <input
              type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="you@ecocampus.edu"
              className="auth-input" autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <input
                type={showPass ? 'text' : 'password'} name="password" value={form.password}
                onChange={handleChange} placeholder="Enter your password"
                className="auth-input" autoComplete="current-password"
              />
              <button type="button" className="auth-eye" onClick={() => setShowPass(s => !s)} tabIndex={-1}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="auth-row">
            <label className="auth-check">
              <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
              <span>Remember me</span>
            </label>
          </div>

          <button type="submit" className={`auth-btn${loading ? ' loading' : ''}`} disabled={loading}>
            {loading ? <span className="btn-spinner" /> : null}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="auth-demo">
          <p className="auth-demo-title">🔑 Demo Accounts</p>
          <div className="auth-demo-grid">
            <DemoChip role="admin" email="admin@ecocampus.edu" pass="admin123" onFill={setForm} />
            <DemoChip role="faculty" email="faculty@ecocampus.edu" pass="faculty123" onFill={setForm} />
            <DemoChip role="student" email="student@ecocampus.edu" pass="student123" onFill={setForm} />
          </div>
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
        </p>
      </div>
    </div>
  )
}

const ROLE_COLORS = { admin: '#d9433e', faculty: '#2492d1', student: '#2da050' }

const DemoChip = ({ role, email, pass, onFill }) => (
  <button
    type="button" className="demo-chip"
    style={{ borderColor: ROLE_COLORS[role] + '44', color: ROLE_COLORS[role] }}
    onClick={() => onFill(f => ({ ...f, email, password: pass }))}
  >
    <span className="demo-chip-role" style={{ background: ROLE_COLORS[role] }}>{role}</span>
    <span className="demo-chip-email">{email}</span>
  </button>
)

export default LoginPage
