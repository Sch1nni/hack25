'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard-layout'
import { ClientsSection } from '@/components/clients-section'
import { DashboardHeader } from '@/components/dashboard-header'

export function ClientsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 p-6 md:p-8">
                <ClientsSection onViewClient={(clientId) => router.push(`/client/${clientId}`)} />
            </div>
        </DashboardLayout>
    )
}
