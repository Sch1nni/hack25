'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart, Activity, Eye, Clock, MousePointer, Calendar, AlertCircle, CheckCircle2, PlusCircle, Mail, Users, Phone } from 'lucide-react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts'

// Client engagement data
const engagementData = [
    { name: 'Site Visits', value: 85, fullMark: 100 },
    { name: 'Document Views', value: 40, fullMark: 100 },
    { name: 'Meeting Attendance', value: 90, fullMark: 100 },
    { name: 'Email Opens', value: 65, fullMark: 100 },
    { name: 'Action Items Completed', value: 70, fullMark: 100 },
    { name: 'Feedback Provided', value: 30, fullMark: 100 },
]

// Client interests based on behavior
const interestData = [
    { category: 'Technology', score: 85, color: '#0ea5e9' },
    { category: 'Healthcare', score: 45, color: '#8b5cf6' },
    { category: 'Automotive', score: 92, color: '#f97316' },
    { category: 'Real Estate', score: 60, color: '#10b981' },
    { category: 'Energy', score: 30, color: '#eab308' },
]

// Disclosed vs. Undisclosed goals
const goalsData = {
    disclosed: [
        { id: 1, goal: 'Retirement at 60', status: 'active', progress: 65 },
        { id: 2, goal: 'College fund for children', status: 'active', progress: 40 },
        { id: 3, goal: 'Vacation home purchase', status: 'completed', progress: 100 },
    ],
    potential: [
        { id: 4, goal: 'Luxury car purchase', confidence: 85, evidence: 'Viewed Ferrari stock 12 times' },
        { id: 5, goal: 'Philanthropic interests', confidence: 70, evidence: 'Researched ESG investments' },
        { id: 6, goal: 'Business acquisition', confidence: 60, evidence: 'Viewed M&A content' },
    ],
}

// Interaction history
const interactionHistory = [
    {
        date: '2023-03-15',
        type: 'Website',
        duration: '45 min',
        details: 'Viewed retirement calculators and F1 sponsorship articles',
        pages: ['Retirement Planning', 'Investment Strategies', 'F1 Sponsorships'],
    },
    {
        date: '2023-03-10',
        type: 'Email',
        duration: '5 min',
        details: 'Opened quarterly report email, clicked on technology sector performance',
        pages: ['Quarterly Report', 'Tech Sector Analysis'],
    },
    {
        date: '2023-03-01',
        type: 'Meeting',
        duration: '60 min',
        details: 'Discussed retirement goals and expressed interest in automotive industry',
        pages: ['Meeting Notes', 'Retirement Projections'],
    },
    {
        date: '2023-02-20',
        type: 'Phone',
        duration: '15 min',
        details: 'Quick call about market volatility, mentioned F1 season starting soon',
        pages: ['Market Update', 'Call Notes'],
    },
]

export function ClientProfiling() {
    const [selectedTab, setSelectedTab] = useState('engagement')

    return (
        <Card className="col-span-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Client Profiling & Engagement</CardTitle>
                        <CardDescription>Comprehensive view of client behavior, interests, and hidden goals</CardDescription>
                    </div>
                    <Badge
                        variant="outline"
                        className="px-3 py-1"
                    >
                        <div className="flex items-center gap-1">
                            <Activity className="h-3.5 w-3.5 text-amber-500" />
                            <span>High Engagement Potential</span>
                        </div>
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs
                    defaultValue="engagement"
                    onValueChange={setSelectedTab}
                >
                    <TabsList className="mb-4">
                        <TabsTrigger value="engagement">Engagement Analysis</TabsTrigger>
                        <TabsTrigger value="interests">Interest Mapping</TabsTrigger>
                        <TabsTrigger value="goals">Goal Discovery</TabsTrigger>
                        <TabsTrigger value="interactions">Interaction History</TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="engagement"
                        className="space-y-4"
                    >
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center">
                                        <div className="mb-2 text-3xl font-bold">69/100</div>
                                        <Progress
                                            value={69}
                                            className="h-2 w-full"
                                        />
                                        <p className="mt-2 text-xs text-muted-foreground">Above average for demographic</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Digital Comfort</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center">
                                        <div className="mb-2 text-3xl font-bold">Medium</div>
                                        <div className="flex gap-1">
                                            <div className="h-2 w-8 rounded-full bg-primary"></div>
                                            <div className="h-2 w-8 rounded-full bg-primary"></div>
                                            <div className="h-2 w-8 rounded-full bg-primary"></div>
                                            <div className="h-2 w-8 rounded-full bg-muted"></div>
                                            <div className="h-2 w-8 rounded-full bg-muted"></div>
                                        </div>
                                        <p className="mt-2 text-xs text-muted-foreground">Prefers hybrid interactions</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Communication Preference</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center">
                                        <div className="mb-2 text-3xl font-bold">In-Person</div>
                                        <div className="flex gap-2 text-xs text-muted-foreground">
                                            <Badge
                                                variant="outline"
                                                className="bg-primary/10"
                                            >
                                                In-Person
                                            </Badge>
                                            <Badge variant="outline">Email</Badge>
                                            <Badge variant="outline">Phone</Badge>
                                            <Badge variant="outline">Video</Badge>
                                        </div>
                                        <p className="mt-2 text-xs text-muted-foreground">Based on response rates</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="h-[300px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <RadarChart
                                    outerRadius={90}
                                    data={engagementData}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="name" />
                                    <PolarRadiusAxis
                                        angle={30}
                                        domain={[0, 100]}
                                    />
                                    <Radar
                                        name="Engagement"
                                        dataKey="value"
                                        stroke="#0ea5e9"
                                        fill="#0ea5e9"
                                        fillOpacity={0.6}
                                    />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Engagement Insights</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                                        <div>
                                            <p className="text-sm font-medium">Low Document Engagement</p>
                                            <p className="text-xs text-muted-foreground">Client rarely reviews shared documents. Consider visual presentations instead.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                                        <div>
                                            <p className="text-sm font-medium">High Meeting Attendance</p>
                                            <p className="text-xs text-muted-foreground">Client values face-to-face interactions. Schedule regular in-person reviews.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                                        <div>
                                            <p className="text-sm font-medium">Limited Feedback</p>
                                            <p className="text-xs text-muted-foreground">Client rarely provides feedback. Consider more direct questioning techniques.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Recommended Approach</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                                        <div>
                                            <p className="text-sm font-medium">Schedule Quarterly In-Person Reviews</p>
                                            <p className="text-xs text-muted-foreground">Focus on visual presentations with minimal documentation.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                                        <div>
                                            <p className="text-sm font-medium">Use Automotive Industry Examples</p>
                                            <p className="text-xs text-muted-foreground">Leverage client's interest in F1 and automotive sector to explain concepts.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                                        <div>
                                            <p className="text-sm font-medium">Simplify Technical Concepts</p>
                                            <p className="text-xs text-muted-foreground">Use analogies and visual aids to explain complex investment strategies.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent
                        value="interests"
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Interest Mapping</CardTitle>
                                    <CardDescription>Based on browsing behavior and interactions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {interestData.map((interest) => (
                                            <div
                                                key={interest.category}
                                                className="space-y-1"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">{interest.category}</span>
                                                    <span className="text-sm font-medium">{interest.score}%</span>
                                                </div>
                                                <Progress
                                                    value={interest.score}
                                                    className="h-2"
                                                    style={{ backgroundColor: `${interest.color}20` }}
                                                    color={interest.color}
                                                />
                                                <div className="text-xs text-muted-foreground">
                                                    {interest.category === 'Automotive' && 'High interest in F1 and luxury vehicles'}
                                                    {interest.category === 'Technology' && 'Frequent views of tech stocks and innovation articles'}
                                                    {interest.category === 'Healthcare' && 'Occasional interest in biotech and healthcare'}
                                                    {interest.category === 'Real Estate' && 'Moderate interest in property investments'}
                                                    {interest.category === 'Energy' && 'Limited interest in energy sector'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">AI-Generated Investment Recommendations</CardTitle>
                                    <CardDescription>Based on detected interests</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                                        <div className="mb-1 flex items-center gap-2">
                                            <Badge className="bg-amber-500/20 text-amber-600 hover:bg-amber-500/20">F1 Interest</Badge>
                                            <span className="text-sm font-medium">Automotive & Luxury Brands</span>
                                        </div>
                                        <p className="mb-2 text-xs text-muted-foreground">Client has shown significant interest in F1 racing and luxury automotive brands.</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between rounded bg-background p-1.5 text-xs">
                                                <span>Ferrari (RACE)</span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-emerald-500"
                                                >
                                                    +12.4% YTD
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between rounded bg-background p-1.5 text-xs">
                                                <span>Mercedes-Benz Group (MBG.DE)</span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-emerald-500"
                                                >
                                                    +8.7% YTD
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between rounded bg-background p-1.5 text-xs">
                                                <span>Luxury Automobiles ETF (CARZ)</span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-emerald-500"
                                                >
                                                    +5.2% YTD
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                                        <div className="mb-1 flex items-center gap-2">
                                            <Badge className="bg-blue-500/20 text-blue-600 hover:bg-blue-500/20">Tech Focus</Badge>
                                            <span className="text-sm font-medium">Technology Innovators</span>
                                        </div>
                                        <p className="mb-2 text-xs text-muted-foreground">Client frequently views technology sector content and innovation articles.</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between rounded bg-background p-1.5 text-xs">
                                                <span>NVIDIA (NVDA)</span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-emerald-500"
                                                >
                                                    +94.2% YTD
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between rounded bg-background p-1.5 text-xs">
                                                <span>AI & Robotics ETF (BOTZ)</span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-emerald-500"
                                                >
                                                    +22.1% YTD
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between rounded bg-background p-1.5 text-xs">
                                                <span>Semiconductor ETF (SMH)</span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-emerald-500"
                                                >
                                                    +18.5% YTD
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full"
                                        variant="outline"
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Generate More Recommendations
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Conversation Starters</CardTitle>
                                <CardDescription>AI-generated talking points based on client interests</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    <div className="rounded-lg border p-3">
                                        <div className="mb-1 text-sm font-medium">F1 Season Investment Impact</div>
                                        <p className="text-xs text-muted-foreground">"I noticed you follow F1 closely. Have you considered how the new regulations might impact team sponsors and automotive manufacturers in your portfolio?"</p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <div className="mb-1 text-sm font-medium">Tech Innovation Opportunities</div>
                                        <p className="text-xs text-muted-foreground">"Based on your interest in technology, what are your thoughts on AI's impact on the automotive industry, especially for companies like Ferrari and Mercedes?"</p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <div className="mb-1 text-sm font-medium">Luxury Market Trends</div>
                                        <p className="text-xs text-muted-foreground">"I've been following some interesting trends in the luxury market that align with your interests. Would you like to explore how these might fit into your portfolio?"</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent
                        value="goals"
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Disclosed Goals</CardTitle>
                                    <CardDescription>Goals explicitly shared by the client</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {goalsData.disclosed.map((goal) => (
                                        <div
                                            key={goal.id}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {goal.status === 'completed' ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <div className="h-4 w-4 rounded-full border-2 border-primary" />}
                                                    <span className="text-sm font-medium">{goal.goal}</span>
                                                </div>
                                                <Badge variant={goal.status === 'completed' ? 'outline' : 'secondary'}>{goal.status === 'completed' ? 'Completed' : 'In Progress'}</Badge>
                                            </div>
                                            {goal.status !== 'completed' && (
                                                <>
                                                    <Progress
                                                        value={goal.progress}
                                                        className="h-2"
                                                    />
                                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                        <span>Progress: {goal.progress}%</span>
                                                        <span>Target: 100%</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add New Goal
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Potential Undisclosed Goals</CardTitle>
                                    <CardDescription>AI-detected goals based on client behavior</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {goalsData.potential.map((goal) => (
                                        <div
                                            key={goal.id}
                                            className="space-y-2 rounded-lg border p-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{goal.goal}</span>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-amber-500/10 text-amber-600"
                                                >
                                                    {goal.confidence}% Confidence
                                                </Badge>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                <span className="font-medium">Evidence: </span>
                                                {goal.evidence}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 text-xs"
                                                >
                                                    Discuss in Next Meeting
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 text-xs"
                                                >
                                                    Dismiss
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Goal Alignment Strategy</CardTitle>
                                <CardDescription>Holistic approach to address all client goals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                        <div className="rounded-lg border p-3">
                                            <div className="mb-1 text-sm font-medium">Retirement Strategy</div>
                                            <div className="mb-2 flex items-center gap-1">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    Primary Goal
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-emerald-500/10 text-xs text-emerald-600"
                                                >
                                                    On Track
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Current allocation supports retirement goal. Consider increasing contributions by 5% to accelerate timeline.</p>
                                        </div>

                                        <div className="rounded-lg border p-3">
                                            <div className="mb-1 text-sm font-medium">Education Funding</div>
                                            <div className="mb-2 flex items-center gap-1">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    Secondary Goal
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-amber-500/10 text-xs text-amber-600"
                                                >
                                                    Needs Attention
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Current 529 contributions insufficient. Recommend increasing monthly allocation by $500.</p>
                                        </div>

                                        <div className="rounded-lg border p-3">
                                            <div className="mb-1 text-sm font-medium">Luxury Purchases</div>
                                            <div className="mb-2 flex items-center gap-1">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    Potential Goal
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-blue-500/10 text-xs text-blue-600"
                                                >
                                                    Not Started
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Based on browsing behavior, client may be interested in luxury car purchase. Discuss establishing dedicated fund.</p>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border bg-primary/5 p-3">
                                        <div className="mb-2 text-sm font-medium">Recommended Discussion Points</div>
                                        <ul className="ml-5 list-disc space-y-1 text-xs text-muted-foreground">
                                            <li>Confirm retirement age preference: current plan assumes age 60</li>
                                            <li>Discuss education funding priorities and timeline adjustments</li>
                                            <li>Explore interest in luxury automotive purchases without directly asking</li>
                                            <li>Present tax-efficient strategies for multiple goal achievement</li>
                                            <li>Review risk tolerance in context of all goals, not just retirement</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent
                        value="interactions"
                        className="space-y-4"
                    >
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Interaction Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">Page Views</span>
                                            </div>
                                            <span className="font-medium">247</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">Time on Site</span>
                                            </div>
                                            <span className="font-medium">5.2 hrs</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MousePointer className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">Click Depth</span>
                                            </div>
                                            <span className="font-medium">3.7 pages</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">Last Interaction</span>
                                            </div>
                                            <span className="font-medium">2 days ago</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-2">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Most Viewed Content</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                                                <BarChart className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="text-sm font-medium">F1 Sponsorship Investment Opportunities</div>
                                                <div className="text-xs text-muted-foreground">Viewed 12 times in last 30 days</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                                                <BarChart className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="text-sm font-medium">Retirement Calculator</div>
                                                <div className="text-xs text-muted-foreground">Viewed 8 times in last 30 days</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                                                <BarChart className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="text-sm font-medium">Technology Sector Analysis</div>
                                                <div className="text-xs text-muted-foreground">Viewed 6 times in last 30 days</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Interaction Timeline</CardTitle>
                                <CardDescription>Recent client interactions across all channels</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {interactionHistory.map((interaction, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-4 rounded-lg border p-3"
                                        >
                                            <div className="flex-none">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    {interaction.type === 'Website' && <Eye className="h-5 w-5 text-primary" />}
                                                    {interaction.type === 'Email' && <Mail className="h-5 w-5 text-primary" />}
                                                    {interaction.type === 'Meeting' && <Users className="h-5 w-5 text-primary" />}
                                                    {interaction.type === 'Phone' && <Phone className="h-5 w-5 text-primary" />}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-1 flex items-center justify-between">
                                                    <div className="text-sm font-medium">{interaction.type} Interaction</div>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {interaction.duration}
                                                    </Badge>
                                                </div>
                                                <p className="mb-2 text-xs text-muted-foreground">{interaction.details}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {interaction.pages.map((page, pageIndex) => (
                                                        <Badge
                                                            key={pageIndex}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {page}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-none text-xs text-muted-foreground">{interaction.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Communication Strategy</CardTitle>
                                <CardDescription>AI-recommended approach based on interaction patterns</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="rounded-lg border bg-primary/5 p-3">
                                        <div className="mb-2 text-sm font-medium">Key Insights</div>
                                        <ul className="ml-5 list-disc space-y-1 text-xs text-muted-foreground">
                                            <li>Client engages most deeply with automotive and F1-related content</li>
                                            <li>Prefers in-person meetings over digital communications</li>
                                            <li>Most active on the platform in the evenings (7-9pm)</li>
                                            <li>Rarely responds to technical documents, but engages with visual content</li>
                                            <li>Has mentioned F1 multiple times in conversations, indicating strong interest</li>
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="rounded-lg border p-3">
                                            <div className="mb-2 text-sm font-medium">Recommended Approach</div>
                                            <ul className="ml-5 list-disc space-y-1 text-xs text-muted-foreground">
                                                <li>Schedule quarterly in-person reviews with visual presentations</li>
                                                <li>Use automotive industry analogies to explain complex concepts</li>
                                                <li>Send brief updates in the evening when client is most engaged</li>
                                                <li>Focus on visual content rather than lengthy documents</li>
                                                <li>Incorporate F1-related examples in financial discussions</li>
                                            </ul>
                                        </div>

                                        <div className="rounded-lg border p-3">
                                            <div className="mb-2 text-sm font-medium">Engagement Calendar</div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span>Next Scheduled Meeting:</span>
                                                    <Badge variant="outline">April 15, 2023</Badge>
                                                </div>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span>Quarterly Review:</span>
                                                    <Badge variant="outline">June 30, 2023</Badge>
                                                </div>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span>Content Delivery:</span>
                                                    <Badge variant="outline">Weekly (Tuesdays)</Badge>
                                                </div>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span>Portfolio Update:</span>
                                                    <Badge variant="outline">Monthly (1st)</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
