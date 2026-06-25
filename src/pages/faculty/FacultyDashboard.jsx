import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../../components/ui/index'
import { useAuth } from '../../context/AuthContext'
import { useSustainabilityDashboard } from '../../hooks/useSustainabilityDashboard'
import {
  AnimatedMetricCard,
  CourseAnalyticsTable,
  DashboardSection,
  DepartmentComparison,
  DepartmentTrends,
  EmptyState,
  FacultyInsights,
  Leaderboard,
  LoadingSkeleton,
  NotificationCenter,
  PieSummary,
  QuickActionStrip,
  ReportsExportPanel,
  StudentAnalyticsCards,
  StudentPerformanceTable,
} from '../../components/dashboard/SustainabilityDashboardKit'

const FacultyDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data, loading, error } = useSustainabilityDashboard('faculty')
  const [trendMode, setTrendMode] = useState('Monthly')

  if (loading) {
    return (
      <div className="container">
        <div className="page-header animate-fade-slide">
          <h1>Faculty Dashboard</h1>
          <p>Loading department sustainability analytics.</p>
        </div>
        <LoadingSkeleton rows={6} />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container">
        <EmptyState title="Faculty dashboard unavailable" detail={error || 'Please try again in a moment.'} />
      </div>
    )
  }

  return (
    <div className="container dashboard-enhanced">
      <div className="page-header animate-fade-slide">
        <h1>Faculty Dashboard</h1>
        <p>Department sustainability analytics platform. Welcome, <strong>{user?.fullName}</strong></p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Faculty Access</Badge>
          <Badge variant="teal">Department Intelligence</Badge>
        </div>
      </div>

      <QuickActionStrip />

      <DashboardSection title="Department Overview">
        <div className="metric-grid">
          {data.overview.map((metric, index) => <AnimatedMetricCard metric={metric} index={index} key={metric.id} />)}
        </div>
      </DashboardSection>

      <DashboardSection title="Student Sustainability Analytics">
        <div className="grid-2">
          <StudentAnalyticsCards items={data.studentAnalytics} />
          <PieSummary data={data.departmentComparison} keys={['score', 'recycling', 'carbon', 'waste']} />
        </div>
      </DashboardSection>

      <DashboardSection title="Department Performance Comparison">
        <DepartmentComparison data={data.departmentComparison} />
      </DashboardSection>

      <DashboardSection title="Course Sustainability Analytics">
        <CourseAnalyticsTable rows={data.courses} />
      </DashboardSection>

      <DashboardSection title="AI Department Insights">
        <FacultyInsights items={data.insights} />
      </DashboardSection>

      <DashboardSection title="Student Performance Monitoring">
        <StudentPerformanceTable rows={data.students} />
      </DashboardSection>

      <DashboardSection title="Department Trends">
        <DepartmentTrends data={data.trends} mode={trendMode} onMode={setTrendMode} />
      </DashboardSection>

      <DashboardSection title="Reports & Export">
        <ReportsExportPanel />
      </DashboardSection>

      <div className="grid-2">
        <DashboardSection title="Alerts Center">
          <NotificationCenter items={data.alerts} alerts />
        </DashboardSection>

        <DashboardSection title="Department Leaderboard">
          <Leaderboard items={data.leaderboard} department />
        </DashboardSection>
      </div>

      <DashboardSection title="Faculty Tools">
        <div className="grid-3">
          {[
            { title: 'Student Reports', desc: 'Review individual student sustainability report submissions.', link: '/faculty/student-reports' },
            { title: 'Course Analytics', desc: 'Deep dive into course-level sustainability performance and trends.', link: '/faculty/course-analytics' },
            { title: 'Sustainability Insights', desc: 'AI-powered insights to improve department outcomes.', link: '/faculty/insights' },
          ].map((item) => (
            <div className="card card-hoverable card-link animate-fade-slide" key={item.title} onClick={() => navigate(item.link)}>
              <div className="feature-title">{item.title}</div>
              <div className="feature-desc">{item.desc}</div>
              <span className="feature-link">Open</span>
            </div>
          ))}
        </div>
      </DashboardSection>
    </div>
  )
}

export default FacultyDashboard
