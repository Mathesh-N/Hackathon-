import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "₹199", // Changed from $199 to ₹199 for Indian Rupees
      period: "/month",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 1,000 mentions/month",
        "3 brand keywords",
        "Basic sentiment analysis",
        "Email alerts",
        "7-day data retention",
        "Standard support",
      ],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      price: "₹599", // Changed from $599 to ₹599 for Indian Rupees
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 10,000 mentions/month",
        "10 brand keywords",
        "Advanced sentiment analysis",
        "Real-time alerts",
        "30-day data retention",
        "Priority support",
        "Custom reports",
        "API access",
      ],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "₹999", // Changed from $999 to ₹999 for Indian Rupees
      period: "/month",
      description: "For large organizations",
      features: [
        "Unlimited mentions",
        "Unlimited keywords",
        "AI-powered insights",
        "Custom alert rules",
        "1-year data retention",
        "24/7 dedicated support",
        "White-label reports",
        "Full API access",
        "Custom integrations",
        "Team collaboration",
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Simple, Transparent
            <span className="text-blue-600 block">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your brand monitoring needs. All plans include a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-blue-500 shadow-xl scale-105" : "border-gray-200 shadow-lg"}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a setup fee?</h3>
              <p className="text-gray-600">No setup fees. You only pay the monthly or annual subscription fee.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. No long-term contracts required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Monitoring?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of brands using SentimentFlow to protect and enhance their reputation.
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold" asChild>
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
