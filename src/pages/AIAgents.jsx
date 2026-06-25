import { mockAgents } from '../data/mockData'

const AgentCard = ({ agent, delay }) => (
  <div className="agent-card animate-fade-slide" style={{ animationDelay: `${delay}s` }}>
    <div className="agent-header">
      <div className="agent-avatar" style={{ background: agent.color }}>
        {agent.icon}
      </div>
      <div>
        <div className="agent-name">{agent.name}</div>
        <div className="agent-role">{agent.role}</div>
      </div>
      <div className={`agent-status-badge ${agent.status === 'online' ? 'status-online' : 'status-busy'}`}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: agent.status === 'online' ? 'var(--green-500)' : 'var(--amber-400)', display: 'inline-block' }} />
        {agent.status === 'online' ? 'Online' : 'Busy'}
      </div>
    </div>

    <div className="metric-row">
      {agent.metrics.map(m => (
        <div className="metric-chip" key={m.label}>
          <div className="metric-chip-label">{m.label}</div>
          <div className="metric-chip-val">{m.value}</div>
        </div>
      ))}
    </div>

    <div className="task-list">
      {agent.tasks.map(t => (
        <div className="task-item" key={t}>
          <div className="task-dot" />
          {t}
        </div>
      ))}
    </div>
  </div>
)

const AIAgents = () => (
  <div className="container">
    <div className="page-header animate-fade-slide">
      <h1>AI Agents</h1>
      <p>Five autonomous agents working in concert to manage campus sustainability</p>
    </div>

    {/* System status bar */}
    <div className="card animate-fade-slide" style={{ marginBottom: '2rem', background: 'var(--green-50)', border: '1px solid var(--green-100)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="live-dot" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Syne, sans-serif' }}>
            Multi-Agent System Active
          </span>
        </div>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          4 agents online · 1 processing · 0 errors · Last sync: just now
        </span>
      </div>
    </div>

    <div className="grid-3">
      {mockAgents.map((agent, i) => (
        <AgentCard key={agent.id} agent={agent} delay={i * 0.07} />
      ))}
    </div>

    {/* Agent Architecture */}
    <div className="card animate-fade-slide" style={{ marginTop: '2rem' }}>
      <div className="section-title" style={{ marginBottom: '1rem' }}>Agent Collaboration Architecture</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
        The five agents form a pipeline: <strong>MonitorBot</strong> ingests raw sensor data → <strong>AnalyzeAI</strong> detects patterns →
        <strong> RecoBot</strong> generates actions → <strong>ReportGen</strong> creates summaries → <strong>AlertBot</strong> notifies stakeholders.
        Each agent uses its own model specialized for its task, and they share a common knowledge base updated in real-time.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['👁️ Monitor', '→', '🔬 Analyze', '→', '💡 Recommend', '→', '📊 Report', '→', '🔔 Alert'].map((s, i) => (
          <span key={i} style={{ fontSize: s === '→' ? '1rem' : '0.82rem', color: s === '→' ? 'var(--text-muted)' : 'var(--green-700)', fontWeight: s === '→' ? 400 : 600, background: s === '→' ? 'none' : 'var(--green-50)', padding: s === '→' ? 0 : '4px 10px', borderRadius: 'var(--r-sm)', border: s === '→' ? 'none' : '1px solid var(--green-100)' }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
)

export default AIAgents
