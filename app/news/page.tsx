import { NewsPage } from "@/components/news-page"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function News() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <NewsPage />
      </SidebarProvider>
    </ThemeProvider>
  )
}
