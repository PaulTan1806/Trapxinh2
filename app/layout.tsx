import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'vietnamese'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Tài Lộc Cưới — Mâm Quả & Tráp Cưới Cao Cấp TP.HCM',
  description:
    'Chuyên cung cấp mâm quả cưới hiện đại & tráp rồng phượng cao cấp tại TP.HCM. Hoa tươi 100%, giao hàng đúng giờ, thiết kế độc quyền.',
  keywords: ['mâm quả cưới', 'tráp cưới', 'tráp rồng phượng', 'đám cưới TP.HCM'],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#7f1d1d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
