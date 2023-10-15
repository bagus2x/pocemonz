import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@pocemonz/app/globals.css'
import { cn } from '@pocemonz/util/tw'
import { ThemeProvider } from '@pocemonz/components/theme-provider'
import ReactQueryProvider from '@pocemonz/components/react-query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pocemonz',
  description: 'Find your favorite pokemon',
  icons: ['/pocemonz.svg']
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'scrollbar scrollbar-track-gray-100/0 scrollbar-thumb-gray-800 scrollbar-thumb-rounded-2xl scrollbar-w-2 scrollbar-h-2 dark:scrollbar-track-gray-300 dark:scrollbar-thumb-gray-600'
        )}>
        <ThemeProvider attribute='class' defaultTheme='system'>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
