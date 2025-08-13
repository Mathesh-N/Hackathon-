// Simple authentication system for demo purposes
// In production, use a proper authentication service

interface User {
  id: string
  email: string
  fullName: string
  createdAt: Date
}

declare global {
  var __auth_users: Map<string, User> | undefined
  var __auth_sessions: Map<string, string> | undefined
}

// In-memory storage for demo (use database in production)
const authenticatedUsers = globalThis.__auth_users ?? new Map<string, User>()
const userSessions = globalThis.__auth_sessions ?? new Map<string, string>() // sessionId -> userId

if (typeof globalThis !== "undefined") {
  globalThis.__auth_users = authenticatedUsers
  globalThis.__auth_sessions = userSessions
}

export function createUserSession(user: User): string {
  const sessionId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
  userSessions.set(sessionId, user.id)
  authenticatedUsers.set(user.id, user)

  // Store in localStorage for client-side persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_session", sessionId)
    localStorage.setItem("auth_user", JSON.stringify(user))
  }

  return sessionId
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const storedUser = localStorage.getItem("auth_user")
  if (storedUser) {
    try {
      return JSON.parse(storedUser)
    } catch (e) {
      // If parsing fails, fall back to session lookup
    }
  }

  const sessionId = localStorage.getItem("auth_session")
  if (!sessionId) return null

  const userId = userSessions.get(sessionId)
  if (!userId) return null

  const user = authenticatedUsers.get(userId)
  if (user) {
    // Update localStorage with user data
    localStorage.setItem("auth_user", JSON.stringify(user))
  }

  return user || null
}

export function signOut(): void {
  if (typeof window === "undefined") return

  const sessionId = localStorage.getItem("auth_session")
  if (sessionId) {
    userSessions.delete(sessionId)
    localStorage.removeItem("auth_session")
    localStorage.removeItem("auth_user")
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function refreshSession(): void {
  const user = getCurrentUser()
  if (user) {
    createUserSession(user)
  }
}
