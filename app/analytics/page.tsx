import { AnalyticsPage } from '@/components/analytics-page'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'

export default function Analytics() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
        >
            <SidebarProvider>
                <AnalyticsPage />
            </SidebarProvider>
        </ThemeProvider>
    )
}
