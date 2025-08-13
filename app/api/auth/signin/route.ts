import { type NextRequest, NextResponse } from "next/server"
import { userStorage } from "@/lib/storage"
import { createUserSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user in storage
    let foundUser = null
    console.log("Attempting signin for email:", email)
    console.log(
      "Current users in storage:",
      Array.from(userStorage.entries()).map(([id, user]) => ({ id, email: user.email })),
    )

    for (const [userId, userData] of userStorage.entries()) {
      console.log("Checking user:", userData.email, "Password match:", userData.password === password)
      if (userData.email === email && userData.password === password) {
        foundUser = { id: userId, ...userData }
        break
      }
    }

    if (!foundUser) {
      console.log("No user found with matching credentials")
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create session
    const sessionId = createUserSession({
      id: foundUser.id,
      email: foundUser.email,
      fullName: foundUser.fullName,
      createdAt: foundUser.createdAt,
    })

    console.log("User signed in successfully:", foundUser.email)

    return NextResponse.json({
      success: true,
      user: {
        id: foundUser.id,
        email: foundUser.email,
        fullName: foundUser.fullName,
      },
    })
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
