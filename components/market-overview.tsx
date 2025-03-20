'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts'

// Mock market data
const marketData = [
    {
        name: 'S&P 500',
        value: '4,890.97',
        change: '+0.87%',
        positive: true,
        data: [
            { time: '9:30', value: 4850 },
            { time: '10:00', value: 4855 },
            { time: '10:30', value: 4862 },
            { time: '11:00', value: 4858 },
            { time: '11:30', value: 4865 },
            { time: '12:00', value: 4870 },
            { time: '12:30', value: 4875 },
            { time: '13:00', value: 4880 },
            { time: '13:30', value: 4878 },
            { time: '14:00', value: 4885 },
            { time: '14:30', value: 4888 },
            { time: '15:00', value: 4890 },
            { time: '15:30', value: 4891 },
            { time: '16:00', value: 4891 },
        ],
    },
    {
        name: 'Nasdaq',
        value: '17,225.36',
        change: '+1.25%',
        positive: true,
        data: [
            { time: '9:30', value: 17000 },
            { time: '10:00', value: 17020 },
            { time: '10:30', value: 17050 },
            { time: '11:00', value: 17080 },
            { time: '11:30', value: 17100 },
            { time: '12:00', value: 17120 },
            { time: '12:30', value: 17140 },
            { time: '13:00', value: 17160 },
            { time: '13:30', value: 17180 },
            { time: '14:00', value: 17190 },
            { time: '14:30', value: 17200 },
            { time: '15:00', value: 17210 },
            { time: '15:30', value: 17220 },
            { time: '16:00', value: 17225 },
        ],
    },
    {
        name: 'Dow Jones',
        value: '38,996.40',
        change: '+0.56%',
        positive: true,
        data: [
            { time: '9:30', value: 38800 },
            { time: '10:00', value: 38820 },
            { time: '10:30', value: 38850 },
            { time: '11:00', value: 38870 },
            { time: '11:30', value: 38900 },
            { time: '12:00', value: 38920 },
            { time: '12:30', value: 38930 },
            { time: '13:00', value: 38950 },
            { time: '13:30', value: 38960 },
            { time: '14:00', value: 38970 },
            { time: '14:30', value: 38980 },
            { time: '15:00', value: 38990 },
            { time: '15:30', value: 38995 },
            { time: '16:00', value: 38996 },
        ],
    },
    {
        name: 'Russell 2000',
        value: '2,042.50',
        change: '-0.32%',
        positive: false,
        data: [
            { time: '9:30', value: 2050 },
            { time: '10:00', value: 2048 },
            { time: '10:30', value: 2047 },
            { time: '11:00', value: 2046 },
            { time: '11:30', value: 2045 },
            { time: '12:00', value: 2044 },
            { time: '12:30', value: 2043 },
            { time: '13:00', value: 2044 },
            { time: '13:30', value: 2045 },
            { time: '14:00', value: 2044 },
            { time: '14:30', value: 2043 },
            { time: '15:00', value: 2042 },
            { time: '15:30', value: 2042 },
            { time: '16:00', value: 2042 },
        ],
    },
    {
        name: '10-Year Treasury',
        value: '3.82%',
        change: '-0.05%',
        positive: true, // For bonds, lower yield is positive
        data: [
            { time: '9:30', value: 3.87 },
            { time: '10:00', value: 3.86 },
            { time: '10:30', value: 3.86 },
            { time: '11:00', value: 3.85 },
            { time: '11:30', value: 3.85 },
            { time: '12:00', value: 3.84 },
            { time: '12:30', value: 3.84 },
            { time: '13:00', value: 3.83 },
            { time: '13:30', value: 3.83 },
            { time: '14:00', value: 3.83 },
            { time: '14:30', value: 3.82 },
            { time: '15:00', value: 3.82 },
            { time: '15:30', value: 3.82 },
            { time: '16:00', value: 3.82 },
        ],
    },
    {
        name: 'VIX',
        value: '13.25',
        change: '-5.12%',
        positive: true, // For VIX, lower is positive
        data: [
            { time: '9:30', value: 14.0 },
            { time: '10:00', value: 13.9 },
            { time: '10:30', value: 13.8 },
            { time: '11:00', value: 13.7 },
            { time: '11:30', value: 13.6 },
            { time: '12:00', value: 13.5 },
            { time: '12:30', value: 13.5 },
            { time: '13:00', value: 13.4 },
            { time: '13:30', value: 13.4 },
            { time: '14:00', value: 13.3 },
            { time: '14:30', value: 13.3 },
            { time: '15:00', value: 13.3 },
            { time: '15:30', value: 13.2 },
            { time: '16:00', value: 13.2 },
        ],
    },
]

export function MarketOverview() {
    return (
        <Card>
            <CardHeader className="pb-6">
                <CardTitle className="text-base">Market Overview</CardTitle>
                <CardDescription>Today's market performance</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {marketData.map((market, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-1"
                        >
                            <div className="flex items-center justify-between">
                                <div className="font-medium">{market.name}</div>
                                <div className="flex items-center gap-1">
                                    <span className="font-medium">{market.value}</span>
                                    <div className={`flex items-center ${market.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {market.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                        <span>{market.change}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-10">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <LineChart data={market.data}>
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke={market.positive ? '#10b981' : '#ef4444'}
                                            strokeWidth={1.5}
                                            dot={false}
                                        />
                                        <Tooltip content={() => null} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div>Last updated: 5:00 PM ET</div>
                        <Badge
                            variant="outline"
                            className="text-xs"
                        >
                            Market Closed
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
