import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'

const USERS = [
  { id: 1, name: 'Admin User', email: 'admin@ecocampus.edu', role: 'admin', status: 'active', joined: '2023-08-01', score: null },
  { id: 2, name: 'Dr. Faculty', email: 'faculty@ecocampus.edu', role: 'faculty', status: 'active', joined: '2023-08-05', score: null },
  { id: 3, name: 'Student User', email: 'student@ecocampus.edu', role: 'student', status: 'active', joined: '2023-09-01', score: 78 },
  { id: 4, name: 'Arjun Kumar', email: 'arjun@ecocampus.edu', role: 'student', status: 'active', joined: '2023-09-01', score: 92 },
  { id: 5, name: 'Priya Sharma', email: 'priya@ecocampus.edu', role: 'student', status: 'active', joined: '2023-09-02', score: 87 },
  { id: 6, name: 'Dr. Meera Rajan', email: 'meera@ecocampus.edu', role: 'faculty', status: 'active', joined: '2023-08-10', score: null },
  { id: 7, name: 'Rahul Verma', email: 'rahul@ecocampus.edu', role: 'student', status: 'inactive', joined: '2023-09-03', score: 65 },
  { id: 8, name: 'Sneha Patel', email: 'sneha@ecocampus.edu', role: 'student', status: 'active', joined: '2023-09-04', score: 71 },
  { id: 9, name: 'Kiran Das', email: 'kiran@ecocampus.edu', role: 'student', status: 'active', joined: '2023-09-05', score: 84 },
  { id: 10, name: 'Dr. Suresh Menon', email: 'suresh@ecocampus.edu', role: 'faculty', status: 'inactive', joined: '2023-08-15', score: null },
]

const ROLE_COLORS = { admin: '#d9433e', faculty: '#2492d1', student: '#2da050' }

const UsersManagement = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = filter === 'all' || u.role === filter
    return matchSearch && matchRole
  })

  const stats = {
    total: USERS.length,
    admins: USERS.filter(u => u.role === 'admin').length,
    faculty: USERS.filter(u => u.role === 'faculty').length,
    students: USERS.filter(u => u.role === 'student').length,
  }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>👥 Users Management</h1>
        <p>Manage all registered users, roles, and access permissions across EcoCampus AI</p>
        <div className="header-meta">
          <Badge variant="red">Admin Only</Badge>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stats.total} total users</span>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Total Users', num: stats.total, sub: 'All accounts', cls: 'green-num' },
          { label: 'Admins', num: stats.admins, sub: 'Platform admins', cls: 'red-num' },
          { label: 'Faculty', num: stats.faculty, sub: 'Teaching staff', cls: 'green-num' },
          { label: 'Students', num: stats.students, sub: 'Enrolled learners', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Search users by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: 200,
              padding: '0.55rem 0.9rem',
              borderRadius: 'var(--r-sm)',
              border: '1px solid var(--border)',
              background: 'var(--green-50)',
              fontSize: '0.85rem',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          {['all', 'admin', 'faculty', 'student'].map(r => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--border)',
                background: filter === r ? 'var(--green-500)' : 'var(--green-50)',
                color: filter === r ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >{r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1)}</button>
          ))}
          <button
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--r-sm)',
              border: '1px solid var(--green-400)',
              background: 'linear-gradient(135deg, var(--green-500), var(--teal-400))',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >+ Add User</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <SectionHead title={`Users (${filtered.length})`} />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--green-50)', borderBottom: '1px solid var(--border)' }}>
                {['User', 'Email', 'Role', 'Eco Score', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}
                  style={{ borderBottom: '1px solid var(--border)', background: selected === u.id ? 'var(--green-50)' : 'transparent', transition: 'background 0.15s', cursor: 'pointer' }}
                  onClick={() => setSelected(selected === u.id ? null : u.id)}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${ROLE_COLORS[u.role]}33, ${ROLE_COLORS[u.role]}55)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: ROLE_COLORS[u.role], fontSize: '0.78rem', flexShrink: 0 }}>
                        {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ background: ROLE_COLORS[u.role] + '18', color: ROLE_COLORS[u.role], border: `1px solid ${ROLE_COLORS[u.role]}33`, padding: '2px 8px', borderRadius: 999, fontWeight: 600, fontSize: '0.76rem', textTransform: 'capitalize' }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    {u.score !== null
                      ? <span style={{ fontWeight: 700, color: u.score >= 80 ? 'var(--green-500)' : u.score >= 65 ? 'var(--amber-400)' : 'var(--red-400)' }}>{u.score}/100</span>
                      : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ background: u.status === 'active' ? 'var(--green-100)' : 'var(--red-100)', color: u.status === 'active' ? 'var(--green-600)' : 'var(--red-400)', padding: '2px 8px', borderRadius: 999, fontWeight: 600, fontSize: '0.76rem' }}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{u.joined}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ padding: '3px 10px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.76rem', cursor: 'pointer', color: 'var(--green-700)', fontWeight: 600 }}>Edit</button>
                      <button style={{ padding: '3px 10px', borderRadius: 'var(--r-sm)', border: '1px solid var(--red-100)', background: 'var(--red-100)', fontSize: '0.76rem', cursor: 'pointer', color: 'var(--red-400)', fontWeight: 600 }}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
            <p>No users found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersManagement
