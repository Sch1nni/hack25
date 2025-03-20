'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts'

const portfolioData = [
    { date: 'Jan', value: 2400000 },
    { date: 'Feb', value: 2100000 },
    { date: 'Mar', value: 2700000 },
    { date: 'Apr', value: 2900000 },
    { date: 'May', value: 3100000 },
    { date: 'Jun', value: 3000000 },
    { date: 'Jul', value: 3400000 },
    { date: 'Aug', value: 3700000 },
    { date: 'Sep', value: 3900000 },
    { date: 'Oct', value: 4100000 },
    { date: 'Nov', value: 4300000 },
    { date: 'Dec', value: 4500000 },
]

const benchmarkData = [
    { date: 'Jan', value: 2400000 },
    { date: 'Feb', value: 2300000 },
    { date: 'Mar', value: 2500000 },
    { date: 'Apr', value: 2600000 },
    { date: 'May', value: 2700000 },
    { date: 'Jun', value: 2800000 },
    { date: 'Jul', value: 3000000 },
    { date: 'Aug', value: 3200000 },
    { date: 'Sep', value: 3300000 },
    { date: 'Oct', value: 3500000 },
    { date: 'Nov', value: 3600000 },
    { date: 'Dec', value: 3800000 },
]

// Combine data for the chart
const combinedData = portfolioData.map((item, index) => ({
    date: item.date,
    portfolio: item.value,
    benchmark: benchmarkData[index].value,
}))

export function PortfolioOverview() {
    const [timeframe, setTimeframe] = useState('1Y')

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Portfolio Performance</CardTitle>
                    <CardDescription>Total portfolio value and performance over time</CardDescription>
                </div>
                <Tabs
                    defaultValue="1Y"
                    onValueChange={setTimeframe}
                >
                    <TabsList>
                        <TabsTrigger value="1M">1M</TabsTrigger>
                        <TabsTrigger value="3M">3M</TabsTrigger>
                        <TabsTrigger value="6M">6M</TabsTrigger>
                        <TabsTrigger value="1Y">1Y</TabsTrigger>
                        <TabsTrigger value="ALL">ALL</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">$4.5M</span>
                            <div className="flex items-center text-sm font-medium text-emerald-500">
                                <ArrowUpRight className="h-4 w-4" />
                                <span>12.5%</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">YTD Return</p>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">+$560K</span>
                            <div className="flex items-center text-sm font-medium text-emerald-500">
                                <TrendingUp className="h-4 w-4" />
                                <span>8.2%</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Benchmark Diff</p>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">+3.8%</span>
                            <div className="flex items-center text-sm font-medium text-emerald-500">
                                <ArrowUpRight className="h-4 w-4" />
                                <span>Outperforming</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <LineChart data={combinedData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                opacity={0.2}
                            />
                            <XAxis dataKey="date" />
                            <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                            <Tooltip
                                formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, '']}
                                labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="portfolio"
                                name="Portfolio"
                                stroke="#0ea5e9"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="benchmark"
                                name="Benchmark"
                                stroke="#94a3b8"
                                strokeWidth={2}
                                dot={false}
                                strokeDasharray="5 5"
                            />
                            <defs>
                                <linearGradient
                                    id="colorGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#0ea5e9"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#0ea5e9"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="portfolio"
                                fill="url(#colorGradient)"
                                fillOpacity={0.2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
