'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react'

// Mock market breadth data
const marketBreadthData = [
    { name: 'Advancing', value: 285, color: '#10b981' },
    { name: 'Declining', value: 215, color: '#ef4444' },
    { name: 'Unchanged', value: 12, color: '#94a3b8' },
]

// Mock market indicators
const marketIndicators = [
    { name: 'Advancing Volume', value: '2.1B', change: 1.25, positive: true },
    { name: 'Declining Volume', value: '1.5B', change: -1.25, positive: false },
    { name: 'New Highs', value: '125', change: 15, positive: true },
    { name: 'New Lows', value: '45', change: -10, positive: true },
    { name: 'A/D Line', value: '1.33', change: 0.05, positive: true },
    { name: 'TRIN', value: '0.85', change: -0.15, positive: true },
]

export function MarketBreadth() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Market Breadth</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="h-[200px]">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <PieChart>
                                <Pie
                                    data={marketBreadthData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {marketBreadthData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value} stocks`, '']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm font-medium">Market Indicators</div>
                        <div className="space-y-2">
                            {marketIndicators.slice(0, 4).map((indicator, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <span className="text-muted-foreground">{indicator.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span>{indicator.value}</span>
                                        <div className={`flex items-center text-xs ${indicator.positive ? 'text-emerald-500' : 'text-red-500'}`}>{indicator.positive ? <ArrowUpRight className="5 h-3 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border p-2">
                        <div className="mb-1 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            <div className="text-sm font-medium">Bullish Signals</div>
                        </div>
                        <div className="text-xs text-muted-foreground">Advancing stocks outpacing declining, high volume on up moves, and increasing new highs.</div>
                    </div>

                    <div className="rounded-lg border p-2">
                        <div className="mb-1 flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-amber-500" />
                            <div className="text-sm font-medium">Watch For</div>
                        </div>
                        <div className="text-xs text-muted-foreground">Narrowing breadth, declining volume trends, or increasing new lows could signal weakness.</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
