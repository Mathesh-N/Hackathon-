import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Book, Video, Mail } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">Find answers to your questions and get the help you need</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input type="text" placeholder="Search for help articles..." className="pl-10 pr-4 py-3 text-lg" />
            </div>
          </div>

          {/* Quick Help Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Learn the basics of SentimentFlow</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• How to create your first project</li>
                  <li>• Setting up brand monitoring</li>
                  <li>• Understanding sentiment scores</li>
                  <li>• Reading your first report</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Features & Tools</CardTitle>
                <CardDescription>Master all SentimentFlow features</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Advanced sentiment analysis</li>
                  <li>• Custom alert settings</li>
                  <li>• Report generation</li>
                  <li>• Data export options</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Watch step-by-step guides</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Platform overview (5 min)</li>
                  <li>• Setting up monitoring (8 min)</li>
                  <li>• Creating reports (6 min)</li>
                  <li>• Advanced features (12 min)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How accurate is the sentiment analysis?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our AI-powered sentiment analysis achieves 94% accuracy across multiple languages and contexts. We
                    continuously train our models on the latest data to ensure the highest precision.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I monitor multiple brands at once?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! Professional and Enterprise plans allow monitoring multiple brands simultaneously. You can set
                    up separate dashboards and alerts for each brand.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How often is data updated?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Data is updated in real-time for Enterprise plans, every 15 minutes for Professional plans, and
                    hourly for Starter plans.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I export my data?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You can export your sentiment data, reports, and analytics in CSV, PDF, or JSON formats from your
                    dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-8">Our support team is here to help you succeed</p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 bg-transparent">
                <Mail className="h-5 w-5" />
                <span>Email Support</span>
              </Button>
              <Button className="flex items-center justify-center space-x-2 h-12">
                <MessageCircle className="h-5 w-5" />
                <span>Live Chat</span>
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-6">Average response time: 2 hours • Available 24/7</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
