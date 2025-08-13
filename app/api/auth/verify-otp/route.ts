import { type NextRequest, NextResponse } from "next/server"
import { otpStorage, userStorage } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const { email, otp, userData } = await request.json()

    if (!email || !otp || !userData) {
      return NextResponse.json({ error: "Email, OTP, and user data are required" }, { status: 400 })
    }

    console.log(`🔍 Verifying OTP for ${email}: ${otp}`)
    console.log(`📊 OTP Storage size: ${otpStorage.size}`)
    console.log(`🗂️ All stored emails:`, Array.from(otpStorage.keys()))

    const storedOtpData = otpStorage.get(email)
    console.log(`📋 Stored OTP data:`, storedOtpData)

    if (!storedOtpData) {
      return NextResponse.json({ error: "No verification code found. Please request a new one." }, { status: 400 })
    }

    if (Date.now() > storedOtpData.expires) {
      otpStorage.delete(email)
      return NextResponse.json({ error: "Verification code has expired. Please request a new one." }, { status: 400 })
    }

    if (storedOtpData.otp !== otp) {
      console.log(`❌ OTP mismatch: expected ${storedOtpData.otp}, got ${otp}`)
      return NextResponse.json({ error: "Invalid verification code. Please try again." }, { status: 400 })
    }

    if (userStorage.has(email)) {
      otpStorage.delete(email)
      return NextResponse.json(
        {
          error: "An account with this email already exists. Please sign in instead.",
        },
        { status: 400 },
      )
    }

    // OTP is valid - clean up and create account
    otpStorage.delete(email)

    const user = {
      id: Math.random().toString(36).substring(2, 15),
      email: userData.email,
      fullName: userData.fullName,
      password: userData.password, // In production, hash this password
      createdAt: new Date(),
    }

    userStorage.set(email, user)

    console.log("✅ Account created successfully for:", userData.email)
    console.log("👥 Total users:", userStorage.size)

    return NextResponse.json({
      message: "Account created successfully!",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 })
  }
}
