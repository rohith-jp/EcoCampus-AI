import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Award,
  Bell,
  Bike,
  CheckCircle2,
  Droplets,
  Download,
  FileSpreadsheet,
  Filter,
  Flame,
  Globe2,
  Leaf,
  Medal,
  Printer,
  Recycle,
  Search,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'
import { Badge, ProgressBar } from '../ui/index'

const chartColors = ['#3dbf62', '#00b4a0', '#2492d1', '#e8a525', '#6b9c74', '#d9433e']

const badgeIcons = {
  Leaf,
  Recycle,
  Droplets,
  Zap,
  Globe2,
  Trophy,
}

const sectionMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.36 },
}

export const DashboardSection = ({ title, action, children }) => (
  <motion.section className="dash-section" {...sectionMotion}>
    <div className="section-head">
      <span className="section-title">{title}</span>
      {action}
    </div>
    {children}
  </motion.section>
)

export const LoadingSkeleton = ({ rows = 3 }) => (
  <div className="grid-3">
    {Array.from({ length: rows }).map((_, index) => (
      <div className="card" key={index}>
        <div className="skeleton dash-skeleton-title" />
        <div className="skeleton dash-skeleton-value" />
        <div className="skeleton dash-skeleton-line" />
      </div>
    ))}
  </div>
)

export const EmptyState = ({ title = 'No data available', detail = 'New activity will appear here automatically.' }) => (
  <div className="empty-state">
    <Sparkles size={22} />
    <strong>{title}</strong>
    <span>{detail}</span>
  </div>
)

export const FilterControls = ({ value, onChange, options = ['Daily', 'Weekly', 'Monthly', 'Yearly'] }) => (
  <div className="filter-controls" role="tablist" aria-label="Time range">
    {options.map((option) => (
      <button
        className={`filter-pill ${value === option ? 'active' : ''}`}
        key={option}
        onClick={() => onChange(option)}
        type="button"
      >
        {option}
      </button>
    ))}
  </div>
)

export const SearchSortControls = ({ query, onQuery, sort, onSort, sortOptions }) => (
  <div className="table-controls">
    <label className="search-box">
      <Search size={16} />
      <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search" />
    </label>
    <label className="sort-box">
      <Filter size={16} />
      <select value={sort} onChange={(event) => onSort(event.target.value)}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  </div>
)

export const ProgressRing = ({ value, size = 74, stroke = 8, label }) => {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(value, 100) / 100) * circumference

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true">
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} />
        <motion.circle
          className="ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <span>{label || `${value}%`}</span>
    </div>
  )
}

export const AnimatedMetricCard = ({ metric, index = 0 }) => {
  const positiveIsGood = metric.id?.includes('score') || metric.id?.includes('recycling') || metric.id?.includes('sdg')
  const weeklyGood = positiveIsGood ? metric.weeklyChange >= 0 : metric.weeklyChange <= 0

  return (
    <motion.div
      className="metric-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.32 }}
      whileHover={{ y: -3 }}
    >
      <div className="metric-card-top">
        <div>
          <div className="stat-label">{metric.label}</div>
          <div className="metric-value-row">
            <motion.span
              className="metric-value"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {metric.value.toLocaleString()}
            </motion.span>
            <span className="stat-unit">{metric.unit}</span>
          </div>
        </div>
        <ProgressRing value={metric.progress} />
      </div>
      <div className="metric-compare-row">
        <span className={weeklyGood ? 'trend-good' : 'trend-risk'}>{metric.weeklyChange > 0 ? '+' : ''}{metric.weeklyChange}% weekly</span>
        <span>{metric.monthlyChange > 0 ? '+' : ''}{metric.monthlyChange}% monthly</span>
      </div>
      <ProgressBar value={metric.progress} />
      <div className="metric-footer">
        <Badge variant={weeklyGood ? 'green' : 'amber'}>{metric.status}</Badge>
        <span className="status-sublabel">{metric.trend === 'up' ? 'Rising trend' : metric.trend === 'down' ? 'Lower trend' : 'Mixed trend'}</span>
      </div>
    </motion.div>
  )
}

export const CarbonTracker = ({ carbon }) => (
  <div className="grid-2">
    <div className="card">
      <div className="carbon-summary">
        {[
          ['Daily', carbon.daily, 'kg CO2e'],
          ['Weekly', carbon.weekly, 'kg CO2e'],
          ['Monthly', carbon.monthly, 'kg CO2e'],
          ['Reduction', carbon.reduction, 'kg saved'],
        ].map(([label, value, unit]) => (
          <div className="mini-kpi" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{unit}</small>
          </div>
        ))}
      </div>
      <div className="carbon-goal">
        <Target size={18} />
        <div>
          <strong>Carbon goal indicator</strong>
          <span>73% toward this month&apos;s reduction goal</span>
        </div>
        <ProgressRing value={73} size={58} stroke={7} />
      </div>
    </div>
    <div className="card">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={carbon.history}>
          <defs>
            <linearGradient id="carbonArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3dbf62" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#3dbf62" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#daeade" />
          <XAxis dataKey="day" tick={{ fill: '#6a8a72', fontSize: 11 }} />
          <YAxis tick={{ fill: '#6a8a72', fontSize: 11 }} />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#2da050" fill="url(#carbonArea)" strokeWidth={2.5} name="Daily footprint" />
          <Line type="monotone" dataKey="transportation" stroke="#2492d1" strokeWidth={2} name="Transport" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export const ChallengeGrid = ({ challenges, onAction }) => (
  <div className="challenge-grid">
    {challenges.map((challenge) => (
      <motion.div className="challenge-card" key={challenge.id} whileHover={{ y: -3 }}>
        <div className="challenge-card-head">
          <div>
            <strong>{challenge.title}</strong>
            <span>{challenge.category} • {challenge.difficulty}</span>
          </div>
          <Badge variant={challenge.progress === 100 ? 'green' : challenge.difficulty === 'Hard' ? 'amber' : 'teal'}>{challenge.status}</Badge>
        </div>
        <ProgressBar value={challenge.progress} />
        <div className="challenge-meta">
          <span>{challenge.progress}% complete</span>
          <span>Due {challenge.dueDate}</span>
          <span>+{challenge.points} pts</span>
        </div>
        <div className="challenge-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => onAction(challenge.id, 'Joined')} type="button">Start</button>
          <button className="btn btn-outline btn-sm" onClick={() => onAction(challenge.id, 'Active')} type="button">Continue</button>
          <button className="btn btn-primary btn-sm" onClick={() => onAction(challenge.id, 'Completed')} type="button">Complete</button>
        </div>
      </motion.div>
    ))}
  </div>
)

export const BadgeGallery = ({ badges }) => (
  <div className="badge-gallery">
    {badges.map((badge) => {
      const Icon = badgeIcons[badge.icon] || Award
      const unlocked = badge.progress === 100
      return (
        <motion.div className={`badge-card ${unlocked ? '' : 'locked'}`} key={badge.id} whileHover={{ scale: 1.02 }}>
          <div className="badge-icon-wrap"><Icon size={24} /></div>
          <div>
            <strong>{badge.name}</strong>
            <p>{badge.description}</p>
            <small>{badge.criteria} • {badge.date} • {badge.xp} XP</small>
          </div>
          <ProgressBar value={badge.progress} />
        </motion.div>
      )
    })}
  </div>
)

export const GoalBoard = ({ initialGoals }) => {
  const [goals, setGoals] = useState(initialGoals)
  const [goalName, setGoalName] = useState('')

  const addGoal = () => {
    if (!goalName.trim()) return
    setGoals((current) => [
      ...current,
      {
        id: Date.now(),
        name: goalName.trim(),
        progress: 0,
        deadline: 'Custom',
        status: 'New',
        suggestion: 'Start with one measurable weekly action.',
      },
    ])
    setGoalName('')
  }

  return (
    <div className="goal-layout">
      <div className="goal-create card">
        <Target size={22} />
        <input className="form-input" value={goalName} onChange={(event) => setGoalName(event.target.value)} placeholder="Create a personal sustainability goal" />
        <button className="btn btn-primary" type="button" onClick={addGoal}>Add Goal</button>
      </div>
      <div className="goal-grid">
        {goals.map((goal) => (
          <div className="goal-card" key={goal.id}>
            <div className="goal-card-head">
              <strong>{goal.name}</strong>
              <Badge variant={goal.status === 'Needs Focus' ? 'amber' : 'green'}>{goal.status}</Badge>
            </div>
            <ProgressBar value={goal.progress} />
            <div className="challenge-meta">
              <span>{goal.progress}% complete</span>
              <span>{goal.deadline}</span>
            </div>
            <p>{goal.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const AnalyticsPanel = ({ data, mode, onMode }) => (
  <div className="card">
    <div className="chart-panel-head">
      <FilterControls value={mode} onChange={onMode} />
    </div>
    <div className="grid-2 analytics-grid">
      <ResponsiveContainer width="100%" height={245}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#daeade" />
          <XAxis dataKey="period" tick={{ fill: '#6a8a72', fontSize: 11 }} />
          <YAxis tick={{ fill: '#6a8a72', fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Line dataKey="carbon" stroke="#d9433e" strokeWidth={2.4} />
          <Line dataKey="water" stroke="#2492d1" strokeWidth={2.4} />
          <Line dataKey="energy" stroke="#e8a525" strokeWidth={2.4} />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={245}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#daeade" />
          <XAxis dataKey="period" tick={{ fill: '#6a8a72', fontSize: 11 }} />
          <YAxis tick={{ fill: '#6a8a72', fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="waste" fill="#6b9c74" radius={[6, 6, 0, 0]} />
          <Bar dataKey="score" fill="#3dbf62" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export const AIRecommendationCards = ({ items }) => (
  <div className="ai-card-grid">
    {items.map((item) => (
      <motion.div className="ai-card" key={item.id} whileHover={{ y: -3 }}>
        <div className="ai-card-head">
          <Sparkles size={18} />
          <Badge variant={item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'amber' : 'green'}>{item.priority}</Badge>
        </div>
        <strong>{item.title}</strong>
        <p>{item.impact}</p>
        <div className="ai-meta-grid">
          <span>Difficulty: {item.difficulty}</span>
          <span>Savings: {item.savings}</span>
        </div>
        <ul>
          {item.actions.map((action) => <li key={action}>{action}</li>)}
        </ul>
      </motion.div>
    ))}
  </div>
)

export const Leaderboard = ({ items, department = false }) => (
  <div className="leaderboard">
    {items.slice(0, 10).map((item) => (
      <motion.div className="leaderboard-row" key={item.name} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className={`rank-medal rank-${item.rank}`}>
          {item.rank <= 3 ? <Medal size={18} /> : item.rank}
        </div>
        <div className="avatar">{item.name.slice(0, 1)}</div>
        <div className="leaderboard-main">
          <strong>{item.name}</strong>
          <span>
            {department
              ? `${item.carbonReduction}% carbon reduction • ${item.recycling}% recycling`
              : `${item.points} pts • ${item.reduction}% carbon reduction • ${item.badges} badges`}
          </span>
        </div>
        <div className="leaderboard-score">
          <strong>{item.score}</strong>
          <span>{department ? `W${item.weekly} M${item.monthly}` : `W${item.weeklyRank} M${item.monthlyRank}`}</span>
        </div>
      </motion.div>
    ))}
  </div>
)

export const Timeline = ({ items }) => (
  <div className="timeline">
    {items.map((item) => (
      <motion.div className="timeline-item" key={item.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="timeline-dot" />
        <div>
          <Badge variant="sage">{item.category}</Badge>
          <strong>{item.title}</strong>
          <span>{item.detail}</span>
          <small>{item.time}</small>
        </div>
      </motion.div>
    ))}
  </div>
)

export const NotificationCenter = ({ items, alerts = false }) => (
  <div className="notification-list">
    {items.map((item) => (
      <div className={`notification-item ${item.read ? '' : 'unread'}`} key={item.id}>
        <div className="notification-icon">{alerts ? <Flame size={18} /> : <Bell size={18} />}</div>
        <div>
          <strong>{item.title}</strong>
          <span>{alerts ? item.action : item.category}</span>
          <small>{item.time}</small>
        </div>
        <Badge variant={(item.priority || item.severity) === 'High' ? 'red' : 'amber'}>{item.priority || item.severity}</Badge>
      </div>
    ))}
  </div>
)

export const DepartmentComparison = ({ data }) => (
  <div className="grid-2">
    <div className="card">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#daeade" />
          <XAxis dataKey="department" tick={{ fill: '#6a8a72', fontSize: 10 }} />
          <YAxis tick={{ fill: '#6a8a72', fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#3dbf62" radius={[6, 6, 0, 0]} />
          <Bar dataKey="recycling" fill="#00b4a0" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="card">
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="department" tick={{ fill: '#6a8a72', fontSize: 10 }} />
          <Radar dataKey="carbon" stroke="#d9433e" fill="#d9433e" fillOpacity={0.18} />
          <Radar dataKey="electricity" stroke="#e8a525" fill="#e8a525" fillOpacity={0.14} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
    <div className="heat-map card">
      {data.map((item) => (
        <div className="heat-row" key={item.department}>
          <strong>{item.department}</strong>
          {['carbon', 'water', 'electricity', 'waste', 'score', 'recycling'].map((key) => (
            <span key={key} style={{ '--heat': `${Math.min(item[key], 100)}%` }}>{item[key]}</span>
          ))}
        </div>
      ))}
    </div>
    <ResponsiveTable
      columns={[
        ['department', 'Department'],
        ['carbon', 'Carbon'],
        ['water', 'Water'],
        ['electricity', 'Energy'],
        ['waste', 'Waste'],
        ['score', 'Score'],
        ['recycling', 'Recycle'],
      ]}
      data={data}
    />
  </div>
)

export const CourseAnalyticsTable = ({ rows }) => {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('score')
  const filtered = useMemo(() => (
    rows
      .filter((row) => row.course.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b[sort] - a[sort])
  ), [query, rows, sort])

  return (
    <div className="card">
      <SearchSortControls
        query={query}
        onQuery={setQuery}
        sort={sort}
        onSort={setSort}
        sortOptions={[
          { value: 'score', label: 'Sort by Score' },
          { value: 'participation', label: 'Sort by Participation' },
          { value: 'carbonReduction', label: 'Sort by Carbon Reduction' },
          { value: 'challenges', label: 'Sort by Challenges' },
        ]}
      />
      <ResponsiveTable
        columns={[
          ['course', 'Course'],
          ['participation', 'Participation %'],
          ['carbonReduction', 'Carbon Reduction %'],
          ['challenges', 'Challenges %'],
          ['score', 'Score'],
          ['energy', 'Avg Energy'],
          ['recycling', 'Recycling %'],
        ]}
        data={filtered}
      />
    </div>
  )
}

export const StudentPerformanceTable = ({ rows }) => {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('score')
  const filtered = useMemo(() => (
    rows
      .filter((row) => `${row.name} ${row.course}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b[sort] - a[sort])
  ), [query, rows, sort])

  return (
    <div className="card">
      <SearchSortControls
        query={query}
        onQuery={setQuery}
        sort={sort}
        onSort={setSort}
        sortOptions={[
          { value: 'score', label: 'Sort by Score' },
          { value: 'challenges', label: 'Sort by Challenges' },
          { value: 'badges', label: 'Sort by Badges' },
          { value: 'goalProgress', label: 'Sort by Goals' },
        ]}
      />
      <ResponsiveTable
        columns={[
          ['name', 'Student'],
          ['course', 'Course'],
          ['score', 'Score'],
          ['challenges', 'Challenges'],
          ['badges', 'Badges'],
          ['carbonReduction', 'Carbon Reduction %'],
          ['goalProgress', 'Goal Progress %'],
        ]}
        data={filtered}
      />
    </div>
  )
}

export const ResponsiveTable = ({ columns, data }) => (
  <div className="responsive-table-wrap">
    <table className="responsive-table">
      <thead>
        <tr>
          {columns.map(([, label]) => <th key={label}>{label}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id || row.department || row.name || index}>
            {columns.map(([key, label]) => <td data-label={label} key={key}>{row[key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export const StudentAnalyticsCards = ({ items }) => (
  <div className="grid-3">
    {items.map((item) => (
      <div className="mini-analytics-card" key={item.label}>
        <span>{item.label}</span>
        <strong>{item.value.toLocaleString()}{item.unit}</strong>
        <ProgressBar value={item.progress} />
      </div>
    ))}
  </div>
)

export const FacultyInsights = ({ items }) => (
  <div className="ai-card-grid">
    {items.map((item) => (
      <div className="ai-card" key={item.id}>
        <div className="ai-card-head">
          <Sparkles size={18} />
          <Badge variant={item.priority === 'High' ? 'red' : 'amber'}>{item.priority}</Badge>
        </div>
        <strong>{item.title}</strong>
        <p><b>Root cause:</b> {item.cause}</p>
        <p><b>Suggested improvement:</b> {item.improvement}</p>
        <p><b>Predicted trend:</b> {item.trend}</p>
      </div>
    ))}
  </div>
)

export const DepartmentTrends = ({ data, mode, onMode }) => (
  <div className="card">
    <div className="chart-panel-head">
      <FilterControls value={mode} onChange={onMode} options={['Weekly', 'Monthly', 'Yearly']} />
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#daeade" />
        <XAxis dataKey="period" tick={{ fill: '#6a8a72', fontSize: 11 }} />
        <YAxis tick={{ fill: '#6a8a72', fontSize: 11 }} />
        <Tooltip />
        <Legend />
        <Area dataKey="carbon" stroke="#d9433e" fill="#d9433e" fillOpacity={0.1} />
        <Area dataKey="water" stroke="#2492d1" fill="#2492d1" fillOpacity={0.1} />
        <Area dataKey="electricity" stroke="#e8a525" fill="#e8a525" fillOpacity={0.1} />
        <Area dataKey="recycling" stroke="#3dbf62" fill="#3dbf62" fillOpacity={0.12} />
        <Line dataKey="sdg" stroke="#00b4a0" strokeWidth={2.5} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)

export const ReportsExportPanel = () => (
  <div className="export-panel card">
    <div>
      <strong>Department Reports</strong>
      <span>KPI summary, analytics, charts, student performance, department comparison, AI insights, and recommendations are ready for export.</span>
    </div>
    <div className="export-actions">
      <button className="btn btn-primary" type="button"><Download size={16} /> PDF</button>
      <button className="btn btn-secondary" type="button"><FileSpreadsheet size={16} /> Excel</button>
      <button className="btn btn-outline" type="button"><Printer size={16} /> Print</button>
    </div>
  </div>
)

export const PieSummary = ({ data, keys }) => {
  const pieData = keys.map((key) => ({ name: key, value: Math.round(data.reduce((sum, row) => sum + Number(row[key] || 0), 0) / data.length) }))
  return (
    <div className="card">
      <ResponsiveContainer width="100%" height={235}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={82} paddingAngle={4}>
            {pieData.map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export const QuickActionStrip = ({ student = false }) => (
  <div className="quick-strip">
    {(student
      ? [
          [Bike, 'Transport log'],
          [Droplets, 'Water entry'],
          [Recycle, 'Waste sort'],
          [CheckCircle2, 'Goal update'],
        ]
      : [
          [Download, 'Generate report'],
          [Bell, 'Review alerts'],
          [Sparkles, 'AI insights'],
          [Trophy, 'Rankings'],
        ]
    ).map(([Icon, label]) => (
      <button className="quick-action" key={label} type="button">
        <Icon size={17} />
        <span>{label}</span>
      </button>
    ))}
  </div>
)
