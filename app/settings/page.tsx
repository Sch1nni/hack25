import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { DashboardLayout } from '@/components/dashboard-layout'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card, CardContent } from '@/components/ui/card'

export default function Settings() {
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
                            title="Settings"
                            description="Manage account and application settings"
                        />

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex h-[400px] items-center justify-center text-muted-foreground">Settings content would appear here</div>
                            </CardContent>
                        </Card>
                    </div>
                </DashboardLayout>
            </SidebarProvider>
        </ThemeProvider>
    )
}
