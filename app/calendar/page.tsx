import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { DashboardLayout } from '@/components/dashboard-layout'
import { CalendarContent } from './calendar-content'

export default function Calendar() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
        >
            <SidebarProvider>
                <DashboardLayout>
                    <CalendarContent />
                </DashboardLayout>
            </SidebarProvider>
        </ThemeProvider>
    )
}
