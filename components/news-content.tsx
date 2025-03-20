"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  BarChart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileText,
  Globe,
  DollarSign,
  Building,
  Share2,
  BookOpen,
  Clock,
} from "lucide-react"

// Mock news data
const newsData = [
  {
    id: 1,
    title: "Federal Reserve Signals Potential Rate Cut in September",
    summary:
      "The Federal Reserve has indicated a potential 25 basis point rate cut in September, citing improving inflation data and concerns about labor market cooling.",
    source: "Financial Times",
    date: "2 hours ago",
    category: "economic",
    tags: ["interest rates", "federal reserve", "monetary policy"],
    impact: "high",
    relevance: true,
    actionable: true,
    image: "/placeholder.svg?height=100&width=200",
    icon: <TrendingDown className="h-5 w-5 text-emerald-500" />,
    relatedAssets: ["Bonds", "REITs", "Dividend Stocks"],
    clientsAffected: 85,
  },
  {
    id: 2,
    title: "SEC Approves New ESG Disclosure Requirements",
    summary:
      "The Securities and Exchange Commission has approved new rules requiring public companies to disclose climate-related risks and greenhouse gas emissions.",
    source: "Wall Street Journal",
    date: "5 hours ago",
    category: "regulatory",
    tags: ["SEC", "ESG", "regulations", "climate disclosure"],
    impact: "medium",
    relevance: true,
    actionable: true,
    image: "/placeholder.svg?height=100&width=200",
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    relatedAssets: ["ESG Funds", "Energy Sector", "Utilities"],
    clientsAffected: 62,
  },
  {
    id: 3,
    title: "Tech Sector Leads Market Rally as AI Optimism Continues",
    summary:
      "Technology stocks led a broad market rally on Wednesday as investors remain optimistic about artificial intelligence growth prospects and potential rate cuts.",
    source: "Bloomberg",
    date: "8 hours ago",
    category: "market",
    tags: ["technology", "AI", "market rally"],
    impact: "medium",
    relevance: true,
    actionable: false,
    image: "/placeholder.svg?height=100&width=200",
    icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
    relatedAssets: ["Technology ETFs", "Semiconductor Stocks", "AI-focused funds"],
    clientsAffected: 78,
  },
  {
    id: 4,
    title: "Global Minimum Corporate Tax Agreement Reaches Implementation Phase",
    summary:
      "The OECD's global minimum corporate tax of 15% is moving to implementation phase, with 136 countries now committed to the framework.",
    source: "Reuters",
    date: "Yesterday",
    category: "regulatory",
    tags: ["tax policy", "OECD", "global minimum tax"],
    impact: "high",
    relevance: true,
    actionable: true,
    image: "/placeholder.svg?height=100&width=200",
    icon: <Globe className="h-5 w-5 text-purple-500" />,
    relatedAssets: ["Multinational Corporations", "Tax-Advantaged Strategies"],
    clientsAffected: 92,
  },
  {
    id: 5,
    title: "Housing Market Shows Signs of Cooling as Mortgage Rates Remain Elevated",
    summary:
      "The U.S. housing market is showing signs of cooling with existing home sales declining for the third consecutive month as mortgage rates remain above 6%.",
    source: "CNBC",
    date: "Yesterday",
    category: "economic",
    tags: ["housing market", "mortgage rates", "real estate"],
    impact: "medium",
    relevance: true,
    actionable: false,
    image: "/placeholder.svg?height=100&width=200",
    icon: <Building className="h-5 w-5 text-amber-500" />,
    relatedAssets: ["REITs", "Homebuilder Stocks", "Mortgage Lenders"],
    clientsAffected: 45,
  },
  {
    id: 6,
    title: "Oil Prices Surge Amid Middle East Tensions and Supply Concerns",
    summary:
      "Oil prices have surged to a three-month high amid escalating tensions in the Middle East and concerns about global supply constraints.",
    source: "Financial Times",
    date: "Yesterday",
    category: "market",
    tags: ["oil prices", "energy", "geopolitics"],
    impact: "high",
    relevance: true,
    actionable: true,
    image: "/placeholder.svg?height=100&width=200",
    icon: <TrendingUp className="h-5 w-5 text-red-500" />,
    relatedAssets: ["Energy Sector", "Oil & Gas Stocks", "Transportation"],
    clientsAffected: 71,
  },
  {
    id: 7,
    title: "Quarterly GDP Growth Exceeds Expectations at 3.1%",
    summary:
      "U.S. GDP grew at an annualized rate of 3.1% in the second quarter, exceeding economist expectations of 2.4% and showing resilience in the face of high interest rates.",
    source: "Bloomberg",
    date: "2 days ago",
    category: "economic",
    tags: ["GDP", "economic growth", "recession fears"],
    impact: "high",
    relevance: true,
    actionable: false,
    image: "/placeholder.svg?height=100&width=200",
    icon: <BarChart className="h-5 w-5 text-emerald-500" />,
    relatedAssets: ["Cyclical Stocks", "Consumer Discretionary", "Small Caps"],
    clientsAffected: 100,
  },
  {
    id: 8,
    title: "Major Healthcare Merger Announced Between Industry Giants",
    summary:
      "Two of the largest healthcare providers announced a $45 billion merger that would create the largest integrated healthcare system in the country.",
    source: "Wall Street Journal",
    date: "2 days ago",
    category: "market",
    tags: ["healthcare", "mergers", "acquisitions"],
    impact: "medium",
    relevance: true,
    actionable: true,
    image: "/placeholder.svg?height=100&width=200",
    icon: <Share2 className="h-5 w-5 text-blue-500" />,
    relatedAssets: ["Healthcare Stocks", "Biotech ETFs", "Pharmaceutical Companies"],
    clientsAffected: 53,
  },
  {
    id: 9,
    title: "New Retirement Legislation Introduced in Congress",
    summary:
      "Bipartisan legislation has been introduced in Congress that would expand retirement savings options and increase catch-up contribution limits for older workers.",
    source: "CNBC",
    date: "3 days ago",
    category: "regulatory",
    tags: ["retirement", "legislation", "401k", "IRA"],
    impact: "high",
    relevance: true,
    actionable: true,
    image: "/placeholder.svg?height=100&width=200",
    icon: <BookOpen className="h-5 w-5 text-amber-500" />,
    relatedAssets: ["Retirement Planning", "Tax Strategies"],
    clientsAffected: 88,
  },
  {
    id: 10,
    title: "Inflation Data Shows Continued Moderation in Core Prices",
    summary:
      "The latest Consumer Price Index (CPI) data shows continued moderation in core inflation, supporting the case for potential interest rate cuts later this year.",
    source: "Reuters",
    date: "3 days ago",
    category: "economic",
    tags: ["inflation", "CPI", "interest rates"],
    impact: "high",
    relevance: true,
    actionable: true,
    image: "/placeholder.svg?height=100&width=200",
    icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
    relatedAssets: ["TIPS", "Fixed Income", "Rate-Sensitive Sectors"],
    clientsAffected: 95,
  },
]

interface NewsContentProps {
  searchQuery: string
  activeFilters: string[]
  activeCategory: string
  loading: boolean
}

export function NewsContent({ searchQuery, activeFilters, activeCategory, loading }: NewsContentProps) {
  const [visibleNews, setVisibleNews] = useState<number>(5)

  // Filter news based on search query, active filters, and category
  const filteredNews = newsData.filter((news) => {
    // Filter by search query
    if (
      searchQuery &&
      !news.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !news.summary.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !news.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Filter by category
    if (activeCategory !== "all" && news.category !== activeCategory) {
      return false
    }

    // Filter by active filters
    if (activeFilters.length > 0) {
      if (activeFilters.includes("relevance") && !news.relevance) return false
      if (activeFilters.includes("impact") && news.impact !== "high") return false
      if (activeFilters.includes("actionable") && !news.actionable) return false
      if (activeFilters.includes("recent") && !news.date.includes("hours ago")) return false
    }

    return true
  })

  const loadMore = () => {
    setVisibleNews((prev) => prev + 5)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-lg">
            <Skeleton className="h-20 w-32 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredNews.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No News Found</h3>
        <p className="text-muted-foreground">
          No news articles match your current filters. Try adjusting your search criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {filteredNews.slice(0, visibleNews).map((news) => (
        <div
          key={news.id}
          className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="md:hidden flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-primary/10">{news.icon}</div>
              <Badge variant={news.impact === "high" ? "destructive" : "outline"}>
                {news.impact === "high" ? "High Impact" : "Medium Impact"}
              </Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {news.date}
            </div>
          </div>

          {/* <img
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            className="rounded-md object-cover h-32 w-full md:w-48 md:h-28"
          /> */}

          <div className="flex-1">
            <div className="hidden md:flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-primary/10">{news.icon}</div>
                <Badge variant={news.impact === "high" ? "destructive" : "outline"}>
                  {news.impact === "high" ? "High Impact" : "Medium Impact"}
                </Badge>
                {news.actionable && (
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600">
                    Actionable
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {news.date}
              </div>
            </div>

            <h3 className="font-medium text-base mb-1">{news.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {news.category === "market"
                  ? "Market News"
                  : news.category === "regulatory"
                    ? "Regulatory Update"
                    : "Economic Indicator"}
              </Badge>

              <div className="text-xs text-muted-foreground">Source: {news.source}</div>

              {news.clientsAffected > 0 && (
                <Badge variant="outline" className="text-xs">
                  {news.clientsAffected}% of clients affected
                </Badge>
              )}
            </div>

            {news.relatedAssets && news.relatedAssets.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="text-xs text-muted-foreground">Related: </span>
                {news.relatedAssets.map((asset, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {asset}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {filteredNews.length > visibleNews && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

