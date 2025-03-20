import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { DashboardLayout } from '@/components/dashboard-layout'
import { DashboardHeader } from '@/components/dashboard-header'
import { CalendarView } from '@/components/calendar-view'

export default function Calendar() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
        >
            <SidebarProvider>
                <DashboardLayout>
                    <div className="flex flex-col gap-6 p-6 md:p-8">
                        <DashboardHeader
                            searchQuery=""
                            setSearchQuery={() => {}}
                            title="Calendar"
                            description="Schedule and manage appointments, regulations, and important events"
                        />

                        <CalendarView />
                    </div>
                </DashboardLayout>
            </SidebarProvider>
        </ThemeProvider>
    )
}
