import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { DashboardLayout } from '@/components/dashboard-layout'
import { InvestmentsContent } from './investments-content'

export default function Investments() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
        >
            <SidebarProvider>
                <DashboardLayout>
                    <InvestmentsContent />
                </DashboardLayout>
            </SidebarProvider>
        </ThemeProvider>
    )
}
