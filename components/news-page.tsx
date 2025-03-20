"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard-header"
import { NewsContent } from "@/components/news-content"
import { NewsFilter } from "@/components/news-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MarketOverview } from "@/components/market-overview"
import { NewsRecommendations } from "@/components/news-recommendations"
import { NewsAlerts } from "@/components/news-alerts"

export function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading news data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          title="Financial News & Insights"
          description="Stay informed with the latest market news, regulatory updates, and economic indicators"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Latest News</CardTitle>
                  <NewsFilter onFilterChange={handleFilterChange} onCategoryChange={handleCategoryChange} />
                </div>
              </CardHeader>
              <CardContent>
                <NewsContent
                  searchQuery={searchQuery}
                  activeFilters={activeFilters}
                  activeCategory={activeCategory}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <MarketOverview />

            <Tabs defaultValue="recommendations">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="recommendations">For You</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
              <TabsContent value="recommendations">
                <NewsRecommendations />
              </TabsContent>
              <TabsContent value="alerts">
                <NewsAlerts />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

