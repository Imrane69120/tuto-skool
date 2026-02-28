import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'

export const metadata: Metadata = {
  title: 'Productivité',
  description: 'Suivi personnel : tâches, sommeil, productivité',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white antialiased">
        <Navbar />
        {/* Desktop: offset for sidebar */}
        <main className="md:ml-56 min-h-screen p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </body>
    </html>
  )
}
