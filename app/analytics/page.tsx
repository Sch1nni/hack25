import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { DashboardLayout } from '@/components/dashboard-layout'
import { AnalyticsContent } from './analytics-content'

export default function Analytics() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
        >
            <SidebarProvider>
                <DashboardLayout>
                    <AnalyticsContent />
                </DashboardLayout>
            </SidebarProvider>
        </ThemeProvider>
    )
}
