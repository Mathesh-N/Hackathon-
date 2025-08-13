"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SentimentChartProps {
  brandName?: string
}

export function SentimentChart({ brandName = "Default" }: SentimentChartProps) {
  // Generate dynamic chart data based on brand name
  const generateChartData = (brand: string) => {
    const seed = brand.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
    const random = (min: number, max: number, index: number) => {
      const value = (((seed + index) * 9301 + 49297) % 233280) / 233280
      return Math.floor(value * (max - min) + min)
    }

    return [
      { date: "Jan 1", positive: random(50, 70, 1), negative: random(15, 25, 1), neutral: random(10, 20, 1) },
      { date: "Jan 2", positive: random(55, 75, 2), negative: random(12, 22, 2), neutral: random(8, 18, 2) },
      { date: "Jan 3", positive: random(52, 72, 3), negative: random(14, 24, 3), neutral: random(9, 19, 3) },
      { date: "Jan 4", positive: random(58, 78, 4), negative: random(10, 20, 4), neutral: random(7, 17, 4) },
      { date: "Jan 5", positive: random(60, 80, 5), negative: random(8, 18, 5), neutral: random(6, 16, 5) },
      { date: "Jan 6", positive: random(62, 82, 6), negative: random(6, 16, 6), neutral: random(5, 15, 6) },
      { date: "Jan 7", positive: random(65, 85, 7), negative: random(5, 15, 7), neutral: random(4, 14, 7) },
    ]
  }

  const data = generateChartData(brandName)

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis dataKey="date" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="positive"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            name="Positive"
          />
          <Line
            type="monotone"
            dataKey="negative"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
            name="Negative"
          />
          <Line
            type="monotone"
            dataKey="neutral"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
            name="Neutral"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
