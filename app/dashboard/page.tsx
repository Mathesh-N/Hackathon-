"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  AlertTriangle,
  FileText,
  Settings,
  Search,
  Twitter,
  Facebook,
  Instagram,
  MessageSquare,
  Star,
  Circle,
  Plus,
} from "lucide-react"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { SentimentChart } from "@/components/sentiment-chart"
import { SentimentPieChart } from "@/components/sentiment-pie-chart"
import { ReportModal } from "@/components/report-modal"
import { AlertModal } from "@/components/alert-modal"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [brandName, setBrandName] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [currentBrand, setCurrentBrand] = useState("")
  const [showReportModal, setShowReportModal] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [realtimeData, setRealtimeData] = useState<any>(null)
  const [showNewBrandSearch, setShowNewBrandSearch] = useState(false)
  const [newBrandName, setNewBrandName] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let authAttempts = 0
        const maxAttempts = 3

        const verifyAuth = () => {
          const authenticated = isAuthenticated()
          const currentUser = getCurrentUser()

          console.log("Auth check attempt:", authAttempts + 1, "Authenticated:", authenticated, "User:", currentUser)

          if (authenticated && currentUser) {
            setUser(currentUser)
            setIsLoading(false)
            return true
          }

          return false
        }

        // Try immediate verification
        if (verifyAuth()) return

        // If immediate verification fails, retry with small delays
        while (authAttempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          authAttempts++

          if (verifyAuth()) return
        }

        // If all attempts fail, redirect to signup
        console.log("Authentication failed after", maxAttempts, "attempts, redirecting to signup")
        router.push("/signup")
      } catch (error) {
        console.error("Authentication error:", error)
        router.push("/signup")
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (!hasData || !currentBrand) return

    const updateData = () => {
      setRealtimeData(generateRealtimeBrandData(currentBrand))
      setLastUpdate(new Date())
    }

    // Initial data load
    updateData()

    // Update every 30 seconds
    const interval = setInterval(updateData, 30000)

    return () => clearInterval(interval)
  }, [hasData, currentBrand])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  const handleStartTrial = () => {
    if (!brandName.trim()) return

    setIsScanning(true)
    setCurrentBrand(brandName)

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setHasData(true)
    }, 3000)
  }

  const handleNewBrandSearch = () => {
    if (!newBrandName.trim()) return

    // Redirect to pricing page for additional brand monitoring
    router.push("/pricing")
  }

  const generateRealtimeMentions = (brand: string) => {
    const now = new Date()
    const platforms = ["twitter", "facebook", "instagram", "review"]
    const sentiments = ["positive", "negative", "neutral"]

    const mentionTemplates = {
      positive: [
        `Just tried ${brand}'s new product and I'm impressed! Great quality and customer service.`,
        `${brand} has really improved their delivery times. Got my order in just 2 days!`,
        `Love ${brand}! Been using their products for years and never disappointed.`,
        `Excellent experience with ${brand} today. Highly recommend!`,
        `${brand}'s customer support is amazing. They solved my issue in minutes.`,
      ],
      negative: [
        `Had some issues with ${brand}'s customer support. Took too long to resolve my problem.`,
        `${brand}'s latest update is buggy. Hope they fix it soon.`,
        `Disappointed with ${brand}'s service quality lately.`,
        `${brand} needs to improve their shipping process. Very slow.`,
        `Not happy with my recent ${brand} purchase. Quality has declined.`,
      ],
      neutral: [
        `Mixed feelings about ${brand}. Product is good but pricing could be better.`,
        `${brand} is okay, nothing special but gets the job done.`,
        `Trying out ${brand} for the first time. So far so good.`,
        `${brand} has some good features but room for improvement.`,
        `Decent experience with ${brand}. Could be better, could be worse.`,
      ],
    }

    const authors = [
      "@techreviewer",
      "@happycustomer",
      "@lifestyle_blogger",
      "Sarah Johnson",
      "Mike Chen",
      "@digitalexpert",
      "Emma Wilson",
      "@productguru",
      "James Smith",
      "@trendsetter",
    ]

    return Array.from({ length: 5 }, (_, i) => {
      const minutesAgo = Math.floor(Math.random() * 180) + 1
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
      const platform = platforms[Math.floor(Math.random() * platforms.length)]
      const author = authors[Math.floor(Math.random() * authors.length)]
      const content = mentionTemplates[sentiment][Math.floor(Math.random() * mentionTemplates[sentiment].length)]

      return {
        id: i + 1,
        platform,
        author,
        content,
        sentiment,
        time:
          minutesAgo === 1
            ? "1 minute ago"
            : minutesAgo < 60
              ? `${minutesAgo} minutes ago`
              : `${Math.floor(minutesAgo / 60)} hours ago`,
      }
    })
  }

  const generateRealtimeAlerts = (brand: string) => {
    const now = new Date()
    const alertTypes = [
      {
        type: "spike",
        message: `Negative sentiment spike detected for ${brand}`,
        severity: "high",
      },
      {
        type: "trending",
        message: `${brand} is trending on Twitter`,
        severity: "medium",
      },
      {
        type: "keyword",
        message: `New keyword "customer service" gaining traction`,
        severity: "low",
      },
      {
        type: "volume",
        message: `Mention volume increased by 45% in the last hour`,
        severity: "medium",
      },
      {
        type: "competitor",
        message: `Competitor comparison mentions detected`,
        severity: "low",
      },
    ]

    return alertTypes.slice(0, 3).map((alert, i) => ({
      id: i + 1,
      ...alert,
      time: `${Math.floor(Math.random() * 4) + 1} hours ago`,
    }))
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4 text-blue-500" />
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "review":
        return <Star className="h-4 w-4 text-yellow-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50"
      case "negative":
        return "text-red-600 bg-red-50"
      case "neutral":
        return "text-yellow-600 bg-yellow-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const generateRealtimeBrandData = (brand: string) => {
    const seed = brand.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
    const timeVariation = Math.floor(Date.now() / 30000) // Changes every 30 seconds
    const random = (min: number, max: number) => {
      const value = (((seed + timeVariation) * 9301 + 49297) % 233280) / 233280
      return Math.floor(value * (max - min) + min)
    }

    return {
      totalMentions: random(800, 2500),
      reach: `${(random(45, 150) / 10).toFixed(1)}K`,
      sentimentScore: random(60, 85),
      alerts: random(1, 5),
      positivePercent: random(55, 75),
      neutralPercent: random(15, 25),
      negativePercent: random(5, 20),
      weeklyGrowth: random(-5, 25),
      dailyGrowth: random(-10, 15),
      mentions: generateRealtimeMentions(brand),
      alerts: generateRealtimeAlerts(brand),
    }
  }

  const brandData = realtimeData

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />

        <div className="pt-20 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Start Your Free Trial</h1>
              <p className="text-lg text-gray-600">
                Enter your brand name to begin monitoring sentiment across all platforms
              </p>
            </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Brand Search</CardTitle>
                <CardDescription>We'll scan social media, reviews, and forums for mentions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter brand name (e.g., Samsung, Nike)"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={handleStartTrial} className="w-full" disabled={!brandName.trim() || isScanning}>
                    {isScanning ? "Scanning..." : "Start Monitoring"}
                  </Button>
                </div>

                {isScanning && (
                  <div className="mt-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-sm text-gray-600">Scanning social media and review platforms...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentBrand} Dashboard</h1>
                <p className="text-gray-600">Real-time sentiment monitoring and analytics</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />
                  <span>Live</span>
                  <span>•</span>
                  <span>Updated {lastUpdate.toLocaleTimeString()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewBrandSearch(!showNewBrandSearch)}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Brand</span>
                </Button>
              </div>
            </div>

            {/* Collapsible search form for new brand */}
            {showNewBrandSearch && (
              <Card className="mt-4 max-w-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Monitor Another Brand</CardTitle>
                  <CardDescription>Upgrade to monitor multiple brands simultaneously</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Enter another brand name"
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleNewBrandSearch} className="flex-1" disabled={!newBrandName.trim()}>
                        View Pricing Plans
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewBrandSearch(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Overall Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-2xl font-bold text-green-600">
                    {brandData?.sentimentScore >= 70
                      ? "Positive"
                      : brandData?.sentimentScore >= 50
                        ? "Neutral"
                        : "Negative"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {brandData?.weeklyGrowth >= 0 ? "+" : ""}
                  {brandData?.weeklyGrowth}% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Mentions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{brandData?.totalMentions.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {brandData?.dailyGrowth >= 0 ? "+" : ""}
                  {brandData?.dailyGrowth}% from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{brandData?.reach}</div>
                <p className="text-xs text-gray-500 mt-1">Potential impressions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-2xl font-bold text-orange-600">{brandData?.alerts?.length || 0}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Trend</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <SentimentChart brandName={currentBrand} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
                <CardDescription>Current breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <SentimentPieChart
                  positivePercent={brandData?.positivePercent}
                  neutralPercent={brandData?.neutralPercent}
                  negativePercent={brandData?.negativePercent}
                />
              </CardContent>
            </Card>
          </div>

          {/* Content Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Mentions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Mentions</CardTitle>
                <CardDescription>Latest brand mentions across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {brandData?.mentions?.map((mention) => (
                    <div key={mention.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(mention.platform)}
                          <span className="font-medium text-sm">{mention.author}</span>
                          <Badge variant="secondary" className={`text-xs ${getSentimentColor(mention.sentiment)}`}>
                            {mention.sentiment}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">{mention.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{mention.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alerts & Actions */}
            <div className="space-y-6">
              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Important sentiment changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {brandData?.alerts?.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <AlertTriangle
                          className={`h-4 w-4 mt-0.5 ${
                            alert.severity === "high"
                              ? "text-red-500"
                              : alert.severity === "medium"
                                ? "text-orange-500"
                                : "text-yellow-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setShowReportModal(true)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setShowAlertModal(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Set Alert Threshold
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ReportModal isOpen={showReportModal} onClose={() => setShowReportModal(false)} brandName={currentBrand} />
      <AlertModal isOpen={showAlertModal} onClose={() => setShowAlertModal(false)} />
    </div>
  )
}
