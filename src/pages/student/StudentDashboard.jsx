import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../../components/ui/index'
import { useAuth } from '../../context/AuthContext'
import { useSustainabilityDashboard } from '../../hooks/useSustainabilityDashboard'
import {
  AIRecommendationCards,
  AnalyticsPanel,
  AnimatedMetricCard,
  BadgeGallery,
  CarbonTracker,
  ChallengeGrid,
  DashboardSection,
  EmptyState,
  GoalBoard,
  Leaderboard,
  LoadingSkeleton,
  NotificationCenter,
  PieSummary,
  QuickActionStrip,
  Timeline,
} from '../../components/dashboard/SustainabilityDashboardKit'

const StudentDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data, loading, error } = useSustainabilityDashboard('student')
  const [analyticsMode, setAnalyticsMode] = useState('Monthly')
  const [challenges, setChallenges] = useState(null)

  if (loading) {
    return (
      <div className="container">
        <div className="page-header animate-fade-slide">
          <h1>Student Dashboard</h1>
          <p>Loading your personalized sustainability platform.</p>
        </div>
        <LoadingSkeleton rows={6} />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container">
        <EmptyState title="Dashboard unavailable" detail={error || 'Please try again in a moment.'} />
      </div>
    )
  }

  const activeChallenges = challenges || data.challenges
  const handleChallengeAction = (id, status) => {
    setChallenges((current) => (current || data.challenges).map((challenge) => (
      challenge.id === id
        ? { ...challenge, status, progress: status === 'Completed' ? 100 : Math.max(challenge.progress, status === 'Active' ? 55 : 15) }
        : challenge
    )))
  }

  return (
    <div className="container dashboard-enhanced">
      <div className="page-header animate-fade-slide">
        <h1>Student Dashboard</h1>
        <p>Your AI-powered sustainability journey. Welcome, <strong>{user?.fullName}</strong></p>
        <div className="header-meta">
          <div className="live-dot" />
          <Badge variant="green">Student Access</Badge>
          <Badge variant="teal">Personalized AI</Badge>
        </div>
      </div>

      <QuickActionStrip student />

      <DashboardSection title="Personal Sustainability Overview">
        <div className="metric-grid">
          {data.overview.map((metric, index) => <AnimatedMetricCard metric={metric} index={index} key={metric.id} />)}
        </div>
      </DashboardSection>

      <DashboardSection title="Personal Carbon Tracker">
        <CarbonTracker carbon={data.carbon} />
      </DashboardSection>

      <DashboardSection title="Eco Challenges">
        <ChallengeGrid challenges={activeChallenges} onAction={handleChallengeAction} />
      </DashboardSection>

      <div className="grid-2">
        <DashboardSection title="Achievement & Badge System">
          <BadgeGallery badges={data.badges} />
        </DashboardSection>

        <DashboardSection title="Notifications Center">
          <NotificationCenter items={data.notifications} />
        </DashboardSection>
      </div>

      <DashboardSection title="Sustainability Goals">
        <GoalBoard initialGoals={data.goals} />
      </DashboardSection>

      <DashboardSection title="Personal Analytics">
        <div className="grid-2">
          <AnalyticsPanel data={data.analytics} mode={analyticsMode} onMode={setAnalyticsMode} />
          <PieSummary data={data.analytics} keys={['carbon', 'water', 'energy', 'waste']} />
        </div>
      </DashboardSection>

      <DashboardSection title="AI Recommendations">
        <AIRecommendationCards items={data.recommendations} />
      </DashboardSection>

      <div className="grid-2">
        <DashboardSection title="Campus Leaderboard">
          <Leaderboard items={data.leaderboard} />
        </DashboardSection>

        <DashboardSection title="Activity Timeline">
          <Timeline items={data.timeline} />
        </DashboardSection>
      </div>

      <DashboardSection title="Student Tools">
        <div className="grid-3">
          {[
            { title: 'Carbon Calculator', desc: 'Calculate and track your personal carbon footprint with AI-powered insights.', link: '/student/carbon-calc' },
            { title: 'AI Sustainability Chatbot', desc: 'Get personalized sustainability advice and answers from your AI assistant.', link: '/student/chatbot' },
            { title: 'Achievements', desc: 'View all earned badges and sustainability milestones.', link: '/student/achievements' },
            { title: 'Eco Challenges', desc: 'Browse and join sustainability challenges to earn points and badges.', link: '/student/challenges' },
            { title: 'Sustainability Score', desc: 'Track your personal sustainability performance score over time.', link: '/student/score' },
            { title: 'My Profile', desc: 'Update preferences and sustainability settings.', link: '/student/profile' },
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

export default StudentDashboard
