import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ROLE_BADGE = { admin: { label: 'Admin', color: '#d9433e' }, faculty: { label: 'Faculty', color: '#2492d1' }, student: { label: 'Student', color: '#2da050' } }

const SIDEBAR_ITEMS = {
  admin: [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users Management', icon: '👥' },
    { path: '/admin/reports', label: 'Reports', icon: '📋' },
    { path: '/admin/ai-analytics', label: 'AI Analytics', icon: '🤖' },
    { path: '/admin/sustainability', label: 'Sustainability Reports', icon: '🌿' },
    { path: '/admin/carbon', label: 'Carbon Tracking', icon: '🌍' },
    { path: '/admin/waste', label: 'Waste Management', icon: '♻️' },
    { path: '/admin/energy', label: 'Energy Monitoring', icon: '⚡' },
    { path: '/admin/water', label: 'Water Monitoring', icon: '💧' },
    { path: '/admin/sdg', label: 'SDG Dashboard', icon: '🎯' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
    { path: '/admin/notifications', label: 'Notifications', icon: '🔔' },
  ],
  faculty: [
    { path: '/faculty/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/faculty/student-reports', label: 'Student Reports', icon: '📋' },
    { path: '/faculty/course-analytics', label: 'Course Analytics', icon: '📈' },
    { path: '/faculty/insights', label: 'Sustainability Insights', icon: '💡' },
    { path: '/faculty/analytics', label: 'Analytics', icon: '🔮' },
    { path: '/faculty/profile', label: 'Profile', icon: '👤' },
    { path: '/faculty/notifications', label: 'Notifications', icon: '🔔' },
  ],
  student: [
    { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/student/score', label: 'Sustainability Score', icon: '🌱' },
    { path: '/student/carbon-calc', label: 'Carbon Calculator', icon: '🌍' },
    { path: '/student/challenges', label: 'Eco Challenges', icon: '🏆' },
    { path: '/student/leaderboard', label: 'Leaderboard', icon: '🥇' },
    { path: '/student/achievements', label: 'Achievements', icon: '🎖️' },
    { path: '/student/chatbot', label: 'AI Chatbot', icon: '🤖' },
    { path: '/student/profile', label: 'Profile', icon: '👤' },
  ],
}

const Sidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  if (!user) return null

  const items = SIDEBAR_ITEMS[user.role] || []
  const badge = ROLE_BADGE[user.role]
  const initials = user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <NavLink to="/" className="nav-brand" style={{ marginRight: 0 }}>
            <div className="nav-brand-icon">🌱</div>
            <span>EcoCampus AI</span>
          </NavLink>
        )}
        <button className="sidebar-toggle" onClick={() => setCollapsed(c => !c)} title="Toggle sidebar">
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      {!collapsed && (
        <div className="sidebar-profile">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-name">{user.fullName}</div>
            <div className="sidebar-email">{user.email}</div>
            <span className="role-badge" style={{ background: badge.color + '22', color: badge.color, border: `1px solid ${badge.color}44` }}>
              {badge.label}
            </span>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        {items.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={handleLogout} title="Logout">
          <span>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
