import { type NextRequest, NextResponse } from "next/server"
import { otpStorage, userStorage } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const { email, fullName } = await request.json()

    if (!email || !fullName) {
      return NextResponse.json({ error: "Email and full name are required" }, { status: 400 })
    }

    if (userStorage.has(email)) {
      return NextResponse.json(
        {
          error: "An account with this email already exists. Please sign in instead.",
        },
        { status: 400 },
      )
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    otpStorage.set(email, {
      otp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
    })

    console.log(`🔐 OTP stored for ${email}: ${otp}`)
    console.log(`📊 OTP Storage size: ${otpStorage.size}`)
    console.log(`🗂️ All stored emails:`, Array.from(otpStorage.keys()))

    // Check if email service is configured
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      try {
        // Use Resend to send email
        const { Resend } = await import("resend")
        const resend = new Resend(resendApiKey)

        await resend.emails.send({
          from: "SentimentFlow <noreply@yourdomain.com>", // Replace with your domain
          to: [email],
          subject: "Your SentimentFlow Verification Code",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">SentimentFlow</h1>
              </div>
              <div style="padding: 40px 20px; background: #f8fafc;">
                <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${fullName}!</h2>
                <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                  Welcome to SentimentFlow! Please use the verification code below to complete your account setup:
                </p>
                <div style="background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 30px; margin: 30px 0; text-align: center;">
                  <div style="font-size: 36px; font-weight: bold; color: #3b82f6; letter-spacing: 8px;">${otp}</div>
                </div>
                <p style="color: #64748b; font-size: 14px;">
                  This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
                </p>
              </div>
              <div style="background: #1e293b; padding: 20px; text-align: center;">
                <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                  © 2024 SentimentFlow. All rights reserved.
                </p>
              </div>
            </div>
          `,
        })

        return NextResponse.json({
          message: "Verification code sent to your email successfully!",
        })
      } catch (emailError) {
        console.error("Email sending failed:", emailError)
        // Fall back to development mode if email fails
        return NextResponse.json({
          message: `Development Mode: Your verification code is ${otp}. Please check the console for details.`,
          developmentOtp: otp,
        })
      }
    } else {
      // Development mode - show OTP in response
      console.log(`📧 Development Mode - OTP for ${email}: ${otp}`)
      return NextResponse.json({
        message: `Development Mode: Your verification code is ${otp}. In production, this would be sent to your email.`,
        developmentOtp: otp,
      })
    }
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 })
  }
}
