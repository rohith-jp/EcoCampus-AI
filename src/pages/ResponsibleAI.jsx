import { ProgressBar } from '../components/ui/index'

const PRINCIPLES = [
  {
    icon: '⚖️', title: 'Fairness & Bias Mitigation', color: '#e0f7ee',
    desc: 'Our AI models are trained on diverse campus data sets and regularly audited for demographic and geographic biases. Recommendations apply equitably across all campus buildings and user groups.',
    progress: 92,
  },
  {
    icon: '🔍', title: 'Transparency', color: '#dff7f4',
    desc: 'Every AI recommendation includes an explanation of its reasoning, the data sources used, and confidence levels. Users can always understand why a suggestion was made.',
    progress: 88,
  },
  {
    icon: '🛡️', title: 'Privacy & Data Security', color: '#daf0fb',
    desc: 'Sensor data is anonymized at the edge before processing. No personally identifiable information is used in sustainability models. Data is stored encrypted and access-controlled.',
    progress: 96,
  },
  {
    icon: '👥', title: 'Human Oversight', color: '#fef3d8',
    desc: 'All AI-generated recommendations require human review before implementation. Campus staff retain full authority over resource management decisions — AI assists, never replaces.',
    progress: 100,
  },
  {
    icon: '🌱', title: 'Environmental Responsibility', color: '#f0faf2',
    desc: 'Our AI infrastructure runs on green cloud computing with carbon offsets. Model efficiency is continuously optimized to reduce computational footprint of the AI system itself.',
    progress: 78,
  },
  {
    icon: '📚', title: 'Accountability & Auditability', color: '#e8f0e9',
    desc: 'All AI decisions are logged with full audit trails. Monthly bias reports are published to stakeholders. Any system errors trigger automatic alerts and rollback procedures.',
    progress: 85,
  },
]

const METRICS = [
  { label: 'Model Accuracy', value: '94%', icon: '🎯' },
  { label: 'Bias Audits / Year', value: '12', icon: '⚖️' },
  { label: 'Data Privacy Score', value: '96%', icon: '🛡️' },
  { label: 'Human Decisions', value: '100%', icon: '👥' },
]

const ResponsibleAI = () => (
  <div className="container">
    <div className="page-header animate-fade-slide">
      <h1>Responsible AI</h1>
      <p>Our commitment to ethical, transparent, and fair AI practices in sustainability management</p>
    </div>

    {/* Score card */}
    <div className="card animate-fade-slide" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, var(--green-50), var(--teal-100))', border: '1px solid var(--green-200)' }}>
      <div className="grid-4">
        {METRICS.map((m, i) => (
          <div key={m.label} style={{ textAlign: 'center', padding: '0.5rem', animationDelay: `${i * 0.06}s` }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{m.icon}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: 'var(--green-700)', lineHeight: 1 }}>
              {m.value}
            </div>
            <div style={{ fontSize: '0.77rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Principles Grid */}
    <div className="grid-3" style={{ marginBottom: '2rem' }}>
      {PRINCIPLES.map((p, i) => (
        <div className="rai-card animate-fade-slide" key={p.title} style={{ animationDelay: `${i * 0.07}s` }}>
          <div className="rai-icon" style={{ background: p.color }}>
            {p.icon}
          </div>
          <div className="rai-title">{p.title}</div>
          <div className="rai-desc">{p.desc}</div>
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              <span>Compliance Score</span>
              <span style={{ fontWeight: 700, color: p.progress >= 90 ? 'var(--green-600)' : 'var(--amber-400)' }}>{p.progress}%</span>
            </div>
            <ProgressBar value={p.progress} />
          </div>
        </div>
      ))}
    </div>

    {/* Commitment Statement */}
    <div className="card animate-fade-slide" style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)' }}>
      <div className="section-title" style={{ marginBottom: '1rem' }}>Our Commitment</div>
      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1rem' }}>
        EcoCampus AI is built on the principle that technology must serve people and the planet — not the other way around.
        We apply UNESCO's Recommendation on the Ethics of AI, align with the EU AI Act guidelines, and follow NIST's
        AI Risk Management Framework to ensure our system remains trustworthy, inclusive, and accountable.
      </p>
      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
        We publish quarterly Responsible AI reports, conduct independent third-party audits, and engage our campus community
        in ongoing dialogue about how AI shapes their environment. Our AI should amplify human wisdom, not replace it.
      </p>
    </div>
  </div>
)

export default ResponsibleAI
