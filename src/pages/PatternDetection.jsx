import { Badge } from '../components/ui/index'
import { PatternBarChart } from '../components/charts/Charts'
import { mockPatterns } from '../data/mockData'

const severityBadge = (s) => s === 'high' ? 'red' : s === 'medium' ? 'amber' : 'green'
const severityLabel = (s) => s === 'high' ? 'High Severity' : s === 'medium' ? 'Medium Severity' : 'Low Severity'
const barColor = (s) => s === 'high' ? '#d9433e' : s === 'medium' ? '#e8a525' : '#3dbf62'

const PatternDetection = () => (
  <div className="container">
    <div className="page-header animate-fade-slide">
      <h1>Pattern Detection</h1>
      <p>AI-identified anomalies and behavioral trends across all resource streams</p>
    </div>

    {/* Summary badges */}
    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
        {mockPatterns.filter(p => p.severity === 'high').length} High &nbsp;·&nbsp;
        {mockPatterns.filter(p => p.severity === 'medium').length} Medium &nbsp;·&nbsp;
        {mockPatterns.filter(p => p.severity === 'low').length} Low
      </span>
    </div>

    <div className="grid-2" style={{ marginBottom: '2rem' }}>
      {mockPatterns.map((p, i) => (
        <div className="card animate-fade-slide" key={p.id} style={{ animationDelay: `${i * 0.07}s` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{p.icon}</span> {p.title}
            </div>
            <Badge variant={severityBadge(p.severity)}>{severityLabel(p.severity)}</Badge>
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            {p.description}
          </div>
          <div className="chart-wrap-sm">
            <PatternBarChart data={p.dataPoints} xKey="day" color={barColor(p.severity)} height={200} />
          </div>
          {p.actionable && (
            <div className="pattern-action" style={{ marginTop: '0.75rem' }}>
              💡 {p.suggestedAction}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)

export default PatternDetection
