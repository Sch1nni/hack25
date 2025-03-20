'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ReferenceLine } from 'recharts'
import { TrendingUp, TrendingDown, Activity, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

// Mock price data with technical indicators
const technicalData = [
    { date: 'Jan', price: 170.33, sma50: 168.5, sma200: 165.2, volume: 45000000, rsi: 58, macd: 1.2, signal: 0.8 },
    { date: 'Feb', price: 165.12, sma50: 167.8, sma200: 166.1, volume: 42000000, rsi: 45, macd: 0.5, signal: 0.7 },
    { date: 'Mar', price: 175.88, sma50: 169.2, sma200: 166.8, volume: 48000000, rsi: 62, macd: 1.0, signal: 0.6 },
    { date: 'Apr', price: 169.59, sma50: 170.1, sma200: 167.5, volume: 44000000, rsi: 48, macd: 0.3, signal: 0.5 },
    { date: 'May', price: 177.25, sma50: 171.5, sma200: 168.2, volume: 46000000, rsi: 65, macd: 0.8, signal: 0.4 },
    { date: 'Jun', price: 185.01, sma50: 173.8, sma200: 169.1, volume: 50000000, rsi: 72, macd: 1.5, signal: 0.9 },
    { date: 'Jul', price: 193.22, sma50: 176.2, sma200: 170.3, volume: 52000000, rsi: 78, macd: 2.0, signal: 1.2 },
    { date: 'Aug', price: 187.87, sma50: 178.5, sma200: 171.8, volume: 49000000, rsi: 68, macd: 1.8, signal: 1.5 },
    { date: 'Sep', price: 174.79, sma50: 179.2, sma200: 173.1, volume: 47000000, rsi: 42, macd: 0.2, signal: 1.0 },
    { date: 'Oct', price: 182.66, sma50: 180.1, sma200: 174.5, volume: 51000000, rsi: 56, macd: 0.7, signal: 0.8 },
    { date: 'Nov', price: 189.37, sma50: 181.8, sma200: 175.9, volume: 53000000, rsi: 64, macd: 1.3, signal: 0.9 },
    { date: 'Dec', price: 191.56, sma50: 183.5, sma200: 177.2, volume: 52400000, rsi: 67, macd: 1.6, signal: 1.1 },
]

// Mock technical signals
const technicalSignals = [
    {
        name: 'Moving Average Crossover',
        signal: 'bullish',
        strength: 'strong',
        description: '50-day SMA crossed above 200-day SMA (Golden Cross)',
    },
    {
        name: 'RSI',
        signal: 'bullish',
        strength: 'moderate',
        description: 'RSI at 67, showing upward momentum but approaching overbought',
    },
    { name: 'MACD', signal: 'bullish', strength: 'strong', description: 'MACD line above signal line and increasing' },
    {
        name: 'Volume',
        signal: 'neutral',
        strength: 'weak',
        description: 'Volume slightly below average, showing lack of conviction',
    },
    {
        name: 'Bollinger Bands',
        signal: 'neutral',
        strength: 'moderate',
        description: 'Price near upper band, suggesting potential resistance',
    },
    {
        name: 'Support/Resistance',
        signal: 'bullish',
        strength: 'strong',
        description: 'Price broke above key resistance at $190',
    },
]

// Mock support and resistance levels
const supportResistanceLevels = [
    {
        type: 'resistance',
        level: 200.0,
        strength: 'major',
        description: 'Previous all-time high and psychological level',
    },
    { type: 'resistance', level: 195.0, strength: 'minor', description: 'Recent swing high from November' },
    {
        type: 'support',
        level: 190.0,
        strength: 'minor',
        description: 'Recently broken resistance, now acting as support',
    },
    { type: 'support', level: 185.0, strength: 'moderate', description: 'Previous consolidation area' },
    { type: 'support', level: 175.0, strength: 'major', description: 'Major support from September low' },
]

interface TechnicalAnalysisProps {
    symbol: string
}

export function TechnicalAnalysis({ symbol }: TechnicalAnalysisProps) {
    const [indicatorType, setIndicatorType] = useState('price')
    const [timeRange, setTimeRange] = useState('1Y')

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle>Technical Chart - {symbol}</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className={indicatorType === 'price' ? 'bg-muted' : ''}
                                onClick={() => setIndicatorType('price')}
                            >
                                Price & MA
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={indicatorType === 'volume' ? 'bg-muted' : ''}
                                onClick={() => setIndicatorType('volume')}
                            >
                                Volume
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={indicatorType === 'oscillators' ? 'bg-muted' : ''}
                                onClick={() => setIndicatorType('oscillators')}
                            >
                                Oscillators
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        {indicatorType === 'price' && (
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <LineChart data={technicalData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="date" />
                                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                                    <Tooltip
                                        formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                                        labelFormatter={(label) => `Date: ${label}`}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        name="Price"
                                        stroke="#0ea5e9"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="sma50"
                                        name="50-day MA"
                                        stroke="#8b5cf6"
                                        strokeWidth={1.5}
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="sma200"
                                        name="200-day MA"
                                        stroke="#f97316"
                                        strokeWidth={1.5}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}

                        {indicatorType === 'volume' && (
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart data={technicalData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M`, '']}
                                        labelFormatter={(label) => `Date: ${label}`}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="volume"
                                        name="Volume"
                                        fill="#0ea5e9"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}

                        {indicatorType === 'oscillators' && (
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <LineChart data={technicalData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.2}
                                    />
                                    <XAxis dataKey="date" />
                                    <YAxis
                                        yAxisId="left"
                                        domain={[0, 100]}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                    />
                                    <Tooltip />
                                    <Legend />
                                    <ReferenceLine
                                        yAxisId="left"
                                        y={70}
                                        stroke="#ef4444"
                                        strokeDasharray="3 3"
                                    />
                                    <ReferenceLine
                                        yAxisId="left"
                                        y={30}
                                        stroke="#10b981"
                                        strokeDasharray="3 3"
                                    />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="rsi"
                                        name="RSI"
                                        stroke="#8b5cf6"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="macd"
                                        name="MACD"
                                        stroke="#0ea5e9"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="signal"
                                        name="Signal"
                                        stroke="#f97316"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Technical Signals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {technicalSignals.map((signal, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 rounded-lg border p-3"
                                >
                                    <div className={`mt-0.5 rounded-full p-1.5 ${signal.signal === 'bullish' ? 'bg-emerald-500/10 text-emerald-500' : signal.signal === 'bearish' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>{signal.signal === 'bullish' ? <TrendingUp className="h-4 w-4" /> : signal.signal === 'bearish' ? <TrendingDown className="h-4 w-4" /> : <Activity className="h-4 w-4" />}</div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium">{signal.name}</h4>
                                            <Badge variant={signal.signal === 'bullish' ? 'default' : signal.signal === 'bearish' ? 'destructive' : 'outline'}>{signal.signal.toUpperCase()}</Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{signal.description}</p>
                                        <div className="mt-1 flex items-center gap-1">
                                            <span className="text-xs text-muted-foreground">Strength:</span>
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {signal.strength}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Support & Resistance Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {supportResistanceLevels.map((level, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 rounded-lg border p-3"
                                >
                                    <div className={`mt-0.5 rounded-full p-1.5 ${level.type === 'resistance' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{level.type === 'resistance' ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}</div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium">{level.type === 'resistance' ? 'Resistance' : 'Support'}</h4>
                                            <div className="font-medium">${level.level.toFixed(2)}</div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{level.description}</p>
                                        <div className="mt-1 flex items-center gap-1">
                                            <span className="text-xs text-muted-foreground">Strength:</span>
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {level.strength}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>Technical Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                            <div className="mb-2 text-center">
                                <div className="text-lg font-medium">Short Term</div>
                                <div className="text-xs text-muted-foreground">(1-2 weeks)</div>
                            </div>
                            <div className="mb-2 rounded-full bg-emerald-500/10 p-3">
                                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                            </div>
                            <div className="text-center">
                                <div className="font-medium">Bullish</div>
                                <div className="text-xs text-muted-foreground">Strong momentum indicators</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                            <div className="mb-2 text-center">
                                <div className="text-lg font-medium">Medium Term</div>
                                <div className="text-xs text-muted-foreground">(1-3 months)</div>
                            </div>
                            <div className="mb-2 rounded-full bg-amber-500/10 p-3">
                                <AlertTriangle className="h-8 w-8 text-amber-500" />
                            </div>
                            <div className="text-center">
                                <div className="font-medium">Neutral</div>
                                <div className="text-xs text-muted-foreground">Mixed signals, watch key levels</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                            <div className="mb-2 text-center">
                                <div className="text-lg font-medium">Long Term</div>
                                <div className="text-xs text-muted-foreground">(3-12 months)</div>
                            </div>
                            <div className="mb-2 rounded-full bg-emerald-500/10 p-3">
                                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                            </div>
                            <div className="text-center">
                                <div className="font-medium">Bullish</div>
                                <div className="text-xs text-muted-foreground">Uptrend intact, above major MAs</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-lg border p-4">
                        <div className="mb-2 flex items-start gap-2">
                            <Info className="mt-0.5 h-5 w-5 text-primary" />
                            <div className="font-medium">Analysis Summary</div>
                        </div>
                        <p className="text-sm text-muted-foreground">{symbol} is showing strong bullish momentum in the short term with positive technical signals from RSI and MACD indicators. The stock has recently broken above key resistance at $190, which now serves as support. The 50-day moving average is trending above the 200-day moving average, confirming the bullish trend. However, volume has been slightly below average, suggesting some caution. The stock is approaching overbought territory in the short term, which may lead to consolidation before the next move higher. Long-term trend remains bullish with strong support at $175.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
