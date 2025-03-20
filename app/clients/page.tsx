import { ClientsPage } from '@/components/clients-page'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'

export default function Clients() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
        >
            <SidebarProvider>
                <ClientsPage />
            </SidebarProvider>
        </ThemeProvider>
    )
}
