'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarView } from '@/components/calendar-view'

export function CalendarContent() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
            <DashboardHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title="Calendar"
                description="Schedule and manage appointments, regulations, and important events"
            />

            <CalendarView />
        </div>
    )
}
