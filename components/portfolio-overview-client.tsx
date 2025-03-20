'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts'

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

import portfolioJson from '@/assets/portfolio-client.json'
// console.log('portfolioJson', portfolioJson)

/**
 * * Processes portfolio data to get combined values by date
 * ? Extracts dates and sums closing values across all stocks
 * ! Preserves full date format for proper sorting
 */
function getPortfolioData() {
    // Create a map to store combined values by date
    const dateMap = new Map()
    // Create a separate map to track count of entries per date
    const countMap = new Map()

    // // Process each stock in the portfolio
    // Object.keys(portfolioJson).forEach((stockName) => {
    //     const stockData = portfolioJson[stockName]

    //     // Process each data point for this stock
    //     stockData.forEach((dataPoint) => {
    //         if (!dataPoint.Data) return // Skip entries without date

    //         const date = dataPoint.Data
    //         const closeValue = dataPoint.Close || 0

    //         // Add to existing date or create new entry
    //         if (dateMap.has(date)) {
    //             dateMap.set(date, dateMap.get(date) + closeValue)
    //             countMap.set(date, countMap.get(date) + 1)
    //         } else {
    //             dateMap.set(date, closeValue)
    //             countMap.set(date, 1)
    //         }
    //     })
    // })

    // // Convert map to array of objects
    // let _portfolioData = Array.from(dateMap.entries())
    //     .map(([date, value]) => ({
    //         fullDate: date, // Keep full date for sorting
    //         date: date, // Keep full yyyy-mm-dd format
    //         value,
    //         count: countMap.get(date), // Include the count in the output
    //     }))
    //     .sort((a, b) => {
    //         // Sort by date using the full date format
    //         return new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime()
    //     })

    // let maxCount = Math.max(..._portfolioData.map((item) => item.count))
    // console.log(
    //     '_portfolioData',
    //     _portfolioData.map((item) => {
    //         return {
    //             date: item.date,
    //             value: parseFloat(item.value.toFixed(2)),
    //         }
    //     }),
    // )
    return portfolioJson.map((item) => {
        return {
            date: item.Data,
            value: item.Portfolio,
        }
    })
}

// Use the processed portfolio data
const portfolioData = getPortfolioData()

// Combine data for the chart
const combinedData = portfolioData.map((item, index) => {
    // Find matching benchmark data or use default
    const benchmarkItem = benchmarkData.find((b) => b.date === item.date.substring(5)) || { value: item.value * 0.1 } // Fallback if no match

    let _combinedData = {
        date: item.date, // Use full date format yyyy-mm-dd
        portfolio: item.value,
        benchmark: benchmarkItem.value,
    }

    return _combinedData
})
export function PortfolioOverviewClient({ onlyChart }: { onlyChart?: boolean }) {
    const [timeframe, setTimeframe] = useState('1Y')

    let content = (
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
                    <XAxis
                        dataKey="date"
                        tickFormatter={(value) => value.substring(5)} // Show only MM-DD part for display
                    />
                    <YAxis
                        tickFormatter={(value) => `$${value.toFixed(2)}`}
                        width={80}
                        domain={['dataMin', 'dataMax']}
                    />
                    <Tooltip
                        formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
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
    )

    let contentContainer = (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="mb-2">Portfolio Performance</CardTitle>
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

                {content}
            </CardContent>
        </Card>
    )

    return onlyChart ? content : contentContainer
}
