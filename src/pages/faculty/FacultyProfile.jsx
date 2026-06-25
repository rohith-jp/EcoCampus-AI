import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'
import { useAuth } from '../../context/AuthContext'

const FacultyProfile = () => {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    fullName: user?.fullName || 'Dr. Faculty',
    email: user?.email || 'faculty@ecocampus.edu',
    department: 'Environmental Studies',
    designation: 'Associate Professor',
    specialization: 'Sustainable Development, Carbon Economics',
    bio: 'Passionate educator focused on integrating sustainability principles into academic curriculum. Research interests include campus carbon accounting and student eco-behavior patterns.',
    phone: '+91 98765 43210',
  })

  const handleSave = () => {
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>👤 Faculty Profile</h1>
        <p>Manage your faculty profile, preferences, and account settings</p>
        <div className="header-meta">
          <Badge variant="green">Faculty Access</Badge>
          {saved && <span style={{ color: 'var(--green-500)', fontWeight: 600, fontSize: '0.85rem' }}>✓ Profile saved!</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card animate-fade-slide" style={{ textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--green-500), var(--teal-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem', color: '#fff', fontWeight: 700 }}>
            {(form.fullName || 'F').split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{form.fullName}</div>
          <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{form.designation}</div>
          <Badge variant="green">Faculty</Badge>
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--green-50)', borderRadius: 'var(--r-sm)', textAlign: 'left' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>THIS SEMESTER</div>
            {[
              { label: 'Students', value: '180' },
              { label: 'Courses', value: '4' },
              { label: 'Avg. Eco Score', value: '74/100' },
              { label: 'SDG Alignment', value: '89%' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--green-600)' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

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
              { label: 'Department', key: 'department' },
              { label: 'Designation', key: 'designation' },
              { label: 'Phone', key: 'phone' },
              { label: 'Specialization', key: 'specialization' },
            ].map(f => (
              <div key={f.key}>
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
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
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

export default FacultyProfile
