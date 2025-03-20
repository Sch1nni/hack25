import { DashboardPage } from '@/components/dashboard-page'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'

export default function Home() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <SidebarProvider>
                <DashboardPage />
            </SidebarProvider>
        </ThemeProvider>
    )
}
