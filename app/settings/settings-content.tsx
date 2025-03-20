'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card, CardContent } from '@/components/ui/card'

export function SettingsContent() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
            <DashboardHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title="Settings"
                description="Manage account and application settings"
            />

            <Card>
                <CardContent className="p-6">
                    <div className="flex h-[400px] items-center justify-center text-muted-foreground">Settings content would appear here</div>
                </CardContent>
            </Card>
        </div>
    )
}
