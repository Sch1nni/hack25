'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'
import { ArrowUpRight, ArrowDownRight, Calendar, AlertTriangle } from 'lucide-react'

// Mock economic data
const inflationData = [
    { date: 'Jan', value: 6.4 },
    { date: 'Feb', value: 6.0 },
    { date: 'Mar', value: 5.0 },
    { date: 'Apr', value: 4.9 },
    { date: 'May', value: 4.0 },
    { date: 'Jun', value: 3.0 },
    { date: 'Jul', value: 3.2 },
    { date: 'Aug', value: 3.7 },
    { date: 'Sep', value: 3.7 },
    { date: 'Oct', value: 3.2 },
    { date: 'Nov', value: 3.1 },
    { date: 'Dec', value: 3.0 },
]

const gdpData = [
    { date: 'Q1 2022', value: 3.7 },
    { date: 'Q2 2022', value: -0.6 },
    { date: 'Q3 2022', value: 3.2 },
    { date: 'Q4 2022', value: 2.6 },
    { date: 'Q1 2023', value: 2.0 },
    { date: 'Q2 2023', value: 2.1 },
    { date: 'Q3 2023', value: 4.9 },
    { date: 'Q4 2023', value: 3.3 },
]

const unemploymentData = [
    { date: 'Jan', value: 3.4 },
    { date: 'Feb', value: 3.6 },
    { date: 'Mar', value: 3.5 },
    { date: 'Apr', value: 3.4 },
    { date: 'May', value: 3.7 },
    { date: 'Jun', value: 3.6 },
    { date: 'Jul', value: 3.5 },
    { date: 'Aug', value: 3.8 },
    { date: 'Sep', value: 3.7 },
    { date: 'Oct', value: 3.9 },
    { date: 'Nov', value: 3.7 },
    { date: 'Dec', value: 3.7 },
]

// Mock economic indicators
const economicIndicators = [
    { name: 'Inflation (CPI)', value: '3.0%', change: -0.1, positive: true, date: 'Dec 2023' },
    { name: 'GDP Growth', value: '3.3%', change: -1.6, positive: false, date: 'Q4 2023' },
    { name: 'Unemployment', value: '3.7%', change: 0.0, positive: true, date: 'Dec 2023' },
    { name: 'Fed Funds Rate', value: '5.25-5.50%', change: 0.0, positive: true, date: 'Jan 2024' },
    { name: '10-Year Treasury', value: '3.82%', change: -0.05, positive: true, date: 'Today' },
    { name: 'Consumer Sentiment', value: '78.8', change: 3.2, positive: true, date: 'Jan 2024' },
]

// Upcoming economic events
const upcomingEvents = [
    { name: 'FOMC Meeting', date: 'Mar 19-20', importance: 'high' },
    { name: 'CPI Release', date: 'Mar 12', importance: 'high' },
    { name: 'Retail Sales', date: 'Mar 14', importance: 'medium' },
    { name: 'GDP (Q1 Advance)', date: 'Apr 25', importance: 'high' },
    { name: 'Nonfarm Payrolls', date: 'Mar 8', importance: 'high' },
]

export function EconomicIndicators() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Economic Indicators</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="inflation">
                    <TabsList className="mb-4">
                        <TabsTrigger value="inflation">Inflation</TabsTrigger>
                        <TabsTrigger value="gdp">GDP</TabsTrigger>
                        <TabsTrigger value="unemployment">Unemployment</TabsTrigger>
                    </TabsList>

                    <TabsContent value="inflation">
                        <div className="h-[250px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <LineChart data={inflationData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="date" />
                                    <YAxis tickFormatter={(value) => `${value}%`} />
                                    <Tooltip formatter={(value: number) => [`${value}%`, 'Inflation Rate']} />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="gdp">
                        <div className="h-[250px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart data={gdpData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="date" />
                                    <YAxis tickFormatter={(value) => `${value}%`} />
                                    <Tooltip formatter={(value: number) => [`${value}%`, 'GDP Growth']} />
                                    <Bar
                                        dataKey="value"
                                        fill="#0ea5e9"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="unemployment">
                        <div className="h-[250px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <LineChart data={unemploymentData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="date" />
                                    <YAxis
                                        domain={[3, 5]}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <Tooltip formatter={(value: number) => [`${value}%`, 'Unemployment Rate']} />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8b5cf6"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <div className="mb-2 text-sm font-medium">Key Indicators</div>
                        <div className="space-y-2">
                            {economicIndicators.map((indicator, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border p-2"
                                >
                                    <div>
                                        <div className="text-sm">{indicator.name}</div>
                                        <div className="text-xs text-muted-foreground">{indicator.date}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{indicator.value}</span>
                                        {indicator.change !== 0 && (
                                            <div className={`flex items-center text-xs ${(indicator.positive && indicator.change > 0) || (!indicator.positive && indicator.change < 0) ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {indicator.change > 0 ? <ArrowUpRight className="mr-1 h-3.5 w-3.5" /> : <ArrowDownRight className="mr-1 h-3.5 w-3.5" />}
                                                <span>{Math.abs(indicator.change).toFixed(1)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 text-sm font-medium">Upcoming Economic Events</div>
                        <div className="space-y-2">
                            {upcomingEvents.map((event, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border p-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm">{event.name}</div>
                                            <div className="text-xs text-muted-foreground">{event.date}</div>
                                        </div>
                                    </div>
                                    <Badge variant={event.importance === 'high' ? 'default' : 'outline'}>{event.importance === 'high' ? 'High Impact' : 'Medium Impact'}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-lg border bg-muted/50 p-3">
                    <div className="mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <div className="text-sm font-medium">Market Implications</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Inflation continues to moderate, potentially setting the stage for Fed rate cuts in 2024. GDP growth remains resilient despite higher interest rates, while the labor market shows early signs of cooling but remains historically strong. Markets are currently pricing in 5-6 rate cuts for 2024, with the first cut expected in May or June.</div>
                </div>
            </CardContent>
        </Card>
    )
}
