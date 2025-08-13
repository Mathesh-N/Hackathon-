"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface SentimentPieChartProps {
  positivePercent?: number
  neutralPercent?: number
  negativePercent?: number
}

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

export function SentimentPieChart({
  positivePercent = 68,
  neutralPercent = 22,
  negativePercent = 10,
}: SentimentPieChartProps) {
  const data = [
    { name: "Positive", value: positivePercent, color: "#10b981" },
    { name: "Neutral", value: neutralPercent, color: "#f59e0b" },
    { name: "Negative", value: negativePercent, color: "#ef4444" },
  ]

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
