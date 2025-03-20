'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock alerts data
const alertsData = [
    {
        id: 1,
        title: 'SEC Regulatory Deadline Approaching',
        description: 'Form ADV annual updating amendment due within 30 days',
        priority: 'high',
        time: 'Due in 30 days',
        status: 'pending',
    },
    {
        id: 2,
        title: 'Client Tax Document Deadline',
        description: 'Required tax documents must be sent to clients by January 31st',
        priority: 'high',
        time: 'Due in 15 days',
        status: 'pending',
    },
    {
        id: 3,
        title: 'Quarterly Client Reviews',
        description: 'Schedule Q1 reviews for high-net-worth clients',
        priority: 'medium',
        time: 'Due in 45 days',
        status: 'pending',
    },
    {
        id: 4,
        title: 'Portfolio Rebalancing Alert',
        description: '15 client portfolios require rebalancing due to market shifts',
        priority: 'medium',
        time: 'Due in 7 days',
        status: 'pending',
    },
    {
        id: 5,
        title: 'Compliance Training Completed',
        description: 'Annual compliance training requirements satisfied',
        priority: 'low',
        time: 'Completed yesterday',
        status: 'completed',
    },
]

export function NewsAlerts() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="cursor-pointer space-y-4">
                    {alertsData.map((alert) => (
                        <div
                            key={alert.id}
                            className={`flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 ${alert.status === 'completed' ? 'opacity-60' : ''}`}
                        >
                            <div className={`mt-0.5 rounded-full p-1.5 ${alert.priority === 'high' ? 'bg-red-500/10 text-red-500' : alert.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{alert.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}</div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">{alert.title}</h4>
                                    <Badge
                                        variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'outline' : 'secondary'}
                                        className="text-[10px]"
                                    >
                                        {alert.priority === 'high' ? 'High Priority' : alert.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{alert.description}</p>
                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="mr-1 h-3 w-3" />
                                        {alert.time}
                                    </div>
                                    {alert.status !== 'completed' && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 text-xs hover:bg-gray-200/80"
                                        >
                                            Mark Complete
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
