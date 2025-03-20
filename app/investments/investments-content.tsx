'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card, CardContent } from '@/components/ui/card'

export function InvestmentsContent() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
            <DashboardHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title="Investments"
                description="Manage and monitor investment strategies"
            />

            <Card>
                <CardContent className="p-6">
                    <div className="flex h-[400px] items-center justify-center text-muted-foreground">Investments content would appear here</div>
                </CardContent>
            </Card>
        </div>
    )
}
