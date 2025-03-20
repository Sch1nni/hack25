'use client'

import type * as React from 'react'
import { TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, AreaChart, Area, BarChart, Bar, Legend } from 'recharts'

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full">
            <TooltipProvider>{children}</TooltipProvider>
        </div>
    )
}

export const ChartTooltipContent = ({ children }: { children?: React.ReactNode }) => {
    return <TooltipContent>{children || 'Value'}</TooltipContent>
}

export const ChartTooltip = ({ children }: { children?: React.ReactNode }) => {
    return (
        <RechartsTooltip
            content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                    return (
                        <div className="rounded-md border bg-background p-2 text-sm shadow-md">
                            <p className="font-medium">{`${label}`}</p>
                            {payload.map((entry, index) => (
                                <p
                                    key={`item-${index}`}
                                    style={{ color: entry.color }}
                                >
                                    {`${entry.name}: ${
                                        typeof entry.value === 'number'
                                            ? entry.value.toLocaleString('en-US', {
                                                  style: 'currency',
                                                  currency: 'USD',
                                                  minimumFractionDigits: 0,
                                                  maximumFractionDigits: 0,
                                              })
                                            : entry.value
                                    }`}
                                </p>
                            ))}
                        </div>
                    )
                }
                return null
            }}
        />
    )
}

export const Chart = ({ children }: { children: React.ReactNode }) => {
    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            {children}
        </ResponsiveContainer>
    )
}

export const ChartLine = ({ dataKey, data, name, ...props }: any) => (
    <LineChart data={data}>
        <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.2}
        />
        <XAxis dataKey="date" />
        <YAxis />
        <Line
            type="monotone"
            dataKey={dataKey}
            name={name}
            {...props}
        />
        {props.children}
    </LineChart>
)

export const ChartArea = ({ dataKey, data, ...props }: any) => (
    <AreaChart data={data}>
        <Area
            type="monotone"
            dataKey={dataKey}
            {...props}
        />
        {props.children}
    </AreaChart>
)

export const ChartBar = ({ dataKey, data, ...props }: any) => (
    <BarChart data={data}>
        <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.2}
        />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
            dataKey={dataKey}
            {...props}
        />
        {props.children}
    </BarChart>
)

export { XAxis as ChartXAxis, YAxis as ChartYAxis, Legend as ChartLegend }
