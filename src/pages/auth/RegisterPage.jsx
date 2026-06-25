import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const RegisterPage = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '', role: 'student' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.fullName.trim()) return setError('Full name is required.')
    if (!form.email) return setError('Email is required.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const res = register(form)
    setLoading(false)
    if (!res.success) return setError(res.error)
    setSuccess(true)
    setTimeout(() => navigate('/login'), 1800)
  }

  if (success) return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 56 }}>🎉</div>
        <h2 className="auth-heading">Account Created!</h2>
        <p className="auth-desc">Redirecting you to login…</p>
        <div className="auth-success-bar" />
      </div>
    </div>
  )

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="nav-brand-icon" style={{ width: 52, height: 52, fontSize: 26, borderRadius: 16 }}>🌱</div>
          <h1 className="auth-title">EcoCampus AI</h1>
          <p className="auth-subtitle">Sustainable Intelligence Platform</p>
        </div>

        <h2 className="auth-heading">Create Account</h2>
        <p className="auth-desc">Join the sustainability community</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
              placeholder="Your full name" className="auth-input" />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="you@ecocampus.edu" className="auth-input" />
          </div>

          <div className="auth-field">
            <label className="auth-label">Role</label>
            <select name="role" value={form.role} onChange={handleChange} className="auth-input auth-select">
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <input type={showPass ? 'text' : 'password'} name="password" value={form.password}
                onChange={handleChange} placeholder="Min. 6 characters" className="auth-input" />
              <button type="button" className="auth-eye" onClick={() => setShowPass(s => !s)} tabIndex={-1}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirm Password</label>
            <input type="password" name="confirm" value={form.confirm}
              onChange={handleChange} placeholder="Repeat password" className="auth-input" />
          </div>

          <button type="submit" className={`auth-btn${loading ? ' loading' : ''}`} disabled={loading}>
            {loading ? <span className="btn-spinner" /> : null}
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
