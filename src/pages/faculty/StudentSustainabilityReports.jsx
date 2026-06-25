import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'

const STUDENTS = [
  { id: 1, name: 'Arjun Kumar', course: 'ENV 301', score: 92, carbon: 1.8, waste: 18, status: 'excellent', submitted: '2024-03-28' },
  { id: 2, name: 'Priya Sharma', course: 'ENV 302', score: 87, carbon: 2.1, waste: 14, status: 'good', submitted: '2024-03-27' },
  { id: 3, name: 'Kiran Das', course: 'ENV 301', score: 84, carbon: 2.3, waste: 16, status: 'good', submitted: '2024-03-29' },
  { id: 4, name: 'Sneha Patel', course: 'ENV 302', score: 71, carbon: 3.1, waste: 22, status: 'average', submitted: '2024-03-26' },
  { id: 5, name: 'Rahul Verma', course: 'ENV 301', score: 65, carbon: 3.8, waste: 28, status: 'needs-improvement', submitted: '2024-03-25' },
  { id: 6, name: 'Meera Nair', course: 'ENV 302', score: 79, carbon: 2.6, waste: 20, status: 'good', submitted: '2024-03-28' },
  { id: 7, name: 'Dev Patel', course: 'ENV 301', score: 88, carbon: 1.9, waste: 15, status: 'good', submitted: '2024-03-30' },
  { id: 8, name: 'Ananya Roy', course: 'ENV 302', score: 95, carbon: 1.6, waste: 11, status: 'excellent', submitted: '2024-03-29' },
]

const statusColors = { excellent: 'var(--green-500)', good: 'var(--teal-400)', average: 'var(--amber-400)', 'needs-improvement': 'var(--red-400)' }
const statusBadge = { excellent: 'green', good: 'green', average: 'amber', 'needs-improvement': 'red' }

const StudentSustainabilityReports = () => {
  const [search, setSearch] = useState('')
  const [course, setCourse] = useState('all')

  const filtered = STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchCourse = course === 'all' || s.course === course
    return matchSearch && matchCourse
  })

  const avg = Math.round(STUDENTS.reduce((a, s) => a + s.score, 0) / STUDENTS.length)

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>📋 Student Sustainability Reports</h1>
        <p>Review and analyze individual student sustainability performance submissions</p>
        <div className="header-meta">
          <Badge variant="green">Faculty Access</Badge>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{STUDENTS.length} students</span>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Total Students', num: STUDENTS.length, sub: 'Across your courses', cls: 'green-num' },
          { label: 'Avg. Eco Score', num: avg, sub: 'Out of 100', cls: 'green-num' },
          { label: 'Excellent', num: STUDENTS.filter(s => s.status === 'excellent').length, sub: 'Score ≥ 90', cls: 'green-num' },
          { label: 'Need Support', num: STUDENTS.filter(s => s.status === 'needs-improvement').length, sub: 'Score < 70', cls: 'amber-num' },
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
            type="text" placeholder="🔍 Search students..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200, padding: '0.55rem 0.9rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none' }}
          />
          {['all', 'ENV 301', 'ENV 302'].map(c => (
            <button key={c} onClick={() => setCourse(c)}
              style={{ padding: '0.45rem 1rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: course === c ? 'var(--green-500)' : 'var(--green-50)', color: course === c ? '#fff' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
              {c === 'all' ? 'All Courses' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <SectionHead title={`Student Reports (${filtered.length})`} />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--green-50)', borderBottom: '1px solid var(--border)' }}>
                {['Student', 'Course', 'Eco Score', 'Carbon (t/yr)', 'Waste (kg)', 'Status', 'Submitted', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--green-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--green-700)', fontSize: '0.82rem', flexShrink: 0 }}>
                        {s.name[0]}
                      </div>
                      <span style={{ fontWeight: 600 }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ background: 'var(--green-50)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 999, fontSize: '0.76rem', fontWeight: 600 }}>{s.course}</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ fontWeight: 700, color: statusColors[s.status], fontSize: '1rem' }}>{s.score}</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: s.carbon < 2 ? 'var(--green-600)' : s.carbon < 3 ? 'var(--amber-500)' : 'var(--red-400)', fontWeight: 600 }}>{s.carbon}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{s.waste}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <Badge variant={statusBadge[s.status]}>{s.status.replace('-', ' ')}</Badge>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{s.submitted}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ padding: '3px 10px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.76rem', cursor: 'pointer', color: 'var(--green-700)', fontWeight: 600 }}>View</button>
                      <button style={{ padding: '3px 10px', borderRadius: 'var(--r-sm)', border: '1px solid var(--green-400)', background: 'var(--green-100)', fontSize: '0.76rem', cursor: 'pointer', color: 'var(--green-700)', fontWeight: 600 }}>Feedback</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StudentSustainabilityReports
