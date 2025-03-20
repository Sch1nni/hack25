'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChartIcon, Percent, DollarSign, X } from 'lucide-react'

// Mock stock data for comparison
const stocksData = {
    AAPL: {
        name: 'Apple Inc.',
        price: 191.56,
        change: 1.25,
        changePercent: 0.66,
        positive: true,
        marketCap: '2.98T',
        peRatio: 31.45,
        dividendYield: 0.5,
        beta: 1.28,
        yearToDateReturn: 47.2,
        oneYearReturn: 52.8,
        threeYearReturn: 78.5,
        fiveYearReturn: 365.2,
        revenue: 383.29,
        revenueGrowth: 8.1,
        grossMargin: 44.1,
        operatingMargin: 30.3,
        netMargin: 25.3,
        debtToEquity: 1.76,
        currentRatio: 0.99,
        quickRatio: 0.94,
        roe: 160.09,
        roa: 28.3,
    },
    MSFT: {
        name: 'Microsoft Corporation',
        price: 417.88,
        change: 2.45,
        changePercent: 0.59,
        positive: true,
        marketCap: '3.11T',
        peRatio: 36.22,
        dividendYield: 0.71,
        beta: 0.95,
        yearToDateReturn: 39.8,
        oneYearReturn: 62.1,
        threeYearReturn: 92.3,
        fiveYearReturn: 331.7,
        revenue: 211.92,
        revenueGrowth: 16.6,
        grossMargin: 69.3,
        operatingMargin: 42.0,
        netMargin: 34.1,
        debtToEquity: 0.35,
        currentRatio: 1.66,
        quickRatio: 1.59,
        roe: 38.83,
        roa: 18.93,
    },
    GOOGL: {
        name: 'Alphabet Inc.',
        price: 152.19,
        change: 0.89,
        changePercent: 0.59,
        positive: true,
        marketCap: '1.89T',
        peRatio: 26.12,
        dividendYield: 0.51,
        beta: 1.05,
        yearToDateReturn: 51.3,
        oneYearReturn: 58.7,
        threeYearReturn: 45.2,
        fiveYearReturn: 201.8,
        revenue: 307.39,
        revenueGrowth: 13.5,
        grossMargin: 55.6,
        operatingMargin: 28.8,
        netMargin: 24.0,
        debtToEquity: 0.06,
        currentRatio: 2.15,
        quickRatio: 2.1,
        roe: 25.19,
        roa: 17.21,
    },
    AMZN: {
        name: 'Amazon.com Inc.',
        price: 178.12,
        change: -1.23,
        changePercent: -0.69,
        positive: false,
        marketCap: '1.85T',
        peRatio: 61.42,
        dividendYield: 0.0,
        beta: 1.22,
        yearToDateReturn: 36.2,
        oneYearReturn: 78.9,
        threeYearReturn: 31.7,
        fiveYearReturn: 156.3,
        revenue: 574.78,
        revenueGrowth: 12.3,
        grossMargin: 46.8,
        operatingMargin: 7.8,
        netMargin: 5.2,
        debtToEquity: 0.45,
        currentRatio: 1.05,
        quickRatio: 0.84,
        roe: 19.75,
        roa: 5.98,
    },
    META: {
        name: 'Meta Platforms Inc.',
        price: 474.99,
        change: 3.56,
        changePercent: 0.75,
        positive: true,
        marketCap: '1.21T',
        peRatio: 27.31,
        dividendYield: 0.42,
        beta: 1.33,
        yearToDateReturn: 138.7,
        oneYearReturn: 165.2,
        threeYearReturn: 89.1,
        fiveYearReturn: 178.4,
        revenue: 134.9,
        revenueGrowth: 27.0,
        grossMargin: 81.2,
        operatingMargin: 38.3,
        netMargin: 32.6,
        debtToEquity: 0.09,
        currentRatio: 2.68,
        quickRatio: 2.6,
        roe: 28.7,
        roa: 22.12,
    },
    NVDA: {
        name: 'NVIDIA Corporation',
        price: 950.02,
        change: 15.67,
        changePercent: 1.68,
        positive: true,
        marketCap: '2.34T',
        peRatio: 55.88,
        dividendYield: 0.03,
        beta: 1.75,
        yearToDateReturn: 291.8,
        oneYearReturn: 226.5,
        threeYearReturn: 651.2,
        fiveYearReturn: 1980.3,
        revenue: 60.92,
        revenueGrowth: 265.3,
        grossMargin: 74.5,
        operatingMargin: 54.4,
        netMargin: 48.9,
        debtToEquity: 0.21,
        currentRatio: 3.59,
        quickRatio: 3.29,
        roe: 83.31,
        roa: 51.02,
    },
}

// Historical performance data for comparison
const performanceData = [
    { date: 'Jan', AAPL: 170.33, MSFT: 310.2, GOOGL: 135.12, AMZN: 155.54, META: 390.12, NVDA: 450.33 },
    { date: 'Feb', AAPL: 165.12, MSFT: 315.75, GOOGL: 132.45, AMZN: 150.22, META: 385.67, NVDA: 470.88 },
    { date: 'Mar', AAPL: 175.88, MSFT: 325.22, GOOGL: 138.78, AMZN: 158.33, META: 405.45, NVDA: 510.22 },
    { date: 'Apr', AAPL: 169.59, MSFT: 330.45, GOOGL: 140.23, AMZN: 160.78, META: 410.33, NVDA: 530.45 },
    { date: 'May', AAPL: 177.25, MSFT: 335.67, GOOGL: 142.56, AMZN: 165.45, META: 420.78, NVDA: 580.33 },
    { date: 'Jun', AAPL: 185.01, MSFT: 345.22, GOOGL: 145.78, AMZN: 170.22, META: 430.45, NVDA: 620.78 },
    { date: 'Jul', AAPL: 193.22, MSFT: 355.45, GOOGL: 148.33, AMZN: 175.67, META: 440.22, NVDA: 680.45 },
    { date: 'Aug', AAPL: 187.87, MSFT: 365.78, GOOGL: 145.67, AMZN: 172.33, META: 435.67, NVDA: 720.22 },
    { date: 'Sep', AAPL: 174.79, MSFT: 370.33, GOOGL: 142.22, AMZN: 168.78, META: 425.33, NVDA: 750.67 },
    { date: 'Oct', AAPL: 182.66, MSFT: 380.67, GOOGL: 146.45, AMZN: 172.45, META: 440.78, NVDA: 800.33 },
    { date: 'Nov', AAPL: 189.37, MSFT: 395.22, GOOGL: 149.78, AMZN: 176.33, META: 455.45, NVDA: 880.78 },
    { date: 'Dec', AAPL: 191.56, MSFT: 417.88, GOOGL: 152.19, AMZN: 178.12, META: 474.99, NVDA: 950.02 },
]

// Normalized performance data (starting at 100)
const normalizedPerformanceData = performanceData.map((point) => {
    const firstPoint = performanceData[0]
    return {
        date: point.date,
        AAPL: (point.AAPL / firstPoint.AAPL) * 100,
        MSFT: (point.MSFT / firstPoint.MSFT) * 100,
        GOOGL: (point.GOOGL / firstPoint.GOOGL) * 100,
        AMZN: (point.AMZN / firstPoint.AMZN) * 100,
        META: (point.META / firstPoint.META) * 100,
        NVDA: (point.NVDA / firstPoint.NVDA) * 100,
    }
})

// Financial metrics for radar chart
const getFinancialMetricsData = (symbols) => {
    return [
        { metric: 'P/E Ratio', ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].peRatio }), {}) },
        {
            metric: 'Revenue Growth',
            ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].revenueGrowth }), {}),
        },
        {
            metric: 'Gross Margin',
            ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].grossMargin }), {}),
        },
        {
            metric: 'Operating Margin',
            ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].operatingMargin }), {}),
        },
        {
            metric: 'Net Margin',
            ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].netMargin }), {}),
        },
        { metric: 'ROE', ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].roe / 10 }), {}) }, // Scaled down for visualization
    ]
}

// Return metrics for bar chart
const getReturnMetricsData = (symbols) => {
    return [
        {
            period: 'YTD',
            ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].yearToDateReturn }), {}),
        },
        {
            period: '1 Year',
            ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].oneYearReturn }), {}),
        },
        {
            period: '3 Year',
            ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].threeYearReturn }), {}),
        },
        {
            period: '5 Year',
            ...symbols.reduce((acc, symbol) => ({ ...acc, [symbol]: stocksData[symbol].fiveYearReturn }), {}),
        },
    ]
}

// Colors for each stock
const stockColors = {
    AAPL: '#0ea5e9',
    MSFT: '#8b5cf6',
    GOOGL: '#f97316',
    AMZN: '#10b981',
    META: '#eab308',
    NVDA: '#ec4899',
}

interface StockComparisonProps {
    symbols: string[]
    onRemoveSymbol: (symbol: string) => void
}

export function StockComparison({ symbols, onRemoveSymbol }: StockComparisonProps) {
    const [comparisonType, setComparisonType] = useState('price')
    const [timeRange, setTimeRange] = useState('1Y')

    // Filter to only include valid symbols that exist in our data
    const validSymbols = symbols.filter((symbol) => stocksData[symbol])

    // Generate financial metrics data for the valid symbols
    const financialMetricsData = getFinancialMetricsData(validSymbols)

    // Generate return metrics data for the valid symbols
    const returnMetricsData = getReturnMetricsData(validSymbols)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle>Stock Comparison</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className={comparisonType === 'price' ? 'bg-muted' : ''}
                                onClick={() => setComparisonType('price')}
                            >
                                Price
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={comparisonType === 'normalized' ? 'bg-muted' : ''}
                                onClick={() => setComparisonType('normalized')}
                            >
                                Normalized
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={comparisonType === 'returns' ? 'bg-muted' : ''}
                                onClick={() => setComparisonType('returns')}
                            >
                                Returns
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={comparisonType === 'financials' ? 'bg-muted' : ''}
                                onClick={() => setComparisonType('financials')}
                            >
                                Financials
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {comparisonType === 'price' && (
                        <div className="h-[400px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <LineChart data={performanceData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, '']} />
                                    <Legend />
                                    {validSymbols.map((symbol) => (
                                        <Line
                                            key={symbol}
                                            type="monotone"
                                            dataKey={symbol}
                                            name={`${symbol} - ${stocksData[symbol].name}`}
                                            stroke={stockColors[symbol]}
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {comparisonType === 'normalized' && (
                        <div className="h-[400px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <LineChart data={normalizedPerformanceData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="date" />
                                    <YAxis domain={[80, 'dataMax + 20']} />
                                    <Tooltip formatter={(value: number) => [`${value.toFixed(2)}`, '']} />
                                    <Legend />
                                    {validSymbols.map((symbol) => (
                                        <Line
                                            key={symbol}
                                            type="monotone"
                                            dataKey={symbol}
                                            name={`${symbol} - ${stocksData[symbol].name}`}
                                            stroke={stockColors[symbol]}
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {comparisonType === 'returns' && (
                        <div className="h-[400px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart data={returnMetricsData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="period" />
                                    <YAxis tickFormatter={(value) => `${value}%`} />
                                    <Tooltip formatter={(value: number) => [`${value.toFixed(2)}%`, '']} />
                                    <Legend />
                                    {validSymbols.map((symbol) => (
                                        <Bar
                                            key={symbol}
                                            dataKey={symbol}
                                            name={`${symbol} - ${stocksData[symbol].name}`}
                                            fill={stockColors[symbol]}
                                        />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {comparisonType === 'financials' && (
                        <div className="h-[400px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <RadarChart data={financialMetricsData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="metric" />
                                    <PolarRadiusAxis />
                                    {validSymbols.map((symbol) => (
                                        <Radar
                                            key={symbol}
                                            name={`${symbol} - ${stocksData[symbol].name}`}
                                            dataKey={symbol}
                                            stroke={stockColors[symbol]}
                                            fill={stockColors[symbol]}
                                            fillOpacity={0.2}
                                        />
                                    ))}
                                    <Legend />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {validSymbols.map((symbol) => (
                    <Card key={symbol}>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <span>{symbol}</span>
                                    <Badge
                                        variant="outline"
                                        style={{ color: stockColors[symbol], borderColor: stockColors[symbol] }}
                                    >
                                        {stocksData[symbol].name}
                                    </Badge>
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => onRemoveSymbol(symbol)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">${stocksData[symbol].price.toFixed(2)}</span>
                                    <div className={`flex items-center gap-1 ${stocksData[symbol].positive ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {stocksData[symbol].positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                        <span>{stocksData[symbol].changePercent.toFixed(2)}%</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-1">
                                        <BarChartIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-muted-foreground">Market Cap:</span>
                                    </div>
                                    <div className="text-right">${stocksData[symbol].marketCap}</div>

                                    <div className="flex items-center gap-1">
                                        <Percent className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-muted-foreground">P/E Ratio:</span>
                                    </div>
                                    <div className="text-right">{stocksData[symbol].peRatio.toFixed(2)}</div>

                                    <div className="flex items-center gap-1">
                                        <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-muted-foreground">Dividend:</span>
                                    </div>
                                    <div className="text-right">{stocksData[symbol].dividendYield.toFixed(2)}%</div>

                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-muted-foreground">YTD Return:</span>
                                    </div>
                                    <div className="text-right">{stocksData[symbol].yearToDateReturn.toFixed(2)}%</div>
                                </div>

                                <div className="border-t pt-2">
                                    <div className="mb-1 text-xs font-medium">Performance vs. S&P 500</div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="h-full rounded-full bg-primary"
                                                style={{
                                                    width: `${Math.min(100, stocksData[symbol].yearToDateReturn / 2)}%`,
                                                    backgroundColor: stockColors[symbol],
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-xs">{(stocksData[symbol].yearToDateReturn - 20).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>Key Metrics Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-3 py-2 text-left font-medium">Metric</th>
                                    {validSymbols.map((symbol) => (
                                        <th
                                            key={symbol}
                                            className="px-3 py-2 text-right font-medium"
                                        >
                                            <div className="flex items-center justify-end gap-1">
                                                <span>{symbol}</span>
                                                <div
                                                    className="h-2 w-2 rounded-full"
                                                    style={{ backgroundColor: stockColors[symbol] }}
                                                ></div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-3 py-2 text-muted-foreground">P/E Ratio</td>
                                    {validSymbols.map((symbol) => (
                                        <td
                                            key={symbol}
                                            className="px-3 py-2 text-right"
                                        >
                                            {stocksData[symbol].peRatio.toFixed(2)}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="px-3 py-2 text-muted-foreground">Revenue Growth</td>
                                    {validSymbols.map((symbol) => (
                                        <td
                                            key={symbol}
                                            className="px-3 py-2 text-right"
                                        >
                                            {stocksData[symbol].revenueGrowth.toFixed(1)}%
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="px-3 py-2 text-muted-foreground">Gross Margin</td>
                                    {validSymbols.map((symbol) => (
                                        <td
                                            key={symbol}
                                            className="px-3 py-2 text-right"
                                        >
                                            {stocksData[symbol].grossMargin.toFixed(1)}%
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="px-3 py-2 text-muted-foreground">Operating Margin</td>
                                    {validSymbols.map((symbol) => (
                                        <td
                                            key={symbol}
                                            className="px-3 py-2 text-right"
                                        >
                                            {stocksData[symbol].operatingMargin.toFixed(1)}%
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="px-3 py-2 text-muted-foreground">Net Margin</td>
                                    {validSymbols.map((symbol) => (
                                        <td
                                            key={symbol}
                                            className="px-3 py-2 text-right"
                                        >
                                            {stocksData[symbol].netMargin.toFixed(1)}%
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="px-3 py-2 text-muted-foreground">ROE</td>
                                    {validSymbols.map((symbol) => (
                                        <td
                                            key={symbol}
                                            className="px-3 py-2 text-right"
                                        >
                                            {stocksData[symbol].roe.toFixed(2)}%
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="px-3 py-2 text-muted-foreground">ROA</td>
                                    {validSymbols.map((symbol) => (
                                        <td
                                            key={symbol}
                                            className="px-3 py-2 text-right"
                                        >
                                            {stocksData[symbol].roa.toFixed(2)}%
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="px-3 py-2 text-muted-foreground">Debt to Equity</td>
                                    {validSymbols.map((symbol) => (
                                        <td
                                            key={symbol}
                                            className="px-3 py-2 text-right"
                                        >
                                            {stocksData[symbol].debtToEquity.toFixed(2)}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="px-3 py-2 text-muted-foreground">Current Ratio</td>
                                    {validSymbols.map((symbol) => (
                                        <td
                                            key={symbol}
                                            className="px-3 py-2 text-right"
                                        >
                                            {stocksData[symbol].currentRatio.toFixed(2)}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
