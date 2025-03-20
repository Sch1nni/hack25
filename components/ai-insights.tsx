import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'

const insights = [
    {
        id: 1,
        type: 'opportunity',
        title: 'Tech sector undervalued',
        description: 'Technology stocks are showing signs of being undervalued based on current P/E ratios and growth projections.',
        icon: TrendingUp,
        iconColor: 'text-emerald-500',
        badgeColor: 'bg-emerald-500/10 text-emerald-500',
    },
    {
        id: 2,
        type: 'risk',
        title: 'Fixed income exposure',
        description: 'Current interest rate trends suggest reducing exposure to long-term fixed income assets.',
        icon: TrendingDown,
        iconColor: 'text-amber-500',
        badgeColor: 'bg-amber-500/10 text-amber-500',
    },
    {
        id: 3,
        type: 'alert',
        title: 'Portfolio rebalancing needed',
        description: 'Your equity allocation has drifted 5% above target. Consider rebalancing to maintain risk profile.',
        icon: AlertTriangle,
        iconColor: 'text-red-500',
        badgeColor: 'bg-red-500/10 text-red-500',
    },
]

export function AIInsights() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        AI-Powered Insights
                    </CardTitle>
                    <Badge
                        variant="outline"
                        className="text-xs"
                    >
                        Updated 10m ago
                    </Badge>
                </div>
                <CardDescription>Personalized insights based on market trends and portfolio analysis</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {insights.map((insight) => (
                        <div
                            key={insight.id}
                            className="flex gap-3 rounded-lg border p-3"
                        >
                            <div className={`mt-0.5 rounded-full p-1.5 ${insight.badgeColor}`}>
                                <insight.icon className={`h-4 w-4 ${insight.iconColor}`} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-medium">{insight.title}</h4>
                                    <Badge
                                        variant="secondary"
                                        className="text-[10px]"
                                    >
                                        {insight.type}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{insight.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
