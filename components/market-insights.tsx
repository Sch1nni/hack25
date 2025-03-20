'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const assetAllocationData = [
    { name: 'Equities', value: 45, color: '#0ea5e9' },
    { name: 'Fixed Income', value: 30, color: '#8b5cf6' },
    { name: 'Real Estate', value: 10, color: '#f97316' },
    { name: 'Alternatives', value: 10, color: '#10b981' },
    { name: 'Cash', value: 5, color: '#94a3b8' },
]

const sectorExposureData = [
    { name: 'Technology', value: 25, color: '#0ea5e9' },
    { name: 'Healthcare', value: 18, color: '#8b5cf6' },
    { name: 'Financials', value: 15, color: '#f97316' },
    { name: 'Consumer', value: 12, color: '#10b981' },
    { name: 'Energy', value: 10, color: '#eab308' },
    { name: 'Industrials', value: 8, color: '#ec4899' },
    { name: 'Materials', value: 7, color: '#6366f1' },
    { name: 'Utilities', value: 5, color: '#94a3b8' },
]

export function MarketInsights() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Current allocation across asset classes and sectors</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="asset-allocation">
                    <TabsList className="mb-4">
                        <TabsTrigger value="asset-allocation">Asset Allocation</TabsTrigger>
                        <TabsTrigger value="sector-exposure">Sector Exposure</TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="asset-allocation"
                        className="space-y-4"
                    >
                        <div className="h-[250px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart data={assetAllocationData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => `${value}%`} />
                                    <Tooltip
                                        formatter={(value: number) => [`${value}%`, '']}
                                        labelFormatter={(label) => `${label}`}
                                    />
                                    <Bar
                                        dataKey="value"
                                        radius={[4, 4, 0, 0]}
                                        fill={(entry) => entry.color}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {assetAllocationData.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between rounded-md border p-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent
                        value="sector-exposure"
                        className="space-y-4"
                    >
                        <div className="h-[250px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart data={sectorExposureData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => `${value}%`} />
                                    <Tooltip
                                        formatter={(value: number) => [`${value}%`, '']}
                                        labelFormatter={(label) => `${label}`}
                                    />
                                    <Bar
                                        dataKey="value"
                                        radius={[4, 4, 0, 0]}
                                        fill={(entry) => entry.color}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {sectorExposureData.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between rounded-md border p-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
