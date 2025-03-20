'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '@/components/mode-toggle'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BarChart3, Home, Users, PieChart, Calendar, Settings, Bell, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const [notificationCount, setNotificationCount] = useState(3)

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const routes = [
        { path: '/', icon: Home, label: 'Dashboard', active: pathname === '/' },
        {
            path: '/clients',
            icon: Users,
            label: 'Clients',
            active: pathname === '/clients' || pathname.startsWith('/client/'),
        },
        { path: '/investments', icon: Briefcase, label: 'Investments', active: pathname === '/investments' },
        { path: '/analytics', icon: PieChart, label: 'Analytics', active: pathname === '/analytics' },
        { path: '/calendar', icon: Calendar, label: 'Calendar', active: pathname === '/calendar' },
    ]

    const notifications = [
        {
            id: 1,
            title: 'Portfolio Rebalancing Alert',
            description: 'Your equity allocation has drifted 5% above target',
            time: '10 minutes ago',
            unread: true,
        },
        {
            id: 2,
            title: 'New Client Request',
            description: 'Sarah Johnson has requested a meeting',
            time: '1 hour ago',
            unread: true,
        },
        {
            id: 3,
            title: 'Market Volatility Alert',
            description: 'Unusual volatility detected in technology sector',
            time: '3 hours ago',
            unread: true,
        },
        {
            id: 4,
            title: 'Document Signed',
            description: 'Michael Chen signed the investment policy statement',
            time: 'Yesterday',
            unread: false,
        },
        {
            id: 5,
            title: 'Quarterly Report Ready',
            description: 'Q1 performance reports are ready for review',
            time: '2 days ago',
            unread: false,
        },
    ]

    const markAllAsRead = () => {
        setNotificationCount(0)
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar
                variant="floating"
                collapsible="icon"
            >
                <SidebarHeader className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                            <BarChart3 className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="font-semibold">WealthAI</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {routes.map((route) => (
                                    <SidebarMenuItem key={route.path}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={route.active}
                                            tooltip={route.label}
                                        >
                                            <Link href={route.path}>
                                                <route.icon className="h-4 w-4" />
                                                <span>{route.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel>Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip="Settings"
                                        isActive={pathname === '/settings'}
                                    >
                                        <Link href="/settings">
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="p-4">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src="/placeholder.svg?height=32&width=32"
                                alt="User"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">John Doe</span>
                            <span className="text-xs text-muted-foreground">Senior Advisor</span>
                        </div>
                    </div>
                </SidebarFooter>
            </Sidebar>

            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
                    <SidebarTrigger />
                    <div className="flex-1" />
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="relative"
                                >
                                    <Bell className="h-4 w-4" />
                                    {notificationCount > 0 && <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center p-0 text-[10px]">{notificationCount}</Badge>}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-80"
                            >
                                <div className="flex items-center justify-between p-2">
                                    <div className="text-sm font-medium">Notifications</div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={markAllAsRead}
                                        className="h-auto text-xs"
                                    >
                                        Mark all as read
                                    </Button>
                                </div>
                                <div className="max-h-[400px] overflow-auto">
                                    {notifications.map((notification) => (
                                        <DropdownMenuItem
                                            key={notification.id}
                                            className="flex cursor-pointer flex-col items-start p-3"
                                        >
                                            <div className="flex w-full justify-between">
                                                <div className="text-sm font-medium">{notification.title}</div>
                                                {notification.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                                            </div>
                                            <div className="mt-1 text-xs text-muted-foreground">{notification.description}</div>
                                            <div className="mt-1 text-xs text-muted-foreground">{notification.time}</div>
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                                <div className="border-t p-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs"
                                    >
                                        View all notifications
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* <ModeToggle /> */}
                    </div>
                </header>

                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    )
}
