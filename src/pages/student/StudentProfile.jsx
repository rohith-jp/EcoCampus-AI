import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'
import { useAuth } from '../../context/AuthContext'

const StudentProfile = () => {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    fullName: user?.fullName || 'Student User',
    email: user?.email || 'student@ecocampus.edu',
    rollNo: 'ENV2023042',
    course: 'Environmental Studies',
    year: '2nd Year',
    hostel: 'Green Residency Block B',
    phone: '+91 98765 12345',
    bio: 'Passionate about sustainability and climate action. Actively participating in campus eco-challenges and driving green awareness among peers.',
  })

  const handleSave = () => { setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 2500) }

  const STATS = [
    { label: 'Eco Score', value: '78/100', color: 'var(--green-500)' },
    { label: 'Campus Rank', value: '#42', color: 'var(--teal-400)' },
    { label: 'Challenges Done', value: '5', color: 'var(--green-500)' },
    { label: 'Badges Earned', value: '6', color: 'var(--amber-400)' },
    { label: 'Carbon Footprint', value: '2.1 t/yr', color: 'var(--green-500)' },
    { label: 'Points Total', value: '625', color: 'var(--teal-400)' },
  ]

  const RECENT_BADGES = [
    { icon: '🌿', title: 'Eco Scholar', rarity: '#2492d1' },
    { icon: '🏆', title: 'Top 50', rarity: '#2492d1' },
    { icon: '⚡', title: 'Energy Saver', rarity: '#00b4a0' },
  ]

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>👤 My Profile</h1>
        <p>Manage your student profile, preferences, and sustainability journey</p>
        <div className="header-meta">
          <Badge variant="green">Student Access</Badge>
          {saved && <span style={{ color: 'var(--green-500)', fontWeight: 600, fontSize: '0.85rem' }}>✓ Profile saved!</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card animate-fade-slide" style={{ textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--green-500), var(--teal-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontSize: '1.8rem', color: '#fff', fontWeight: 700 }}>
              {(form.fullName || 'S').split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>{form.fullName}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{form.rollNo}</div>
            <Badge variant="green">Student</Badge>
            <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{form.course} · {form.year}</div>
          </div>

          <div className="card animate-fade-slide">
            <SectionHead title="Sustainability Stats" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
              {STATS.map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card animate-fade-slide">
            <SectionHead title="Recent Badges" />
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', justifyContent: 'center' }}>
              {RECENT_BADGES.map(b => (
                <div key={b.title} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem' }}>{b.icon}</div>
                  <div style={{ fontSize: '0.68rem', color: b.rarity, fontWeight: 600 }}>{b.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main form */}
        <div className="card animate-fade-slide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <SectionHead title="Profile Information" />
            <button onClick={() => setEditing(e => !e)}
              style={{ padding: '0.45rem 1rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: editing ? 'var(--green-50)' : 'linear-gradient(135deg, var(--green-500), var(--teal-400))', color: editing ? 'var(--text-secondary)' : '#fff', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
              {editing ? 'Cancel' : '✏️ Edit Profile'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Full Name', key: 'fullName' },
              { label: 'Email', key: 'email' },
              { label: 'Roll Number', key: 'rollNo' },
              { label: 'Course', key: 'course' },
              { label: 'Year', key: 'year' },
              { label: 'Phone', key: 'phone' },
              { label: 'Hostel / Residence', key: 'hostel' },
            ].map(f => (
              <div key={f.key} style={f.key === 'hostel' ? { gridColumn: '1 / -1' } : {}}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{f.label}</div>
                {editing
                  ? <input value={form[f.key]} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))}
                      style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }} />
                  : <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{form[f.key]}</div>
                }
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Bio</div>
            {editing
              ? <textarea value={form.bio} onChange={e => setForm(x => ({ ...x, bio: e.target.value }))} rows={3}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              : <div style={{ fontWeight: 400, fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{form.bio}</div>
            }
          </div>

          {editing && (
            <div style={{ marginTop: '1.25rem' }}>
              <button onClick={handleSave}
                style={{ padding: '0.55rem 1.5rem', borderRadius: 'var(--r-sm)', border: 'none', background: 'linear-gradient(135deg, var(--green-500), var(--teal-400))', color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
