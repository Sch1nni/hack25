import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { DashboardLayout } from '@/components/dashboard-layout'
import { SettingsContent } from './settings-content'

export default function Settings() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
        >
            <SidebarProvider>
                <DashboardLayout>
                    <SettingsContent />
                </DashboardLayout>
            </SidebarProvider>
        </ThemeProvider>
    )
}
