import { useEffect, useState } from 'react'
import { sustainabilityApi } from '../data/sustainabilityDashboardData'

export const useSustainabilityDashboard = (role) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    const loader = role === 'faculty'
      ? sustainabilityApi.getFacultyDashboard
      : sustainabilityApi.getStudentDashboard

    loader()
      .then((payload) => {
        if (active) setData(payload)
      })
      .catch(() => {
        if (active) setError('Unable to load sustainability dashboard data.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [role])

  return { data, loading, error }
}
