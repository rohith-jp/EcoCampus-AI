import { useState } from 'react'

const SAMPLE_DOCS = [
  {
    id: 1, name: 'Annual Sustainability Report 2024.pdf', size: '2.4 MB', type: 'PDF',
    summary: 'Campus achieved 78/100 sustainability score. Key highlights: 12% reduction in food waste, 3% improvement in energy efficiency, new solar installation on Building C generating 45 kWh/day. Water consumption remains a concern with 5% YoY increase.',
    keyPoints: ['78/100 sustainability score', '12% food waste reduction', 'Solar generates 45 kWh/day', 'Water usage up 5% YoY'],
    sdgs: ['SDG 7', 'SDG 12', 'SDG 13'],
    date: 'Jan 2024',
  },
  {
    id: 2, name: 'Energy Audit Q3 2024.pdf', size: '1.1 MB', type: 'PDF',
    summary: 'Q3 audit identified 3 major inefficiencies: outdated HVAC in Building A consuming 22% excess energy, lighting in Labs 4-6 lacking motion sensors, and server room cooling using non-optimized schedule.',
    keyPoints: ['Building A HVAC: 22% excess energy', 'Labs 4-6 lack motion sensors', 'Server room scheduling gap', 'Estimated saving: 68 kWh/month'],
    sdgs: ['SDG 7', 'SDG 11'],
    date: 'Sep 2024',
  },
  {
    id: 3, name: 'Water Conservation Plan.docx', size: '0.8 MB', type: 'DOCX',
    summary: 'Comprehensive 18-month plan to reduce water consumption by 25%. Phase 1: sensor-based faucets in 12 buildings. Phase 2: greywater recycling system. Phase 3: rainwater harvesting for landscaping.',
    keyPoints: ['25% reduction target', 'Phase 1: sensor faucets', 'Phase 2: greywater recycling', 'Phase 3: rainwater harvest'],
    sdgs: ['SDG 6', 'SDG 11'],
    date: 'Dec 2024',
  },
]

const DocumentIntelligence = () => {
  const [selected, setSelected] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(new Set())

  const analyze = (doc) => {
    setSelected(doc)
    if (!analyzed.has(doc.id)) {
      setAnalyzing(true)
      setTimeout(() => {
        setAnalyzing(false)
        setAnalyzed(prev => new Set([...prev, doc.id]))
      }, 1500)
    }
  }

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>Document Intelligence</h1>
        <p>Extract insights and generate AI summaries from sustainability reports and documents</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left: Upload + Doc list */}
        <div>
          <div className="doc-uploader animate-fade-slide" style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📂</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '0.4rem' }}>
              Upload Documents
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              PDF, DOCX, TXT — up to 50 MB
            </div>
          </div>

          <div className="section-title" style={{ marginBottom: '0.75rem' }}>Sample Documents</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SAMPLE_DOCS.map((doc, i) => (
              <div
                key={doc.id}
                className={`card card-sm animate-fade-slide${selected?.id === doc.id ? ' card-hoverable' : ' card-hoverable'}`}
                style={{ cursor: 'pointer', animationDelay: `${i * 0.07}s`, border: selected?.id === doc.id ? '2px solid var(--green-400)' : undefined }}
                onClick={() => analyze(doc)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{doc.type === 'PDF' ? '📕' : '📘'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {doc.name}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {doc.type} · {doc.size} · {doc.date}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--green-600)', fontWeight: 600, background: 'var(--green-100)', padding: '2px 8px', borderRadius: 999, flexShrink: 0 }}>
                    {analyzed.has(doc.id) ? '✓ Done' : 'Analyze →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Analysis result */}
        <div>
          {!selected ? (
            <div className="card animate-fade-slide" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '0.5rem' }}>Select a document</div>
              <div style={{ fontSize: '0.84rem' }}>Click any document on the left to run AI analysis</div>
            </div>
          ) : analyzing ? (
            <div className="card animate-fade-slide" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: 'float 1.5s ease-in-out infinite' }}>🔍</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--green-700)' }}>
                Analyzing document…
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Extracting insights with AI</div>
            </div>
          ) : (
            <div className="card animate-fade-slide">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                AI Analysis
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>
                {selected.name}
              </div>

              {/* Summary */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div className="prompt-label">Summary</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {selected.summary}
                </div>
              </div>

              {/* Key Points */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div className="prompt-label">Key Points</div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {selected.keyPoints.map(k => (
                    <li key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--green-500)', fontSize: '0.75rem', flexShrink: 0 }}>●</span> {k}
                    </li>
                  ))}
                </ul>
              </div>

              {/* SDGs */}
              <div>
                <div className="prompt-label">Relevant SDGs</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {selected.sdgs.map(s => (
                    <span key={s} style={{ padding: '4px 12px', background: 'var(--green-100)', color: 'var(--green-700)', borderRadius: 999, fontSize: '0.78rem', fontWeight: 600 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentIntelligence
