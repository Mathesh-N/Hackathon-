// Global storage that persists across API calls in the same Node.js process
declare global {
  var __otpStorage: Map<string, { otp: string; expires: number }> | undefined
  var __userStorage:
    | Map<string, { id: string; email: string; fullName: string; password: string; createdAt: Date }>
    | undefined
}

// Initialize global storage if it doesn't exist
if (!globalThis.__otpStorage) {
  globalThis.__otpStorage = new Map()
}

if (!globalThis.__userStorage) {
  globalThis.__userStorage = new Map()
}

export const otpStorage = globalThis.__otpStorage
export const userStorage = globalThis.__userStorage

// Clean up expired OTPs
export function cleanupExpiredOtps() {
  const now = Date.now()
  for (const [email, data] of otpStorage.entries()) {
    if (now > data.expires) {
      otpStorage.delete(email)
      console.log(`🧹 Cleaned up expired OTP for ${email}`)
    }
  }
}

// Clean up expired OTPs every minute
setInterval(() => {
  cleanupExpiredOtps()
}, 60000)
