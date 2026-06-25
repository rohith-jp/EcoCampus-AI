// ── StatCard ──────────────────────────────────────────────
export const StatCard = ({ label, value, unit = '', icon, trend = null, trendLabel = '' }) => {
  const isPositive = trend !== null && trend > 0
  const trendClass = trend === null ? '' : isPositive ? 'trend-up' : 'trend-down'
  const trendArrow = trend === null ? '' : isPositive ? '↑' : '↓'

  return (
    <div className="stat-card animate-fade-slide">
      <div className="stat-label">{label}</div>
      <div className="stat-row">
        <div>
          <div className="stat-value">{value}</div>
          {unit && <div className="stat-unit">{unit}</div>}
        </div>
        {icon && <div className="stat-icon">{icon}</div>}
      </div>
      {trend !== null && (
        <div className={`stat-trend ${trendClass}`}>
          {trendArrow} {Math.abs(trend)}% {trendLabel}
        </div>
      )}
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────
export const Badge = ({ children, variant = 'green' }) => (
  <span className={`badge badge-${variant}`}>{children}</span>
)

// ── ConfidenceBar ─────────────────────────────────────────
export const ConfidenceBar = ({ value, label = 'AI Confidence' }) => {
  const pct = Math.round(value * 100)
  const color = pct >= 90 ? '#1D9E75' : pct >= 75 ? '#3dbf62' : '#e8a525'
  return (
    <div>
      <div className="confidence-row">
        <span className="confidence-label">{label}</span>
        <span className="confidence-value" style={{ color }}>{pct}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

// ── ProgressBar ───────────────────────────────────────────
export const ProgressBar = ({ value, color }) => (
  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${value}%`, background: color || undefined }}
    />
  </div>
)

// ── Card ──────────────────────────────────────────────────
export const Card = ({ children, hoverable = false, className = '', style }) => (
  <div className={`card${hoverable ? ' card-hoverable' : ''}${className ? ' ' + className : ''}`} style={style}>
    {children}
  </div>
)

// ── SectionHead ───────────────────────────────────────────
export const SectionHead = ({ title, action, onClick }) => (
  <div className="section-head">
    <span className="section-title">{title}</span>
    {action && (
      <button className="view-all-btn" onClick={onClick}>{action}</button>
    )}
  </div>
)
