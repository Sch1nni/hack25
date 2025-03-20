'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { DashboardHeader } from '@/components/dashboard-header'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MarketSearch } from '@/components/market-search'
import { StockDetail } from '@/components/stock-detail'
import { MarketHeatmap } from '@/components/market-heatmap'
import { TechnicalAnalysis } from '@/components/technical-analysis'
import { StockComparison } from '@/components/stock-comparison'
import { SectorAnalysis } from '@/components/sector-analysis'
import { EconomicIndicators } from '@/components/economic-indicators'
import { MarketBreadth } from '@/components/market-breadth'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Maximize2, Download, Share2 } from 'lucide-react'

export function AnalyticsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>('AAPL')
    const [comparisonSymbols, setComparisonSymbols] = useState<string[]>(['MSFT', 'GOOGL'])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('market-overview')

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const handleSymbolSelect = (symbol: string) => {
        setSelectedSymbol(symbol)
        setActiveTab('stock-detail')
    }

    const handleAddComparison = (symbol: string) => {
        if (!comparisonSymbols.includes(symbol) && symbol !== selectedSymbol) {
            setComparisonSymbols((prev) => [...prev, symbol])
        }
    }

    const handleRemoveComparison = (symbol: string) => {
        setComparisonSymbols((prev) => prev.filter((s) => s !== symbol))
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 p-6 md:p-8">
                <DashboardHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    title="Market Analytics"
                    description="Deep dive into market data, technical analysis, and economic indicators"
                />

                <div className="flex flex-col gap-6 md:flex-row">
                    <div className="w-full md:w-1/4">
                        <MarketSearch
                            searchQuery={searchQuery}
                            onSymbolSelect={handleSymbolSelect}
                            onAddComparison={handleAddComparison}
                            selectedSymbol={selectedSymbol}
                            comparisonSymbols={comparisonSymbols}
                        />
                    </div>

                    <div className="w-full md:w-3/4">
                        <Card className="mb-6">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle>{activeTab === 'stock-detail' && selectedSymbol ? `${selectedSymbol} - Apple Inc.` : activeTab === 'comparison' ? 'Stock Comparison' : activeTab === 'technical' ? 'Technical Analysis' : 'Market Overview'}</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                        >
                                            <Maximize2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                        >
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardDescription>{activeTab === 'stock-detail' && selectedSymbol ? 'Detailed analysis and performance metrics' : activeTab === 'comparison' ? 'Compare multiple securities side by side' : activeTab === 'technical' ? 'Advanced technical indicators and patterns' : 'Overall market performance and sector analysis'}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Tabs
                                    value={activeTab}
                                    onValueChange={setActiveTab}
                                    className="w-full"
                                >
                                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                                        <TabsTrigger
                                            value="market-overview"
                                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                        >
                                            Market Overview
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="stock-detail"
                                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                        >
                                            Stock Detail
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="technical"
                                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                        >
                                            Technical Analysis
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="comparison"
                                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                        >
                                            Comparison
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                        value="market-overview"
                                        className="p-6"
                                    >
                                        {loading ? (
                                            <div className="space-y-4">
                                                <Skeleton className="h-[400px] w-full" />
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    <Skeleton className="h-[200px]" />
                                                    <Skeleton className="h-[200px]" />
                                                    <Skeleton className="h-[200px]" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <MarketHeatmap />
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <SectorAnalysis />
                                                    <MarketBreadth />
                                                </div>
                                                <EconomicIndicators />
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent
                                        value="stock-detail"
                                        className="p-6"
                                    >
                                        {loading ? (
                                            <div className="space-y-4">
                                                <Skeleton className="h-[400px] w-full" />
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    <Skeleton className="h-[200px]" />
                                                    <Skeleton className="h-[200px]" />
                                                    <Skeleton className="h-[200px]" />
                                                </div>
                                            </div>
                                        ) : (
                                            <StockDetail symbol={selectedSymbol || 'AAPL'} />
                                        )}
                                    </TabsContent>

                                    <TabsContent
                                        value="technical"
                                        className="p-6"
                                    >
                                        {loading ? (
                                            <div className="space-y-4">
                                                <Skeleton className="h-[400px] w-full" />
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <Skeleton className="h-[200px]" />
                                                    <Skeleton className="h-[200px]" />
                                                </div>
                                            </div>
                                        ) : (
                                            <TechnicalAnalysis symbol={selectedSymbol || 'AAPL'} />
                                        )}
                                    </TabsContent>

                                    <TabsContent
                                        value="comparison"
                                        className="p-6"
                                    >
                                        {loading ? (
                                            <div className="space-y-4">
                                                <Skeleton className="h-[400px] w-full" />
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    <Skeleton className="h-[200px]" />
                                                    <Skeleton className="h-[200px]" />
                                                    <Skeleton className="h-[200px]" />
                                                </div>
                                            </div>
                                        ) : (
                                            <StockComparison
                                                symbols={[selectedSymbol || 'AAPL', ...comparisonSymbols]}
                                                onRemoveSymbol={handleRemoveComparison}
                                            />
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
