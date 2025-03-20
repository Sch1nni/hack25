import { ClientDetailPage } from '@/components/client-detail-page'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'

export default function ClientDetail({ params }: { params: { id: string } }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <SidebarProvider>
                <ClientDetailPage clientId={params.id} />
            </SidebarProvider>
        </ThemeProvider>
    )
}
