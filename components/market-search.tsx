'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, TrendingUp, ArrowUpRight, ArrowDownRight, Plus, X, Star, BarChart, PieChart } from 'lucide-react'

// Mock stock data
const stockData = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 191.56,
        change: 1.25,
        changePercent: 0.66,
        positive: true,
        sector: 'Technology',
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 417.88,
        change: 2.45,
        changePercent: 0.59,
        positive: true,
        sector: 'Technology',
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 152.19,
        change: 0.89,
        changePercent: 0.59,
        positive: true,
        sector: 'Technology',
    },
    {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 178.12,
        change: -1.23,
        changePercent: -0.69,
        positive: false,
        sector: 'Consumer Cyclical',
    },
    {
        symbol: 'META',
        name: 'Meta Platforms Inc.',
        price: 474.99,
        change: 3.56,
        changePercent: 0.75,
        positive: true,
        sector: 'Technology',
    },
    {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 193.57,
        change: -2.34,
        changePercent: -1.19,
        positive: false,
        sector: 'Automotive',
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 950.02,
        change: 15.67,
        changePercent: 1.68,
        positive: true,
        sector: 'Technology',
    },
    {
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        price: 198.47,
        change: 0.78,
        changePercent: 0.39,
        positive: true,
        sector: 'Financial Services',
    },
    {
        symbol: 'V',
        name: 'Visa Inc.',
        price: 275.96,
        change: -0.45,
        changePercent: -0.16,
        positive: false,
        sector: 'Financial Services',
    },
    {
        symbol: 'JNJ',
        name: 'Johnson & Johnson',
        price: 147.89,
        change: -0.67,
        changePercent: -0.45,
        positive: false,
        sector: 'Healthcare',
    },
    {
        symbol: 'WMT',
        name: 'Walmart Inc.',
        price: 59.86,
        change: 0.34,
        changePercent: 0.57,
        positive: true,
        sector: 'Consumer Defensive',
    },
    {
        symbol: 'PG',
        name: 'Procter & Gamble Co.',
        price: 162.45,
        change: 0.56,
        changePercent: 0.35,
        positive: true,
        sector: 'Consumer Defensive',
    },
    {
        symbol: 'XOM',
        name: 'Exxon Mobil Corporation',
        price: 113.49,
        change: -1.23,
        changePercent: -1.07,
        positive: false,
        sector: 'Energy',
    },
    {
        symbol: 'BAC',
        name: 'Bank of America Corp.',
        price: 38.75,
        change: 0.23,
        changePercent: 0.6,
        positive: true,
        sector: 'Financial Services',
    },
    {
        symbol: 'DIS',
        name: 'The Walt Disney Company',
        price: 111.95,
        change: 0.87,
        changePercent: 0.78,
        positive: true,
        sector: 'Communication Services',
    },
]

// Mock watchlists
const watchlists = [
    {
        name: 'Technology Leaders',
        symbols: ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META'],
    },
    {
        name: 'Dividend Stocks',
        symbols: ['JNJ', 'PG', 'XOM', 'JPM', 'WMT'],
    },
    {
        name: 'Growth Potential',
        symbols: ['TSLA', 'AMZN', 'NVDA', 'META'],
    },
]

// Mock trending stocks
const trendingStocks = ['NVDA', 'TSLA', 'META', 'AMZN', 'AAPL']

interface MarketSearchProps {
    searchQuery: string
    onSymbolSelect: (symbol: string) => void
    onAddComparison: (symbol: string) => void
    selectedSymbol: string | null
    comparisonSymbols: string[]
}

export function MarketSearch({ searchQuery, onSymbolSelect, onAddComparison, selectedSymbol, comparisonSymbols }: MarketSearchProps) {
    const [localSearch, setLocalSearch] = useState('')
    const [activeTab, setActiveTab] = useState('search')

    // Filter stocks based on search query
    const filteredStocks = stockData.filter((stock) => {
        const query = localSearch.toLowerCase() || searchQuery.toLowerCase()
        if (!query) return true

        return stock.symbol.toLowerCase().includes(query) || stock.name.toLowerCase().includes(query) || stock.sector.toLowerCase().includes(query)
    })

    return (
        <Card className="h-full">
            <CardHeader className="pb-3">
                <CardTitle>Market Explorer</CardTitle>
                <CardDescription>Search and analyze market data</CardDescription>
                <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search symbols, companies..."
                        className="w-full pl-8"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs
                    defaultValue="search"
                    onValueChange={setActiveTab}
                >
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger
                            value="search"
                            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Search
                        </TabsTrigger>
                        <TabsTrigger
                            value="watchlists"
                            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Watchlists
                        </TabsTrigger>
                        <TabsTrigger
                            value="trending"
                            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Trending
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="search"
                        className="p-0"
                    >
                        <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                            <div className="space-y-2">
                                {filteredStocks.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <Search className="mb-2 h-10 w-10 text-muted-foreground opacity-20" />
                                        <p className="text-muted-foreground">No results found</p>
                                        <p className="text-xs text-muted-foreground">Try a different search term</p>
                                    </div>
                                ) : (
                                    filteredStocks.map((stock) => (
                                        <div
                                            key={stock.symbol}
                                            className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50 ${selectedSymbol === stock.symbol ? 'border-primary bg-muted/50' : ''}`}
                                            onClick={() => onSymbolSelect(stock.symbol)}
                                        >
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{stock.symbol}</span>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {stock.sector}
                                                    </Badge>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{stock.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <div className="font-medium">${stock.price.toFixed(2)}</div>
                                                    <div className={`flex items-center text-xs ${stock.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                                                        {stock.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                                                        <span>{stock.changePercent.toFixed(2)}%</span>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onAddComparison(stock.symbol)
                                                    }}
                                                    disabled={comparisonSymbols.includes(stock.symbol) || selectedSymbol === stock.symbol}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent
                        value="watchlists"
                        className="p-0"
                    >
                        <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                            <div className="space-y-6">
                                {watchlists.map((watchlist) => (
                                    <div
                                        key={watchlist.name}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium">{watchlist.name}</h3>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 text-xs"
                                            >
                                                <PieChart className="mr-1 h-3.5 w-3.5" />
                                                Analyze
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            {watchlist.symbols.map((symbol) => {
                                                const stock = stockData.find((s) => s.symbol === symbol)
                                                if (!stock) return null

                                                return (
                                                    <div
                                                        key={stock.symbol}
                                                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50 ${selectedSymbol === stock.symbol ? 'border-primary bg-muted/50' : ''}`}
                                                        onClick={() => onSymbolSelect(stock.symbol)}
                                                    >
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium">{stock.symbol}</span>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground">{stock.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-right">
                                                                <div className="font-medium">${stock.price.toFixed(2)}</div>
                                                                <div className={`flex items-center text-xs ${stock.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                                                                    {stock.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                                                                    <span>{stock.changePercent.toFixed(2)}%</span>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-7 w-7"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    onAddComparison(stock.symbol)
                                                                }}
                                                                disabled={comparisonSymbols.includes(stock.symbol) || selectedSymbol === stock.symbol}
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create New Watchlist
                                </Button>
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent
                        value="trending"
                        className="p-0"
                    >
                        <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                            <div className="space-y-2">
                                <div className="mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    <h3 className="font-medium">Trending Today</h3>
                                </div>
                                {trendingStocks.map((symbol) => {
                                    const stock = stockData.find((s) => s.symbol === symbol)
                                    if (!stock) return null

                                    return (
                                        <div
                                            key={stock.symbol}
                                            className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50 ${selectedSymbol === stock.symbol ? 'border-primary bg-muted/50' : ''}`}
                                            onClick={() => onSymbolSelect(stock.symbol)}
                                        >
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{stock.symbol}</span>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {stock.sector}
                                                    </Badge>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{stock.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <div className="font-medium">${stock.price.toFixed(2)}</div>
                                                    <div className={`flex items-center text-xs ${stock.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                                                        {stock.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                                                        <span>{stock.changePercent.toFixed(2)}%</span>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onAddComparison(stock.symbol)
                                                    }}
                                                    disabled={comparisonSymbols.includes(stock.symbol) || selectedSymbol === stock.symbol}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>

                {activeTab !== 'search' && (
                    <div className="border-t p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-sm font-medium">Selected for Analysis</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                            >
                                <BarChart className="mr-1 h-3.5 w-3.5" />
                                Compare All
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {selectedSymbol && (
                                <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-2">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="default"
                                            className="h-6 px-2"
                                        >
                                            Primary
                                        </Badge>
                                        <span className="font-medium">{selectedSymbol}</span>
                                    </div>
                                    <Star className="h-4 w-4 text-amber-500" />
                                </div>
                            )}
                            {comparisonSymbols.map((symbol) => (
                                <div
                                    key={symbol}
                                    className="flex items-center justify-between rounded-lg border p-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="h-6 px-2"
                                        >
                                            Compare
                                        </Badge>
                                        <span className="font-medium">{symbol}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => onAddComparison(symbol)}
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
