export const mockPredictions = {
  electricity: {
    resourceName: 'Electricity Usage', unit: 'kWh', icon: '⚡',
    currentValue: 485, monthlyTrend: 'up', confidenceScore: 0.92,
    historical: [
      { month: 'Jan', actual: 450 }, { month: 'Feb', actual: 460 }, { month: 'Mar', actual: 440 },
      { month: 'Apr', actual: 420 }, { month: 'May', actual: 430 }, { month: 'Jun', actual: 455 },
      { month: 'Jul', actual: 480 }, { month: 'Aug', actual: 475 }, { month: 'Sep', actual: 465 },
      { month: 'Oct', actual: 470 }, { month: 'Nov', actual: 460 }, { month: 'Dec', actual: 485 },
    ],
    predictions: [
      { month: 'Jan+1', predicted: 490, confidence: 0.92 },
      { month: 'Jan+2', predicted: 495, confidence: 0.88 },
      { month: 'Jan+3', predicted: 500, confidence: 0.85 },
    ],
  },
  water: {
    resourceName: 'Water Consumption', unit: 'Liters', icon: '💧',
    currentValue: 12500, monthlyTrend: 'up', confidenceScore: 0.88,
    historical: [
      { month: 'Jan', actual: 10000 }, { month: 'Feb', actual: 10200 }, { month: 'Mar', actual: 10500 },
      { month: 'Apr', actual: 11000 }, { month: 'May', actual: 11200 }, { month: 'Jun', actual: 11500 },
      { month: 'Jul', actual: 12000 }, { month: 'Aug', actual: 12100 }, { month: 'Sep', actual: 12200 },
      { month: 'Oct', actual: 12400 }, { month: 'Nov', actual: 12300 }, { month: 'Dec', actual: 12500 },
    ],
    predictions: [
      { month: 'Jan+1', predicted: 12700, confidence: 0.88 },
      { month: 'Jan+2', predicted: 12800, confidence: 0.85 },
      { month: 'Jan+3', predicted: 13000, confidence: 0.82 },
    ],
  },
  foodWaste: {
    resourceName: 'Food Waste', unit: 'kg', icon: '🍎',
    currentValue: 245, monthlyTrend: 'down', confidenceScore: 0.85,
    historical: [
      { month: 'Jan', actual: 320 }, { month: 'Feb', actual: 310 }, { month: 'Mar', actual: 305 },
      { month: 'Apr', actual: 300 }, { month: 'May', actual: 295 }, { month: 'Jun', actual: 285 },
      { month: 'Jul', actual: 275 }, { month: 'Aug', actual: 270 }, { month: 'Sep', actual: 265 },
      { month: 'Oct', actual: 255 }, { month: 'Nov', actual: 250 }, { month: 'Dec', actual: 245 },
    ],
    predictions: [
      { month: 'Jan+1', predicted: 240, confidence: 0.85 },
      { month: 'Jan+2', predicted: 235, confidence: 0.82 },
      { month: 'Jan+3', predicted: 230, confidence: 0.80 },
    ],
  },
  sustainability: {
    resourceName: 'Sustainability Score', unit: '/100', icon: '🌿',
    currentValue: 78, monthlyTrend: 'up', confidenceScore: 0.91,
    historical: [
      { month: 'Jan', actual: 65 }, { month: 'Feb', actual: 67 }, { month: 'Mar', actual: 68 },
      { month: 'Apr', actual: 70 }, { month: 'May', actual: 71 }, { month: 'Jun', actual: 72 },
      { month: 'Jul', actual: 74 }, { month: 'Aug', actual: 75 }, { month: 'Sep', actual: 76 },
      { month: 'Oct', actual: 77 }, { month: 'Nov', actual: 77.5 }, { month: 'Dec', actual: 78 },
    ],
    predictions: [
      { month: 'Jan+1', predicted: 79, confidence: 0.91 },
      { month: 'Jan+2', predicted: 80, confidence: 0.88 },
      { month: 'Jan+3', predicted: 81, confidence: 0.85 },
    ],
  },
}

export const mockPatterns = [
  {
    id: 1, title: 'Water usage increased 12%', category: 'water', severity: 'high',
    icon: '💧', description: 'Significant increase detected in water consumption over the past week.',
    dataPoints: [
      { day: 'Mon', value: 1200 }, { day: 'Tue', value: 1250 }, { day: 'Wed', value: 1300 },
      { day: 'Thu', value: 1350 }, { day: 'Fri', value: 1400 }, { day: 'Sat', value: 1450 }, { day: 'Sun', value: 1500 },
    ],
    actionable: true, suggestedAction: 'Check for leaks in bathroom and kitchen facilities',
  },
  {
    id: 2, title: 'High electricity in Building A', category: 'electricity', severity: 'medium',
    icon: '⚡', description: 'Power usage in Building A exceeds typical baseline, especially midday.',
    dataPoints: [
      { day: '00:00', value: 450 }, { day: '04:00', value: 420 }, { day: '08:00', value: 480 },
      { day: '12:00', value: 520 }, { day: '16:00', value: 510 }, { day: '20:00', value: 490 }, { day: '23:00', value: 460 },
    ],
    actionable: true, suggestedAction: 'Review HVAC settings and check for unnecessary lighting',
  },
  {
    id: 3, title: 'Food waste trend improving', category: 'food_waste', severity: 'low',
    icon: '🍎', description: 'Food waste reduced by 8% compared to last month — positive progress!',
    dataPoints: [
      { day: 'Week 1', value: 320 }, { day: 'Week 2', value: 305 }, { day: 'Week 3', value: 290 }, { day: 'Week 4', value: 275 },
    ],
    actionable: false, suggestedAction: 'Continue current waste reduction initiatives',
  },
  {
    id: 4, title: 'Paper overconsumption in offices', category: 'paper', severity: 'medium',
    icon: '📄', description: 'Paper usage in administrative areas above sustainable levels.',
    dataPoints: [
      { day: 'Mon', value: 85 }, { day: 'Tue', value: 90 }, { day: 'Wed', value: 95 },
      { day: 'Thu', value: 92 }, { day: 'Fri', value: 88 }, { day: 'Sat', value: 10 }, { day: 'Sun', value: 5 },
    ],
    actionable: true, suggestedAction: 'Promote digital workflows and double-sided printing',
  },
  {
    id: 5, title: 'Carbon emissions in normal range', category: 'carbon', severity: 'low',
    icon: '🌍', description: 'Campus carbon footprint is within sustainable targets.',
    dataPoints: [
      { day: 'Jan', value: 450 }, { day: 'Feb', value: 448 }, { day: 'Mar', value: 445 },
      { day: 'Apr', value: 442 }, { day: 'May', value: 440 },
    ],
    actionable: false, suggestedAction: 'Maintain current sustainability practices',
  },
  {
    id: 6, title: 'HVAC peak hours identified', category: 'electricity', severity: 'medium',
    icon: '❄️', description: 'HVAC system runs consistently high during 10 AM – 3 PM.',
    dataPoints: [
      { day: '06:00', value: 250 }, { day: '10:00', value: 380 }, { day: '14:00', value: 420 },
      { day: '18:00', value: 380 }, { day: '22:00', value: 280 },
    ],
    actionable: true, suggestedAction: 'Optimize HVAC scheduling or add smart temperature controls',
  },
]

export const mockRecommendations = [
  {
    id: 1, action: 'Reduce cafeteria food prep by 10%', category: 'food_waste', icon: '🍎',
    expectedImpact: '12 tons/month', impactPercentage: 12, sdg: 'SDG 12 – Responsible Consumption',
    badgeVariant: 'amber', difficulty: 'Medium', timeToImplement: '2-3 weeks', priority: 'high',
    description: 'Adjust portion sizes and improve meal planning based on actual consumption patterns.',
    benefits: ['Reduce food waste significantly', 'Lower disposal costs', 'Improve sustainability score'],
  },
  {
    id: 2, action: 'Install water-saving devices', category: 'water', icon: '💧',
    expectedImpact: '8,500 liters/month', impactPercentage: 20, sdg: 'SDG 6 – Clean Water',
    badgeVariant: 'sky', difficulty: 'High', timeToImplement: '4-6 weeks', priority: 'high',
    description: 'Install low-flow faucets, sensor-based taps, and water-efficient toilets.',
    benefits: ['Reduce water consumption by up to 20%', 'Lower water bills', 'Environmental conservation'],
  },
  {
    id: 3, action: 'Replace lighting with LED', category: 'electricity', icon: '⚡',
    expectedImpact: '35 kWh/month', impactPercentage: 15, sdg: 'SDG 7 – Affordable Clean Energy',
    badgeVariant: 'red', difficulty: 'Medium', timeToImplement: '3-4 weeks', priority: 'high',
    description: 'Upgrade all incandescent and fluorescent bulbs to energy-efficient LED.',
    benefits: ['Reduce electricity by 15%', 'Lower energy costs', 'Improved lighting quality'],
  },
  {
    id: 4, action: 'Promote digital assignments', category: 'paper', icon: '📄',
    expectedImpact: '2 tons/month', impactPercentage: 25, sdg: 'SDG 13 – Climate Action',
    badgeVariant: 'green', difficulty: 'Low', timeToImplement: '1-2 weeks', priority: 'medium',
    description: 'Encourage use of learning management systems and digital submissions.',
    benefits: ['Reduce paper consumption', 'Lower procurement costs', 'Enhanced digital literacy'],
  },
  {
    id: 5, action: 'Implement composting program', category: 'food_waste', icon: '♻️',
    expectedImpact: '8 tons/month', impactPercentage: 18, sdg: 'SDG 12 – Responsible Consumption',
    badgeVariant: 'amber', difficulty: 'Medium', timeToImplement: '3-4 weeks', priority: 'medium',
    description: 'Set up composting stations in dining and food preparation areas.',
    benefits: ['Convert waste to compost', 'Reduce landfill impact', 'Educational opportunity'],
  },
  {
    id: 6, action: 'Install smart building management', category: 'electricity', icon: '🏢',
    expectedImpact: '45 kWh/month', impactPercentage: 22, sdg: 'SDG 7 – Affordable Clean Energy',
    badgeVariant: 'red', difficulty: 'High', timeToImplement: '6-8 weeks', priority: 'high',
    description: 'Deploy IoT sensors and automation for optimized HVAC and lighting control.',
    benefits: ['Reduce energy by up to 22%', 'Real-time energy monitoring', 'Automated optimization'],
  },
  {
    id: 7, action: 'Campus carpool & bike-sharing', category: 'transportation', icon: '🚴',
    expectedImpact: '2.5 tons CO₂/month', impactPercentage: 30, sdg: 'SDG 13 – Climate Action',
    badgeVariant: 'green', difficulty: 'Medium', timeToImplement: '4-6 weeks', priority: 'medium',
    description: 'Launch incentives for carpooling and provide bike-sharing infrastructure.',
    benefits: ['Reduce carbon footprint', 'Improve wellness', 'Foster community engagement'],
  },
  {
    id: 8, action: 'Conduct energy efficiency audit', category: 'electricity', icon: '🔍',
    expectedImpact: '50-80 kWh/month', impactPercentage: 25, sdg: 'SDG 7 – Affordable Clean Energy',
    badgeVariant: 'red', difficulty: 'Low', timeToImplement: '1-2 weeks', priority: 'high',
    description: 'Comprehensive assessment of energy usage across all campus buildings.',
    benefits: ['Identify hidden inefficiencies', 'Inform future strategies', 'Quick wins for reduction'],
  },
]

export const mockAgents = [
  {
    id: 1, name: 'MonitorBot', role: 'Resource Monitoring Agent', icon: '👁️',
    status: 'online', color: '#e0f7ee',
    metrics: [{ label: 'Sensors', value: '180' }, { label: 'Uptime', value: '99.8%' }],
    tasks: ['Polling IoT sensors every 30s', 'Detecting anomalies in real-time', 'Streaming to analytics pipeline'],
  },
  {
    id: 2, name: 'AnalyzeAI', role: 'Pattern Analysis Agent', icon: '🔬',
    status: 'online', color: '#dff7f4',
    metrics: [{ label: 'Patterns', value: '6' }, { label: 'Accuracy', value: '94%' }],
    tasks: ['Running time-series analysis', 'Correlating multi-stream data', 'Flagging behavioral anomalies'],
  },
  {
    id: 3, name: 'RecoBot', role: 'Recommendation Agent', icon: '💡',
    status: 'busy', color: '#fef3d8',
    metrics: [{ label: 'Pending', value: '8' }, { label: 'Accepted', value: '73%' }],
    tasks: ['Generating SDG-aligned actions', 'Ranking by impact/feasibility', 'Personalizing per context'],
  },
  {
    id: 4, name: 'ReportGen', role: 'Reporting Agent', icon: '📊',
    status: 'online', color: '#daf0fb',
    metrics: [{ label: 'Reports', value: '12' }, { label: 'Scheduled', value: '4' }],
    tasks: ['Compiling monthly summaries', 'Generating PDF dashboards', 'Sending stakeholder alerts'],
  },
  {
    id: 5, name: 'AlertBot', role: 'Alert & Notification Agent', icon: '🔔',
    status: 'online', color: '#fde8e8',
    metrics: [{ label: 'Alerts', value: '3' }, { label: 'Response', value: '< 2s' }],
    tasks: ['Threshold breach detection', 'Multi-channel notifications', 'Escalation management'],
  },
]
