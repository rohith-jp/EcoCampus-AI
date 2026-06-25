import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'
import EcoBackground from './EcoBackground'

const ROLE_BADGE = { admin: { label: 'Admin', color: '#d9433e' }, faculty: { label: 'Faculty', color: '#2492d1' }, student: { label: 'Student', color: '#2da050' } }

const AuthLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const badge = user ? ROLE_BADGE[user.role] : null
  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <>
      <EcoBackground />
      <div className="auth-layout">
        <Sidebar />
        <div className="auth-main">
          <header className="auth-topbar">
            <div className="auth-topbar-left">
              <span className="topbar-greeting">
                👋 Hello, <strong>{user?.fullName?.split(' ')[0]}</strong>
              </span>
            </div>
            <div className="auth-topbar-right">
              {badge && (
                <span className="role-badge" style={{ background: badge.color + '22', color: badge.color, border: `1px solid ${badge.color}44` }}>
                  {badge.label}
                </span>
              )}
              <div className="topbar-avatar" title={user?.email}>{initials}</div>
              <div className="topbar-user-info">
                <div className="topbar-name">{user?.fullName}</div>
                <div className="topbar-email">{user?.email}</div>
              </div>
              <button className="topbar-logout-btn" onClick={handleLogout} title="Logout">
                🚪 Logout
              </button>
            </div>
          </header>
          <main className="main-content">
            {children}
          </main>
          <footer style={{ textAlign: 'center', padding: '1.5rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            🌱 EcoCampus AI — Sustainable Intelligence Platform · Powered by React + Vite
          </footer>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
