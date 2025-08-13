"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Eye, EyeOff, ArrowLeft, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { createUserSession } from "@/lib/auth"

export default function SignUpPage() {
  const [step, setStep] = useState<"form" | "otp">("form")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [canResend, setCanResend] = useState(true)
  const [resendTimer, setResendTimer] = useState(0)
  const router = useRouter()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, fullName: formData.fullName }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send verification code")
      }

      setSuccess(data.message)
      setStep("otp")
      startResendTimer()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send verification code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp,
          userData: formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid verification code")
      }

      createUserSession(data.user)

      // Account created successfully - redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invalid verification code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (!canResend) return

    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, fullName: formData.fullName }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend verification code")
      }

      setSuccess("Verification code resent successfully!")
      startResendTimer()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to resend verification code")
    } finally {
      setIsLoading(false)
    }
  }

  const startResendTimer = () => {
    setCanResend(false)
    setResendTimer(60)
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const goBackToForm = () => {
    setStep("form")
    setOtp("")
    setError("")
    setSuccess("")
  }

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a 6-digit verification code to
              <br />
              <span className="font-medium text-gray-900">{formData.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  required
                />
              </div>

              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
              {success && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">{success}</div>}

              <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
                {isLoading ? "Verifying..." : "Verify & Create Account"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Didn't receive the code?</p>
                <Button
                  variant="link"
                  onClick={handleResendOtp}
                  disabled={!canResend || isLoading}
                  className="p-0 h-auto text-blue-600"
                >
                  {canResend ? "Resend Code" : `Resend in ${resendTimer}s`}
                </Button>
              </div>

              <div className="text-center">
                <Button variant="ghost" onClick={goBackToForm} className="text-gray-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign Up
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">SentimentFlow</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Start monitoring your brand sentiment today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
            {success && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">{success}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending Code..." : "Continue"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-600 hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
