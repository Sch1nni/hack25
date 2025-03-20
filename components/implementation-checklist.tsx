'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Clock, AlertTriangle, Calendar, FileText, PlusCircle, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Implementation tasks
const implementationTasks = [
    {
        id: 1,
        category: 'Asset Allocation',
        title: 'Rebalance equity allocation',
        description: 'Adjust equity allocation to 65% to align with updated risk profile',
        status: 'completed',
        dueDate: '2023-03-10',
        assignee: 'John Doe',
        priority: 'high',
    },
    {
        id: 2,
        category: 'Asset Allocation',
        title: 'Reduce fixed income exposure',
        description: 'Decrease long-term fixed income allocation by 5% due to interest rate trends',
        status: 'in-progress',
        dueDate: '2023-03-25',
        assignee: 'John Doe',
        priority: 'high',
    },
    {
        id: 3,
        category: 'Asset Allocation',
        title: 'Increase international exposure',
        description: 'Add 3% allocation to emerging markets to improve diversification',
        status: 'pending',
        dueDate: '2023-04-05',
        assignee: 'Sarah Johnson',
        priority: 'medium',
    },
    {
        id: 4,
        category: 'Tax Optimization',
        title: 'Tax-loss harvesting',
        description: 'Identify opportunities for tax-loss harvesting in technology sector',
        status: 'in-progress',
        dueDate: '2023-03-30',
        assignee: 'John Doe',
        priority: 'medium',
    },
    {
        id: 5,
        category: 'Tax Optimization',
        title: 'Review tax-efficient fund placement',
        description: 'Ensure tax-inefficient assets are in tax-advantaged accounts',
        status: 'pending',
        dueDate: '2023-04-15',
        assignee: 'Michael Chen',
        priority: 'medium',
    },
    {
        id: 6,
        category: 'Insurance',
        title: 'Review life insurance coverage',
        description: 'Evaluate current life insurance coverage against family needs',
        status: 'pending',
        dueDate: '2023-04-20',
        assignee: 'Sarah Johnson',
        priority: 'low',
    },
    {
        id: 7,
        category: 'Estate Planning',
        title: 'Update beneficiary designations',
        description: 'Ensure all account beneficiaries are current and aligned with estate plan',
        status: 'completed',
        dueDate: '2023-03-05',
        assignee: 'John Doe',
        priority: 'high',
    },
    {
        id: 8,
        category: 'Client Communication',
        title: 'Schedule quarterly review',
        description: 'Set up Q2 review meeting to discuss portfolio performance and adjustments',
        status: 'pending',
        dueDate: '2023-04-10',
        assignee: 'John Doe',
        priority: 'medium',
    },
]

export function ImplementationChecklist() {
    const [tasks, setTasks] = useState(implementationTasks)
    const [filter, setFilter] = useState('all')

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true
        if (filter === 'completed') return task.status === 'completed'
        if (filter === 'in-progress') return task.status === 'in-progress'
        if (filter === 'pending') return task.status === 'pending'
        return true
    })

    const completedCount = tasks.filter((task) => task.status === 'completed').length
    const progressPercentage = Math.round((completedCount / tasks.length) * 100)

    const toggleTaskStatus = (id: number) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    const newStatus = task.status === 'completed' ? 'pending' : 'completed'
                    return { ...task, status: newStatus }
                }
                return task
            }),
        )
    }

    return (
        <Card className="col-span-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Implementation Checklist</CardTitle>
                        <CardDescription>Coordinated action plan for holistic wealth management</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="px-3 py-1"
                        >
                            <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                <span>{progressPercentage}% Complete</span>
                            </div>
                        </Badge>
                        <Button
                            size="sm"
                            variant="outline"
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Task
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Tabs
                            defaultValue="all"
                            onValueChange={setFilter}
                        >
                            <TabsList>
                                <TabsTrigger value="all">All Tasks</TabsTrigger>
                                <TabsTrigger value="pending">Pending</TabsTrigger>
                                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="flex items-center gap-2">
                            <Progress
                                value={progressPercentage}
                                className="h-2 w-40"
                            />
                            <span className="text-sm text-muted-foreground">
                                {completedCount} of {tasks.length} tasks
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-start gap-3 rounded-lg border p-3"
                            >
                                <Checkbox
                                    id={`task-${task.id}`}
                                    checked={task.status === 'completed'}
                                    onCheckedChange={() => toggleTaskStatus(task.id)}
                                    className="mt-1"
                                />

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <label
                                                htmlFor={`task-${task.id}`}
                                                className={`text-sm font-medium ${task.status === 'completed' ? 'text-muted-foreground line-through' : ''}`}
                                            >
                                                {task.title}
                                            </label>
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {task.category}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className={` ${task.priority === 'high' ? 'bg-red-500/10 text-red-600' : ''} ${task.priority === 'medium' ? 'bg-amber-500/10 text-amber-600' : ''} ${task.priority === 'low' ? 'bg-emerald-500/10 text-emerald-600' : ''} `}
                                            >
                                                {task.priority}
                                            </Badge>

                                            <Badge
                                                variant="outline"
                                                className={` ${task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600' : ''} ${task.status === 'in-progress' ? 'bg-blue-500/10 text-blue-600' : ''} ${task.status === 'pending' ? 'bg-amber-500/10 text-amber-600' : ''} `}
                                            >
                                                {task.status === 'completed' && 'Completed'}
                                                {task.status === 'in-progress' && 'In Progress'}
                                                {task.status === 'pending' && 'Pending'}
                                            </Badge>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                                    <DropdownMenuItem>Change Assignee</DropdownMenuItem>
                                                    <DropdownMenuItem>Change Due Date</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>

                                    <p className="text-xs text-muted-foreground">{task.description}</p>

                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>Due: {task.dueDate}</span>
                                        </div>
                                        <div>Assignee: {task.assignee}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Asset Allocation Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Equity Rebalancing</span>
                                        <Badge
                                            variant="outline"
                                            className="bg-emerald-500/10 text-emerald-600"
                                        >
                                            Completed
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Fixed Income Reduction</span>
                                        <Badge
                                            variant="outline"
                                            className="bg-blue-500/10 text-blue-600"
                                        >
                                            In Progress
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span>International Exposure</span>
                                        <Badge
                                            variant="outline"
                                            className="bg-amber-500/10 text-amber-600"
                                        >
                                            Pending
                                        </Badge>
                                    </div>
                                    <Progress
                                        value={50}
                                        className="mt-2 h-2"
                                    />
                                    <p className="text-center text-xs text-muted-foreground">1 of 3 tasks completed</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Tax Optimization Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Tax-Loss Harvesting</span>
                                        <Badge
                                            variant="outline"
                                            className="bg-blue-500/10 text-blue-600"
                                        >
                                            In Progress
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Fund Placement Review</span>
                                        <Badge
                                            variant="outline"
                                            className="bg-amber-500/10 text-amber-600"
                                        >
                                            Pending
                                        </Badge>
                                    </div>
                                    <Progress
                                        value={25}
                                        className="mt-2 h-2"
                                    />
                                    <p className="text-center text-xs text-muted-foreground">0 of 2 tasks completed</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Estate Planning Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Beneficiary Update</span>
                                        <Badge
                                            variant="outline"
                                            className="bg-emerald-500/10 text-emerald-600"
                                        >
                                            Completed
                                        </Badge>
                                    </div>
                                    <Progress
                                        value={100}
                                        className="mt-2 h-2"
                                    />
                                    <p className="text-center text-xs text-muted-foreground">1 of 1 tasks completed</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-4">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Implementation Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 rounded-lg border p-3">
                                    <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                                    <div>
                                        <p className="text-sm font-medium">Tax Law Changes</p>
                                        <p className="text-xs text-muted-foreground">Recent tax law changes may impact the effectiveness of current tax-loss harvesting strategy. Schedule review with tax specialist before proceeding.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-lg border p-3">
                                    <Calendar className="mt-0.5 h-5 w-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm font-medium">Client Availability</p>
                                        <p className="text-xs text-muted-foreground">Client has limited availability in April due to travel. Prioritize critical implementation items before March 31st.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-lg border p-3">
                                    <FileText className="mt-0.5 h-5 w-5 text-emerald-500" />
                                    <div>
                                        <p className="text-sm font-medium">Documentation Requirements</p>
                                        <p className="text-xs text-muted-foreground">All implementation actions should be documented with clear rationale and aligned with client's stated goals. Use visual aids for quarterly review presentation.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}
