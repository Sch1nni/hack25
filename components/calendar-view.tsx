'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronLeft, ChevronRight, Plus, Users, AlertTriangle, Newspaper, Clock, CalendarIcon, Video, Phone, User } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns'

// Mock data for calendar events
const calendarEvents = [
    // Client appointments
    {
        id: 1,
        type: 'appointment',
        title: 'Portfolio Review with Emma Thompson',
        date: '2025-03-22T10:00:00',
        endDate: '2025-03-22T11:00:00',
        client: {
            id: '1',
            name: 'Emma Thompson',
            avatar: '/placeholder.svg?height=32&width=32',
            initials: 'ET',
        },
        location: 'Video Call',
        description: 'Quarterly portfolio review and discussion of retirement goals',
        status: 'confirmed',
    },
    {
        id: 2,
        type: 'appointment',
        title: 'Financial Planning with Michael Chen',
        date: '2025-03-25T14:30:00',
        endDate: '2025-03-25T15:30:00',
        client: {
            id: '2',
            name: 'Michael Chen',
            avatar: '/placeholder.svg?height=32&width=32',
            initials: 'MC',
        },
        location: 'Office',
        description: 'Annual financial planning session and tax strategy discussion',
        status: 'confirmed',
    },
    {
        id: 3,
        type: 'appointment',
        title: 'Estate Planning with Sarah Johnson',
        date: '2025-03-18T11:00:00',
        endDate: '2025-03-18T12:00:00',
        client: {
            id: '3',
            name: 'Sarah Johnson',
            avatar: '/placeholder.svg?height=32&width=32',
            initials: 'SJ',
        },
        location: 'Phone Call',
        description: 'Review estate planning documents and discuss updates',
        status: 'pending',
    },
    {
        id: 4,
        type: 'appointment',
        title: 'Investment Strategy with David Williams',
        date: '2025-03-28T09:00:00',
        endDate: '2025-03-28T10:00:00',
        client: {
            id: '4',
            name: 'David Williams',
            avatar: '/placeholder.svg?height=32&width=32',
            initials: 'DW',
        },
        location: 'Office',
        description: 'Discuss investment strategy adjustments and income planning',
        status: 'confirmed',
    },
    {
        id: 5,
        type: 'appointment',
        title: 'Goal Setting with Jennifer Lee',
        date: '2025-03-19T15:00:00',
        endDate: '2025-03-19T16:00:00',
        client: {
            id: '5',
            name: 'Jennifer Lee',
            avatar: '/placeholder.svg?height=32&width=32',
            initials: 'JL',
        },
        location: 'Video Call',
        description: 'Review financial goals and adjust savings strategy',
        status: 'confirmed',
    },

    // Regulatory notifications
    {
        id: 6,
        type: 'regulation',
        title: 'SEC Disclosure Requirements Update',
        date: '2025-03-21T09:00:00',
        endDate: '2025-03-21T09:00:00',
        description: 'New SEC disclosure requirements for investment advisors take effect',
        importance: 'high',
    },
    {
        id: 7,
        type: 'regulation',
        title: 'Tax Filing Deadline',
        date: '2025-04-15T00:00:00',
        endDate: '2025-04-15T23:59:59',
        description: 'Annual tax filing deadline for clients',
        importance: 'high',
    },
    {
        id: 8,
        type: 'regulation',
        title: 'Retirement Plan Contribution Deadline',
        date: '2025-03-31T23:59:59',
        endDate: '2025-03-31T23:59:59',
        description: 'Last day for clients to make prior-year contributions to retirement accounts',
        importance: 'medium',
    },

    // Market news and events
    {
        id: 9,
        type: 'news',
        title: 'Federal Reserve Meeting',
        date: '2025-03-20T14:00:00',
        endDate: '2025-03-20T16:00:00',
        description: 'Federal Reserve announces interest rate decision and economic projections',
        importance: 'high',
    },
    {
        id: 10,
        type: 'news',
        title: 'Quarterly Earnings Season Begins',
        date: '2025-04-01T09:00:00',
        endDate: '2025-04-01T09:00:00',
        description: 'Major companies begin reporting Q1 2025 earnings',
        importance: 'medium',
    },
    {
        id: 11,
        type: 'news',
        title: 'Economic Data Release',
        date: '2025-03-26T08:30:00',
        endDate: '2025-03-26T08:30:00',
        description: 'GDP and inflation data for previous quarter to be released',
        importance: 'medium',
    },
]

export function CalendarView() {
    const [date, setDate] = useState<Date>(new Date())
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [view, setView] = useState<'month' | 'day' | 'list'>('month')
    const [filter, setFilter] = useState<'all' | 'appointments' | 'regulations' | 'news'>('all')

    // Get events for the selected date
    const eventsForSelectedDate = calendarEvents.filter((event) => {
        const eventDate = parseISO(event.date)
        return isSameDay(eventDate, selectedDate)
    })

    // Filter events based on the selected filter
    const filteredEvents = calendarEvents.filter((event) => {
        if (filter === 'all') return true
        if (filter === 'appointments') return event.type === 'appointment'
        if (filter === 'regulations') return event.type === 'regulation'
        if (filter === 'news') return event.type === 'news'
        return true
    })

    // Get days with events for the current month view
    const daysWithEvents = () => {
        const start = startOfMonth(date)
        const end = endOfMonth(date)
        const days = eachDayOfInterval({ start, end })

        return days.map((day) => {
            const hasEvent = filteredEvents.some((event) => {
                const eventDate = parseISO(event.date)
                return isSameDay(eventDate, day)
            })

            return {
                date: day,
                hasEvent,
            }
        })
    }

    // Get the current month name and year
    const currentMonthYear = format(date, 'MMMM yyyy')

    // Navigate to previous month
    const previousMonth = () => {
        const newDate = new Date(date)
        newDate.setMonth(date.getMonth() - 1)
        setDate(newDate)
    }

    // Navigate to next month
    const nextMonth = () => {
        const newDate = new Date(date)
        newDate.setMonth(date.getMonth() + 1)
        setDate(newDate)
    }

    // Get the day view (events for the selected date)
    const dayView = () => {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                    </Button>
                </div>

                {eventsForSelectedDate.length === 0 ? (
                    <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border p-4">
                        <p className="mb-2 text-muted-foreground">No events scheduled for this day</p>
                        <Button
                            variant="outline"
                            size="sm"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Event
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {eventsForSelectedDate.map((event) => (
                            <Card
                                key={event.id}
                                className="overflow-hidden"
                            >
                                <div className={`h-1 ${event.type === 'appointment' ? 'bg-blue-500' : event.type === 'regulation' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-medium">{event.title}</div>
                                            <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                                <Clock className="mr-1 h-3.5 w-3.5" />
                                                {format(parseISO(event.date), 'h:mm a')} - {format(parseISO(event.endDate), 'h:mm a')}
                                            </div>

                                            {event.type === 'appointment' && event.client && (
                                                <div className="mt-2 flex items-center">
                                                    <Avatar className="mr-2 h-6 w-6">
                                                        <AvatarImage
                                                            src={event.client.avatar}
                                                            alt={event.client.name}
                                                        />
                                                        <AvatarFallback>{event.client.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">{event.client.name}</span>

                                                    {event.location === 'Video Call' && (
                                                        <Badge
                                                            variant="outline"
                                                            className="ml-2 text-xs"
                                                        >
                                                            <Video className="mr-1 h-3 w-3" />
                                                            Video
                                                        </Badge>
                                                    )}

                                                    {event.location === 'Phone Call' && (
                                                        <Badge
                                                            variant="outline"
                                                            className="ml-2 text-xs"
                                                        >
                                                            <Phone className="mr-1 h-3 w-3" />
                                                            Phone
                                                        </Badge>
                                                    )}

                                                    {event.location === 'Office' && (
                                                        <Badge
                                                            variant="outline"
                                                            className="ml-2 text-xs"
                                                        >
                                                            <User className="mr-1 h-3 w-3" />
                                                            In Person
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}

                                            <div className="mt-2 text-sm text-muted-foreground">{event.description}</div>
                                        </div>

                                        <div>
                                            {event.type === 'appointment' && <Badge className={` ${event.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'} `}>{event.status === 'confirmed' ? 'Confirmed' : 'Pending'}</Badge>}

                                            {(event.type === 'regulation' || event.type === 'news') && <Badge className={` ${event.importance === 'high' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'} `}>{event.importance === 'high' ? 'High Priority' : 'Medium Priority'}</Badge>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    // Get the list view (all events)
    const listView = () => {
        // Group events by date
        const eventsByDate: Record<string, typeof calendarEvents> = {}

        filteredEvents.forEach((event) => {
            const dateKey = format(parseISO(event.date), 'yyyy-MM-dd')
            if (!eventsByDate[dateKey]) {
                eventsByDate[dateKey] = []
            }
            eventsByDate[dateKey].push(event)
        })

        // Sort dates
        const sortedDates = Object.keys(eventsByDate).sort()

        return (
            <div className="space-y-6">
                {sortedDates.map((dateKey) => (
                    <div key={dateKey}>
                        <h3 className="mb-3 text-lg font-medium">{format(parseISO(dateKey), 'EEEE, MMMM d, yyyy')}</h3>
                        <div className="space-y-3">
                            {eventsByDate[dateKey].map((event) => (
                                <Card
                                    key={event.id}
                                    className="overflow-hidden"
                                >
                                    <div className={`h-1 ${event.type === 'appointment' ? 'bg-blue-500' : event.type === 'regulation' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-medium">{event.title}</div>
                                                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                                    <Clock className="mr-1 h-3.5 w-3.5" />
                                                    {format(parseISO(event.date), 'h:mm a')} - {format(parseISO(event.endDate), 'h:mm a')}
                                                </div>

                                                {event.type === 'appointment' && event.client && (
                                                    <div className="mt-2 flex items-center">
                                                        <Avatar className="mr-2 h-6 w-6">
                                                            <AvatarImage
                                                                src={event.client.avatar}
                                                                alt={event.client.name}
                                                            />
                                                            <AvatarFallback>{event.client.initials}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-sm">{event.client.name}</span>

                                                        {event.location === 'Video Call' && (
                                                            <Badge
                                                                variant="outline"
                                                                className="ml-2 text-xs"
                                                            >
                                                                <Video className="mr-1 h-3 w-3" />
                                                                Video
                                                            </Badge>
                                                        )}

                                                        {event.location === 'Phone Call' && (
                                                            <Badge
                                                                variant="outline"
                                                                className="ml-2 text-xs"
                                                            >
                                                                <Phone className="mr-1 h-3 w-3" />
                                                                Phone
                                                            </Badge>
                                                        )}

                                                        {event.location === 'Office' && (
                                                            <Badge
                                                                variant="outline"
                                                                className="ml-2 text-xs"
                                                            >
                                                                <User className="mr-1 h-3 w-3" />
                                                                In Person
                                                            </Badge>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="mt-2 text-sm text-muted-foreground">{event.description}</div>
                                            </div>

                                            <div>
                                                {event.type === 'appointment' && <Badge className={` ${event.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'} `}>{event.status === 'confirmed' ? 'Confirmed' : 'Pending'}</Badge>}

                                                {(event.type === 'regulation' || event.type === 'news') && <Badge className={` ${event.importance === 'high' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'} `}>{event.importance === 'high' ? 'High Priority' : 'Medium Priority'}</Badge>}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    {/* <Button
                        variant="outline"
                        size="icon"
                        onClick={previousMonth}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-medium">{currentMonthYear}</div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextMonth}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button> */}
                </div>

                <div className="flex items-center gap-2">
                    <Select
                        value={filter}
                        onValueChange={(value: any) => setFilter(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter events" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="appointments">Appointments</SelectItem>
                            <SelectItem value="regulations">Regulations</SelectItem>
                            <SelectItem value="news">Market News</SelectItem>
                        </SelectContent>
                    </Select>

                    <Tabs
                        value={view}
                        onValueChange={(value: any) => setView(value)}
                    >
                        <TabsList>
                            <TabsTrigger value="month">Month</TabsTrigger>
                            <TabsTrigger value="day">Day</TabsTrigger>
                            <TabsTrigger value="list">List</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="col-span-3">
                    <Calendar
                        className="w-full"
                        modifiers={{
                            event: daysWithEvents()
                                .filter((day) => day.hasEvent)
                                .map((day) => day.date),
                        }}
                        modifiersClassNames={{
                            event: 'event-day',
                        }}
                        styles={{
                            day_today: { fontWeight: 'bold' },
                            day_selected: { backgroundColor: 'hsl(var(--primary))', color: 'white' },
                            day_event: { position: 'relative' },
                        }}
                        components={{
                            DayContent: ({ date, displayValue }) => {
                                const hasEvent = daysWithEvents().find((day) => isSameDay(day.date, date))?.hasEvent
                                return (
                                    <div className="relative flex h-full w-full items-center justify-center">
                                        {displayValue}
                                        {hasEvent && <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-primary"></div>}
                                    </div>
                                )
                            },
                        }}
                    />
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Upcoming Events</CardTitle>
                        <CardDescription>Events for {format(selectedDate, 'MMMM d, yyyy')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {eventsForSelectedDate.length === 0 ? (
                            <div className="py-6 text-center text-muted-foreground">
                                <CalendarIcon className="mx-auto mb-2 h-10 w-10 opacity-20" />
                                <p>No events scheduled for this day</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {eventsForSelectedDate.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-start gap-3 rounded-lg border p-3"
                                    >
                                        <div className="mt-0.5">
                                            {event.type === 'appointment' && <Users className="h-4 w-4 text-blue-500" />}
                                            {event.type === 'regulation' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                                            {event.type === 'news' && <Newspaper className="h-4 w-4 text-emerald-500" />}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium">{event.title}</h4>
                                                <Badge
                                                    variant="outline"
                                                    className="text-[10px]"
                                                >
                                                    {format(parseISO(event.date), 'h:mm a')}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{event.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Client Appointments</CardTitle>
                        <CardDescription>Upcoming client meetings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {calendarEvents
                                .filter((event) => event.type === 'appointment')
                                .slice(0, 3)
                                .map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-start gap-3 rounded-lg border p-3"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={event.client?.avatar}
                                                alt={event.client?.name}
                                            />
                                            <AvatarFallback>{event.client?.initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium">{event.client?.name}</h4>
                                                <Badge
                                                    variant={event.status === 'confirmed' ? 'outline' : 'secondary'}
                                                    className="text-[10px]"
                                                >
                                                    {event.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{event.title}</p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <CalendarIcon className="mr-1 h-3 w-3" />
                                                {format(parseISO(event.date), 'MMM d, h:mm a')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Regulatory Updates</CardTitle>
                        <CardDescription>Important compliance deadlines</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {calendarEvents
                                .filter((event) => event.type === 'regulation')
                                .map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-start gap-3 rounded-lg border p-3"
                                    >
                                        <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full p-1.5 ${event.importance === 'high' ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
                                            <AlertTriangle className={`h-4 w-4 ${event.importance === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium">{event.title}</h4>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-[10px] ${event.importance === 'high' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'}`}
                                                >
                                                    {event.importance === 'high' ? 'High Priority' : 'Medium Priority'}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{event.description}</p>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <CalendarIcon className="mr-1 h-3 w-3" />
                                                {format(parseISO(event.date), 'MMM d, yyyy')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card> */}

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Market Events</CardTitle>
                        <CardDescription>Important financial news and events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {calendarEvents
                                .filter((event) => event.type === 'news')
                                .map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-start gap-3 rounded-lg border p-3"
                                    >
                                        <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full p-1.5 ${event.importance === 'high' ? 'bg-emerald-500/10' : 'bg-blue-500/10'}`}>
                                            <Newspaper className={`h-4 w-4 ${event.importance === 'high' ? 'text-emerald-500' : 'text-blue-500'}`} />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium">{event.title}</h4>
                                                <Badge
                                                    variant="outline"
                                                    className="text-[10px]"
                                                >
                                                    {format(parseISO(event.date), 'MMM d')}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{event.description}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
