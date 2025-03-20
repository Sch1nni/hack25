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

let show_ai_report = false

function setShowAiReport(value: boolean) {
    show_ai_report = value
}

// Mock client data
const clientsData = [
    {
        id: '1',
        name: 'William Anderson',
        email: 'william.anderson@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        occupation: 'CEO, Thompson Enterprises',
        birthdate: '1975-05-12',
        portfolioValue: '10000',
        change: '+5.2%',
        positive: true,
        lastContact: '2 days ago',
        avatar: 'client_1.png',
        initials: 'ET',
        riskProfile: 'Moderate',
        clientSince: '2015',
        nextMeeting: '2023-04-15',
        goals: [
            { name: 'Vacation Home', progress: 85, target: '10000', current: '8500' },
            { name: 'College Fund', progress: 40, target: '10000', current: '4000' },
            { name: 'Retirement', progress: 65, target: '3000', current: '200' },
        ],
        assetAllocation: [
            { name: 'United States', value: 60, color: '#0ea5e9' },
            { name: 'China', value: 20, color: '#8b5cf6' },
            { name: 'Italy', value: 20, color: '#f97316' },
        ],
        sectorExposure: [
            { name: 'Sportswear', value: 45, color: '#94a3b8' },
            { name: 'Luxury Cars', value: 30, color: '#f97316' },
            { name: 'Digital Entertainment', value: 20, color: '#8b5cf6' },
            { name: 'Consumer Electronics', value: 10, color: '#0ea5e9' },
            { name: 'Tobacco', value: 5, color: '#10b981' },
        ],
        geographicAllocation: [
            { country: 'United States', iso_a3: 'USA', value: 60, color: '#0ea5e9' },
            { country: 'China', iso_a3: 'CHN', value: 20, color: '#8b5cf6' },
            { country: 'Italy', iso_a3: 'ITA', value: 20, color: '#f97316' },
        ],
        countryDetails: [
            {
                id: 'USA',
                name: 'United States',
                value: 60,
                holdings: [
                    { name: 'S&P 500 ETF', allocation: '25%', amount: '6000' },
                    { name: 'US Tech Leaders', allocation: '20%', amount: '4800' },
                    { name: 'US Small Cap', allocation: '10%', amount: '2400' },
                    { name: 'US Corporate Bonds', allocation: '5%', amount: '1200' },
                ],
            },
            {
                id: 'DEU',
                name: 'Germany',
                value: 15,
                holdings: [
                    { name: 'DAX Index Fund', allocation: '8%', amount: '1920' },
                    { name: 'German Blue Chips', allocation: '7%', amount: '1680' },
                ],
            },
            {
                id: 'CHN',
                name: 'China',
                value: 10,
                holdings: [
                    { name: 'China Growth ETF', allocation: '6%', amount: '1440' },
                    { name: 'China Tech Leaders', allocation: '4%', amount: '960' },
                ],
            },
            {
                id: 'JPN',
                name: 'Japan',
                value: 5,
                holdings: [{ name: 'Japan Index Fund', allocation: '5%', amount: '1200' }],
            },
            {
                id: 'IND',
                name: 'India',
                value: 4,
                holdings: [{ name: 'India Growth Fund', allocation: '4%', amount: '960' }],
            },
            { id: 'BRA', name: 'Brazil', value: 3, holdings: [{ name: 'Brazil ETF', allocation: '3%', amount: '720' }] },
            {
                id: 'CAN',
                name: 'Canada',
                value: 2,
                holdings: [{ name: 'Canada Index Fund', allocation: '2%', amount: '480' }],
            },
            {
                id: 'AUS',
                name: 'Australia',
                value: 1,
                holdings: [{ name: 'Australian Index Fund', allocation: '1%', amount: '240' }],
            },
        ],
        performanceData: [
            { date: 'Jan', portfolio: 2200, benchmark: 2200 },
            { date: 'Feb', portfolio: 2150, benchmark: 2180 },
            { date: 'Mar', portfolio: 2300, benchmark: 2250 },
            { date: 'Apr', portfolio: 2280, benchmark: 2220 },
            { date: 'May', portfolio: 2350, benchmark: 2260 },
            { date: 'Jun', portfolio: 2320, benchmark: 2280 },
            { date: 'Jul', portfolio: 2400, benchmark: 2320 },
            { date: 'Aug', portfolio: 2450, benchmark: 2350 },
            { date: 'Sep', portfolio: 2420, benchmark: 2330 },
            { date: 'Oct', portfolio: 2500, benchmark: 2380 },
            { date: 'Nov', portfolio: 2550, benchmark: 2400 },
            { date: 'Dec', portfolio: 2600, benchmark: 2450 },
        ],
        recentActivity: [
            { date: '2023-03-15', type: 'Purchase', details: 'Bought 50 shares of AAPL @ 165.23', amount: '8261' },
            { date: '2023-03-10', type: 'Sale', details: 'Sold 75 shares of MSFT @ 285.76', amount: '9999' },
            { date: '2023-03-01', type: 'Dividend', details: 'Received dividend from VTI', amount: '1245' },
            { date: '2023-02-20', type: 'Deposit', details: 'Monthly contribution', amount: '5000' },
        ],
        documents: [
            { name: 'Investment Policy Statement', date: '2023-01-15', type: 'PDF' },
            { name: 'Financial Plan', date: '2023-01-15', type: 'PDF' },
            { name: 'Tax Strategy Document', date: '2023-02-10', type: 'PDF' },
            { name: 'Estate Planning Summary', date: '2022-11-05', type: 'PDF' },
        ],
        notes: [
            { date: '2023-03-01', content: 'Discussed retirement goals and increased monthly contributions by 500.' },
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
        portfolioValue: '9999',
        change: '+3.7%',
        positive: true,
        lastContact: '1 week ago',
        avatar: 'client_2.png',
        initials: 'MC',
        riskProfile: 'Aggressive',
        clientSince: '2018',
        nextMeeting: '2023-04-20',
        goals: [
            { name: 'Early Retirement', progress: 45, target: '5000', current: '2250' },
            { name: 'Angel Investing', progress: 60, target: '500', current: '300' },
            { name: "Children's Education", progress: 30, target: '600', current: '180' },
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
            { country: 'United States', iso_a3: 'USA', value: 65, color: '#0ea5e9' },
            { country: 'China', iso_a3: 'CHN', value: 15, color: '#f97316' },
            { country: 'Europe', iso_a3: 'EUR', value: 10, color: '#8b5cf6' },
            { country: 'India', iso_a3: 'IND', value: 5, color: '#eab308' },
            { country: 'Japan', iso_a3: 'JPN', value: 3, color: '#10b981' },
            { country: 'Other', iso_a3: 'OTH', value: 2, color: '#94a3b8' },
        ],
        countryDetails: [
            {
                id: 'USA',
                name: 'United States',
                value: 65,
                holdings: [
                    { name: 'US Tech ETF', allocation: '30%', amount: '5400' },
                    { name: 'S&P 500 Index', allocation: '20%', amount: '3600' },
                    { name: 'NASDAQ 100', allocation: '15%', amount: '2700' },
                ],
            },
            {
                id: 'CHN',
                name: 'China',
                value: 15,
                holdings: [
                    { name: 'China Tech ETF', allocation: '10%', amount: '1800' },
                    { name: 'China A-Shares', allocation: '5%', amount: '900' },
                ],
            },
            {
                id: 'EUR',
                name: 'Europe',
                value: 10,
                holdings: [{ name: 'European Tech Fund', allocation: '10%', amount: '1800' }],
            },
            {
                id: 'IND',
                name: 'India',
                value: 5,
                holdings: [{ name: 'India Growth ETF', allocation: '5%', amount: '900' }],
            },
            {
                id: 'JPN',
                name: 'Japan',
                value: 3,
                holdings: [{ name: 'Japan Tech Fund', allocation: '3%', amount: '540' }],
            },
            {
                id: 'OTH',
                name: 'Other',
                value: 2,
                holdings: [{ name: 'Global Emerging Tech', allocation: '2%', amount: '360' }],
            },
        ],
        performanceData: [
            { date: 'Jan', portfolio: 1650, benchmark: 1650 },
            { date: 'Feb', portfolio: 1600, benchmark: 1630 },
            { date: 'Mar', portfolio: 1680, benchmark: 1650 },
            { date: 'Apr', portfolio: 1700, benchmark: 1670 },
            { date: 'May', portfolio: 1720, benchmark: 1690 },
            { date: 'Jun', portfolio: 1750, benchmark: 1710 },
            { date: 'Jul', portfolio: 1730, benchmark: 1720 },
            { date: 'Aug', portfolio: 1760, benchmark: 1730 },
            { date: 'Sep', portfolio: 1790, benchmark: 1740 },
            { date: 'Oct', portfolio: 1810, benchmark: 1750 },
            { date: 'Nov', portfolio: 1830, benchmark: 1760 },
            { date: 'Dec', portfolio: 1850, benchmark: 1770 },
        ],
        recentActivity: [
            { date: '2023-03-12', type: 'Purchase', details: 'Bought 100 shares of NVDA @ 245.87', amount: '9999' },
            { date: '2023-03-05', type: 'Sale', details: 'Sold 200 shares of AMD @ 87.65', amount: '9999' },
            { date: '2023-02-28', type: 'Deposit', details: 'Quarterly bonus investment', amount: '9999' },
            { date: '2023-02-15', type: 'Dividend', details: 'Received dividend from QQQ', amount: '876' },
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
                content: 'Reviewed angel investing strategy. Setting aside 100K for direct startup investments.',
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
        portfolioValue: '9999',
        change: '-1.3%',
        positive: false,
        lastContact: '3 days ago',
        avatar: 'client_3.png',
        initials: 'SJ',
        riskProfile: 'Conservative',
        clientSince: '2010',
        nextMeeting: '2023-04-10',
        goals: [
            { name: 'Retirement', progress: 75, target: '4000', current: '3000' },
            { name: 'Legacy Planning', progress: 50, target: '1500', current: '750' },
            { name: 'Travel Fund', progress: 90, target: '200', current: '180' },
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
            { country: 'United States', iso_a3: 'USA', value: 70, color: '#0ea5e9' },
            { country: 'Europe', iso_a3: 'EUR', value: 12, color: '#8b5cf6' },
            { country: 'Canada', iso_a3: 'CAN', value: 8, color: '#f97316' },
            { country: 'Japan', iso_a3: 'JPN', value: 5, color: '#10b981' },
            { country: 'Australia', iso_a3: 'AUS', value: 3, color: '#eab308' },
            { country: 'Other', iso_a3: 'OTH', value: 2, color: '#94a3b8' },
        ],
        countryDetails: [
            {
                id: 'USA',
                name: 'United States',
                value: 70,
                holdings: [
                    { name: 'S&P 500 ETF', allocation: '30%', amount: '6720' },
                    { name: 'US Dividend Fund', allocation: '25%', amount: '5600' },
                    { name: 'US Healthcare Stocks', allocation: '15%', amount: '3360' },
                ],
            },
            {
                id: 'EUR',
                name: 'Europe',
                value: 12,
                holdings: [
                    { name: 'European Bond Fund', allocation: '7%', amount: '2240' },
                    { name: 'European Blue Chips', allocation: '5%', amount: '1600' },
                ],
            },
            {
                id: 'CAN',
                name: 'Canada',
                value: 8,
                holdings: [
                    { name: 'Canadian Resource Stocks', allocation: '5%', amount: '1600' },
                    { name: 'Canadian Bank Stocks', allocation: '3%', amount: '960' },
                ],
            },
            {
                id: 'JPN',
                name: 'Japan',
                value: 5,
                holdings: [{ name: 'Japan Value Fund', allocation: '5%', amount: '1600' }],
            },
            {
                id: 'AUS',
                name: 'Australia',
                value: 3,
                holdings: [{ name: 'Australian Dividend Stocks', allocation: '3%', amount: '960' }],
            },
            {
                id: 'OTH',
                name: 'Other',
                value: 2,
                holdings: [{ name: 'Global Infrastructure Fund', allocation: '2%', amount: '640' }],
            },
        ],
        performanceData: [
            { date: 'Jan', portfolio: 3250, benchmark: 3250 },
            { date: 'Feb', portfolio: 3280, benchmark: 3260 },
            { date: 'Mar', portfolio: 3260, benchmark: 3270 },
            { date: 'Apr', portfolio: 3240, benchmark: 3280 },
            { date: 'May', portfolio: 3220, benchmark: 3290 },
            { date: 'Jun', portfolio: 3200, benchmark: 3300 },
            { date: 'Jul', portfolio: 3180, benchmark: 3310 },
            { date: 'Aug', portfolio: 3150, benchmark: 3320 },
            { date: 'Sep', portfolio: 3170, benchmark: 3330 },
            { date: 'Oct', portfolio: 3190, benchmark: 3340 },
            { date: 'Nov', portfolio: 3210, benchmark: 3350 },
            { date: 'Dec', portfolio: 3200, benchmark: 3360 },
        ],
        recentActivity: [
            {
                date: '2023-03-14',
                type: 'Rebalance',
                details: 'Portfolio rebalancing - reduced equity exposure',
                amount: '9999',
            },
            { date: '2023-03-08', type: 'Purchase', details: 'Bought municipal bonds', amount: '9999' },
            { date: '2023-02-25', type: 'Sale', details: 'Sold technology stocks', amount: '8500' },
            { date: '2023-02-10', type: 'Deposit', details: 'Regular monthly contribution', amount: '3000' },
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
        portfolioValue: '9999',
        change: '+2.8%',
        positive: true,
        lastContact: 'Today',
        avatar: 'client_4.png',
        initials: 'DW',
        riskProfile: 'Moderate-Conservative',
        clientSince: '2008',
        nextMeeting: '2023-04-05',
        goals: [
            { name: 'Income Generation', progress: 85, target: '200/yr', current: '170/yr' },
            { name: 'Legacy Planning', progress: 70, target: '3000', current: '2100' },
            { name: 'Charitable Giving', progress: 60, target: '1000', current: '600' },
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
            { country: 'United States', iso_a3: 'USA', value: 80, color: '#0ea5e9' },
            { country: 'Canada', iso_a3: 'CAN', value: 10, color: '#f97316' },
            { country: 'United Kingdom', iso_a3: 'GBR', value: 5, color: '#8b5cf6' },
            { country: 'Switzerland', iso_a3: 'CHE', value: 3, color: '#10b981' },
            { country: 'Other', iso_a3: 'OTH', value: 2, color: '#94a3b8' },
        ],
        countryDetails: [
            {
                id: 'USA',
                name: 'United States',
                value: 80,
                holdings: [
                    { name: 'US Dividend Stocks', allocation: '35%', amount: '9999' },
                    { name: 'US Corporate Bonds', allocation: '25%', amount: '9999' },
                    { name: 'US Real Estate', allocation: '20%', amount: '8160' },
                ],
            },
            {
                id: 'CAN',
                name: 'Canada',
                value: 10,
                holdings: [
                    { name: 'Canadian Dividend Stocks', allocation: '6%', amount: '3060' },
                    { name: 'Canadian Government Bonds', allocation: '4%', amount: '2040' },
                ],
            },
            {
                id: 'GBR',
                name: 'United Kingdom',
                value: 5,
                holdings: [{ name: 'UK Dividend Stocks', allocation: '5%', amount: '2550' }],
            },
            {
                id: 'CHE',
                name: 'Switzerland',
                value: 3,
                holdings: [{ name: 'Swiss Blue Chips', allocation: '3%', amount: '1530' }],
            },
            {
                id: 'OTH',
                name: 'Other',
                value: 2,
                holdings: [{ name: 'Global Infrastructure Fund', allocation: '2%', amount: '1020' }],
            },
        ],
        performanceData: [
            { date: 'Jan', portfolio: 4950, benchmark: 4950 },
            { date: 'Feb', portfolio: 4980, benchmark: 4960 },
            { date: 'Mar', portfolio: 5020, benchmark: 4970 },
            { date: 'Apr', portfolio: 5050, benchmark: 4980 },
            { date: 'May', portfolio: 5080, benchmark: 4990 },
            { date: 'Jun', portfolio: 5030, benchmark: 5000 },
            { date: 'Jul', portfolio: 5060, benchmark: 5010 },
            { date: 'Aug', portfolio: 5090, benchmark: 5020 },
            { date: 'Sep', portfolio: 5120, benchmark: 5030 },
            { date: 'Oct', portfolio: 5150, benchmark: 5040 },
            { date: 'Nov', portfolio: 5180, benchmark: 5050 },
            { date: 'Dec', portfolio: 5210, benchmark: 5060 },
        ],
        recentActivity: [
            { date: '2023-03-15', type: 'Income', details: 'Dividend income distribution', amount: '9999' },
            { date: '2023-03-10', type: 'Purchase', details: 'Added to dividend aristocrats position', amount: '9999' },
            { date: '2023-02-28', type: 'Charitable Gift', details: 'Donation to Williams Foundation', amount: '9999' },
            { date: '2023-02-15', type: 'Sale', details: 'Trimmed growth stocks position', amount: '7500' },
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
        avatar: 'client_5.png',
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
            { country: 'United States', iso_a3: 'USA', value: 85, color: '#0ea5e9' },
            { country: 'China', iso_a3: 'CHN', value: 5, color: '#f97316' },
            { country: 'Emerging Markets', iso_a3: 'EMR', value: 5, color: '#8b5cf6' },
            { country: 'Other', iso_a3: 'OTH', value: 5, color: '#94a3b8' },
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
                    <div className="w-full space-y-6 md:w-full">
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
                                <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="md:col-span-2">
                                        <div className="sticky top-[10px] flex flex-col gap-3">
                                            {show_ai_report && (
                                                <Card>
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="text-base">AI-Powered Insights</CardTitle>
                                                        <CardDescription>Market Performance Report: March 19-20, 2024 for {client.name}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="market-report">
                                                            <hr className="border-t border-gray-200 py-2" />

                                                            <section className="overview">
                                                                <h2 className="text-base font-bold text-info">Overview</h2>
                                                                <p className="text-sm text-muted-foreground">The market showed strong positive momentum across major tech and financial stocks over the past 24 hours, with all analyzed stocks posting gains between 1.08% and 1.99%.</p>
                                                            </section>

                                                            <section className="top-performers">
                                                                {/* <h2 className="text-base text-info font-bold">Top Performers</h2> */}
                                                                <br />
                                                                <article className="stock">
                                                                    <h3 className="text-sm font-bold">Goldman Sachs Group (GS) +1.99%</h3>
                                                                    <p className="text-xs text-muted-foreground">Goldman Sachs led the pack with a nearly 2% gain after the Federal Reserve's latest policy meeting signaled potential rate cuts later this year. The company's investment banking division is reportedly seeing increased M&A activity in anticipation of a more favorable interest rate environment. Goldman's recent announcement of expanding its wealth management services for ultra-high-net-worth individuals has also contributed to investor confidence as the firm diversifies beyond traditional investment banking.</p>
                                                                </article>

                                                                <br />

                                                                <article className="stock">
                                                                    <h3 className="text-sm font-bold">Meta Platforms (META) +1.85%</h3>
                                                                    <p className="text-xs text-muted-foreground">Meta shares surged following reports of strong engagement metrics for its new AI-powered personalization features on Instagram and Facebook. The company's recent partnership with leading AI chip providers (announced yesterday) to develop custom hardware for its metaverse initiatives has been well-received by analysts, with several upgrading their price targets. Meta's consistent progress in monetizing its messaging platforms has also provided additional momentum.</p>
                                                                </article>
                                                            </section>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                            <PortfolioOverviewClient />
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
                                    </div>
                                    <div className="md:col-span-1">
                                        <div className="sticky top-[10px] flex flex-col gap-3">
                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base">AI-Powered Insights</CardTitle>
                                                    <CardDescription>Personalized insights for {client.name}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        <div
                                                            className="flex cursor-pointer gap-3 rounded-lg border p-3 hover:border-gray-200 hover:bg-gray-50"
                                                            onClick={() => {
                                                                setShowAiReport(true)
                                                            }}
                                                        >
                                                            <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 p-1.5 text-emerald-500">
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

                                                        <div
                                                            className="hover:border-gray- flex cursor-pointer gap-3 rounded-lg border p-3 hover:bg-gray-50"
                                                            onClick={() => {
                                                                setShowAiReport(true)
                                                            }}
                                                        >
                                                            <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10 p-1.5 text-amber-500">
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

                                                        <div
                                                            className="hover:border-gray- flex cursor-pointer gap-3 rounded-lg border p-3 hover:bg-gray-50"
                                                            onClick={() => {
                                                                setShowAiReport(true)
                                                            }}
                                                        >
                                                            <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 p-1.5 text-blue-500">
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
                                                                formatter={(value: number) => [`${value}%`]}
                                                                labelFormatter={(label) => `${label}`}
                                                            />
                                                            <Bar
                                                                dataKey="value"
                                                                radius={[4, 4, 0, 0]}
                                                            >
                                                                {client.assetAllocation.map((item: any) => (
                                                                    <Cell
                                                                        key={item.name}
                                                                        fill={item.color}
                                                                    />
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
                                                                formatter={(value: number) => [`${value}%`]}
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

                                                        <div className="flex cursor-pointer items-center justify-center rounded-lg border bg-foreground p-2 text-white transition-colors hover:bg-foreground/90">
                                                            <a
                                                                href="/news"
                                                                className="text-center text-sm font-medium"
                                                            >
                                                                News correlation
                                                            </a>
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
                                                                <Tooltip formatter={(value) => [`${value}%`]} />
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
                                                                    color={item.color}
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
                                                        <PortfolioOverviewClient
                                                            onlyChart={true}
                                                            presettedTimeframe={'1Y'}
                                                        />
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
                                                <CardTitle className="mb-2">Meeting Notes</CardTitle>
                                                <CardDescription>Records of client interactions</CardDescription>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                            >
                                                Add Note
                                            </Button>
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
