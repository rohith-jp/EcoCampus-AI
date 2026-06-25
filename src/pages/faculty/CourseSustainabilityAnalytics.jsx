import { useState } from 'react'
import { StatCard, Badge, SectionHead } from '../../components/ui/index'
import { TrendChart, PatternBarChart } from '../../components/charts/Charts'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const scoreHistory = [
  { month: 'Sep', value: 62 }, { month: 'Oct', value: 65 }, { month: 'Nov', value: 68 },
  { month: 'Dec', value: 67 }, { month: 'Jan', value: 70 }, { month: 'Feb', value: 73 },
  { month: 'Mar', value: 74 },
]

const courseComparison = [
  { month: 'ENV 301', value: 76 },
  { month: 'ENV 302', value: 71 },
  { month: 'ENV 201', value: 68 },
  { month: 'ENV 401', value: 80 },
]

const TOPICS = [
  { topic: 'Carbon Footprint Analysis', completion: 94, avgScore: 82, students: 48, sdg: 'SDG 13' },
  { topic: 'Renewable Energy Systems', completion: 88, avgScore: 78, students: 48, sdg: 'SDG 7' },
  { topic: 'Water Conservation Methods', completion: 91, avgScore: 85, students: 36, sdg: 'SDG 6' },
  { topic: 'Waste Reduction Strategies', completion: 76, avgScore: 71, students: 60, sdg: 'SDG 12' },
  { topic: 'Biodiversity & Ecosystems', completion: 82, avgScore: 74, students: 36, sdg: 'SDG 15' },
]

const radarData = [
  { subject: 'Carbon', A: 82, B: 78, fullMark: 100 },
  { subject: 'Energy', A: 88, B: 85, fullMark: 100 },
  { subject: 'Water', A: 91, B: 88, fullMark: 100 },
  { subject: 'Waste', A: 76, B: 82, fullMark: 100 },
  { subject: 'Biodiversity', A: 82, B: 79, fullMark: 100 },
  { subject: 'SDG', A: 89, B: 85, fullMark: 100 },
]

const areaData = [
  { name: 'Week 1', current: 62, previous: 58 },
  { name: 'Week 2', current: 65, previous: 60 },
  { name: 'Week 3', current: 68, previous: 63 },
  { name: 'Week 4', current: 67, previous: 65 },
  { name: 'Week 5', current: 70, previous: 66 },
  { name: 'Week 6', current: 73, previous: 68 },
  { name: 'Week 7', current: 74, previous: 70 },
]

const CourseSustainabilityAnalytics = () => {
  const [filter, setFilter] = useState('all')
  const [chartType, setChartType] = useState('bar')

  const filteredTopics = filter === 'all' ? TOPICS : TOPICS.filter(t => t.sdg === filter)

  return (
    <div className="container">
      <div className="page-header animate-fade-slide">
        <h1>📈 Course Sustainability Analytics</h1>
        <p>Deep analytics on course-level sustainability performance and student engagement trends</p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Faculty Access</Badge>
        </div>
      </div>

      <div className="status-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Active Courses', num: '4', sub: 'This semester', cls: 'green-num' },
          { label: 'Avg. Score', num: '74', sub: 'Across all courses', cls: 'green-num' },
          { label: 'Completion Rate', num: '88%', sub: 'Module completion', cls: 'green-num' },
          { label: 'SDG Alignment', num: '89%', sub: 'Meeting targets', cls: 'green-num' },
        ].map((item, i) => (
          <div className="status-item animate-fade-slide" key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="status-label">{item.label}</div>
            <div className={`status-num ${item.cls}`}>{item.num}</div>
            <div className="status-sublabel">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatCard label="Total Students" value="180" unit="enrolled" icon="🎓" trend={8} trendLabel="vs last semester" />
        <StatCard label="Carbon Saved" value="4.2" unit="tCO₂e" icon="🌍" trend={-15} trendLabel="vs last semester" />
        <StatCard label="Green Projects" value="47" unit="submitted" icon="🌱" trend={22} trendLabel="vs last semester" />
        <StatCard label="Peer Challenges" value="128" unit="completed" icon="🏆" trend={34} trendLabel="vs last semester" />
      </div>

      {/* Advanced Analytics Section */}
      <div className="card animate-fade-slide" style={{ marginBottom: '1.5rem' }}>
        <SectionHead title="📊 Advanced Analytics Dashboard" />
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Filter by SDG:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: '0.4rem 0.8rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', fontSize: '0.85rem' }}
            >
              <option value="all">All SDGs</option>
              <option value="SDG 6">SDG 6 - Clean Water</option>
              <option value="SDG 7">SDG 7 - Clean Energy</option>
              <option value="SDG 12">SDG 12 - Responsible Consumption</option>
              <option value="SDG 13">SDG 13 - Climate Action</option>
              <option value="SDG 15">SDG 15 - Life on Land</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Chart Type:</label>
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value)}
              style={{ padding: '0.4rem 0.8rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', fontSize: '0.85rem' }}
            >
              <option value="bar">Bar Chart</option>
              <option value="radar">Radar Chart</option>
              <option value="area">Area Chart</option>
            </select>
          </div>
        </div>

        {chartType === 'bar' && (
          <div className="card animate-fade-slide">
            <SectionHead title="Performance by Course" />
            <PatternBarChart data={courseComparison} dataKey="value" color="#2492d1" height={240} />
          </div>
        )}

        {chartType === 'radar' && (
          <div className="card animate-fade-slide">
            <SectionHead title="Multi-Dimensional Performance Comparison" />
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Current Semester" dataKey="A" stroke="#3dbf62" fill="#3dbf62" fillOpacity={0.6} />
                <Radar name="Previous Semester" dataKey="B" stroke="#2492d1" fill="#2492d1" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartType === 'area' && (
          <div className="card animate-fade-slide">
            <SectionHead title="Weekly Progress Comparison" />
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="current" stroke="#3dbf62" fill="#3dbf62" fillOpacity={0.6} name="Current Semester" />
                <Area type="monotone" dataKey="previous" stroke="#2492d1" fill="#2492d1" fillOpacity={0.6} name="Previous Semester" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card animate-fade-slide">
          <SectionHead title="Average Eco Score Trend" />
          <TrendChart data={scoreHistory} dataKey="value" color="#3dbf62" height={240} />
        </div>
        <div className="card animate-fade-slide">
          <SectionHead title="Performance by Course" />
          <PatternBarChart data={courseComparison} dataKey="value" color="#2492d1" height={240} />
        </div>
      </div>

      <div className="card animate-fade-slide" style={{ padding: 0, overflow: 'hidden' }}>
        <SectionHead title="Topic Performance Breakdown" />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'var(--green-50)', borderBottom: '1px solid var(--border)' }}>
              {['Topic', 'SDG', 'Students', 'Completion', 'Avg. Score'].map(h => (
                <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTopics.map(t => (
              <tr key={t.topic} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{t.topic}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <Badge variant="green" style={{ fontSize: '0.75rem' }}>{t.sdg}</Badge>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{t.students}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, background: 'var(--green-100)', borderRadius: 999, height: 6, overflow: 'hidden', minWidth: 80 }}>
                      <div style={{ background: 'var(--green-500)', width: `${t.completion}%`, height: '100%', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--green-600)', fontSize: '0.85rem', minWidth: 36 }}>{t.completion}%</span>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ fontWeight: 700, color: t.avgScore >= 80 ? 'var(--green-500)' : t.avgScore >= 70 ? 'var(--amber-400)' : 'var(--red-400)', fontSize: '1rem' }}>{t.avgScore}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseSustainabilityAnalytics
