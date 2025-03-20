'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

// Mock sector performance data
const sectorPerformanceData = [
    { name: 'Technology', ytd: 32.5, oneMonth: 1.25, positive: true, color: '#0ea5e9' },
    { name: 'Healthcare', ytd: 8.2, oneMonth: 0.75, positive: true, color: '#8b5cf6' },
    { name: 'Financials', ytd: 12.8, oneMonth: -0.45, positive: false, color: '#f97316' },
    { name: 'Cons. Disc.', ytd: 18.5, oneMonth: 0.95, positive: true, color: '#10b981' },
    { name: 'Comm. Serv.', ytd: 28.9, oneMonth: 1.35, positive: true, color: '#eab308' },
    { name: 'Industrials', ytd: 15.2, oneMonth: 0.25, positive: true, color: '#ec4899' },
    { name: 'Cons. Staples', ytd: 5.8, oneMonth: -0.15, positive: false, color: '#6366f1' },
    { name: 'Energy', ytd: -8.2, oneMonth: -1.25, positive: false, color: '#94a3b8' },
    { name: 'Utilities', ytd: 2.1, oneMonth: -0.35, positive: false, color: '#14b8a6' },
    { name: 'Real Estate', ytd: 7.5, oneMonth: 0.55, positive: true, color: '#f43f5e' },
    { name: 'Materials', ytd: 6.5, oneMonth: -0.65, positive: false, color: '#84cc16' },
]

export function SectorAnalysis() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Sector Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={sectorPerformanceData.sort((a, b) => b.ytd - a.ytd)}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                opacity={0.2}
                                horizontal={true}
                                vertical={false}
                            />
                            <XAxis
                                type="number"
                                tickFormatter={(value) => `${value}%`}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={80}
                            />
                            <Tooltip formatter={(value: number) => [`${value.toFixed(2)}%`, 'YTD Return']} />
                            <Bar
                                dataKey="ytd"
                                name="YTD Return"
                            >
                                {sectorPerformanceData
                                    .sort((a, b) => b.ytd - a.ytd)
                                    .map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-2">
                    <div className="text-sm font-medium">Today's Movers</div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2">
                            <div className="mb-1 text-xs text-muted-foreground">Top Performer</div>
                            <div className="font-medium">Communication Services</div>
                            <div className="flex items-center text-xs text-emerald-500">
                                <ArrowUpRight className="mr-1 h-3 w-3" />
                                <span>+1.35%</span>
                            </div>
                        </div>

                        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-2">
                            <div className="mb-1 text-xs text-muted-foreground">Worst Performer</div>
                            <div className="font-medium">Energy</div>
                            <div className="flex items-center text-xs text-red-500">
                                <ArrowDownRight className="mr-1 h-3 w-3" />
                                <span>-1.25%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
