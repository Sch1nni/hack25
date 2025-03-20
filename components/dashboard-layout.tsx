'use client'

import type React from 'react'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '@/components/mode-toggle'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BarChart3, Home, Users, PieChart, Calendar, Settings, Bell, Briefcase, FileText, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { WaveForm } from './wave-form'
import { Spinner } from '@/components/ui/spinner'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [mounted, setMounted] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const pathname = usePathname()
    const [notificationCount, setNotificationCount] = useState(3)
    const [isRecording, setIsRecording] = useState(false)
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null)
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            setAudioStream(stream)
            setHasPermission(true)
            setIsRecording(true)
        } catch (err) {
            console.error('Error accessing microphone:', err)
            setHasPermission(false)
        }
    }, [])

    const stopRecording = useCallback(() => {
        if (audioStream) {
            // Call handleRecordingFinished before stopping the tracks
            if (audioStream.getAudioTracks()[0]) {
                console.log('Stopping recording and processing audio...')
                handleRecordingFinished(new Float32Array()) // This will be replaced by actual audio data from WaveForm
            }

            // Stop all tracks
            audioStream.getTracks().forEach((track) => track.stop())
            setAudioStream(null)
            setIsRecording(false)
            setIsProcessing(true)

            // Simulate API processing
            setTimeout(() => {
                const fakeResponse = {
                    text: 'This is a simulated voice transcription',
                    timestamp: new Date().toISOString(),
                }

                const customEvent = new CustomEvent('voiceRequestCompleted', {
                    detail: fakeResponse,
                })
                document.dispatchEvent(customEvent)

                setIsProcessing(false)
                setIsModalOpen(false)
            }, 2000)
        }
    }, [audioStream])

    const handleRecordingFinished = useCallback((audioData: Float32Array) => {
        console.log('Dashboard received recording data:', {
            dataLength: audioData.length,
            sampleData: audioData.slice(0, 10), // Show first 10 samples
        })
        // Process the audio data here...
    }, [])

    // Clean up audio stream when component unmounts
    useEffect(() => {
        return () => {
            if (audioStream) {
                audioStream.getTracks().forEach((track) => track.stop())
            }
        }
    }, [audioStream])

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
        // { path: '/investments', icon: Briefcase, label: 'Investments', active: pathname === '/investments' },
        { path: '/analytics', icon: PieChart, label: 'Analytics', active: pathname === '/analytics' },
        { path: '/calendar', icon: Calendar, label: 'Calendar', active: pathname === '/calendar' },
        { path: '/news', icon: FileText, label: 'News', active: pathname === '/news' },
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
                        <span className="font-semibold">SimpleSIX</span>
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

                    {/* <SidebarGroup>
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
                    </SidebarGroup> */}
                </SidebarContent>

                <SidebarFooter className="p-4">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="User"
                                className="object-cover"
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

                <main className="flex-1 overflow-auto">
                    {children}

                    {/* Floating Microphone Button */}
                    <Button
                        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Mic className="h-6 w-6" />
                    </Button>

                    {/* Voice Assistant Modal */}
                    <Dialog
                        open={isModalOpen}
                        onOpenChange={setIsModalOpen}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Voice Assistant</DialogTitle>
                                <DialogDescription>How can I help you today?</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center justify-center space-y-4 p-6">
                                {isRecording && (
                                    <div className="mb-4 w-full">
                                        <WaveForm
                                            audioStream={audioStream}
                                            onRecordingFinished={handleRecordingFinished}
                                        />
                                    </div>
                                )}

                                <Button
                                    className={`h-16 w-16 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                                    variant="outline"
                                    onClick={isRecording ? stopRecording : startRecording}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? <Spinner /> : isRecording ? <div className="h-6 w-6 bg-white" /> : <Mic className="h-8 w-8" />}
                                </Button>

                                {hasPermission === false && <p className="text-sm text-red-500">Microphone access denied. Please enable microphone access in your browser settings.</p>}

                                {isProcessing ? <p className="text-sm text-muted-foreground">Processing your request...</p> : !isRecording && <p className="text-sm text-muted-foreground">Click to start speaking</p>}
                            </div>
                        </DialogContent>
                    </Dialog>
                </main>
            </div>
        </div>
    )
}
