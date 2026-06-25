import { useState } from 'react'

const CATEGORIES = [
  {
    key: 'basic',
    label: '📝 Basic vs Detailed',
    examples: [
      {
        label: 'Vague Prompt',
        prompt: 'How do we save energy?',
        result: 'Turn off lights when not in use and reduce air conditioning.',
        quality: 'low',
        note: 'Generic answer with no campus context or actionable data.',
      },
      {
        label: 'Detailed Prompt',
        prompt: 'Analyze our campus electricity usage of 485 kWh this month (5% above target) and provide 3 specific, prioritized actions with estimated savings for each.',
        result: '1. Optimize HVAC scheduling (10 AM–3 PM peak): estimated savings 22 kWh/month. 2. Replace Building A fluorescent lights with LED: 15 kWh/month. 3. Add motion sensors to Labs 4–6: 8 kWh/month. Total potential: 45 kWh reduction.',
        quality: 'high',
        note: 'Specific, data-driven, actionable with measurable outcomes.',
      },
    ],
  },
  {
    key: 'role',
    label: '🎭 Role Assignment',
    examples: [
      {
        label: 'Without Role',
        prompt: 'What should we do about water waste?',
        result: 'Install water-saving fixtures and fix leaks promptly.',
        quality: 'low',
        note: 'Generic advice without institutional perspective.',
      },
      {
        label: 'With Role',
        prompt: 'You are a sustainability consultant for a university with 5,000 students. Water usage is 12,500 liters/month, 8% above target. Provide a phased 90-day action plan.',
        result: 'Phase 1 (Days 1–30): Audit all facilities, repair known leaks — saves ~800L. Phase 2 (Days 31–60): Install sensor taps in 12 buildings — saves ~2,500L. Phase 3 (Days 61–90): Greywater recycling pilot in Dining Hall — saves ~1,200L. Total: ~4,500L reduction (36%).',
        quality: 'high',
        note: 'Context-aware, phased, with concrete timelines and metrics.',
      },
    ],
  },
  {
    key: 'chain',
    label: '⛓️ Chain of Thought',
    examples: [
      {
        label: 'Direct Answer',
        prompt: 'Is our food waste acceptable?',
        result: 'It depends on your targets and campus size.',
        quality: 'low',
        note: 'Unhelpful without reasoning or data reference.',
      },
      {
        label: 'Step-by-Step',
        prompt: 'Think step by step: (1) Our food waste is 245 kg/month, down 8% from last month. (2) Industry benchmark for a 5,000-student campus is 180–220 kg/month. (3) Our SDG 12 target is 200 kg by June. Evaluate our status and next priority.',
        result: 'Step 1: Current = 245 kg, down 8% — positive trend. Step 2: vs benchmark: we\'re 11–36% above the 180–220 kg range. Step 3: We need 45 kg more reduction (18%) in 6 months — 3 kg/month. Priority: composting program (projected –8 kg/month) would achieve target 2 months early.',
        quality: 'high',
        note: 'Structured reasoning produces precise, actionable conclusion.',
      },
    ],
  },
  {
    key: 'format',
    label: '📊 Output Formatting',
    examples: [
      {
        label: 'Unstructured',
        prompt: 'Tell me about our sustainability initiatives.',
        result: 'We have solar panels and water saving devices and we try to reduce food waste and we also do recycling and have a green transport program.',
        quality: 'low',
        note: 'Hard to act on — no structure or priority.',
      },
      {
        label: 'Formatted',
        prompt: 'Summarize our top 3 sustainability initiatives as a markdown table with columns: Initiative, Status, Impact (kWh or kg/month), SDG.',
        result: '| Initiative | Status | Impact | SDG |\n|---|---|---|---|\n| LED Upgrade | ✅ Active | –35 kWh/mo | SDG 7 |\n| Composting | 🔄 In Progress | –8 kg/mo | SDG 12 |\n| Carpool Program | 📅 Planned | –2.5 t CO₂ | SDG 13 |',
        quality: 'high',
        note: 'Structured output enables easy tracking and reporting.',
      },
    ],
  },
]

const qualityDot = (q) => q === 'high'
  ? { background: 'var(--green-100)', border: '1px solid var(--green-200)' }
  : { background: 'var(--red-100)', border: '1px solid #f7c1c1' }

const PromptEngineering = () => {
  const [active, setActive] = useState('basic')
  const cat = CATEGORIES.find(c => c.key === active)

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>Prompt Engineering</h1>
        <p>See how crafting better prompts leads to more useful, actionable AI responses</p>
      </div>

      {/* Intro */}
      <div className="card animate-fade-slide" style={{ marginBottom: '1.5rem', background: 'var(--green-50)', border: '1px solid var(--green-100)' }}>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          <strong>Prompt engineering</strong> is the practice of crafting inputs to AI systems to get more accurate, relevant, and useful outputs.
          In a sustainability context, well-crafted prompts transform vague questions into data-driven action plans.
          Explore the examples below to understand the key techniques.
        </p>
      </div>

      <div className="prompt-tabs">
        {CATEGORIES.map(c => (
          <button key={c.key} className={`prompt-tab${active === c.key ? ' active' : ''}`} onClick={() => setActive(c.key)}>
            {c.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {cat.examples.map((ex, i) => (
          <div key={ex.label} className="card animate-fade-slide" style={{ animationDelay: `${i * 0.08}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem' }}>{ex.label}</div>
              <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, ...qualityDot(ex.quality) }}>
                {ex.quality === 'high' ? '✓ Good Prompt' : '⚠ Weak Prompt'}
              </span>
            </div>

            <div className="prompt-example">
              <div className="prompt-label">Prompt</div>
              <div className="prompt-text">"{ex.prompt}"</div>
            </div>

            <div className="prompt-result">
              <div className="prompt-result-label">AI Response</div>
              <div className="prompt-result-text" style={{ fontFamily: ex.result.includes('|') ? 'monospace' : 'inherit', whiteSpace: ex.result.includes('\n') ? 'pre-line' : 'normal' }}>
                {ex.result}
              </div>
            </div>

            <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.9rem', background: ex.quality === 'high' ? 'var(--green-50)' : 'var(--red-100)', borderRadius: 'var(--r-sm)', fontSize: '0.8rem', color: ex.quality === 'high' ? 'var(--green-700)' : 'var(--red-600)' }}>
              {ex.quality === 'high' ? '✓ ' : '⚠ '}{ex.note}
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="card animate-fade-slide" style={{ marginTop: '2rem' }}>
        <div className="section-title" style={{ marginBottom: '1rem' }}>Key Prompt Engineering Techniques</div>
        <div className="grid-2">
          {[
            { icon: '🎯', title: 'Be Specific', desc: 'Include numbers, context, and constraints. Vague prompts produce vague answers.' },
            { icon: '🎭', title: 'Assign a Role', desc: 'Ask the AI to respond as an expert in a relevant domain for higher quality outputs.' },
            { icon: '⛓️', title: 'Chain of Thought', desc: 'Ask the AI to reason step-by-step before reaching a conclusion.' },
            { icon: '📊', title: 'Specify Format', desc: 'Request tables, bullet points, or structured data for easier action-taking.' },
          ].map(t => (
            <div key={t.title} style={{ display: 'flex', gap: '0.75rem', padding: '0.85rem', background: 'var(--green-50)', borderRadius: 'var(--r-md)', border: '1px solid var(--green-100)' }}>
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{t.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromptEngineering
