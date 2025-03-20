import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownRight, RefreshCw, AlertCircle } from 'lucide-react'

const activities = [
    {
        id: 1,
        type: 'buy',
        title: 'Purchased AAPL',
        description: '100 shares @ $198.45',
        timestamp: 'Today, 10:30 AM',
        icon: ArrowUpRight,
        iconColor: 'text-emerald-500',
        badgeColor: 'bg-emerald-500/10 text-emerald-500',
        badgeText: 'Buy',
    },
    {
        id: 2,
        type: 'sell',
        title: 'Sold MSFT',
        description: '50 shares @ $415.22',
        timestamp: 'Today, 9:15 AM',
        icon: ArrowDownRight,
        iconColor: 'text-blue-500',
        badgeColor: 'bg-blue-500/10 text-blue-500',
        badgeText: 'Sell',
    },
    {
        id: 3,
        type: 'rebalance',
        title: 'Portfolio Rebalanced',
        description: 'Adjusted equity allocation',
        timestamp: 'Yesterday, 3:45 PM',
        icon: RefreshCw,
        iconColor: 'text-purple-500',
        badgeColor: 'bg-purple-500/10 text-purple-500',
        badgeText: 'Rebalance',
    },
    {
        id: 4,
        type: 'alert',
        title: 'Dividend Received',
        description: 'VTI - $1,245.32',
        timestamp: 'Yesterday, 9:00 AM',
        icon: AlertCircle,
        iconColor: 'text-amber-500',
        badgeColor: 'bg-amber-500/10 text-amber-500',
        badgeText: 'Dividend',
    },
]

export function RecentActivity() {
    return (
        <Card>
            <CardHeader className="mb-2 pb-2">
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <CardDescription>Latest transactions and portfolio changes</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex gap-3 rounded-lg border p-3"
                        >
                            <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full p-1.5 ${activity.badgeColor}`}>
                                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">{activity.title}</h4>
                                    <Badge
                                        variant="secondary"
                                        className={`text-[10px] ${activity.badgeColor}`}
                                    >
                                        {activity.badgeText}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
