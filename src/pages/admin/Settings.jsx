import { useState } from 'react'
import { Badge, SectionHead } from '../../components/ui/index'

const Settings = () => {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    weeklyReport: true,
    alertThreshold: 80,
    carbonUnit: 'tCO2e',
    energyUnit: 'kWh',
    waterUnit: 'liters',
    dataRetention: '12',
    aiInsights: true,
    publicLeaderboard: true,
    maintenanceMode: false,
  })

  const handleToggle = key => setSettings(s => ({ ...s, [key]: !s[key] }))
  const handleChange = (key, val) => setSettings(s => ({ ...s, [key]: val }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const Toggle = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: on ? 'var(--green-500)' : 'var(--border)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: on ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </div>
  )

  const SettingRow = ({ label, desc, children }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 0', borderBottom: '1px solid var(--border)', gap: '1rem' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</div>
        {desc && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{desc}</div>}
      </div>
      {children}
    </div>
  )

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>⚙️ Settings</h1>
        <p>Platform configuration, preferences, and system administration settings</p>
        <div className="header-meta">
          <Badge variant="red">Admin Only</Badge>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card animate-fade-slide">
          <SectionHead title="Notifications" />
          <SettingRow label="Email Notifications" desc="Send sustainability alerts via email">
            <Toggle on={settings.emailNotifications} onToggle={() => handleToggle('emailNotifications')} />
          </SettingRow>
          <SettingRow label="Weekly Reports" desc="Auto-generate weekly sustainability summary">
            <Toggle on={settings.weeklyReport} onToggle={() => handleToggle('weeklyReport')} />
          </SettingRow>
          <SettingRow label="Alert Threshold" desc="Trigger alert when resource usage exceeds">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="number" min={50} max={100} value={settings.alertThreshold}
                onChange={e => handleChange('alertThreshold', e.target.value)}
                style={{ width: 64, padding: '0.3rem 0.5rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none', textAlign: 'center' }}
              />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>%</span>
            </div>
          </SettingRow>
        </div>

        <div className="card animate-fade-slide">
          <SectionHead title="Measurement Units" />
          {[
            { label: 'Carbon Emissions', key: 'carbonUnit', opts: ['tCO2e', 'kgCO2e', 'lb CO2e'] },
            { label: 'Energy', key: 'energyUnit', opts: ['kWh', 'MWh', 'GJ'] },
            { label: 'Water', key: 'waterUnit', opts: ['liters', 'gallons', 'cubic meters'] },
          ].map(f => (
            <SettingRow key={f.key} label={f.label} desc={`Current: ${settings[f.key]}`}>
              <select
                value={settings[f.key]}
                onChange={e => handleChange(f.key, e.target.value)}
                style={{ padding: '0.35rem 0.75rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.83rem', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer' }}
              >
                {f.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </SettingRow>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card animate-fade-slide">
          <SectionHead title="Platform Features" />
          <SettingRow label="AI Sustainability Insights" desc="Enable AI-powered recommendations">
            <Toggle on={settings.aiInsights} onToggle={() => handleToggle('aiInsights')} />
          </SettingRow>
          <SettingRow label="Public Leaderboard" desc="Show student sustainability rankings">
            <Toggle on={settings.publicLeaderboard} onToggle={() => handleToggle('publicLeaderboard')} />
          </SettingRow>
          <SettingRow label="Data Retention (months)" desc="How long to keep historical data">
            <select
              value={settings.dataRetention}
              onChange={e => handleChange('dataRetention', e.target.value)}
              style={{ padding: '0.35rem 0.75rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', background: 'var(--green-50)', fontSize: '0.83rem', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer' }}
            >
              {['6', '12', '24', '36', '60'].map(o => <option key={o}>{o}</option>)}
            </select>
          </SettingRow>
        </div>

        <div className="card animate-fade-slide">
          <SectionHead title="System" />
          <SettingRow label="Maintenance Mode" desc="Restrict access during maintenance">
            <Toggle on={settings.maintenanceMode} onToggle={() => handleToggle('maintenanceMode')} />
          </SettingRow>
          <SettingRow label="Platform Version" desc="Current EcoCampus AI build">
            <span style={{ fontWeight: 600, color: 'var(--green-600)', fontSize: '0.85rem' }}>v2.1.4</span>
          </SettingRow>
          <SettingRow label="Database" desc="Connection status">
            <span style={{ background: 'var(--green-100)', color: 'var(--green-600)', padding: '2px 10px', borderRadius: 999, fontWeight: 600, fontSize: '0.76rem' }}>Connected</span>
          </SettingRow>
        </div>
      </div>

      <div className="card animate-fade-slide">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600 }}>Save Changes</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Changes take effect immediately</div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {saved && <span style={{ color: 'var(--green-500)', fontWeight: 600, fontSize: '0.85rem' }}>✓ Saved!</span>}
            <button
              onClick={handleSave}
              style={{ padding: '0.55rem 1.5rem', borderRadius: 'var(--r-sm)', border: 'none', background: 'linear-gradient(135deg, var(--green-500), var(--teal-400))', color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
            >Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
