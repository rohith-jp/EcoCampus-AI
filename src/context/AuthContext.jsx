import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'ecocampus_auth_user'
const USERS_KEY = 'ecocampus_users'

// Seed demo accounts on first load
const seedDemoUsers = () => {
  const existing = localStorage.getItem(USERS_KEY)
  if (!existing) {
    const demoUsers = [
      { id: '1', fullName: 'Admin User', email: 'admin@ecocampus.edu', password: 'admin123', role: 'admin' },
      { id: '2', fullName: 'Dr. Faculty', email: 'faculty@ecocampus.edu', password: 'faculty123', role: 'faculty' },
      { id: '3', fullName: 'Student User', email: 'student@ecocampus.edu', password: 'student123', role: 'student' },
    ]
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers))
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    seedDemoUsers()
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setLoading(false)
  }, [])

  const login = (email, password, remember = false) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Invalid email or password.' }
    const { password: _p, ...safeUser } = found
    setUser(safeUser)
    if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    else sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    return { success: true, user: safeUser }
  }

  const register = ({ fullName, email, password, role }) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    if (users.find(u => u.email === email)) return { success: false, error: 'Email already registered.' }
    const newUser = { id: Date.now().toString(), fullName, email, password, role }
    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  const getCurrentUser = () => user

  // Also check sessionStorage on init
  useEffect(() => {
    if (!user) {
      const sess = sessionStorage.getItem(STORAGE_KEY)
      if (sess) {
        try { setUser(JSON.parse(sess)) } catch {}
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
