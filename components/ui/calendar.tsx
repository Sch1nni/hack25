'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Tipi di eventi
type EventType = 'appointment' | 'regulatory' | 'market'

// Interfaccia per gli eventi
interface CalendarEvent {
    id: string
    date: string // formato: "YYYY-MM-DD"
    title: string
    time?: string
    type: EventType
    description: string
    priority?: 'high' | 'medium' | 'low'
}

// Eventi fittizi per marzo 2025
const events: CalendarEvent[] = [
    {
        id: '1',
        date: '2025-03-15',
        title: 'Initial Consultation - John Smith',
        time: '10:00 AM',
        type: 'appointment',
        description: 'First financial planning consultation with new client',
    },
    {
        id: '2',
        date: '2025-03-16',
        title: 'Follow-up Meeting - Hans Mueller',
        time: '2:00 PM',
        type: 'appointment',
        description: 'Review investment strategy and portfolio performance',
    },
    {
        id: '3',
        date: '2025-03-20',
        title: 'Tax Planning - William Brown',
        time: '3:30 PM',
        type: 'appointment',
        description: 'Annual tax planning and optimization strategy session',
    },
    {
        id: '4',
        date: '2025-03-20',
        title: 'Retirement Planning - Klaus Weber',
        time: '11:00 AM',
        type: 'appointment',
        description: 'Discuss retirement goals and investment options',
    },
    {
        id: '5',
        date: '2025-03-22',
        title: 'Portfolio Review - Michael Thompson',
        time: '2:30 PM',
        type: 'appointment',
        description: 'Quarterly portfolio performance review and rebalancing',
    },
    {
        id: '6',
        date: '2025-03-24',
        title: 'Estate Planning - Wolfgang Schmidt',
        time: '9:30 AM',
        type: 'appointment',
        description: 'Estate planning and wealth transfer strategy discussion',
    },
    {
        id: '7',
        date: '2025-03-25',
        title: 'Investment Strategy - Sarah Wilson',
        time: '4:00 PM',
        type: 'appointment',
        description: 'Review and update investment strategy based on market conditions',
    },
    {
        id: '8',
        date: '2025-03-26',
        title: 'Risk Assessment - Dieter Fischer',
        time: '1:30 PM',
        type: 'appointment',
        description: 'Annual risk tolerance assessment and portfolio adjustment',
    },
    {
        id: '9',
        date: '2025-03-27',
        title: 'Financial Planning - Emma Davis',
        time: '10:30 AM',
        type: 'appointment',
        description: 'Comprehensive financial planning session',
    },
    {
        id: '10',
        date: '2025-03-29',
        title: 'Insurance Review - Kurt Wagner',
        time: '3:00 PM',
        type: 'appointment',
        description: 'Review insurance coverage and risk management strategy',
    },
    {
        id: '11',
        date: '2025-03-31',
        title: 'Year-End Planning - Thomas Baker',
        time: '11:30 AM',
        type: 'appointment',
        description: 'Year-end tax and investment planning session',
    },
]

export function Calendar() {
    const [currentMonth, setCurrentMonth] = useState('March 2025')
    const [viewMode, setViewMode] = useState('Month')
    const [selectedDate, setSelectedDate] = useState('2025-03-20')

    // Sample data for the calendar
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const dates = [
        [23, 24, 25, 26, 27, 28, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, 31, 1, 2, 3, 4, 5],
    ]

    // Funzione per verificare se un giorno è il giorno corrente
    const isCurrentDay = (day: number) => day === 20 && currentMonth === 'March 2025'

    // Funzione per verificare se un giorno ha eventi
    const hasEvents = (day: number, weekIndex: number) => {
        // Calcola la data effettiva in formato YYYY-MM-DD
        let month = 3 // Marzo
        const year = 2025

        // Gestisci i giorni del mese precedente (febbraio)
        if (weekIndex === 0 && day > 20) {
            month = 2
        }
        // Gestisci i giorni del mese successivo (aprile)
        else if (weekIndex >= 4 && day < 15) {
            month = 4
        }

        const dateStr = `2025-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        return events.some((event) => event.date === dateStr)
    }

    // Funzione per ottenere gli eventi di un giorno specifico
    const getEventsForDay = (day: number, weekIndex: number) => {
        let month = 3 // Marzo
        const year = 2025

        // Gestisci i giorni del mese precedente (febbraio)
        if (weekIndex === 0 && day > 20) {
            month = 2
        }
        // Gestisci i giorni del mese successivo (aprile)
        else if (weekIndex >= 4 && day < 15) {
            month = 4
        }

        const dateStr = `2025-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        return events.filter((event) => event.date === dateStr)
    }

    // Funzione per ottenere il colore di sfondo in base al tipo di evento
    const getEventColor = (day: number, weekIndex: number) => {
        const dayEvents = getEventsForDay(day, weekIndex)

        if (dayEvents.length === 0) return ''

        // Priorità dei colori: regulatory > market > appointment
        if (dayEvents.some((e) => e.type === 'regulatory')) {
            return 'bg-red-100'
        } else if (dayEvents.some((e) => e.type === 'market')) {
            return 'bg-blue-100'
        } else {
            return 'bg-green-100'
        }
    }

    // Funzione per ottenere il colore del punto indicatore
    const getEventDotColor = (type: EventType) => {
        switch (type) {
            case 'regulatory':
                return 'bg-red-500'
            case 'market':
                return 'bg-blue-500'
            case 'appointment':
                return 'bg-green-500'
            default:
                return 'bg-gray-500'
        }
    }

    // Funzione per formattare la data selezionata
    const formatSelectedDate = () => {
        const date = new Date(selectedDate)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    // Funzione per selezionare una data
    const handleDateSelect = (day: number, weekIndex: number) => {
        let month = 3 // Marzo
        const year = 2025

        // Gestisci i giorni del mese precedente (febbraio)
        if (weekIndex === 0 && day > 20) {
            month = 2
        }
        // Gestisci i giorni del mese successivo (aprile)
        else if (weekIndex >= 4 && day < 15) {
            month = 4
        }

        const dateStr = `2025-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        setSelectedDate(dateStr)
    }

    // Filtra gli eventi per la data selezionata
    const selectedDateEvents = events.filter((event) => event.date === selectedDate)

    return (
        // <div className="mb-6">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Calendario compatto (date picker) */}
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{currentMonth}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium">
                        {days.map((day) => (
                            <div
                                key={day}
                                className="py-1"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-xs">
                        <TooltipProvider>
                            {dates.map((week, weekIndex) =>
                                week.map((day, dayIndex) => {
                                    const dayEvents = getEventsForDay(day, weekIndex)
                                    const hasEvent = dayEvents.length > 0
                                    const eventColor = getEventColor(day, weekIndex)
                                    const isSelected = day === Number.parseInt(selectedDate.split('-')[2]) && (weekIndex === 0 && day > 20 ? 2 : weekIndex >= 4 && day < 15 ? 4 : 3) === Number.parseInt(selectedDate.split('-')[1])

                                    return (
                                        <Tooltip key={`${weekIndex}-${dayIndex}`}>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={() => handleDateSelect(day, weekIndex)}
                                                    className={`relative flex aspect-square flex-col items-center justify-center rounded-md p-1 ${isCurrentDay(day) ? 'font-medium text-blue-600' : ''} ${isSelected ? 'ring-2 ring-blue-500' : ''} ${eventColor} ${(day < 23 && weekIndex === 0) || (day > 5 && weekIndex === 5) ? 'text-gray-400' : ''} transition-colors hover:bg-gray-50`}
                                                >
                                                    <span>{day}</span>
                                                    {hasEvent && (
                                                        <div className="mt-0.5 flex gap-0.5">
                                                            {dayEvents.length <= 3 ? (
                                                                dayEvents.map((event, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`h-1 w-1 rounded-full ${getEventDotColor(event.type)}`}
                                                                    />
                                                                ))
                                                            ) : (
                                                                <>
                                                                    <div className="h-1 w-1 rounded-full bg-gray-500" />
                                                                    <div className="text-[8px] leading-none">+{dayEvents.length}</div>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </button>
                                            </TooltipTrigger>
                                            {hasEvent && (
                                                <TooltipContent
                                                    side="bottom"
                                                    className="max-w-xs"
                                                >
                                                    <div className="space-y-1 p-1">
                                                        {dayEvents.map((event, i) => (
                                                            <div
                                                                key={i}
                                                                className="text-xs"
                                                            >
                                                                <div className="flex items-center gap-1">
                                                                    <div className={`h-2 w-2 rounded-full ${getEventDotColor(event.type)}`} />
                                                                    <span className="font-medium">{event.title}</span>
                                                                    {event.time && <span className="ml-auto text-gray-500">{event.time}</span>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    )
                                }),
                            )}
                        </TooltipProvider>
                    </div>

                    <div className="mt-4 flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span>Appointments</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <span>Regulatory</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <span>Market</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Eventi del giorno selezionato */}
            <div className="col-span-2 overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="p-4">
                    <h2 className="mb-1 text-lg font-semibold">Events for {formatSelectedDate()}</h2>
                    <p className="mb-4 text-sm text-gray-500">{selectedDateEvents.length} events scheduled</p>

                    {selectedDateEvents.length > 0 ? (
                        <div className="space-y-3">
                            {selectedDateEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="rounded-lg border p-3 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`rounded-md p-2 ${event.type === 'regulatory' ? 'bg-red-100 text-red-600' : event.type === 'market' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                            <div className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium">{event.title}</h3>
                                                {event.time && <span className="text-sm">{event.time}</span>}
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                                            {event.priority && (
                                                <div className="mt-2">
                                                    <span className={`rounded px-2 py-0.5 text-xs ${event.priority === 'high' ? 'bg-red-50 text-red-600' : event.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>{event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-gray-500">
                            <p>No events scheduled for this day</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Event
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        // </div>
    )
}
