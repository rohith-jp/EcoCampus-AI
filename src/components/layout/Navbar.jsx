import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/predictions', label: 'Predictions', icon: '🔮' },
  { path: '/patterns', label: 'Patterns', icon: '📈' },
  { path: '/recommendations', label: 'Recommendations', icon: '💡' },
  { path: '/assistant', label: 'Knowledge Assistant', icon: '🤖' },
  { path: '/agents', label: 'AI Agents', icon: '⚙️' },
  { path: '/documents', label: 'Documents', icon: '📄' },
  { path: '/prompts', label: 'Prompt Engineering', icon: '✍️' },
  { path: '/responsible-ai', label: 'Responsible AI', icon: '⚖️' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <NavLink to="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
        <div className="nav-brand-icon">🌱</div>
        <span>EcoCampus AI</span>
      </NavLink>

      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
