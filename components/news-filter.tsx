'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface NewsFilterProps {
    onFilterChange: (filters: string[]) => void
    onCategoryChange: (category: string) => void
}

export function NewsFilter({ onFilterChange, onCategoryChange }: NewsFilterProps) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const handleFilterSelect = (filter: string) => {
        const newFilters = selectedFilters.includes(filter) ? selectedFilters.filter((f) => f !== filter) : [...selectedFilters, filter]

        setSelectedFilters(newFilters)
        onFilterChange(newFilters)
    }

    return (
        <div className="flex flex-col gap-2 sm:flex-row">
            <Tabs
                defaultValue="all"
                className="w-full sm:w-auto"
                onValueChange={onCategoryChange}
            >
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="market">Market</TabsTrigger>
                    <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
                    <TabsTrigger value="economic">Economic</TabsTrigger>
                </TabsList>
            </Tabs>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        Filters
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-56"
                >
                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        checked={selectedFilters.includes('relevance')}
                        onCheckedChange={() => handleFilterSelect('relevance')}
                    >
                        Relevance to Clients
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={selectedFilters.includes('impact')}
                        onCheckedChange={() => handleFilterSelect('impact')}
                    >
                        High Impact
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={selectedFilters.includes('actionable')}
                        onCheckedChange={() => handleFilterSelect('actionable')}
                    >
                        Actionable Insights
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={selectedFilters.includes('recent')}
                        onCheckedChange={() => handleFilterSelect('recent')}
                    >
                        Last 24 Hours
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
