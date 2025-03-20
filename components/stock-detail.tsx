'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts'
import { ArrowUpRight, ArrowDownRight, Calendar, DollarSign, BarChartIcon, TrendingUp, Percent, Users, Building, Globe, Star, AlertTriangle, Clock } from 'lucide-react'

// Mock stock data
const stockInfo = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 191.56,
    change: 1.25,
    changePercent: 0.66,
    positive: true,
    marketCap: '2.98T',
    peRatio: 31.45,
    dividend: 0.96,
    dividendYield: 0.5,
    volume: '52.4M',
    avgVolume: '58.7M',
    high: 192.65,
    low: 190.24,
    open: 190.35,
    previousClose: 190.31,
    fiftyTwoWeekHigh: 199.62,
    fiftyTwoWeekLow: 124.17,
    analystRating: 'Buy',
    analystPriceTarget: 210.5,
    beta: 1.28,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    employees: '164,000',
    headquarters: 'Cupertino, California',
    founded: '1976',
    ceo: 'Tim Cook',
    website: 'www.apple.com',
}

// Mock historical price data
const historicalPriceData = [
    { date: 'Jan', price: 170.33, volume: 45000000 },
    { date: 'Feb', price: 165.12, volume: 42000000 },
    { date: 'Mar', price: 175.88, volume: 48000000 },
    { date: 'Apr', price: 169.59, volume: 44000000 },
    { date: 'May', price: 177.25, volume: 46000000 },
    { date: 'Jun', price: 185.01, volume: 50000000 },
    { date: 'Jul', price: 193.22, volume: 52000000 },
    { date: 'Aug', price: 187.87, volume: 49000000 },
    { date: 'Sep', price: 174.79, volume: 47000000 },
    { date: 'Oct', price: 182.66, volume: 51000000 },
    { date: 'Nov', price: 189.37, volume: 53000000 },
    { date: 'Dec', price: 191.56, volume: 52400000 },
]

// Mock financial data
const financialData = {
    revenue: [
        { year: '2020', q1: 58.3, q2: 59.7, q3: 64.7, q4: 111.4 },
        { year: '2021', q1: 89.6, q2: 81.4, q3: 83.4, q4: 123.9 },
        { year: '2022', q1: 97.3, q2: 82.9, q3: 90.1, q4: 117.2 },
        { year: '2023', q1: 94.8, q2: 81.8, q3: 89.5, q4: 119.6 },
    ],
    earnings: [
        { year: '2020', q1: 11.2, q2: 11.3, q3: 12.7, q4: 28.8 },
        { year: '2021', q1: 23.6, q2: 21.7, q3: 20.6, q4: 34.6 },
        { year: '2022', q1: 25.0, q2: 19.4, q3: 20.7, q4: 30.0 },
        { year: '2023', q1: 24.2, q2: 19.9, q3: 22.9, q4: 32.0 },
    ],
    cashFlow: [
        { year: '2020', q1: 13.3, q2: 16.3, q3: 18.8, q4: 35.2 },
        { year: '2021', q1: 29.1, q2: 21.1, q3: 24.0, q4: 36.0 },
        { year: '2022', q1: 28.2, q2: 20.8, q3: 23.2, q4: 34.7 },
        { year: '2023', q1: 28.6, q2: 22.0, q3: 25.0, q4: 36.1 },
    ],
}

// Mock news data
const newsData = [
    {
        title: 'Apple Announces New iPhone Release Date',
        date: '2 days ago',
        source: 'Bloomberg',
        sentiment: 'positive',
    },
    {
        title: "Apple's Services Revenue Hits All-Time High",
        date: '1 week ago',
        source: 'CNBC',
        sentiment: 'positive',
    },
    {
        title: 'Analysts Raise Price Targets After Strong Earnings',
        date: '2 weeks ago',
        source: 'Wall Street Journal',
        sentiment: 'positive',
    },
    {
        title: 'Apple Faces Regulatory Scrutiny in EU Over App Store',
        date: '3 weeks ago',
        source: 'Reuters',
        sentiment: 'negative',
    },
]

// Mock analyst ratings
const analystRatings = {
    buy: 28,
    hold: 8,
    sell: 2,
    priceTargets: [
        { firm: 'Morgan Stanley', target: 215, rating: 'Overweight', date: 'Dec 15, 2023' },
        { firm: 'Goldman Sachs', target: 223, rating: 'Buy', date: 'Dec 12, 2023' },
        { firm: 'JP Morgan', target: 210, rating: 'Overweight', date: 'Dec 10, 2023' },
        { firm: 'Bank of America', target: 208, rating: 'Buy', date: 'Dec 8, 2023' },
        { firm: 'Citigroup', target: 205, rating: 'Buy', date: 'Dec 5, 2023' },
    ],
}

interface StockDetailProps {
    symbol: string
}

export function StockDetail({ symbol }: StockDetailProps) {
    const [timeRange, setTimeRange] = useState('1Y')
    const [financialView, setFinancialView] = useState('revenue')

    // In a real app, we would fetch data based on the symbol
    // For this demo, we'll just use the mock data

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CardTitle>{stockInfo.symbol} Price Chart</CardTitle>
                                    <Badge
                                        variant={stockInfo.positive ? 'default' : 'destructive'}
                                        className="text-xs"
                                    >
                                        <div className="flex items-center gap-1">
                                            {stockInfo.positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                                            <span>{stockInfo.changePercent.toFixed(2)}%</span>
                                        </div>
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={timeRange === '1M' ? 'bg-muted' : ''}
                                        onClick={() => setTimeRange('1M')}
                                    >
                                        1M
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={timeRange === '3M' ? 'bg-muted' : ''}
                                        onClick={() => setTimeRange('3M')}
                                    >
                                        3M
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={timeRange === '6M' ? 'bg-muted' : ''}
                                        onClick={() => setTimeRange('6M')}
                                    >
                                        6M
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={timeRange === '1Y' ? 'bg-muted' : ''}
                                        onClick={() => setTimeRange('1Y')}
                                    >
                                        1Y
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={timeRange === '5Y' ? 'bg-muted' : ''}
                                        onClick={() => setTimeRange('5Y')}
                                    >
                                        5Y
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <AreaChart data={historicalPriceData}>
                                        <defs>
                                            <linearGradient
                                                id="colorPrice"
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
                                        <XAxis dataKey="date" />
                                        <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            opacity={0.2}
                                        />
                                        <Tooltip
                                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                                            labelFormatter={(label) => `Date: ${label}`}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#0ea5e9"
                                            fillOpacity={1}
                                            fill="url(#colorPrice)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="rounded-lg border p-3">
                                    <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                        <DollarSign className="h-3.5 w-3.5" />
                                        <span>Current Price</span>
                                    </div>
                                    <div className="font-medium">${stockInfo.price.toFixed(2)}</div>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>52-Week Range</span>
                                    </div>
                                    <div className="font-medium">
                                        ${stockInfo.fiftyTwoWeekLow.toFixed(2)} - ${stockInfo.fiftyTwoWeekHigh.toFixed(2)}
                                    </div>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                        <BarChartIcon className="h-3.5 w-3.5" />
                                        <span>Market Cap</span>
                                    </div>
                                    <div className="font-medium">${stockInfo.marketCap}</div>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                        <TrendingUp className="h-3.5 w-3.5" />
                                        <span>Volume</span>
                                    </div>
                                    <div className="font-medium">{stockInfo.volume}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Stock Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Company</span>
                                    <span className="font-medium">{stockInfo.name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Sector</span>
                                    <span className="font-medium">{stockInfo.sector}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Industry</span>
                                    <span className="font-medium">{stockInfo.industry}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">P/E Ratio</span>
                                    <span className="font-medium">{stockInfo.peRatio.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Dividend Yield</span>
                                    <span className="font-medium">{stockInfo.dividendYield.toFixed(2)}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Beta</span>
                                    <span className="font-medium">{stockInfo.beta.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Analyst Rating</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-amber-500" />
                                        <span className="font-medium">{stockInfo.analystRating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Price Target</span>
                                    <span className="font-medium">${stockInfo.analystPriceTarget.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-2">
                                <h4 className="text-sm font-medium">Company Info</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Employees:</span>
                                        <span>{stockInfo.employees}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Headquarters:</span>
                                        <span>{stockInfo.headquarters}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Founded:</span>
                                        <span>{stockInfo.founded}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Website:</span>
                                        <span>{stockInfo.website}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle>Financial Performance</CardTitle>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={financialView === 'revenue' ? 'bg-muted' : ''}
                                    onClick={() => setFinancialView('revenue')}
                                >
                                    Revenue
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={financialView === 'earnings' ? 'bg-muted' : ''}
                                    onClick={() => setFinancialView('earnings')}
                                >
                                    Earnings
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={financialView === 'cashFlow' ? 'bg-muted' : ''}
                                    onClick={() => setFinancialView('cashFlow')}
                                >
                                    Cash Flow
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart data={financialView === 'revenue' ? financialData.revenue : financialView === 'earnings' ? financialData.earnings : financialData.cashFlow}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value: number) => [`$${value.toFixed(1)}B`, '']}
                                        labelFormatter={(label) => `Year: ${label}`}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="q1"
                                        name="Q1"
                                        fill="#0ea5e9"
                                    />
                                    <Bar
                                        dataKey="q2"
                                        name="Q2"
                                        fill="#8b5cf6"
                                    />
                                    <Bar
                                        dataKey="q3"
                                        name="Q3"
                                        fill="#f97316"
                                    />
                                    <Bar
                                        dataKey="q4"
                                        name="Q4"
                                        fill="#10b981"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Analyst Ratings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-emerald-500">{analystRatings.buy}</div>
                                    <div className="text-xs text-muted-foreground">Buy</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-amber-500">{analystRatings.hold}</div>
                                    <div className="text-xs text-muted-foreground">Hold</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-500">{analystRatings.sell}</div>
                                    <div className="text-xs text-muted-foreground">Sell</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">${stockInfo.analystPriceTarget.toFixed(2)}</div>
                                <div className="text-xs text-muted-foreground">Avg. Price Target</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {analystRatings.priceTargets.map((pt, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border p-2"
                                >
                                    <div>
                                        <div className="font-medium">{pt.firm}</div>
                                        <div className="text-xs text-muted-foreground">{pt.date}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant={pt.rating.toLowerCase().includes('buy') || pt.rating.toLowerCase().includes('overweight') ? 'default' : pt.rating.toLowerCase().includes('hold') || pt.rating.toLowerCase().includes('neutral') ? 'outline' : 'destructive'}>{pt.rating}</Badge>
                                        <div className="font-medium">${pt.target}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Latest News</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {newsData.map((news, index) => (
                                <div
                                    key={index}
                                    className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                                >
                                    <div className={`mt-0.5 rounded-full p-1.5 ${news.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-500' : news.sentiment === 'negative' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>{news.sentiment === 'positive' ? <ArrowUpRight className="h-4 w-4" /> : news.sentiment === 'negative' ? <ArrowDownRight className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}</div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium">{news.title}</h4>
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {news.source}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Clock className="mr-1 h-3 w-3" />
                                            {news.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Key Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div>
                                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <DollarSign className="h-3.5 w-3.5" />
                                        <span>Market Cap</span>
                                    </div>
                                    <div className="font-medium">${stockInfo.marketCap}</div>
                                </div>
                                <div>
                                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <Percent className="h-3.5 w-3.5" />
                                        <span>P/E Ratio</span>
                                    </div>
                                    <div className="font-medium">{stockInfo.peRatio.toFixed(2)}</div>
                                </div>
                                <div>
                                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <TrendingUp className="h-3.5 w-3.5" />
                                        <span>Beta</span>
                                    </div>
                                    <div className="font-medium">{stockInfo.beta.toFixed(2)}</div>
                                </div>
                                <div>
                                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <DollarSign className="h-3.5 w-3.5" />
                                        <span>Dividend (Annual)</span>
                                    </div>
                                    <div className="font-medium">${stockInfo.dividend.toFixed(2)}</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <BarChartIcon className="h-3.5 w-3.5" />
                                        <span>Volume</span>
                                    </div>
                                    <div className="font-medium">{stockInfo.volume}</div>
                                </div>
                                <div>
                                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <BarChartIcon className="h-3.5 w-3.5" />
                                        <span>Avg. Volume</span>
                                    </div>
                                    <div className="font-medium">{stockInfo.avgVolume}</div>
                                </div>
                                <div>
                                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>52-Week High</span>
                                    </div>
                                    <div className="font-medium">${stockInfo.fiftyTwoWeekHigh.toFixed(2)}</div>
                                </div>
                                <div>
                                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>52-Week Low</span>
                                    </div>
                                    <div className="font-medium">${stockInfo.fiftyTwoWeekLow.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
