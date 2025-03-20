'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard-layout'
import { PortfolioOverviewClient } from '@/components/portfolio-overview-client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Phone, Calendar, MapPin, ArrowUpRight, ArrowDownRight, FileText, Clock, AlertCircle, CheckCircle2, BarChart, PieChart, TrendingUp, Globe } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, ComposedChart } from 'recharts'
import { ClientProfiling } from '@/components/client-profiling'
import { ImplementationChecklist } from '@/components/implementation-checklist'
import { WorldMap } from '@/components/world-map'
import { ClientInfoCard } from '@/components/client-info-card'

// Mock client data
const clientsData = [
    {
        id: '1',
        name: 'Emma Thompson',
        email: 'emma.thompson@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        occupation: 'CEO, Thompson Enterprises',
        birthdate: '1975-05-12',
        portfolioValue: '$2,400,000',
        change: '+5.2%',
        positive: true,
        lastContact: '2 days ago',
        avatar: '/placeholder.svg?height=80&width=80',
        initials: 'ET',
        riskProfile: 'Moderate',
        clientSince: '2015',
        nextMeeting: '2023-04-15',
        goals: [
            { name: 'Retirement', progress: 65, target: '$3.5M', current: '$2.3M' },
            { name: 'College Fund', progress: 40, target: '$500K', current: '$200K' },
            { name: 'Vacation Home', progress: 85, target: '$800K', current: '$680K' },
        ],
        assetAllocation: [
            { name: 'Equities', value: 55, color: '#0ea5e9' },
            { name: 'Fixed Income', value: 25, color: '#8b5cf6' },
            { name: 'Real Estate', value: 10, color: '#f97316' },
            { name: 'Alternatives', value: 5, color: '#10b981' },
            { name: 'Cash', value: 5, color: '#94a3b8' },
        ],
        sectorExposure: [
            { name: 'Technology', value: 25, color: '#0ea5e9' },
            { name: 'Healthcare', value: 18, color: '#8b5cf6' },
            { name: 'Financials', value: 15, color: '#f97316' },
            { name: 'Consumer', value: 12, color: '#10b981' },
            { name: 'Energy', value: 10, color: '#eab308' },
            { name: 'Industrials', value: 8, color: '#ec4899' },
            { name: 'Materials', value: 7, color: '#6366f1' },
            { name: 'Utilities', value: 5, color: '#94a3b8' },
        ],
        geographicAllocation: [
            { country: 'United States', value: 60, color: '#0ea5e9' },
            { country: 'Europe', value: 15, color: '#8b5cf6' },
            { country: 'China', value: 10, color: '#f97316' },
            { country: 'Japan', value: 5, color: '#10b981' },
            { country: 'India', value: 4, color: '#eab308' },
            { country: 'Brazil', value: 3, color: '#ec4899' },
            { country: 'Canada', value: 2, color: '#6366f1' },
            { country: 'Other', value: 1, color: '#94a3b8' },
        ],
        countryDetails: [
            {
                id: 'USA',
                name: 'United States',
                value: 60,
                holdings: [
                    { name: 'S&P 500 ETF', allocation: '25%', amount: '$600,000' },
                    { name: 'US Tech Leaders', allocation: '20%', amount: '$480,000' },
                    { name: 'US Small Cap', allocation: '10%', amount: '$240,000' },
                    { name: 'US Corporate Bonds', allocation: '5%', amount: '$120,000' },
                ],
            },
            {
                id: 'EUR',
                name: 'Europe',
                value: 15,
                holdings: [
                    { name: 'European Index Fund', allocation: '8%', amount: '$192,000' },
                    { name: 'European Dividend Stocks', allocation: '7%', amount: '$168,000' },
                ],
            },
            {
                id: 'CHN',
                name: 'China',
                value: 10,
                holdings: [
                    { name: 'China Growth ETF', allocation: '6%', amount: '$144,000' },
                    { name: 'China Tech Leaders', allocation: '4%', amount: '$96,000' },
                ],
            },
            {
                id: 'JPN',
                name: 'Japan',
                value: 5,
                holdings: [{ name: 'Japan Index Fund', allocation: '5%', amount: '$120,000' }],
            },
            {
                id: 'IND',
                name: 'India',
                value: 4,
                holdings: [{ name: 'India Growth Fund', allocation: '4%', amount: '$96,000' }],
            },
            { id: 'BRA', name: 'Brazil', value: 3, holdings: [{ name: 'Brazil ETF', allocation: '3%', amount: '$72,000' }] },
            {
                id: 'CAN',
                name: 'Canada',
                value: 2,
                holdings: [{ name: 'Canada Index Fund', allocation: '2%', amount: '$48,000' }],
            },
            {
                id: 'OTH',
                name: 'Other',
                value: 1,
                holdings: [{ name: 'Emerging Markets ETF', allocation: '1%', amount: '$24,000' }],
            },
        ],
        performanceData: [
            { date: 'Jan', portfolio: 2200000, benchmark: 2200000 },
            { date: 'Feb', portfolio: 2150000, benchmark: 2180000 },
            { date: 'Mar', portfolio: 2300000, benchmark: 2250000 },
            { date: 'Apr', portfolio: 2280000, benchmark: 2220000 },
            { date: 'May', portfolio: 2350000, benchmark: 2260000 },
            { date: 'Jun', portfolio: 2320000, benchmark: 2280000 },
            { date: 'Jul', portfolio: 2400000, benchmark: 2320000 },
            { date: 'Aug', portfolio: 2450000, benchmark: 2350000 },
            { date: 'Sep', portfolio: 2420000, benchmark: 2330000 },
            { date: 'Oct', portfolio: 2500000, benchmark: 2380000 },
            { date: 'Nov', portfolio: 2550000, benchmark: 2400000 },
            { date: 'Dec', portfolio: 2600000, benchmark: 2450000 },
        ],
        recentActivity: [
            { date: '2023-03-15', type: 'Purchase', details: 'Bought 50 shares of AAPL @ $165.23', amount: '$8,261.50' },
            { date: '2023-03-10', type: 'Sale', details: 'Sold 75 shares of MSFT @ $285.76', amount: '$21,432.00' },
            { date: '2023-03-01', type: 'Dividend', details: 'Received dividend from VTI', amount: '$1,245.32' },
            { date: '2023-02-20', type: 'Deposit', details: 'Monthly contribution', amount: '$5,000.00' },
        ],
        documents: [
            { name: 'Investment Policy Statement', date: '2023-01-15', type: 'PDF' },
            { name: 'Financial Plan', date: '2023-01-15', type: 'PDF' },
            { name: 'Tax Strategy Document', date: '2023-02-10', type: 'PDF' },
            { name: 'Estate Planning Summary', date: '2022-11-05', type: 'PDF' },
        ],
        notes: [
            { date: '2023-03-01', content: 'Discussed retirement goals and increased monthly contributions by $500.' },
            {
                date: '2023-02-15',
                content: 'Client expressed interest in ESG investments. Researching options for next meeting.',
            },
            { date: '2023-01-20', content: 'Reviewed tax strategy for 2023. Client agreed to tax-loss harvesting approach.' },
        ],
    },
    {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        phone: '+1 (555) 987-6543',
        address: '456 Park Ave, San Francisco, CA 94107',
        occupation: 'CTO, Tech Innovations Inc.',
        birthdate: '1980-09-23',
        portfolioValue: '$1,800,000',
        change: '+3.7%',
        positive: true,
        lastContact: '1 week ago',
        avatar: '/placeholder.svg?height=80&width=80',
        initials: 'MC',
        riskProfile: 'Aggressive',
        clientSince: '2018',
        nextMeeting: '2023-04-20',
        goals: [
            { name: 'Early Retirement', progress: 45, target: '$5M', current: '$2.25M' },
            { name: 'Angel Investing', progress: 60, target: '$500K', current: '$300K' },
            { name: "Children's Education", progress: 30, target: '$600K', current: '$180K' },
        ],
        assetAllocation: [
            { name: 'Equities', value: 70, color: '#0ea5e9' },
            { name: 'Fixed Income', value: 10, color: '#8b5cf6' },
            { name: 'Real Estate', value: 5, color: '#f97316' },
            { name: 'Alternatives', value: 12, color: '#10b981' },
            { name: 'Cash', value: 3, color: '#94a3b8' },
        ],
        sectorExposure: [
            { name: 'Technology', value: 40, color: '#0ea5e9' },
            { name: 'Healthcare', value: 15, color: '#8b5cf6' },
            { name: 'Financials', value: 10, color: '#f97316' },
            { name: 'Consumer', value: 10, color: '#10b981' },
            { name: 'Energy', value: 5, color: '#eab308' },
            { name: 'Industrials', value: 10, color: '#ec4899' },
            { name: 'Materials', value: 5, color: '#6366f1' },
            { name: 'Utilities', value: 5, color: '#94a3b8' },
        ],
        geographicAllocation: [
            { country: 'United States', value: 65, color: '#0ea5e9' },
            { country: 'China', value: 15, color: '#f97316' },
            { country: 'Europe', value: 10, color: '#8b5cf6' },
            { country: 'India', value: 5, color: '#eab308' },
            { country: 'Japan', value: 3, color: '#10b981' },
            { country: 'Other', value: 2, color: '#94a3b8' },
        ],
        countryDetails: [
            {
                id: 'USA',
                name: 'United States',
                value: 65,
                holdings: [
                    { name: 'US Tech ETF', allocation: '30%', amount: '$540,000' },
                    { name: 'S&P 500 Index', allocation: '20%', amount: '$360,000' },
                    { name: 'NASDAQ 100', allocation: '15%', amount: '$270,000' },
                ],
            },
            {
                id: 'CHN',
                name: 'China',
                value: 15,
                holdings: [
                    { name: 'China Tech ETF', allocation: '10%', amount: '$180,000' },
                    { name: 'China A-Shares', allocation: '5%', amount: '$90,000' },
                ],
            },
            {
                id: 'EUR',
                name: 'Europe',
                value: 10,
                holdings: [{ name: 'European Tech Fund', allocation: '10%', amount: '$180,000' }],
            },
            {
                id: 'IND',
                name: 'India',
                value: 5,
                holdings: [{ name: 'India Growth ETF', allocation: '5%', amount: '$90,000' }],
            },
            {
                id: 'JPN',
                name: 'Japan',
                value: 3,
                holdings: [{ name: 'Japan Tech Fund', allocation: '3%', amount: '$54,000' }],
            },
            {
                id: 'OTH',
                name: 'Other',
                value: 2,
                holdings: [{ name: 'Global Emerging Tech', allocation: '2%', amount: '$36,000' }],
            },
        ],
        performanceData: [
            { date: 'Jan', portfolio: 1650000, benchmark: 1650000 },
            { date: 'Feb', portfolio: 1600000, benchmark: 1630000 },
            { date: 'Mar', portfolio: 1680000, benchmark: 1650000 },
            { date: 'Apr', portfolio: 1700000, benchmark: 1670000 },
            { date: 'May', portfolio: 1720000, benchmark: 1690000 },
            { date: 'Jun', portfolio: 1750000, benchmark: 1710000 },
            { date: 'Jul', portfolio: 1730000, benchmark: 1720000 },
            { date: 'Aug', portfolio: 1760000, benchmark: 1730000 },
            { date: 'Sep', portfolio: 1790000, benchmark: 1740000 },
            { date: 'Oct', portfolio: 1810000, benchmark: 1750000 },
            { date: 'Nov', portfolio: 1830000, benchmark: 1760000 },
            { date: 'Dec', portfolio: 1850000, benchmark: 1770000 },
        ],
        recentActivity: [
            { date: '2023-03-12', type: 'Purchase', details: 'Bought 100 shares of NVDA @ $245.87', amount: '$24,587.00' },
            { date: '2023-03-05', type: 'Sale', details: 'Sold 200 shares of AMD @ $87.65', amount: '$17,530.00' },
            { date: '2023-02-28', type: 'Deposit', details: 'Quarterly bonus investment', amount: '$25,000.00' },
            { date: '2023-02-15', type: 'Dividend', details: 'Received dividend from QQQ', amount: '$876.45' },
        ],
        documents: [
            { name: 'Investment Policy Statement', date: '2022-12-10', type: 'PDF' },
            { name: 'Financial Plan', date: '2022-12-10', type: 'PDF' },
            { name: 'Risk Assessment', date: '2023-01-05', type: 'PDF' },
            { name: 'Tech Sector Analysis', date: '2023-02-20', type: 'PDF' },
        ],
        notes: [
            { date: '2023-03-10', content: 'Client interested in increasing allocation to AI and semiconductor companies.' },
            { date: '2023-02-20', content: 'Discussed early retirement scenario planning. Targeting age 50.' },
            {
                date: '2023-01-15',
                content: 'Reviewed angel investing strategy. Setting aside $100K for direct startup investments.',
            },
        ],
    },
    {
        id: '3',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 456-7890',
        address: '789 Oak Dr, Chicago, IL 60601',
        occupation: 'Professor, University of Chicago',
        birthdate: '1972-11-08',
        portfolioValue: '$3,200,000',
        change: '-1.3%',
        positive: false,
        lastContact: '3 days ago',
        avatar: '/placeholder.svg?height=80&width=80',
        initials: 'SJ',
        riskProfile: 'Conservative',
        clientSince: '2010',
        nextMeeting: '2023-04-10',
        goals: [
            { name: 'Retirement', progress: 75, target: '$4M', current: '$3M' },
            { name: 'Legacy Planning', progress: 50, target: '$1.5M', current: '$750K' },
            { name: 'Travel Fund', progress: 90, target: '$200K', current: '$180K' },
        ],
        assetAllocation: [
            { name: 'Equities', value: 40, color: '#0ea5e9' },
            { name: 'Fixed Income', value: 45, color: '#8b5cf6' },
            { name: 'Real Estate', value: 8, color: '#f97316' },
            { name: 'Alternatives', value: 2, color: '#10b981' },
            { name: 'Cash', value: 5, color: '#94a3b8' },
        ],
        sectorExposure: [
            { name: 'Technology', value: 15, color: '#0ea5e9' },
            { name: 'Healthcare', value: 20, color: '#8b5cf6' },
            { name: 'Financials', value: 18, color: '#f97316' },
            { name: 'Consumer', value: 15, color: '#10b981' },
            { name: 'Energy', value: 5, color: '#eab308' },
            { name: 'Industrials', value: 12, color: '#ec4899' },
            { name: 'Materials', value: 5, color: '#6366f1' },
            { name: 'Utilities', value: 10, color: '#94a3b8' },
        ],
        geographicAllocation: [
            { country: 'United States', value: 70, color: '#0ea5e9' },
            { country: 'Europe', value: 12, color: '#8b5cf6' },
            { country: 'Canada', value: 8, color: '#f97316' },
            { country: 'Japan', value: 5, color: '#10b981' },
            { country: 'Australia', value: 3, color: '#eab308' },
            { country: 'Other', value: 2, color: '#94a3b8' },
        ],
        countryDetails: [
            {
                id: 'USA',
                name: 'United States',
                value: 70,
                holdings: [
                    { name: 'S&P 500 ETF', allocation: '30%', amount: '$672,000' },
                    { name: 'US Dividend Fund', allocation: '25%', amount: '$560,000' },
                    { name: 'US Healthcare Stocks', allocation: '15%', amount: '$336,000' },
                ],
            },
            {
                id: 'EUR',
                name: 'Europe',
                value: 12,
                holdings: [
                    { name: 'European Bond Fund', allocation: '7%', amount: '$224,000' },
                    { name: 'European Blue Chips', allocation: '5%', amount: '$160,000' },
                ],
            },
            {
                id: 'CAN',
                name: 'Canada',
                value: 8,
                holdings: [
                    { name: 'Canadian Resource Stocks', allocation: '5%', amount: '$160,000' },
                    { name: 'Canadian Bank Stocks', allocation: '3%', amount: '$96,000' },
                ],
            },
            {
                id: 'JPN',
                name: 'Japan',
                value: 5,
                holdings: [{ name: 'Japan Value Fund', allocation: '5%', amount: '$160,000' }],
            },
            {
                id: 'AUS',
                name: 'Australia',
                value: 3,
                holdings: [{ name: 'Australian Dividend Stocks', allocation: '3%', amount: '$96,000' }],
            },
            {
                id: 'OTH',
                name: 'Other',
                value: 2,
                holdings: [{ name: 'Global Infrastructure Fund', allocation: '2%', amount: '$64,000' }],
            },
        ],
        performanceData: [
            { date: 'Jan', portfolio: 3250000, benchmark: 3250000 },
            { date: 'Feb', portfolio: 3280000, benchmark: 3260000 },
            { date: 'Mar', portfolio: 3260000, benchmark: 3270000 },
            { date: 'Apr', portfolio: 3240000, benchmark: 3280000 },
            { date: 'May', portfolio: 3220000, benchmark: 3290000 },
            { date: 'Jun', portfolio: 3200000, benchmark: 3300000 },
            { date: 'Jul', portfolio: 3180000, benchmark: 3310000 },
            { date: 'Aug', portfolio: 3150000, benchmark: 3320000 },
            { date: 'Sep', portfolio: 3170000, benchmark: 3330000 },
            { date: 'Oct', portfolio: 3190000, benchmark: 3340000 },
            { date: 'Nov', portfolio: 3210000, benchmark: 3350000 },
            { date: 'Dec', portfolio: 3200000, benchmark: 3360000 },
        ],
        recentActivity: [
            {
                date: '2023-03-14',
                type: 'Rebalance',
                details: 'Portfolio rebalancing - reduced equity exposure',
                amount: '$320,000',
            },
            { date: '2023-03-08', type: 'Purchase', details: 'Bought municipal bonds', amount: '$150,000' },
            { date: '2023-02-25', type: 'Sale', details: 'Sold technology stocks', amount: '$85,000' },
            { date: '2023-02-10', type: 'Deposit', details: 'Regular monthly contribution', amount: '$3,000' },
        ],
        documents: [
            { name: 'Investment Policy Statement', date: '2022-11-15', type: 'PDF' },
            { name: 'Financial Plan', date: '2022-11-15', type: 'PDF' },
            { name: 'Estate Planning Documents', date: '2023-01-20', type: 'PDF' },
            { name: 'Tax Strategy', date: '2023-02-05', type: 'PDF' },
        ],
        notes: [
            {
                date: '2023-03-05',
                content: 'Client expressed concern about market volatility. Discussed defensive positioning.',
            },
            { date: '2023-02-10', content: 'Reviewed estate planning documents. Scheduled meeting with attorney.' },
            { date: '2023-01-12', content: 'Discussed charitable giving strategy for 2023. Setting up donor-advised fund.' },
        ],
    },
    {
        id: '4',
        name: 'David Williams',
        email: 'david.williams@example.com',
        phone: '+1 (555) 789-0123',
        address: '321 Pine St, Seattle, WA 98101',
        occupation: 'Retired (Former CFO)',
        birthdate: '1960-03-17',
        portfolioValue: '$5,100,000',
        change: '+2.8%',
        positive: true,
        lastContact: 'Today',
        avatar: '/placeholder.svg?height=80&width=80',
        initials: 'DW',
        riskProfile: 'Moderate-Conservative',
        clientSince: '2008',
        nextMeeting: '2023-04-05',
        goals: [
            { name: 'Income Generation', progress: 85, target: '$200K/yr', current: '$170K/yr' },
            { name: 'Legacy Planning', progress: 70, target: '$3M', current: '$2.1M' },
            { name: 'Charitable Giving', progress: 60, target: '$1M', current: '$600K' },
        ],
        assetAllocation: [
            { name: 'Equities', value: 45, color: '#0ea5e9' },
            { name: 'Fixed Income', value: 35, color: '#8b5cf6' },
            { name: 'Real Estate', value: 12, color: '#f97316' },
            { name: 'Alternatives', value: 5, color: '#10b981' },
            { name: 'Cash', value: 3, color: '#94a3b8' },
        ],
        sectorExposure: [
            { name: 'Technology', value: 10, color: '#0ea5e9' },
            { name: 'Healthcare', value: 25, color: '#8b5cf6' },
            { name: 'Financials', value: 20, color: '#f97316' },
            { name: 'Consumer', value: 10, color: '#10b981' },
            { name: 'Energy', value: 10, color: '#eab308' },
            { name: 'Industrials', value: 10, color: '#ec4899' },
            { name: 'Materials', value: 5, color: '#6366f1' },
            { name: 'Utilities', value: 10, color: '#94a3b8' },
        ],
        geographicAllocation: [
            { country: 'United States', value: 80, color: '#0ea5e9' },
            { country: 'Canada', value: 10, color: '#f97316' },
            { country: 'United Kingdom', value: 5, color: '#8b5cf6' },
            { country: 'Switzerland', value: 3, color: '#10b981' },
            { country: 'Other', value: 2, color: '#94a3b8' },
        ],
        countryDetails: [
            {
                id: 'USA',
                name: 'United States',
                value: 80,
                holdings: [
                    { name: 'US Dividend Stocks', allocation: '35%', amount: '$1,428,000' },
                    { name: 'US Corporate Bonds', allocation: '25%', amount: '$1,020,000' },
                    { name: 'US Real Estate', allocation: '20%', amount: '$816,000' },
                ],
            },
            {
                id: 'CAN',
                name: 'Canada',
                value: 10,
                holdings: [
                    { name: 'Canadian Dividend Stocks', allocation: '6%', amount: '$306,000' },
                    { name: 'Canadian Government Bonds', allocation: '4%', amount: '$204,000' },
                ],
            },
            {
                id: 'GBR',
                name: 'United Kingdom',
                value: 5,
                holdings: [{ name: 'UK Dividend Stocks', allocation: '5%', amount: '$255,000' }],
            },
            {
                id: 'CHE',
                name: 'Switzerland',
                value: 3,
                holdings: [{ name: 'Swiss Blue Chips', allocation: '3%', amount: '$153,000' }],
            },
            {
                id: 'OTH',
                name: 'Other',
                value: 2,
                holdings: [{ name: 'Global Infrastructure Fund', allocation: '2%', amount: '$102,000' }],
            },
        ],
        performanceData: [
            { date: 'Jan', portfolio: 4950000, benchmark: 4950000 },
            { date: 'Feb', portfolio: 4980000, benchmark: 4960000 },
            { date: 'Mar', portfolio: 5020000, benchmark: 4970000 },
            { date: 'Apr', portfolio: 5050000, benchmark: 4980000 },
            { date: 'May', portfolio: 5080000, benchmark: 4990000 },
            { date: 'Jun', portfolio: 5030000, benchmark: 5000000 },
            { date: 'Jul', portfolio: 5060000, benchmark: 5010000 },
            { date: 'Aug', portfolio: 5090000, benchmark: 5020000 },
            { date: 'Sep', portfolio: 5120000, benchmark: 5030000 },
            { date: 'Oct', portfolio: 5150000, benchmark: 5040000 },
            { date: 'Nov', portfolio: 5180000, benchmark: 5050000 },
            { date: 'Dec', portfolio: 5210000, benchmark: 5060000 },
        ],
        recentActivity: [
            { date: '2023-03-15', type: 'Income', details: 'Dividend income distribution', amount: '$42,500' },
            { date: '2023-03-10', type: 'Purchase', details: 'Added to dividend aristocrats position', amount: '$150,000' },
            { date: '2023-02-28', type: 'Charitable Gift', details: 'Donation to Williams Foundation', amount: '$25,000' },
            { date: '2023-02-15', type: 'Sale', details: 'Trimmed growth stocks position', amount: '$75,000' },
        ],
        documents: [
            { name: 'Investment Policy Statement', date: '2022-10-10', type: 'PDF' },
            { name: 'Financial Plan', date: '2022-10-10', type: 'PDF' },
            { name: 'Estate Planning Documents', date: '2022-12-15', type: 'PDF' },
            { name: 'Charitable Giving Strategy', date: '2023-01-10', type: 'PDF' },
        ],
        notes: [
            {
                date: '2023-03-15',
                content: 'Discussed income strategy adjustments. Increasing allocation to dividend stocks.',
            },
            { date: '2023-02-20', content: 'Reviewed charitable giving plan. Setting up additional donor-advised fund.' },
            {
                date: '2023-01-25',
                content: 'Discussed legacy planning with client and adult children. Scheduling family meeting.',
            },
        ],
    },
    {
        id: '5',
        name: 'Jennifer Lee',
        email: 'jennifer.lee@example.com',
        phone: '+1 (555) 234-5678',
        address: '567 Maple Ave, Boston, MA 02108',
        occupation: 'Surgeon, Boston Medical Center',
        birthdate: '1985-07-30',
        portfolioValue: '$1,500,000',
        change: '+4.1%',
        positive: true,
        lastContact: 'Yesterday',
        avatar: '/placeholder.svg?height=80&width=80',
        initials: 'JL',
        riskProfile: 'Aggressive',
        clientSince: '2019',
        nextMeeting: '2023-04-25',
        goals: [
            { name: 'Early Retirement', progress: 35, target: '$4M', current: '$1.4M' },
            { name: 'Home Purchase', progress: 80, target: '$250K', current: '$200K' },
            { name: 'Education Fund', progress: 20, target: '$300K', current: '$60K' },
        ],
        assetAllocation: [
            { name: 'Equities', value: 75, color: '#0ea5e9' },
            { name: 'Fixed Income', value: 10, color: '#8b5cf6' },
            { name: 'Real Estate', value: 8, color: '#f97316' },
            { name: 'Alternatives', value: 5, color: '#10b981' },
            { name: 'Cash', value: 2, color: '#94a3b8' },
        ],
        sectorExposure: [
            { name: 'Technology', value: 45, color: '#0ea5e9' },
            { name: 'Healthcare', value: 20, color: '#8b5cf6' },
            { name: 'Consumer Discretionary', value: 10, color: '#f97316' },
            { name: 'Financials', value: 10, color: '#10b981' },
            { name: 'Communication Services', value: 5, color: '#eab308' },
            { name: 'Industrials', value: 5, color: '#ec4899' },
            { name: 'Real Estate', value: 3, color: '#6366f1' },
            { name: 'Materials', value: 2, color: '#94a3b8' },
        ],
        geographicAllocation: [
            { country: 'United States', value: 85, color: '#0ea5e9' },
            { country: 'China', value: 5, color: '#f97316' },
            { country: 'Emerging Markets', value: 5, color: '#8b5cf6' },
            { country: 'Other', value: 5, color: '#94a3b8' },
        ],
        countryDetails: [
            {
                id: 'USA',
                name: 'United States',
                value: 85,
                holdings: [
                    { name: 'US Growth Stocks', allocation: '40%', amount: '$510,000' },
                    { name: 'US Tech ETF', allocation: '25%', amount: '$300,000' },
                    { name: 'US Healthcare Stocks', allocation: '20%', amount: '$240,000' },
                ],
            },
            {
                id: 'CHN',
                name: 'China',
                value: 5,
                holdings: [{ name: 'China Tech ETF', allocation: '5%', amount: '$60,000' }],
            },
            {
                id: 'EMR',
                name: 'Emerging Markets',
                value: 5,
                holdings: [{ name: 'Emerging Markets ETF', allocation: '5%', amount: '$60,000' }],
            },
            {
                id: 'OTH',
                name: 'Other',
                value: 5,
                holdings: [{ name: 'Global Innovation Fund', allocation: '5%', amount: '$60,000' }],
            },
        ],
        performanceData: [
            { date: 'Jan', portfolio: 1420000, benchmark: 1420000 },
            { date: 'Feb', portfolio: 1440000, benchmark: 1425000 },
            { date: 'Mar', portfolio: 1460000, benchmark: 1430000 },
            { date: 'Apr', portfolio: 1450000, benchmark: 1435000 },
            { date: 'May', portfolio: 1470000, benchmark: 1440000 },
            { date: 'Jun', portfolio: 1490000, benchmark: 1445000 },
            { date: 'Jul', portfolio: 1510000, benchmark: 1450000 },
            { date: 'Aug', portfolio: 1500000, benchmark: 1455000 },
            { date: 'Sep', portfolio: 1520000, benchmark: 1460000 },
            { date: 'Oct', portfolio: 1540000, benchmark: 1465000 },
            { date: 'Nov', portfolio: 1560000, benchmark: 1470000 },
            { date: 'Dec', portfolio: 1580000, benchmark: 1475000 },
        ],
        recentActivity: [
            { date: '2023-03-14', type: 'Purchase', details: 'Bought growth ETFs', amount: '$50,000' },
            { date: '2023-03-01', type: 'Deposit', details: 'Monthly contribution', amount: '$10,000' },
            { date: '2023-02-15', type: 'Purchase', details: 'Added to healthcare sector position', amount: '$25,000' },
            { date: '2023-02-01', type: 'Deposit', details: 'Monthly contribution', amount: '$10,000' },
        ],
        documents: [
            { name: 'Investment Policy Statement', date: '2023-01-05', type: 'PDF' },
            { name: 'Financial Plan', date: '2023-01-05', type: 'PDF' },
            { name: 'Risk Assessment', date: '2023-01-05', type: 'PDF' },
            { name: 'Retirement Projection', date: '2023-02-10', type: 'PDF' },
        ],
        notes: [
            { date: '2023-03-10', content: 'Discussed increasing monthly contributions to accelerate retirement goal.' },
            { date: '2023-02-15', content: 'Reviewed home purchase timeline. Planning to buy in next 6-12 months.' },
            { date: '2023-01-20', content: 'Discussed tax-efficient investment strategies for high income.' },
        ],
    },
]

interface ClientDetailPageProps {
    clientId: string
}

/** AGGIORNAMENTO DATI PERFORMANCE
 * * Gestisce l'aggiornamento dei dati di performance del cliente
 * ! Attenzione: i dati sono simulati
 * @param currentData array dei dati di performance attuali
 * @returns nuovo array con dati aggiornati
 */
const updatePerformanceData = (currentData: any[]) => {
    const lastData = currentData[currentData.length - 1]
    const newPortfolioValue = lastData.portfolio * (1 + (Math.random() * 0.3 - 0.02)) // ±2% change
    const newBenchmarkValue = lastData.benchmark * (1 + (Math.random() * 0.5 - 0.015)) // ±1.5% change

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()

    const newData = [
        ...currentData,
        {
            date: months[currentMonth],
            portfolio: Math.round(newPortfolioValue),
            benchmark: Math.round(newBenchmarkValue),
        },
    ]

    // Keep only last 12 months of data
    if (newData.length > 12) {
        return newData.slice(1)
    }
    return newData
}

export function ClientDetailPage({ clientId }: ClientDetailPageProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [client, setClient] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

    useEffect(() => {
        // Simulate API call to fetch client data
        setLoading(true)
        const foundClient = clientsData.find((c) => c.id === clientId)
        setClient(foundClient ? { ...foundClient } : null)
        setLoading(false)
    }, [clientId])

    useEffect(() => {
        if (!client) return

        const interval = setInterval(() => {
            setClient((prevClient: any) => ({
                ...prevClient,
                performanceData: updatePerformanceData(prevClient.performanceData),
            }))
        }, 1000)

        return () => clearInterval(interval)
    }, [client])

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex flex-col gap-6 p-6 md:p-8">
                    <div className="flex h-[600px] items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                            <p className="text-muted-foreground">Loading client data...</p>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    if (!client) {
        return (
            <DashboardLayout>
                <div className="flex flex-col gap-6 p-6 md:p-8">
                    <div className="flex h-[600px] items-center justify-center">
                        <div className="text-center">
                            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                            <h2 className="mb-2 text-xl font-bold">Client Not Found</h2>
                            <p className="mb-4 text-muted-foreground">The client you're looking for doesn't exist or has been removed.</p>
                            <Button onClick={() => router.push('/clients')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Clients
                            </Button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    const handleCountrySelect = (countryId: string) => {
        setSelectedCountry(countryId === selectedCountry ? null : countryId)
    }

    const selectedCountryData = selectedCountry ? client.countryDetails.find((country: any) => country.id === selectedCountry) : null

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 p-6 md:p-8">
                <div className="mb-2 flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push('/clients')}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Clients
                    </Button>
                </div>

                <div className="flex flex-col items-start gap-6 md:flex-row">
                    <ClientInfoCard client={client} />
                    <div className="w-full space-y-6 md:w-3/4">
                        <Tabs defaultValue="overview">
                            <TabsList className="mb-4 flex w-full justify-between">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="allocation">Allocation</TabsTrigger>
                                <TabsTrigger value="geography">Geography</TabsTrigger>
                                <TabsTrigger value="goals">Goals</TabsTrigger>
                                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                                <TabsTrigger value="activity">Activity</TabsTrigger>
                                <TabsTrigger value="profiling">Client Profiling</TabsTrigger>
                                <TabsTrigger value="implementation">Implementation</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="overview"
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="md:col-span-2">
                                        <PortfolioOverviewClient />
                                    </div>
                                    <div className="md:col-span-1">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">AI-Powered Insights</CardTitle>
                                                <CardDescription>Personalized insights for {client.name}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div className="flex gap-3 rounded-lg border p-3">
                                                        <div className="mt-0.5 flex items-center justify-center rounded-full bg-emerald-500/10 p-1.5 text-emerald-500">
                                                            <TrendingUp className="h-4 w-4" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="text-sm font-medium">Portfolio Opportunity</h4>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="text-[10px]"
                                                                >
                                                                    opportunity
                                                                </Badge>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">{client.riskProfile === 'Aggressive' ? 'Consider increasing allocation to emerging markets for higher growth potential.' : client.riskProfile === 'Conservative' ? 'Municipal bonds currently offer attractive tax-adjusted yields for your profile.' : 'Technology sector appears undervalued based on your investment criteria.'}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3 rounded-lg border p-3">
                                                        <div className="mt-0.5 flex items-center justify-center rounded-full bg-amber-500/10 p-1.5 text-amber-500">
                                                            <AlertCircle className="h-4 w-4" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="text-sm font-medium">Action Required</h4>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="text-[10px]"
                                                                >
                                                                    alert
                                                                </Badge>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">{client.goals.some((g: any) => g.name.includes('Retirement')) ? 'Retirement contributions below target. Consider increasing by 10%.' : 'Portfolio rebalancing needed to maintain target risk profile.'}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3 rounded-lg border p-3">
                                                        <div className="mt-0.5 flex items-center justify-center rounded-full bg-blue-500/10 p-1.5 text-blue-500">
                                                            <CheckCircle2 className="h-4 w-4" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="text-sm font-medium">Tax Optimization</h4>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="text-[10px]"
                                                                >
                                                                    strategy
                                                                </Badge>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">Tax-loss harvesting opportunity identified in international equity positions.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="md:col-span-2">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Financial Goals</CardTitle>
                                                <CardDescription>Progress toward key objectives</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    {client.goals.map((goal: any, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="space-y-2"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium">{goal.name}</span>
                                                                <span className="text-sm">
                                                                    {goal.current} of {goal.target}
                                                                </span>
                                                            </div>
                                                            <Progress
                                                                value={goal.progress}
                                                                className="h-2"
                                                                color="#0a8ec9"
                                                            />
                                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                                <span>Progress: {goal.progress}%</span>
                                                                <span>Target: 100%</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="md:col-span-1">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Recent Activity</CardTitle>
                                                <CardDescription>Latest transactions</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    {client.recentActivity.slice(0, 3).map((activity: any, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-3 rounded-lg border p-2"
                                                        >
                                                            <div className="mt-0.5">
                                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                            </div>
                                                            <div className="flex-1 space-y-1">
                                                                <div className="flex items-center justify-between">
                                                                    <h4 className="text-sm font-medium">{activity.type}</h4>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-[10px]"
                                                                    >
                                                                        {activity.date}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-xs text-muted-foreground">{activity.details}</p>
                                                                <p className="text-xs font-medium">{activity.amount}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full text-xs"
                                                    >
                                                        View All Activity
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="allocation"
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Portfolio Allocation</CardTitle>
                                        <CardDescription>Current allocation across asset classes and sectors</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Tabs defaultValue="asset-allocation">
                                            <TabsList className="mb-4">
                                                <TabsTrigger value="asset-allocation">Asset Allocation</TabsTrigger>
                                                <TabsTrigger value="sector-exposure">Sector Exposure</TabsTrigger>
                                            </TabsList>

                                            <TabsContent
                                                value="asset-allocation"
                                                className="space-y-4"
                                            >
                                                <div className="h-[250px]">
                                                    <ResponsiveContainer
                                                        width="100%"
                                                        height="100%"
                                                    >
                                                        <RechartsBarChart data={client.assetAllocation}>
                                                            <CartesianGrid
                                                                strokeDasharray="3 3"
                                                                opacity={0.2}
                                                            />
                                                            <XAxis dataKey="name" />
                                                            <YAxis tickFormatter={(value) => `${value}%`} />
                                                            <Tooltip
                                                                formatter={(value: number) => [`${value}%`, '']}
                                                                labelFormatter={(label) => `${label}`}
                                                            />
                                                            <Bar
                                                                dataKey="value"
                                                                radius={[4, 4, 0, 0]}
                                                            >
                                                                {client.assetAllocation.map((item: any) => (
                                                                    <Cell fill={item.color} />
                                                                ))}
                                                            </Bar>
                                                        </RechartsBarChart>
                                                    </ResponsiveContainer>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    {client.assetAllocation.map((item: any) => (
                                                        <div
                                                            key={item.name}
                                                            className="flex items-center justify-between rounded-md border p-2"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="h-3 w-3 rounded-full"
                                                                    style={{ backgroundColor: item.color }}
                                                                />
                                                                <span className="text-sm">{item.name}</span>
                                                            </div>
                                                            <span className="text-sm font-medium">{item.value}%</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </TabsContent>

                                            <TabsContent
                                                value="sector-exposure"
                                                className="space-y-4"
                                            >
                                                <div className="h-[250px]">
                                                    <ResponsiveContainer
                                                        width="100%"
                                                        height="100%"
                                                    >
                                                        <RechartsBarChart data={client.sectorExposure}>
                                                            <CartesianGrid
                                                                strokeDasharray="3 3"
                                                                opacity={0.2}
                                                            />
                                                            <XAxis dataKey="name" />
                                                            <YAxis tickFormatter={(value) => `${value}%`} />
                                                            <Tooltip
                                                                formatter={(value: number) => [`${value}%`, '']}
                                                                labelFormatter={(label) => `${label}`}
                                                            />
                                                            <Bar
                                                                dataKey="value"
                                                                radius={[4, 4, 0, 0]}
                                                            >
                                                                {client.sectorExposure.map((item: any) => (
                                                                    <Cell fill={item.color} />
                                                                ))}
                                                            </Bar>
                                                        </RechartsBarChart>
                                                    </ResponsiveContainer>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    {client.sectorExposure.map((item: any) => (
                                                        <div
                                                            key={item.name}
                                                            className="flex items-center justify-between rounded-md border p-2"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="h-3 w-3 rounded-full"
                                                                    style={{ backgroundColor: item.color }}
                                                                />
                                                                <span className="text-sm">{item.name}</span>
                                                            </div>
                                                            <span className="text-sm font-medium">{item.value}%</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value="geography"
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Geographic Allocation</CardTitle>
                                        <CardDescription>Portfolio distribution across global markets</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <div className="mb-4 h-[350px]">
                                                    <WorldMap
                                                        data={client.geographicAllocation}
                                                        onCountrySelect={handleCountrySelect}
                                                        selectedCountry={selectedCountry}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {client.geographicAllocation.map((item: any) => (
                                                        <div
                                                            key={item.country}
                                                            className={`flex cursor-pointer items-center justify-between rounded-md border p-2 ${selectedCountry === client.countryDetails.find((c: any) => c.name === item.country)?.id ? 'border-primary bg-primary/10' : ''}`}
                                                            onClick={() => {
                                                                const countryDetail = client.countryDetails.find((c: any) => c.name === item.country)
                                                                if (countryDetail) {
                                                                    handleCountrySelect(countryDetail.id)
                                                                }
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="h-3 w-3 rounded-full"
                                                                    style={{ backgroundColor: item.color }}
                                                                />
                                                                <span className="text-sm">{item.country}</span>
                                                            </div>
                                                            <span className="text-sm font-medium">{item.value}%</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                {selectedCountryData ? (
                                                    <div className="space-y-4">
                                                        <div className="rounded-lg border p-4">
                                                            <h3 className="mb-2 text-lg font-medium">{selectedCountryData.name}</h3>
                                                            <div className="mb-4 flex items-center gap-2">
                                                                <Badge
                                                                    variant="outline"
                                                                    className="px-3 py-1"
                                                                >
                                                                    {selectedCountryData.value}% of Portfolio
                                                                </Badge>
                                                                <Badge
                                                                    variant="outline"
                                                                    className="px-3 py-1"
                                                                >
                                                                    ${((Number.parseFloat(client.portfolioValue.replace(/[^0-9.]/g, '')) * selectedCountryData.value) / 100).toLocaleString()} Value
                                                                </Badge>
                                                            </div>

                                                            <h4 className="mb-2 text-sm font-medium">Holdings</h4>
                                                            <div className="space-y-2">
                                                                {selectedCountryData.holdings.map((holding: any, index: number) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex items-center justify-between rounded-md border p-2"
                                                                    >
                                                                        <span className="text-sm">{holding.name}</span>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-xs text-muted-foreground">{holding.allocation}</span>
                                                                            <span className="text-sm font-medium">{holding.amount}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="rounded-lg border p-4">
                                                            <h4 className="mb-2 text-sm font-medium">Market Insights</h4>
                                                            <p className="mb-2 text-sm text-muted-foreground">
                                                                {selectedCountryData.name === 'United States'
                                                                    ? 'US markets continue to show resilience despite inflation concerns. Technology and healthcare sectors are leading growth.'
                                                                    : selectedCountryData.name === 'Europe'
                                                                      ? 'European markets face challenges from energy costs and geopolitical tensions, but valuations remain attractive.'
                                                                      : selectedCountryData.name === 'China'
                                                                        ? 'Chinese markets are showing signs of recovery after regulatory changes. Long-term growth prospects remain strong.'
                                                                        : selectedCountryData.name === 'Japan'
                                                                          ? "Japan's market benefits from corporate governance reforms and increased shareholder returns."
                                                                          : selectedCountryData.name === 'India'
                                                                            ? 'India continues to be one of the fastest-growing major economies with strong domestic consumption.'
                                                                            : selectedCountryData.name === 'Brazil'
                                                                              ? 'Brazil offers value opportunities but faces political and economic volatility.'
                                                                              : selectedCountryData.name === 'Canada'
                                                                                ? 'Canadian markets benefit from natural resource strength and stable financial sector.'
                                                                                : 'Emerging markets offer growth potential but with higher volatility.'}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                <Badge
                                                                    variant={selectedCountryData.name === 'United States' || selectedCountryData.name === 'India' ? 'outline' : 'secondary'}
                                                                    className="text-xs"
                                                                >
                                                                    {selectedCountryData.name === 'United States' || selectedCountryData.name === 'India' ? 'Overweight' : 'Neutral'}
                                                                </Badge>
                                                                <Badge
                                                                    variant={selectedCountryData.name === 'Europe' ? 'outline' : 'secondary'}
                                                                    className="text-xs"
                                                                >
                                                                    {selectedCountryData.name === 'Europe' ? 'Underweight' : ''}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex h-full flex-col items-center justify-center">
                                                        <Globe className="mb-4 h-16 w-16 text-muted-foreground/20" />
                                                        <p className="text-center text-muted-foreground">Select a region on the map or from the list to view detailed holdings</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="mb-4 font-medium">Geographic Performance</h3>
                                            <div className="h-[250px]">
                                                <ResponsiveContainer
                                                    width="100%"
                                                    height="100%"
                                                >
                                                    <ComposedChart
                                                        data={[
                                                            {
                                                                region: 'North America',
                                                                allocation: client.geographicAllocation.find((g: any) => g.country === 'United States')?.value + (client.geographicAllocation.find((g: any) => g.country === 'Canada')?.value || 0),
                                                                performance: 8.2,
                                                            },
                                                            {
                                                                region: 'Europe',
                                                                allocation: client.geographicAllocation.find((g: any) => g.country === 'Europe')?.value,
                                                                performance: 4.5,
                                                            },
                                                            {
                                                                region: 'Asia',
                                                                allocation: (client.geographicAllocation.find((g: any) => g.country === 'China')?.value || 0) + (client.geographicAllocation.find((g: any) => g.country === 'Japan')?.value || 0) + (client.geographicAllocation.find((g: any) => g.country === 'India')?.value || 0),
                                                                performance: 6.8,
                                                            },
                                                            {
                                                                region: 'Latin America',
                                                                allocation: client.geographicAllocation.find((g: any) => g.country === 'Brazil')?.value,
                                                                performance: 3.2,
                                                            },
                                                            {
                                                                region: 'Other',
                                                                allocation: client.geographicAllocation.find((g: any) => g.country === 'Other')?.value,
                                                                performance: 5.1,
                                                            },
                                                        ]}
                                                    >
                                                        <CartesianGrid
                                                            strokeDasharray="3 3"
                                                            opacity={0.2}
                                                        />
                                                        <XAxis dataKey="region" />
                                                        <YAxis
                                                            yAxisId="left"
                                                            orientation="left"
                                                            tickFormatter={(value) => `${value}%`}
                                                        />
                                                        <YAxis
                                                            yAxisId="right"
                                                            orientation="right"
                                                            tickFormatter={(value) => `${value}%`}
                                                        />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar
                                                            yAxisId="left"
                                                            dataKey="allocation"
                                                            name="Allocation"
                                                            fill="#0ea5e9"
                                                            radius={[4, 4, 0, 0]}
                                                        />
                                                        <Line
                                                            yAxisId="right"
                                                            type="monotone"
                                                            dataKey="performance"
                                                            name="YTD Performance"
                                                            stroke="#f97316"
                                                            strokeWidth={2}
                                                        />
                                                    </ComposedChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value="goals"
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Financial Goals</CardTitle>
                                        <CardDescription>Detailed view of client's financial objectives</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {client.goals.map((goal: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="rounded-lg border p-4"
                                                >
                                                    <div className="mb-4 flex items-start justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-medium">{goal.name}</h3>
                                                            <p className="text-sm text-muted-foreground">Target: {goal.target}</p>
                                                        </div>
                                                        <Badge className={`px-3 py-1 ${goal.progress >= 75 ? 'bg-emerald-500/10 text-emerald-600' : goal.progress >= 50 ? 'bg-amber-500/10 text-amber-600' : 'bg-blue-500/10 text-blue-600'}`}>{goal.progress >= 75 ? 'On Track' : goal.progress >= 50 ? 'In Progress' : 'Getting Started'}</Badge>
                                                    </div>

                                                    <div className="mb-4 space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">Current: {goal.current}</span>
                                                            <span className="text-sm">Target: {goal.target}</span>
                                                        </div>
                                                        <Progress
                                                            value={goal.progress}
                                                            className="h-2"
                                                        />
                                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                            <span>Progress: {goal.progress}%</span>
                                                            <span>Remaining: {100 - goal.progress}%</span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                                                        <div className="rounded-md border p-3">
                                                            <div className="mb-1 text-muted-foreground">Projected Completion</div>
                                                            <div className="font-medium">2035</div>
                                                        </div>
                                                        <div className="rounded-md border p-3">
                                                            <div className="mb-1 text-muted-foreground">Monthly Contribution</div>
                                                            <div className="font-medium">$2,500</div>
                                                        </div>
                                                        <div className="rounded-md border p-3">
                                                            <div className="mb-1 text-muted-foreground">Required Return</div>
                                                            <div className="font-medium">7.2% annually</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value="portfolio"
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Portfolio Analysis</CardTitle>
                                        <CardDescription>Detailed breakdown of client's investment portfolio</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                <div className="rounded-lg border p-4">
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <BarChart className="h-5 w-5 text-primary" />
                                                        <h3 className="font-medium">Total Value</h3>
                                                    </div>
                                                    <div className="mb-1 text-2xl font-bold">{client.portfolioValue}</div>
                                                    <div className="flex items-center text-sm">
                                                        {client.positive ? <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" /> : <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />}
                                                        <span className={client.positive ? 'text-emerald-500' : 'text-red-500'}>{client.change} YTD</span>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border p-4">
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <PieChart className="h-5 w-5 text-primary" />
                                                        <h3 className="font-medium">Risk Profile</h3>
                                                    </div>
                                                    <div className="mb-1 text-2xl font-bold">{client.riskProfile}</div>
                                                    <div className="text-sm text-muted-foreground">Last reviewed: Jan 2023</div>
                                                </div>

                                                <div className="rounded-lg border p-4">
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <TrendingUp className="h-5 w-5 text-primary" />
                                                        <h3 className="font-medium">Expected Return</h3>
                                                    </div>
                                                    <div className="mb-1 text-2xl font-bold">7.8%</div>
                                                    <div className="text-sm text-muted-foreground">Long-term annual projection</div>
                                                </div>
                                            </div>

                                            <div className="rounded-lg border p-4">
                                                <h3 className="mb-4 font-medium">Asset Allocation</h3>
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <div className="h-[250px]">
                                                        <ResponsiveContainer
                                                            width="100%"
                                                            height="100%"
                                                        >
                                                            <RechartsPieChart>
                                                                <Pie
                                                                    data={client.assetAllocation}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    innerRadius={60}
                                                                    outerRadius={80}
                                                                    paddingAngle={2}
                                                                    dataKey="value"
                                                                    label={({ name, value }) => `${name}: ${value}%`}
                                                                    labelLine={false}
                                                                >
                                                                    {client.assetAllocation.map((entry: any, index: number) => (
                                                                        <Cell
                                                                            key={`cell-${index}`}
                                                                            fill={entry.color}
                                                                        />
                                                                    ))}
                                                                </Pie>
                                                                <Tooltip formatter={(value) => [`${value}%`, '']} />
                                                            </RechartsPieChart>
                                                        </ResponsiveContainer>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {client.assetAllocation.map((item: any, index: number) => (
                                                            <div
                                                                key={index}
                                                                className="space-y-1"
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2">
                                                                        <div
                                                                            className="h-3 w-3 rounded-full"
                                                                            style={{ backgroundColor: item.color }}
                                                                        />
                                                                        <span className="text-sm">{item.name}</span>
                                                                    </div>
                                                                    <span className="text-sm font-medium">{item.value}%</span>
                                                                </div>
                                                                <Progress
                                                                    value={item.value}
                                                                    className="h-2"
                                                                    style={{ backgroundColor: `${item.color}20` }}
                                                                    indicatorStyle={{ backgroundColor: item.color }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-lg border p-4">
                                                <h3 className="mb-4 font-medium">Performance History</h3>
                                                <div className="h-[300px]">
                                                    <ResponsiveContainer
                                                        width="100%"
                                                        height="100%"
                                                    >
                                                        <LineChart data={client.performanceData}>
                                                            <CartesianGrid
                                                                strokeDasharray="3 3"
                                                                opacity={0.2}
                                                            />
                                                            <XAxis dataKey="date" />
                                                            <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                                                            <Tooltip
                                                                formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, '']}
                                                                labelFormatter={(label) => `Date: ${label}`}
                                                            />
                                                            <Legend />
                                                            <Line
                                                                type="monotone"
                                                                dataKey="portfolio"
                                                                name="Portfolio"
                                                                stroke="#0ea5e9"
                                                                strokeWidth={2}
                                                                activeDot={{ r: 6, strokeWidth: 2 }}
                                                            />
                                                            <Line
                                                                type="monotone"
                                                                dataKey="benchmark"
                                                                name="Benchmark"
                                                                stroke="#94a3b8"
                                                                strokeWidth={2}
                                                                strokeDasharray="5 5"
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value="activity"
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Activity</CardTitle>
                                        <CardDescription>Recent transactions and portfolio changes</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {client.recentActivity.map((activity: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-4 rounded-lg border p-4"
                                                >
                                                    <div className="flex-none">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                            {activity.type === 'Purchase' && <ArrowUpRight className="h-5 w-5 text-emerald-500" />}
                                                            {activity.type === 'Sale' && <ArrowDownRight className="h-5 w-5 text-blue-500" />}
                                                            {activity.type === 'Dividend' && <BarChart className="h-5 w-5 text-purple-500" />}
                                                            {activity.type === 'Deposit' && <ArrowUpRight className="h-5 w-5 text-emerald-500" />}
                                                            {activity.type === 'Income' && <BarChart className="h-5 w-5 text-amber-500" />}
                                                            {activity.type === 'Rebalance' && <PieChart className="h-5 w-5 text-blue-500" />}
                                                            {activity.type === 'Charitable Gift' && <CheckCircle2 className="h-5 w-5 text-red-500" />}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="mb-1 flex items-center justify-between">
                                                            <div className="text-sm font-medium">{activity.type}</div>
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {activity.date}
                                                            </Badge>
                                                        </div>
                                                        <p className="mb-1 text-sm text-muted-foreground">{activity.details}</p>
                                                        <p className="text-sm font-medium">{activity.amount}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="profiling">
                                <ClientProfiling />
                            </TabsContent>

                            <TabsContent value="implementation">
                                <ImplementationChecklist />
                            </TabsContent>

                            <TabsContent
                                value="documents"
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Client Documents</CardTitle>
                                        <CardDescription>Important files and statements</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {client.documents.map((doc: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between rounded-lg border p-4"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                            <FileText className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{doc.name}</div>
                                                            <div className="text-sm text-muted-foreground">Added: {doc.date}</div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        View
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value="notes"
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Meeting Notes</CardTitle>
                                                <CardDescription>Records of client interactions</CardDescription>
                                            </div>
                                            <Button size="sm">Add Note</Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {client.notes.map((note: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="rounded-lg border p-4"
                                                >
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <Badge
                                                            variant="outline"
                                                            className="px-3 py-1"
                                                        >
                                                            {note.date}
                                                        </Badge>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <FileText className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <p className="text-sm">{note.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
