'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts'

let range_dates: string[] = []

const predictionData = [
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
import portfolio_prediction from '@/assets/portfolio_prediction.json'
import portfolio_future_prediction from '@/assets/future_predictions.json'
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

    return portfolioJson.map((item) => {
        return {
            date: item.Data,
            value: item.Portfolio,
        }
    })
}

// Use the processed portfolio data
const portfolioData = getPortfolioData()

/**
 * * Calculates the index in portfolioData for a prediction point
 * ? Takes the total range and divides it evenly based on prediction length
 */
const getPredictionIndex = (predictionIndex: number, totalPredictions: number) => {
    const step = portfolioData.length / totalPredictions
    return Math.floor(predictionIndex * step)
}

/**
 * * Creates future dates starting from the last portfolio date
 * ? Generates dates with the same interval as portfolio data
 */
const generateFutureDates = (startDate: string, count: number) => {
    const dates = []
    let currentDate = new Date(startDate)

    // Calculate the average interval between portfolio dates
    const firstDate = new Date(portfolioData[0].date)
    const lastDate = new Date(portfolioData[portfolioData.length - 1].date)
    const avgInterval = (lastDate.getTime() - firstDate.getTime()) / portfolioData.length

    for (let i = 0; i < count; i++) {
        currentDate = new Date(currentDate.getTime() + avgInterval)
        dates.push(currentDate.toISOString().split('T')[0])
    }
    return dates
}

// Generate past predictions (starting from 2025-01-01)
const pastData = portfolioData.map((item, index) => {
    // Find the index of January 1, 2025 in the portfolio data
    const jan2025Index = portfolioData.findIndex((item) => {
        const itemDate = new Date(item.date)
        const startDate = new Date('2025-01-01')
        return itemDate >= startDate
    })

    // Calculate prediction index based on position relative to Jan 1, 2025
    let predictionIndex = -1
    if (jan2025Index !== -1 && index >= jan2025Index) {
        const relativeIndex = index - jan2025Index
        const step = (portfolioData.length - jan2025Index) / portfolio_prediction.length
        predictionIndex = Math.floor(relativeIndex / step)
        if (predictionIndex >= portfolio_prediction.length) {
            predictionIndex = -1
        }
    }

    return {
        date: item.date,
        portfolio: item.value,
        pastPrediction: predictionIndex !== -1 ? portfolio_prediction[predictionIndex].Predictions : null,
        futurePrediction: null,
    }
})

// Create future prediction data using timestamps from the data
const futureData = portfolio_future_prediction.map((prediction) => ({
    date: new Date(prediction.Data).toISOString().split('T')[0],
    portfolio: null,
    pastPrediction: null,
    futurePrediction: prediction['Prezzo Previsto'],
}))

// Combine data for the chart
const combinedData = [...pastData, ...futureData]

/**
 * * Filters data based on the provided date range
 * ? Takes the combined data and optional range dates
 * ! Returns filtered data if range is provided, otherwise returns all data
 */
const filterDataByDateRange = (data: any[], range_dates?: string[]) => {
    if (!range_dates || range_dates.length !== 2) return data

    const [startDate, endDate] = range_dates
    return data.filter((item) => {
        const itemDate = item.date
        return itemDate >= startDate && itemDate <= endDate
    })
}

/**
 * * Calculates the date range based on the selected timeframe
 * ? Takes a timeframe string and returns start and end dates
 * ! Uses current date as reference for calculations
 */
const getDateRangeFromTimeframe = (timeframe: string): string[] => {
    const today = new Date()

    const endDate = today.toISOString().split('T')[0]
    let startDate = new Date()

    switch (timeframe) {
        case '1M':
            startDate.setMonth(today.getMonth() - 1)
            break
        case '3M':
            startDate.setMonth(today.getMonth() - 3)
            break
        case '6M':
            startDate.setMonth(today.getMonth() - 6)
            break
        case '1Y':
            startDate.setFullYear(today.getFullYear() - 1)
            break
        case 'ALL':
            return [] // Empty array will show all data
        default:
            startDate.setFullYear(today.getFullYear() - 1) // Default to 1Y
    }

    const endDatePlus6M = new Date(endDate)
    if (!['1M'].includes(timeframe)) {
        endDatePlus6M.setMonth(endDatePlus6M.getMonth() + 6)
    }
    // startDate.setMonth(startDate.getMonth() - 6);
    return [startDate.toISOString().split('T')[0], endDatePlus6M.toISOString().split('T')[0]]
}

interface VoiceResponse {
    text: string
    timestamp: string
}

export function PortfolioOverviewClient({ onlyChart, presettedTimeframe }: { onlyChart?: boolean; presettedTimeframe?: string }) {
    const [timeframe, setTimeframe] = useState(presettedTimeframe || '1M')

    // Update range_dates based on timeframe
    range_dates = getDateRangeFromTimeframe(timeframe)

    // Filter data based on range_dates
    const filteredData = filterDataByDateRange(combinedData, range_dates)

    let content = (
        <div className="h-[300px] w-full">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <LineChart data={filteredData}>
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
                        formatter={(value: number) => [`$${value.toFixed(2)}`]}
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
                        dataKey="pastPrediction"
                        name="Past Prediction"
                        stroke="#edbc22"
                        strokeWidth={2}
                        dot={false}
                        // strokeDasharray="60 60"
                    />
                    <Line
                        type="monotone"
                        dataKey="futurePrediction"
                        name="Future Prediction"
                        stroke="#e94c47"
                        strokeWidth={2}
                        dot={false}
                        // strokeDasharray="5 5"
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
                    defaultValue="1M"
                    onValueChange={setTimeframe}
                >
                    <TabsList>
                        <TabsTrigger
                            onClick={() => setTimeframe('1M')}
                            value="1M"
                        >
                            1M
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setTimeframe('3M')}
                            value="3M"
                        >
                            3M
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setTimeframe('6M')}
                            value="6M"
                        >
                            6M
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setTimeframe('1Y')}
                            value="1Y"
                        >
                            1Y
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setTimeframe('ALL')}
                            value="ALL"
                        >
                            ALL
                        </TabsTrigger>
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
                        <p className="text-sm text-muted-foreground">prediction Diff</p>
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
