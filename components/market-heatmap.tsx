'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react'

// Mock sector data
const sectorData = [
    { name: 'Technology', change: 1.25, marketCap: 12.5, positive: true },
    { name: 'Healthcare', change: 0.75, marketCap: 8.2, positive: true },
    { name: 'Financials', change: -0.45, marketCap: 7.8, positive: false },
    { name: 'Consumer Discretionary', change: 0.95, marketCap: 6.5, positive: true },
    { name: 'Communication Services', change: 1.35, marketCap: 5.9, positive: true },
    { name: 'Industrials', change: 0.25, marketCap: 5.2, positive: true },
    { name: 'Consumer Staples', change: -0.15, marketCap: 4.8, positive: false },
    { name: 'Energy', change: -1.25, marketCap: 4.2, positive: false },
    { name: 'Utilities', change: -0.35, marketCap: 3.1, positive: false },
    { name: 'Real Estate', change: 0.55, marketCap: 2.9, positive: true },
    { name: 'Materials', change: -0.65, marketCap: 2.5, positive: false },
]

// Mock stock data
const stocksData = [
    { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', change: 0.66, marketCap: 2.98, positive: true },
    { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', change: 0.59, marketCap: 3.11, positive: true },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        sector: 'Communication Services',
        change: 0.59,
        marketCap: 1.89,
        positive: true,
    },
    {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        sector: 'Consumer Discretionary',
        change: -0.69,
        marketCap: 1.85,
        positive: false,
    },
    {
        symbol: 'META',
        name: 'Meta Platforms Inc.',
        sector: 'Communication Services',
        change: 0.75,
        marketCap: 1.21,
        positive: true,
    },
    {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        sector: 'Consumer Discretionary',
        change: -1.19,
        marketCap: 0.78,
        positive: false,
    },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', change: 1.68, marketCap: 2.34, positive: true },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financials', change: 0.39, marketCap: 0.51, positive: true },
    { symbol: 'V', name: 'Visa Inc.', sector: 'Financials', change: -0.16, marketCap: 0.49, positive: false },
    { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', change: -0.45, marketCap: 0.38, positive: false },
    { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer Staples', change: 0.57, marketCap: 0.42, positive: true },
    {
        symbol: 'PG',
        name: 'Procter & Gamble Co.',
        sector: 'Consumer Staples',
        change: 0.35,
        marketCap: 0.35,
        positive: true,
    },
    { symbol: 'XOM', name: 'Exxon Mobil Corp.', sector: 'Energy', change: -1.07, marketCap: 0.45, positive: false },
    { symbol: 'BAC', name: 'Bank of America Corp.', sector: 'Financials', change: 0.6, marketCap: 0.28, positive: true },
    {
        symbol: 'DIS',
        name: 'Walt Disney Co.',
        sector: 'Communication Services',
        change: 0.78,
        marketCap: 0.19,
        positive: true,
    },
    { symbol: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare', change: -0.25, marketCap: 0.16, positive: false },
    { symbol: 'CSCO', name: 'Cisco Systems Inc.', sector: 'Technology', change: 0.42, marketCap: 0.21, positive: true },
    { symbol: 'ADBE', name: 'Adobe Inc.', sector: 'Technology', change: 1.25, marketCap: 0.26, positive: true },
    {
        symbol: 'NFLX',
        name: 'Netflix Inc.',
        sector: 'Communication Services',
        change: 0.95,
        marketCap: 0.25,
        positive: true,
    },
    { symbol: 'INTC', name: 'Intel Corp.', sector: 'Technology', change: -0.85, marketCap: 0.19, positive: false },
]

export function MarketHeatmap() {
    const [view, setView] = useState('sectors')
    const [sortBy, setSortBy] = useState('marketCap')

    // Sort data based on selected criteria
    const sortedSectorData = [...sectorData].sort((a, b) => {
        if (sortBy === 'marketCap') {
            return b.marketCap - a.marketCap
        } else if (sortBy === 'performance') {
            return b.change - a.change
        } else {
            return a.name.localeCompare(b.name)
        }
    })

    const sortedStocksData = [...stocksData].sort((a, b) => {
        if (sortBy === 'marketCap') {
            return b.marketCap - a.marketCap
        } else if (sortBy === 'performance') {
            return b.change - a.change
        } else {
            return a.symbol.localeCompare(b.symbol)
        }
    })

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle>Market Heatmap</CardTitle>
                    <div className="flex items-center gap-2">
                        <Tabs
                            defaultValue="sectors"
                            onValueChange={setView}
                        >
                            <TabsList>
                                <TabsTrigger value="sectors">Sectors</TabsTrigger>
                                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Button
                            variant="outline"
                            size="sm"
                            className={sortBy === 'marketCap' ? 'bg-muted' : ''}
                            onClick={() => setSortBy('marketCap')}
                        >
                            Size
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className={sortBy === 'performance' ? 'bg-muted' : ''}
                            onClick={() => setSortBy('performance')}
                        >
                            Performance
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {view === 'sectors' ? (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                        {sortedSectorData.map((sector) => (
                            <div
                                key={sector.name}
                                className={`rounded-lg border p-3 ${sector.positive ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}
                            >
                                <div className="mb-1 flex items-center justify-between">
                                    <div className="truncate text-sm font-medium">{sector.name}</div>
                                    <div className={`flex items-center text-xs ${sector.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {sector.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                                        <span>{sector.change.toFixed(2)}%</span>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground">Market Cap: ${sector.marketCap.toFixed(1)}T</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                        {sortedStocksData.map((stock) => (
                            <div
                                key={stock.symbol}
                                className={`rounded-lg border p-3 ${stock.positive ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}
                            >
                                <div className="mb-1 flex items-center justify-between">
                                    <div className="text-sm font-medium">{stock.symbol}</div>
                                    <div className={`flex items-center text-xs ${stock.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {stock.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                                        <span>{stock.change.toFixed(2)}%</span>
                                    </div>
                                </div>
                                <div className="truncate text-xs text-muted-foreground">{stock.name}</div>
                                <div className="mt-1 flex items-center justify-between">
                                    <Badge
                                        variant="outline"
                                        className="text-[10px]"
                                    >
                                        {stock.sector}
                                    </Badge>
                                    <div className="text-xs text-muted-foreground">${stock.marketCap.toFixed(2)}T</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5" />
                    <span>Market data as of 5:00 PM ET. Source: Financial Data Provider</span>
                </div>
            </CardContent>
        </Card>
    )
}
