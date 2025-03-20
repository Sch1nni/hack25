'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useState } from 'react'

const clients = [
    {
        id: '1',
        name: 'Emma Thompson',
        email: 'emma.thompson@example.com',
        portfolioValue: '$2.4M',
        change: '+5.2%',
        positive: true,
        lastContact: '2 days ago',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'ET',
    },
    {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        portfolioValue: '$1.8M',
        change: '+3.7%',
        positive: true,
        lastContact: '1 week ago',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'MC',
    },
    {
        id: '3',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        portfolioValue: '$3.2M',
        change: '-1.3%',
        positive: false,
        lastContact: '3 days ago',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'SJ',
    },
    {
        id: '4',
        name: 'David Williams',
        email: 'david.williams@example.com',
        portfolioValue: '$5.1M',
        change: '+2.8%',
        positive: true,
        lastContact: 'Today',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'DW',
    },
    {
        id: '5',
        name: 'Jennifer Lee',
        email: 'jennifer.lee@example.com',
        portfolioValue: '$1.5M',
        change: '+4.1%',
        positive: true,
        lastContact: 'Yesterday',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'JL',
    },
]

interface ClientsSectionProps {
    onViewClient?: (clientId: string) => void
}

export function ClientsSection({ onViewClient }: ClientsSectionProps) {
    const [clientSearch, setClientSearch] = useState('')

    const filteredClients = clients.filter((client) => client.name.toLowerCase().includes(clientSearch.toLowerCase()) || client.email.toLowerCase().includes(clientSearch.toLowerCase()))

    return (
        <>
            {' '}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle className="mb-2">Client Portfolios</CardTitle>
                    <CardDescription>Overview of all client accounts and performance</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search clients..."
                            className="w-full pl-8"
                            value={clientSearch}
                            onChange={(e) => setClientSearch(e.target.value)}
                        />
                    </div>
                    {/* <Button size="sm">
              <Plus className="h-4 w-4" />
              Add Client
            </Button> */}
                </div>
            </div>
            <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 text-sm font-medium text-muted-foreground">
                    <div>Client</div>
                    <div>Portfolio Value</div>
                    <div>Change</div>
                    <div>Last Contact</div>
                    <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                    {filteredClients.map((client) => (
                        <div
                            key={client.id}
                            className="grid grid-cols-5 items-center p-4"
                        >
                            <div className="flex items-center gap-3">
                                <Avatar
                                    className="h-10 w-10"
                                    onClick={() => onViewClient && onViewClient(client.id)}
                                >
                                    <AvatarImage
                                        src={client.avatar}
                                        alt={client.name}
                                    />
                                    <AvatarFallback>{client.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div
                                        className="cursor-pointer font-medium transition-all duration-300 hover:text-info"
                                        onClick={() => onViewClient && onViewClient(client.id)}
                                    >
                                        {client.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{client.email}</div>
                                </div>
                            </div>
                            <div className="font-medium">{client.portfolioValue}</div>
                            <div>
                                <Badge
                                    variant="outline"
                                    className={client.positive ? 'text-emerald-500' : 'text-red-500'}
                                >
                                    <div className="flex items-center gap-1">
                                        {client.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                        {client.change}
                                    </div>
                                </Badge>
                            </div>
                            <div className="text-muted-foreground">{client.lastContact}</div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    style={{ backgroundColor: '#0a8ec9', color: 'white' }}
                                    size="sm"
                                    onClick={() => onViewClient && onViewClient(client.id)}
                                >
                                    View
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
