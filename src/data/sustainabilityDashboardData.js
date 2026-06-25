export const studentOverviewMetrics = [
  {
    id: 'score',
    label: 'Sustainability Score',
    value: 84,
    unit: '/100',
    weeklyChange: 6,
    monthlyChange: 12,
    progress: 84,
    status: 'Excellent',
    trend: 'up',
  },
  {
    id: 'carbon',
    label: 'Carbon Footprint',
    value: 18.4,
    unit: 'kg CO2e',
    weeklyChange: -9,
    monthlyChange: -17,
    progress: 68,
    status: 'Improving',
    trend: 'down',
  },
  {
    id: 'electricity',
    label: 'Electricity',
    value: 42,
    unit: 'kWh',
    weeklyChange: -7,
    monthlyChange: -11,
    progress: 72,
    status: 'On Track',
    trend: 'down',
  },
  {
    id: 'water',
    label: 'Water Usage',
    value: 126,
    unit: 'L',
    weeklyChange: -5,
    monthlyChange: -14,
    progress: 76,
    status: 'Efficient',
    trend: 'down',
  },
  {
    id: 'waste',
    label: 'Waste Generated',
    value: 3.6,
    unit: 'kg',
    weeklyChange: -12,
    monthlyChange: -22,
    progress: 81,
    status: 'Low Waste',
    trend: 'down',
  },
  {
    id: 'recycling',
    label: 'Recycling',
    value: 71,
    unit: '%',
    weeklyChange: 8,
    monthlyChange: 19,
    progress: 71,
    status: 'Rising',
    trend: 'up',
  },
]

export const studentCarbonLogs = [
  { day: 'Mon', transportation: 3.2, electricity: 4.5, water: 1.1, food: 2.8, waste: 0.8 },
  { day: 'Tue', transportation: 2.4, electricity: 4.1, water: 1.0, food: 2.5, waste: 0.6 },
  { day: 'Wed', transportation: 1.8, electricity: 3.8, water: 0.9, food: 2.2, waste: 0.5 },
  { day: 'Thu', transportation: 2.1, electricity: 3.6, water: 0.8, food: 2.0, waste: 0.4 },
  { day: 'Fri', transportation: 1.5, electricity: 3.4, water: 0.8, food: 1.8, waste: 0.4 },
  { day: 'Sat', transportation: 0.9, electricity: 2.8, water: 0.7, food: 1.9, waste: 0.3 },
  { day: 'Sun', transportation: 1.1, electricity: 3.0, water: 0.7, food: 1.7, waste: 0.3 },
]

export const studentChallenges = [
  { id: 1, title: 'Save 20 Liters of Water', difficulty: 'Easy', category: 'Water', points: 80, progress: 70, dueDate: 'Jul 04', status: 'Active' },
  { id: 2, title: 'Plant 5 Trees', difficulty: 'Medium', category: 'Biodiversity', points: 140, progress: 40, dueDate: 'Jul 12', status: 'Joined' },
  { id: 3, title: 'Walk 10 km Instead of Driving', difficulty: 'Medium', category: 'Transport', points: 120, progress: 86, dueDate: 'Jun 30', status: 'Active' },
  { id: 4, title: 'Reusable Bottles for One Week', difficulty: 'Easy', category: 'Waste', points: 90, progress: 100, dueDate: 'Jun 28', status: 'Ready' },
  { id: 5, title: 'Reduce Electricity Consumption', difficulty: 'Hard', category: 'Energy', points: 180, progress: 52, dueDate: 'Jul 15', status: 'Active' },
  { id: 6, title: 'Campus Cleaning Drive', difficulty: 'Medium', category: 'Community', points: 130, progress: 25, dueDate: 'Jul 03', status: 'Open' },
  { id: 7, title: 'Complete Recycling Challenge', difficulty: 'Easy', category: 'Recycling', points: 100, progress: 64, dueDate: 'Jul 09', status: 'Joined' },
]

export const studentBadges = [
  { id: 1, name: 'Green Starter', icon: 'Leaf', description: 'Completed first eco action', criteria: '1 challenge complete', date: 'Jun 03', progress: 100, xp: 100 },
  { id: 2, name: 'Recycling Champion', icon: 'Recycle', description: 'Recycled 20 kg of material', criteria: '20 kg recycled', date: 'Jun 11', progress: 100, xp: 180 },
  { id: 3, name: 'Water Saver', icon: 'Droplets', description: 'Saved 200 liters of water', criteria: '200 L saved', date: 'Jun 18', progress: 100, xp: 160 },
  { id: 4, name: 'Energy Guardian', icon: 'Zap', description: 'Reduced electricity for 3 weeks', criteria: '15% energy cut', date: 'Locked', progress: 72, xp: 220 },
  { id: 5, name: 'Climate Hero', icon: 'Globe2', description: 'Reduced carbon footprint by 25%', criteria: '25% CO2 cut', date: 'Locked', progress: 66, xp: 260 },
  { id: 6, name: 'Sustainability Ambassador', icon: 'Trophy', description: 'Top 10 monthly leaderboard rank', criteria: 'Top 10 rank', date: 'Locked', progress: 54, xp: 300 },
]

export const studentGoals = [
  { id: 1, name: 'Reduce Carbon by 20%', progress: 68, deadline: 'Aug 15', status: 'On Track', suggestion: 'Use bike share twice more this week.' },
  { id: 2, name: 'Save More Water', progress: 76, deadline: 'Jul 20', status: 'Ahead', suggestion: 'Keep showers below 5 minutes during peak hours.' },
  { id: 3, name: 'Increase Recycling', progress: 61, deadline: 'Aug 01', status: 'Needs Focus', suggestion: 'Separate dry waste before hostel collection.' },
  { id: 4, name: 'Complete Eco Challenges', progress: 58, deadline: 'Jul 31', status: 'On Track', suggestion: 'Finish the bottle challenge for a quick badge unlock.' },
]

export const studentAnalytics = [
  { period: 'Jan', carbon: 32, water: 176, energy: 62, waste: 7.8, score: 62 },
  { period: 'Feb', carbon: 30, water: 168, energy: 59, waste: 7.1, score: 66 },
  { period: 'Mar', carbon: 28, water: 159, energy: 55, waste: 6.4, score: 70 },
  { period: 'Apr', carbon: 25, water: 148, energy: 51, waste: 5.6, score: 75 },
  { period: 'May', carbon: 22, water: 137, energy: 47, waste: 4.8, score: 80 },
  { period: 'Jun', carbon: 18, water: 126, energy: 42, waste: 3.6, score: 84 },
]

export const studentRecommendations = [
  { id: 1, title: 'Walk Instead of Driving', priority: 'High', impact: 'Avoids short trip emissions', difficulty: 'Easy', savings: '3.4 kg CO2e/week', actions: ['Walk for trips under 1 km', 'Join the 10 km walking challenge'] },
  { id: 2, title: 'Carry Reusable Bottles', priority: 'Medium', impact: 'Cuts single-use plastic waste', difficulty: 'Easy', savings: '1.1 kg CO2e/week', actions: ['Refill at campus stations', 'Skip bottled drinks'] },
  { id: 3, title: 'Reduce Electricity Usage', priority: 'High', impact: 'Lowers hostel peak load', difficulty: 'Medium', savings: '4.8 kg CO2e/week', actions: ['Switch off idle devices', 'Use natural light before 5 PM'] },
  { id: 4, title: 'Recycle Plastic Waste', priority: 'Medium', impact: 'Improves circular material recovery', difficulty: 'Easy', savings: '2.0 kg CO2e/week', actions: ['Sort plastics daily', 'Use the east block recycling station'] },
  { id: 5, title: 'Save Water During Peak Hours', priority: 'Low', impact: 'Reduces pumping energy', difficulty: 'Easy', savings: '0.8 kg CO2e/week', actions: ['Avoid laundry at noon', 'Report leaking taps'] },
]

export const studentLeaderboard = [
  { rank: 1, name: 'Arjun Kumar', score: 96, points: 1840, reduction: 31, badges: 9, weeklyRank: 1, monthlyRank: 2, change: 2 },
  { rank: 2, name: 'Priya Sharma', score: 93, points: 1760, reduction: 28, badges: 8, weeklyRank: 3, monthlyRank: 1, change: -1 },
  { rank: 3, name: 'Kiran Das', score: 91, points: 1685, reduction: 26, badges: 8, weeklyRank: 2, monthlyRank: 3, change: 1 },
  { rank: 4, name: 'Meera Nair', score: 88, points: 1540, reduction: 24, badges: 7, weeklyRank: 4, monthlyRank: 5, change: 3 },
  { rank: 5, name: 'Rahul Verma', score: 86, points: 1490, reduction: 21, badges: 7, weeklyRank: 5, monthlyRank: 4, change: 0 },
  { rank: 6, name: 'Sneha Patel', score: 84, points: 1420, reduction: 20, badges: 6, weeklyRank: 7, monthlyRank: 6, change: 2 },
  { rank: 7, name: 'Aditi Rao', score: 82, points: 1360, reduction: 18, badges: 6, weeklyRank: 6, monthlyRank: 8, change: -1 },
  { rank: 8, name: 'Dev Menon', score: 80, points: 1288, reduction: 17, badges: 5, weeklyRank: 8, monthlyRank: 7, change: 4 },
  { rank: 9, name: 'Nisha Iyer', score: 79, points: 1210, reduction: 15, badges: 5, weeklyRank: 9, monthlyRank: 9, change: 0 },
  { rank: 10, name: 'Omar Khan', score: 77, points: 1185, reduction: 14, badges: 4, weeklyRank: 10, monthlyRank: 10, change: 1 },
]

export const studentTimeline = [
  { id: 1, title: 'Completed Reusable Bottle challenge', category: 'Challenge', time: 'Today, 09:20', detail: '+90 points earned' },
  { id: 2, title: 'Unlocked Water Saver badge', category: 'Badge', time: 'Yesterday', detail: 'Saved 200 liters total' },
  { id: 3, title: 'Carbon footprint updated', category: 'Carbon', time: 'Jun 22', detail: 'Weekly footprint dropped 9%' },
  { id: 4, title: 'AI recommendation accepted', category: 'AI', time: 'Jun 21', detail: 'Walking route added to goals' },
  { id: 5, title: 'Goal milestone reached', category: 'Goal', time: 'Jun 19', detail: 'Carbon reduction goal crossed 60%' },
]

export const studentNotifications = [
  { id: 1, title: 'Challenge completed', category: 'Challenge', priority: 'High', time: '5 min ago', read: false },
  { id: 2, title: 'New badge earned', category: 'Badge', priority: 'High', time: '1 hr ago', read: false },
  { id: 3, title: 'Sustainability score improved to 84', category: 'Score', priority: 'Medium', time: 'Today', read: true },
  { id: 4, title: 'New challenge available', category: 'Challenge', priority: 'Low', time: 'Yesterday', read: true },
  { id: 5, title: 'AI recommendation generated', category: 'AI', priority: 'Medium', time: 'Jun 22', read: false },
]

export const facultyOverviewMetrics = [
  { id: 'deptScore', label: 'Department Score', value: 82, unit: '/100', weeklyChange: 4, monthlyChange: 10, progress: 82, status: 'Strong', trend: 'up' },
  { id: 'deptCarbon', label: 'Carbon Emissions', value: 48.2, unit: 't CO2e', weeklyChange: -6, monthlyChange: -13, progress: 70, status: 'Reducing', trend: 'down' },
  { id: 'deptEnergy', label: 'Electricity', value: 1840, unit: 'kWh', weeklyChange: -3, monthlyChange: -8, progress: 66, status: 'Watch', trend: 'down' },
  { id: 'deptWater', label: 'Water Usage', value: 12800, unit: 'L', weeklyChange: 2, monthlyChange: -5, progress: 62, status: 'Stable', trend: 'mixed' },
  { id: 'deptWaste', label: 'Waste Generated', value: 246, unit: 'kg', weeklyChange: -9, monthlyChange: -16, progress: 78, status: 'Improving', trend: 'down' },
  { id: 'deptRecycle', label: 'Recycling Rate', value: 69, unit: '%', weeklyChange: 7, monthlyChange: 15, progress: 69, status: 'Rising', trend: 'up' },
  { id: 'sdg', label: 'SDG Progress', value: 74, unit: '%', weeklyChange: 3, monthlyChange: 9, progress: 74, status: 'Aligned', trend: 'up' },
]

export const facultyStudentAnalytics = [
  { label: 'Total Students', value: 312, unit: '', progress: 100 },
  { label: 'Active Students', value: 248, unit: '', progress: 79 },
  { label: 'Challenge Participation', value: 68, unit: '%', progress: 68 },
  { label: 'Average Score', value: 74, unit: '/100', progress: 74 },
  { label: 'Average Carbon Footprint', value: 24.5, unit: 'kg', progress: 64 },
  { label: 'Goal Completion Rate', value: 57, unit: '%', progress: 57 },
]

export const departmentComparison = [
  { department: 'Computer Science', carbon: 48, water: 128, electricity: 184, waste: 42, score: 82, recycling: 69 },
  { department: 'Mechanical', carbon: 66, water: 151, electricity: 230, waste: 58, score: 71, recycling: 55 },
  { department: 'Civil', carbon: 52, water: 142, electricity: 168, waste: 50, score: 77, recycling: 63 },
  { department: 'Electrical', carbon: 59, water: 136, electricity: 245, waste: 47, score: 73, recycling: 60 },
  { department: 'Electronics', carbon: 44, water: 119, electricity: 174, waste: 39, score: 85, recycling: 72 },
]

export const courseAnalytics = [
  { id: 1, course: 'AI for Sustainability', participation: 91, carbonReduction: 28, challenges: 86, score: 88, energy: 42, recycling: 74 },
  { id: 2, course: 'Green Computing', participation: 84, carbonReduction: 22, challenges: 79, score: 82, energy: 48, recycling: 69 },
  { id: 3, course: 'Environmental Systems', participation: 76, carbonReduction: 18, challenges: 71, score: 77, energy: 51, recycling: 62 },
  { id: 4, course: 'Smart Campus Lab', participation: 69, carbonReduction: 16, challenges: 64, score: 74, energy: 57, recycling: 58 },
  { id: 5, course: 'Data Visualization', participation: 72, carbonReduction: 14, challenges: 67, score: 75, energy: 49, recycling: 61 },
]

export const facultyInsights = [
  { id: 1, title: 'High Electricity Consumption', priority: 'High', cause: 'Lab systems remain active after scheduled sessions.', improvement: 'Add shutdown checklist and smart plugs.', trend: 'Could rise 8% next month without intervention.' },
  { id: 2, title: 'Low Recycling Rate', priority: 'Medium', cause: 'Dry waste bins are not visible near studio rooms.', improvement: 'Move sorting bins beside exits and add course reminders.', trend: 'Expected to improve 12% with bin relocation.' },
  { id: 3, title: 'Poor Challenge Participation', priority: 'Medium', cause: 'First-year cohorts have low challenge awareness.', improvement: 'Embed weekly challenges in course announcements.', trend: 'Participation may drop below 60% next cycle.' },
  { id: 4, title: 'Water Waste Alert', priority: 'High', cause: 'Irregular usage spike near workshop block.', improvement: 'Inspect fixtures and schedule peak-hour checks.', trend: 'Potential 9,000 L monthly excess if unresolved.' },
]

export const studentPerformance = [
  { name: 'Arjun Kumar', course: 'AI for Sustainability', score: 96, challenges: 12, badges: 9, carbonReduction: 31, goalProgress: 94 },
  { name: 'Priya Sharma', course: 'Green Computing', score: 93, challenges: 11, badges: 8, carbonReduction: 28, goalProgress: 91 },
  { name: 'Kiran Das', course: 'Environmental Systems', score: 91, challenges: 10, badges: 8, carbonReduction: 26, goalProgress: 87 },
  { name: 'Meera Nair', course: 'Smart Campus Lab', score: 88, challenges: 9, badges: 7, carbonReduction: 24, goalProgress: 82 },
  { name: 'Rahul Verma', course: 'Data Visualization', score: 76, challenges: 7, badges: 5, carbonReduction: 17, goalProgress: 64 },
  { name: 'Sneha Patel', course: 'Green Computing', score: 65, challenges: 5, badges: 4, carbonReduction: 12, goalProgress: 48 },
]

export const departmentTrends = [
  { period: 'Jan', carbon: 65, water: 151, electricity: 238, waste: 61, recycling: 52, sdg: 56 },
  { period: 'Feb', carbon: 61, water: 146, electricity: 224, waste: 57, recycling: 55, sdg: 60 },
  { period: 'Mar', carbon: 58, water: 141, electricity: 215, waste: 53, recycling: 59, sdg: 64 },
  { period: 'Apr', carbon: 54, water: 137, electricity: 202, waste: 49, recycling: 62, sdg: 68 },
  { period: 'May', carbon: 51, water: 132, electricity: 193, waste: 45, recycling: 66, sdg: 71 },
  { period: 'Jun', carbon: 48, water: 128, electricity: 184, waste: 42, recycling: 69, sdg: 74 },
]

export const facultyAlerts = [
  { id: 1, severity: 'High', title: 'Carbon exceeds weekly threshold', time: 'Today, 10:15', action: 'Review lab energy schedule', status: 'Open', department: 'Computer Science' },
  { id: 2, severity: 'Medium', title: 'Water usage increased', time: 'Today, 08:40', action: 'Inspect workshop fixtures', status: 'Investigating', department: 'Civil' },
  { id: 3, severity: 'High', title: 'Recycling drops below 60%', time: 'Yesterday', action: 'Run sorting awareness push', status: 'Open', department: 'Mechanical' },
  { id: 4, severity: 'Medium', title: 'Student participation declined', time: 'Jun 22', action: 'Assign course challenge prompts', status: 'Planned', department: 'Electrical' },
]

export const departmentLeaderboard = [
  { rank: 1, name: 'Electronics', score: 85, carbonReduction: 29, participation: 76, recycling: 72, sdg: 79, weekly: 1, monthly: 2 },
  { rank: 2, name: 'Computer Science', score: 82, carbonReduction: 27, participation: 68, recycling: 69, sdg: 74, weekly: 2, monthly: 1 },
  { rank: 3, name: 'Civil', score: 77, carbonReduction: 20, participation: 64, recycling: 63, sdg: 70, weekly: 3, monthly: 3 },
  { rank: 4, name: 'Electrical', score: 73, carbonReduction: 17, participation: 61, recycling: 60, sdg: 66, weekly: 4, monthly: 4 },
  { rank: 5, name: 'Mechanical', score: 71, carbonReduction: 15, participation: 58, recycling: 55, sdg: 63, weekly: 5, monthly: 5 },
]

export const getCarbonTotals = (logs) => {
  const withTotals = logs.map((entry) => ({
    ...entry,
    total: Number((entry.transportation + entry.electricity + entry.water + entry.food + entry.waste).toFixed(1)),
  }))
  const daily = withTotals.at(-1)?.total || 0
  const weekly = Number(withTotals.reduce((sum, entry) => sum + entry.total, 0).toFixed(1))
  const monthly = Number((weekly * 4.2).toFixed(1))
  const reduction = Number((monthly * 0.23).toFixed(1))

  return { daily, weekly, monthly, reduction, history: withTotals }
}

export const calculateSustainabilityScore = ({ carbonReduction = 0, recycling = 0, challengeProgress = 0, goalProgress = 0 }) => (
  Math.round((carbonReduction * 0.28) + (recycling * 0.26) + (challengeProgress * 0.24) + (goalProgress * 0.22))
)

export const calculateGoalProgress = (current, target) => Math.min(100, Math.round((current / target) * 100))

export const rankLeaderboard = (items) => (
  [...items].sort((a, b) => b.score - a.score || b.points - a.points).map((item, index) => ({ ...item, rank: index + 1 }))
)

export const generateNotifications = (events) => (
  events.map((event, index) => ({
    id: index + 1,
    title: event.title,
    category: event.category,
    priority: index < 2 ? 'High' : 'Medium',
    time: event.time,
    read: index > 1,
  }))
)

export const sustainabilityApi = {
  getStudentDashboard: () => Promise.resolve({
    overview: studentOverviewMetrics,
    carbon: getCarbonTotals(studentCarbonLogs),
    challenges: studentChallenges,
    badges: studentBadges,
    goals: studentGoals,
    analytics: studentAnalytics,
    recommendations: studentRecommendations,
    leaderboard: rankLeaderboard(studentLeaderboard),
    timeline: studentTimeline,
    notifications: studentNotifications,
  }),
  getFacultyDashboard: () => Promise.resolve({
    overview: facultyOverviewMetrics,
    studentAnalytics: facultyStudentAnalytics,
    departmentComparison,
    courses: courseAnalytics,
    insights: facultyInsights,
    students: studentPerformance,
    trends: departmentTrends,
    alerts: facultyAlerts,
    leaderboard: departmentLeaderboard,
  }),
}
