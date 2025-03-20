import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Wealth AI',
    description: 'Wealth AI',
    generator: 'SimpleSIX.com',
    icons: {
        icon: '/icon.png',
        shortcut: '/shortcut-icon.png',
        apple: '/apple-icon.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
