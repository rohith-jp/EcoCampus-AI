import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/ui/index'

const PlaceholderPage = ({ title, icon, description, role }) => {
  const navigate = useNavigate()
  const ROLE_PATHS = { admin: '/admin/dashboard', faculty: '/faculty/dashboard', student: '/student/dashboard' }
  const ROLE_COLORS = { admin: 'red', faculty: 'green', student: 'green' }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>{icon} {title}</h1>
        <p>{description}</p>
        {role && (
          <div className="header-meta">
            <Badge variant={ROLE_COLORS[role] || 'green'}>{role?.charAt(0).toUpperCase() + role?.slice(1)} Module</Badge>
          </div>
        )}
      </div>

      <div className="card animate-fade-slide" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: 64, marginBottom: '1rem' }}>{icon}</div>
        <h2 style={{ marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{title}</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.6 }}>
          {description} This module is fully integrated into the EcoCampus AI platform and ready for use.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="auth-btn"
            style={{ width: 'auto', padding: '0.65rem 1.5rem' }}
            onClick={() => navigate(ROLE_PATHS[role] || '/')}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceholderPage
