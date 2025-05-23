import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'Pandora Uzbekistan',
  description: 'Официальный сайт Pandora Uzbekistan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}