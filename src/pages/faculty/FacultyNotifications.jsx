import { useState } from 'react'
import { Badge } from '../../components/ui/index'

const FACULTY_NOTIFICATIONS = [
  { id: 1, type: 'submission', icon: '📋', title: 'New Report Submission', message: 'Arjun Kumar has submitted the Carbon Footprint Analysis report for ENV 301.', time: '10 min ago', read: false, severity: 'low' },
  { id: 2, type: 'alert', icon: '⚠️', title: 'Low Engagement Alert', message: 'Water Conservation module completion rate has dropped to 72% in ENV 302. Consider sending a reminder.', time: '1 hour ago', read: false, severity: 'medium' },
  { id: 3, type: 'submission', icon: '📝', title: '3 Pending Reviews', message: 'Priya Sharma, Meera Nair, and Dev Patel have reports awaiting your feedback.', time: '2 hours ago', read: false, severity: 'medium' },
  { id: 4, type: 'achievement', icon: '🏆', title: 'Course Milestone Reached', message: 'ENV 401 students collectively surpassed the 500 kWh energy savings goal. Congratulations!', time: '3 hours ago', read: true, severity: 'low' },
  { id: 5, type: 'system', icon: '🔧', title: 'Analytics Report Ready', message: 'Your weekly course sustainability analytics report for W12 is ready to review.', time: '5 hours ago', read: true, severity: 'low' },
  { id: 6, type: 'alert', icon: '📉', title: 'Student Needs Support', message: 'Rahul Verma (ENV 301) eco score has declined 3 weeks in a row. Consider reaching out.', time: '1 day ago', read: true, severity: 'high' },
  { id: 7, type: 'submission', icon: '✅', title: 'Assignment Deadline Tomorrow', message: 'Eco Challenge Report for ENV 302 is due tomorrow. 8 students have not yet submitted.', time: '1 day ago', read: true, severity: 'medium' },
]

const severityColors = { high: 'var(--red-400)', medium: 'var(--amber-400)', low: 'var(--green-500)' }
const typeBadge = { submission: 'green', alert: 'red', achievement: 'green', system: 'amber' }

const FacultyNotifications = () => {
  const [filter, setFilter] = useState('all')
  const [notifs, setNotifs] = useState(FACULTY_NOTIFICATIONS)
  const unreadCount = notifs.filter(n => !n.read).length

  const filtered = notifs.filter(n => filter === 'all' || (filter === 'unread' ? !n.read : n.type === filter))
  const markRead = id => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))
  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })))

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>🔔 Notifications</h1>
        <p>Course updates, student activity alerts, and faculty announcements</p>
        <div className="header-meta">
          <Badge variant="green">Faculty Access</Badge>
          {unreadCount > 0 && (
            <span style={{ background: 'var(--red-400)', color: '#fff', borderRadius: 999, padding: '2px 8px', fontWeight: 700, fontSize: '0.78rem' }}>{unreadCount} unread</span>
          )}
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Total', num: notifs.length, sub: 'All notifications', cls: 'green-num' },
          { label: 'Unread', num: unreadCount, sub: 'Pending review', cls: unreadCount > 0 ? 'red-num' : 'green-num' },
          { label: 'Submissions', num: notifs.filter(n => n.type === 'submission').length, sub: 'Student reports', cls: 'green-num' },
          { label: 'Alerts', num: notifs.filter(n => n.type === 'alert').length, sub: 'Require action', cls: 'amber-num' },
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
            {['all', 'unread', 'submission', 'alert', 'achievement', 'system'].map(f => (
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

export default FacultyNotifications
