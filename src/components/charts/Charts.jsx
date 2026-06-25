import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart, ReferenceLine,
} from 'recharts'

const COLORS = {
  green: '#3dbf62',
  teal: '#00b4a0',
  amber: '#e8a525',
  sky: '#2492d1',
  red: '#d9433e',
  muted: '#6a8a72',
  border: '#daeade',
}

const tooltipStyle = {
  contentStyle: {
    background: '#fdfffd',
    border: '1px solid #daeade',
    borderRadius: '12px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.82rem',
    boxShadow: '0 4px 16px rgba(30,80,45,0.10)',
  },
  labelStyle: { color: '#111d14', fontWeight: 600 },
}

// ── TrendChart ────────────────────────────────────────────
export const TrendChart = ({ data, dataKey = 'value', color = COLORS.green, height = 280 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
      <XAxis dataKey="month" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
      <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
      <Tooltip {...tooltipStyle} />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={2.5}
        dot={{ fill: color, r: 4, strokeWidth: 0 }}
        activeDot={{ r: 6, strokeWidth: 0 }}
      />
    </LineChart>
  </ResponsiveContainer>
)

// ── ComparisonChart (Historical + Predicted) ──────────────
export const ComparisonChart = ({ data, height = 340 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <ComposedChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
      <XAxis dataKey="month" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
      <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
      <Tooltip {...tooltipStyle} />
      <Legend
        formatter={(val) => <span style={{ color: COLORS.muted, fontSize: '0.8rem' }}>{val}</span>}
      />
      <Line
        type="monotone"
        dataKey="actual"
        stroke={COLORS.green}
        strokeWidth={2.5}
        name="Historical"
        dot={{ fill: COLORS.green, r: 4, strokeWidth: 0 }}
        connectNulls
      />
      <Line
        type="monotone"
        dataKey="predicted"
        stroke={COLORS.amber}
        strokeWidth={2.5}
        strokeDasharray="6 4"
        name="Predicted"
        dot={{ fill: COLORS.amber, r: 4, strokeWidth: 0 }}
        connectNulls
      />
    </ComposedChart>
  </ResponsiveContainer>
)

// ── BarChart ──────────────────────────────────────────────
export const PatternBarChart = ({ data, dataKey = 'value', color = COLORS.green, height = 200, xKey = 'day' }) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
      <XAxis dataKey={xKey} tick={{ fill: COLORS.muted, fontSize: 10 }} axisLine={{ stroke: COLORS.border }} />
      <YAxis tick={{ fill: COLORS.muted, fontSize: 10 }} axisLine={{ stroke: COLORS.border }} />
      <Tooltip {...tooltipStyle} />
      <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

export { COLORS }
