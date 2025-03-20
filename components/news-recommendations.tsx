'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, FileText, AlertTriangle, Users, Clock } from 'lucide-react'

// Mock recommended news data
const recommendedNews = [
    {
        id: 1,
        title: 'New Tax-Loss Harvesting Opportunities in Current Market',
        category: 'strategy',
        relevance: 'High relevance for 15 clients',
        time: '1 hour ago',
        icon: <FileText className="h-4 w-4 text-blue-500" />,
    },
    {
        id: 2,
        title: 'Healthcare Sector Poised for Growth Amid Policy Changes',
        category: 'sector',
        relevance: 'Matches 8 client portfolios',
        time: '3 hours ago',
        icon: <TrendingUp className="h-4 w-4 text-emerald-500" />,
    },
    {
        id: 3,
        title: 'Estate Planning Considerations for 2025 Tax Changes',
        category: 'planning',
        relevance: 'Critical for 12 high-net-worth clients',
        time: '5 hours ago',
        icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    },
    {
        id: 4,
        title: 'Retirement Account Contribution Limits to Increase Next Year',
        category: 'retirement',
        relevance: 'Relevant for 90% of clients',
        time: 'Yesterday',
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
                            className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                        >
                            <div className="mt-0.5 rounded-full bg-primary/10 p-1.5">{news.icon}</div>
                            <div className="flex-1 space-y-2">
                                <h4 className="text-sm font-medium">{news.title}</h4>
                                <div className="flex items-center justify-between">
                                    <Badge
                                        variant="secondary"
                                        className="text-[10px]"
                                    >
                                        {news.category}
                                    </Badge>
                                    <div className="mr-5 flex items-center text-xs text-muted-foreground">
                                        <Clock className="mr-1 h-3 w-3" />
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
