import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'

const NOTIFICATIONS = [
  { id: 1, type: 'alert', icon: '⚠️', title: 'High Energy Consumption Detected', message: 'Main Academic Building exceeded 90% capacity threshold. Immediate action recommended.', time: '5 min ago', read: false, severity: 'high' },
  { id: 2, type: 'report', icon: '📋', title: 'Weekly Sustainability Report Generated', message: 'Q1 2024 Week 12 report is ready for review. Carbon emissions down 3% from last week.', time: '1 hour ago', read: false, severity: 'low' },
  { id: 3, type: 'alert', icon: '💧', title: 'Water Usage Spike — Cafeteria Zone', message: 'Water usage in Cafeteria zone is 28% above daily target. Possible leak detected.', time: '2 hours ago', read: false, severity: 'medium' },
  { id: 4, type: 'user', icon: '👤', title: 'New User Registration', message: 'Arjun Kumar (student) has registered and is pending email verification.', time: '3 hours ago', read: true, severity: 'low' },
  { id: 5, type: 'achievement', icon: '🏆', title: 'SDG 7 Target Milestone Reached', message: 'Campus has achieved 85% progress toward clean energy SDG 7 annual target.', time: '5 hours ago', read: true, severity: 'low' },
  { id: 6, type: 'alert', icon: '🗑️', title: 'Smart Bin — Main Cafeteria Critical', message: 'Food waste bin at Main Cafeteria is at 82% fill level. Schedule immediate collection.', time: '6 hours ago', read: true, severity: 'high' },
  { id: 7, type: 'system', icon: '🔧', title: 'System Maintenance Completed', message: 'Scheduled maintenance window completed successfully. All services operational.', time: '1 day ago', read: true, severity: 'low' },
  { id: 8, type: 'report', icon: '🌿', title: 'Monthly Carbon Report Available', message: 'February 2024 carbon emissions report is available. Total: 370 tCO₂e (−2.6% vs January).', time: '2 days ago', read: true, severity: 'low' },
]

const severityColors = { high: 'var(--red-400)', medium: 'var(--amber-400)', low: 'var(--green-500)' }
const typeBadge = { alert: 'red', report: 'green', user: 'amber', achievement: 'green', system: 'green' }

const Notifications = () => {
  const [filter, setFilter] = useState('all')
  const [notifs, setNotifs] = useState(NOTIFICATIONS)

  const filtered = notifs.filter(n => filter === 'all' || (filter === 'unread' ? !n.read : n.type === filter))
  const unreadCount = notifs.filter(n => !n.read).length

  const markRead = id => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))
  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })))

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🔔 Notifications</h1>
        <p>System alerts, campus-wide announcements, and sustainability notifications</p>
        <div className="header-meta">
          <Badge variant="red">Admin Only</Badge>
          {unreadCount > 0 && (
            <span style={{ background: 'var(--red-400)', color: '#fff', borderRadius: 999, padding: '2px 8px', fontWeight: 700, fontSize: '0.78rem' }}>{unreadCount} unread</span>
          )}
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Total', num: notifs.length, sub: 'All notifications', cls: 'green-num' },
          { label: 'Unread', num: unreadCount, sub: 'Pending review', cls: unreadCount > 0 ? 'red-num' : 'green-num' },
          { label: 'Alerts', num: notifs.filter(n => n.type === 'alert').length, sub: 'Active alerts', cls: 'amber-num' },
          { label: 'High Priority', num: notifs.filter(n => n.severity === 'high').length, sub: 'Require attention', cls: 'red-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['all', 'unread', 'alert', 'report', 'user', 'system'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '0.4rem 0.9rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: filter === f ? 'var(--green-500)' : 'var(--green-50)', color: filter === f ? '#fff' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'capitalize' }}>
                {f}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} style={{ padding: '0.4rem 0.9rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--green-400)', background: 'var(--green-50)', color: 'var(--green-700)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>
              ✓ Mark all read
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map((n, i) => (
          <div key={n.id} className="animate-fade-slide" onClick={() => markRead(n.id)}
            style={{ animationDelay: `${i * 0.04}s`, background: n.read ? 'var(--card-bg)' : 'var(--green-50)', border: `1px solid ${n.read ? 'var(--border)' : 'var(--green-200)'}`, borderLeft: `4px solid ${severityColors[n.severity]}`, borderRadius: 'var(--r-md)', padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: '0.1rem' }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: n.read ? 600 : 700, fontSize: '0.9rem' }}>{n.title}</span>
                    {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-500)', display: 'inline-block' }} />}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Badge variant={typeBadge[n.type]}>{n.type}</Badge>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{n.time}</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{n.message}</div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔔</div>
            <p>No notifications in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
