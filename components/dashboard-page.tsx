'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { PortfolioOverview } from '@/components/portfolio-overview'
import { AIInsights } from '@/components/ai-insights'
import { RecentActivity } from '@/components/recent-activity'
import { DashboardHeader } from '@/components/dashboard-header'
import { ClientsSection } from '@/components/clients-section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'

export function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 p-6 md:p-8">
                <DashboardHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <Tabs
                    defaultValue="overview"
                    className="w-full"
                >
                    {/* <TabsList className="mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="clients">Clients</TabsTrigger>
                    </TabsList> */}

                    <TabsContent
                        value="overview"
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="md:col-span-2">
                                <PortfolioOverview />
                            </div>
                            <div className="md:col-span-1">
                                <AIInsights />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="md:col-span-2">{/* <RecentActivity /> */}</div>
                            <div className="md:col-span-1">
                                <RecentActivity />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="clients">
                        <ClientsSection onViewClient={(clientId) => router.push(`/client/${clientId}`)} />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
