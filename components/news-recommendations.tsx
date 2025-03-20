"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, FileText, AlertTriangle, Users, Clock } from "lucide-react"

// Mock recommended news data
const recommendedNews = [
  {
    id: 1,
    title: "New Tax-Loss Harvesting Opportunities in Current Market",
    category: "strategy",
    relevance: "High relevance for 15 clients",
    time: "1 hour ago",
    icon: <FileText className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 2,
    title: "Healthcare Sector Poised for Growth Amid Policy Changes",
    category: "sector",
    relevance: "Matches 8 client portfolios",
    time: "3 hours ago",
    icon: <TrendingUp className="h-4 w-4 text-emerald-500" />,
  },
  {
    id: 3,
    title: "Estate Planning Considerations for 2025 Tax Changes",
    category: "planning",
    relevance: "Critical for 12 high-net-worth clients",
    time: "5 hours ago",
    icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  },
  {
    id: 4,
    title: "Retirement Account Contribution Limits to Increase Next Year",
    category: "retirement",
    relevance: "Relevant for 90% of clients",
    time: "Yesterday",
    icon: <Users className="h-4 w-4 text-purple-500" />,
  },
]

export function NewsRecommendations() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {recommendedNews.map((news) => (
            <div
              key={news.id}
              className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="mt-0.5 rounded-full p-1.5 bg-primary/10">{news.icon}</div>
              <div className="space-y-2 flex-1">
                <h4 className="font-medium text-sm">{news.title}</h4>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px]">
                    {news.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground mr-5">
                    <Clock className="h-3 w-3 mr-1" />
                    {news.time}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{news.relevance}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

