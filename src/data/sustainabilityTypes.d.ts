export type TrendDirection = 'up' | 'down' | 'mixed'
export type Priority = 'Low' | 'Medium' | 'High'

export interface SustainabilityMetric {
  id: string
  label: string
  value: number
  unit: string
  weeklyChange: number
  monthlyChange: number
  progress: number
  status: string
  trend: TrendDirection
}

export interface CarbonLog {
  day: string
  transportation: number
  electricity: number
  water: number
  food: number
  waste: number
}

export interface Challenge {
  id: number
  title: string
  difficulty: string
  category: string
  points: number
  progress: number
  dueDate: string
  status: string
}

export interface BadgeModel {
  id: number
  name: string
  icon: string
  description: string
  criteria: string
  date: string
  progress: number
  xp: number
}

export interface SustainabilityGoal {
  id: number
  name: string
  progress: number
  deadline: string
  status: string
  suggestion: string
}

export interface AIRecommendation {
  id: number
  title: string
  priority: Priority
  impact: string
  difficulty: string
  savings: string
  actions: string[]
}

export interface TimelineEvent {
  id: number
  title: string
  category: string
  time: string
  detail: string
}

export interface NotificationItem {
  id: number
  title: string
  category: string
  priority: Priority
  time: string
  read: boolean
}

export interface CourseAnalyticsRow {
  id: number
  course: string
  participation: number
  carbonReduction: number
  challenges: number
  score: number
  energy: number
  recycling: number
}

export interface DepartmentInsight {
  id: number
  title: string
  priority: Priority
  cause: string
  improvement: string
  trend: string
}
