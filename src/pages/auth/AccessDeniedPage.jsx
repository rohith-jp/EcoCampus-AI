import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ROLE_PATHS = { admin: '/admin/dashboard', faculty: '/faculty/dashboard', student: '/student/dashboard' }

const AccessDeniedPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleBack = () => {
    if (user) navigate(ROLE_PATHS[user.role] || '/')
    else navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: '1rem' }}>🚫</div>
        <h2 className="auth-heading" style={{ color: 'var(--red-400)' }}>Access Denied</h2>
        <p className="auth-desc" style={{ marginBottom: '1.5rem' }}>
          You do not have permission to access this page.
        </p>
        <button className="auth-btn" onClick={handleBack}>
          Go Back to Dashboard
        </button>
      </div>
    </div>
  )
}

export default AccessDeniedPage
