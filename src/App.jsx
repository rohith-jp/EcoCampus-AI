import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { SensorProvider } from './context/SensorContext'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleGuard from './routes/RoleGuard'

// Auth pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AccessDeniedPage from './pages/auth/AccessDeniedPage'

// Layouts
import AuthLayout from './components/layout/AuthLayout'
import EcoBackground from './components/layout/EcoBackground'

// Homepage (public)
import HomePage from './pages/HomePage'

// Role dashboards
import AdminDashboard from './pages/admin/AdminDashboard'
import FacultyDashboard from './pages/faculty/FacultyDashboard'
import StudentDashboard from './pages/student/StudentDashboard'

// Admin pages
import UsersManagement from './pages/admin/UsersManagement'
import SustainabilityReports from './pages/admin/SustainabilityReports'
import CarbonTracking from './pages/admin/CarbonTracking'
import EnergyMonitoring from './pages/admin/EnergyMonitoring'
import WaterMonitoring from './pages/admin/WaterMonitoring'
import WasteManagement from './pages/admin/WasteManagement'
import SDGDashboard from './pages/admin/SDGDashboard'
import Settings from './pages/admin/Settings'
import Notifications from './pages/admin/Notifications'

// Faculty pages
import StudentSustainabilityReports from './pages/faculty/StudentSustainabilityReports'
import CourseSustainabilityAnalytics from './pages/faculty/CourseSustainabilityAnalytics'
import SustainabilityInsights from './pages/faculty/SustainabilityInsights'
import FacultyProfile from './pages/faculty/FacultyProfile'
import FacultyNotifications from './pages/faculty/FacultyNotifications'

// Student pages
import PersonalSustainabilityScore from './pages/student/PersonalSustainabilityScore'
import CarbonCalculator from './pages/student/CarbonCalculator'
import EcoChallenges from './pages/student/EcoChallenges'
import Leaderboard from './pages/student/Leaderboard'
import Achievements from './pages/student/Achievements'
import StudentProfile from './pages/student/StudentProfile'

// AI Chatbot
import AIChatbot from './pages/AIChatbot'

// Existing AI pages
import Dashboard from './pages/Dashboard'
import Predictions from './pages/Predictions'
import PatternDetection from './pages/PatternDetection'
import Recommendations from './pages/Recommendations'
import SustainabilityAssistant from './pages/SustainabilityAssistant'
import AIAgents from './pages/AIAgents'
import DocumentIntelligence from './pages/DocumentIntelligence'
import PromptEngineering from './pages/PromptEngineering'
import ResponsibleAI from './pages/ResponsibleAI'

const RoleRedirect = () => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" replace />
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />
  if (user.role === 'faculty') return <Navigate to="/faculty/dashboard" replace />
  return <Navigate to="/student/dashboard" replace />
}

const AuthedPage = ({ children }) => (
  <ProtectedRoute>
    <AuthLayout>{children}</AuthLayout>
  </ProtectedRoute>
)

// Loading fallback
const LoadingFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#050d10', color: '#34c07a', fontSize: '1.1rem' }}>
    Loading EcoCampus AI...
  </div>
)

function App() {
  return (
    <AuthProvider>
      <SensorProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* ── PUBLIC HOMEPAGE ── */}
              <Route path="/" element={<HomePage />} />

              {/* Public auth routes */}
              <Route path="/login" element={<><EcoBackground /><LoginPage /></>} />
              <Route path="/register" element={<><EcoBackground /><RegisterPage /></>} />
              <Route path="/access-denied" element={<><EcoBackground /><AccessDeniedPage /></>} />

              {/* Authenticated root redirect */}
              <Route path="/app" element={<ProtectedRoute><RoleRedirect /></ProtectedRoute>} />

              {/* ── ADMIN ROUTES ── */}
              <Route path="/admin/dashboard" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><AdminDashboard /></RoleGuard></AuthedPage>} />
              <Route path="/admin/users" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><UsersManagement /></RoleGuard></AuthedPage>} />
              <Route path="/admin/reports" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><SustainabilityReports /></RoleGuard></AuthedPage>} />
              <Route path="/admin/sustainability" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><SustainabilityReports /></RoleGuard></AuthedPage>} />
              <Route path="/admin/carbon" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><CarbonTracking /></RoleGuard></AuthedPage>} />
              <Route path="/admin/energy" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><EnergyMonitoring /></RoleGuard></AuthedPage>} />
              <Route path="/admin/water" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><WaterMonitoring /></RoleGuard></AuthedPage>} />
              <Route path="/admin/waste" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><WasteManagement /></RoleGuard></AuthedPage>} />
              <Route path="/admin/sdg" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><SDGDashboard /></RoleGuard></AuthedPage>} />
              <Route path="/admin/settings" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><Settings /></RoleGuard></AuthedPage>} />
              <Route path="/admin/notifications" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><Notifications /></RoleGuard></AuthedPage>} />
              <Route path="/admin/ai-analytics" element={<AuthedPage><RoleGuard allowedRoles={['admin']}><Dashboard /></RoleGuard></AuthedPage>} />

              {/* ── FACULTY ROUTES ── */}
              <Route path="/faculty/dashboard" element={<AuthedPage><RoleGuard allowedRoles={['faculty']}><FacultyDashboard /></RoleGuard></AuthedPage>} />
              <Route path="/faculty/student-reports" element={<AuthedPage><RoleGuard allowedRoles={['faculty']}><StudentSustainabilityReports /></RoleGuard></AuthedPage>} />
              <Route path="/faculty/course-analytics" element={<AuthedPage><RoleGuard allowedRoles={['faculty']}><CourseSustainabilityAnalytics /></RoleGuard></AuthedPage>} />
              <Route path="/faculty/insights" element={<AuthedPage><RoleGuard allowedRoles={['faculty']}><SustainabilityInsights /></RoleGuard></AuthedPage>} />
              <Route path="/faculty/analytics" element={<AuthedPage><RoleGuard allowedRoles={['faculty']}><CourseSustainabilityAnalytics /></RoleGuard></AuthedPage>} />
              <Route path="/faculty/profile" element={<AuthedPage><RoleGuard allowedRoles={['faculty']}><FacultyProfile /></RoleGuard></AuthedPage>} />
              <Route path="/faculty/notifications" element={<AuthedPage><RoleGuard allowedRoles={['faculty']}><FacultyNotifications /></RoleGuard></AuthedPage>} />

              {/* ── STUDENT ROUTES ── */}
              <Route path="/student/dashboard" element={<AuthedPage><RoleGuard allowedRoles={['student']}><StudentDashboard /></RoleGuard></AuthedPage>} />
              <Route path="/student/score" element={<AuthedPage><RoleGuard allowedRoles={['student']}><PersonalSustainabilityScore /></RoleGuard></AuthedPage>} />
              <Route path="/student/carbon-calc" element={<AuthedPage><RoleGuard allowedRoles={['student']}><CarbonCalculator /></RoleGuard></AuthedPage>} />
              <Route path="/student/challenges" element={<AuthedPage><RoleGuard allowedRoles={['student']}><EcoChallenges /></RoleGuard></AuthedPage>} />
              <Route path="/student/leaderboard" element={<AuthedPage><RoleGuard allowedRoles={['student']}><Leaderboard /></RoleGuard></AuthedPage>} />
              <Route path="/student/achievements" element={<AuthedPage><RoleGuard allowedRoles={['student']}><Achievements /></RoleGuard></AuthedPage>} />
              <Route path="/student/chatbot" element={<AuthedPage><RoleGuard allowedRoles={['student']}><AIChatbot /></RoleGuard></AuthedPage>} />
              <Route path="/student/profile" element={<AuthedPage><RoleGuard allowedRoles={['student']}><StudentProfile /></RoleGuard></AuthedPage>} />

              {/* ── SHARED AI PAGES (all authenticated roles) ── */}
              <Route path="/dashboard" element={<AuthedPage><Dashboard /></AuthedPage>} />
              <Route path="/predictions" element={<AuthedPage><Predictions /></AuthedPage>} />
              <Route path="/patterns" element={<AuthedPage><PatternDetection /></AuthedPage>} />
              <Route path="/recommendations" element={<AuthedPage><Recommendations /></AuthedPage>} />
              <Route path="/assistant" element={<AuthedPage><SustainabilityAssistant /></AuthedPage>} />
              <Route path="/agents" element={<AuthedPage><AIAgents /></AuthedPage>} />
              <Route path="/documents" element={<AuthedPage><DocumentIntelligence /></AuthedPage>} />
              <Route path="/prompts" element={<AuthedPage><PromptEngineering /></AuthedPage>} />
              <Route path="/responsible-ai" element={<AuthedPage><ResponsibleAI /></AuthedPage>} />
              <Route path="/chatbot" element={<AuthedPage><AIChatbot /></AuthedPage>} />

              {/* Alias routes for requirement spec */}
              <Route path="/analytics" element={<AuthedPage><Dashboard /></AuthedPage>} />
              <Route path="/reports" element={<AuthedPage><SustainabilityReports /></AuthedPage>} />
              <Route path="/profile" element={<AuthedPage><StudentProfile /></AuthedPage>} />
              <Route path="/settings" element={<AuthedPage><Settings /></AuthedPage>} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </SensorProvider>
    </AuthProvider>
  )
}

export default App
