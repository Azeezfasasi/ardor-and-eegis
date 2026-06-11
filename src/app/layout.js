import '../globals.css'
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from 'react-hot-toast';
import MessageSlider from '@/components/home-component/MessageSlider';
import MainHeader from '@/components/home-component/MainHeader'
import FooterSection from '@/components/home-component/Footer';
import JsonLd from './json-ld';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ardoraegis.org';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Ardor Aegis Limited - Security Solutions',
    default: 'Ardor Aegis Limited - Professional Security & Protection Services',
  },
  description: 'Ardor Aegis Limited provides cutting-edge security and protection solutions for communities. Trust us to keep your community safe, secure, and protected with professional services.',
  keywords: ['security services', 'protection solutions', 'community safety', 'professional security', 'surveillance'],
  creator: 'Ardor Aegis Limited',
  publisher: 'Ardor Aegis Limited',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: '/ardorfav.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Ardor Aegis Limited',
    title: 'Ardor Aegis Limited - Professional Security & Protection Services',
    description: 'Cutting-edge security and protection solutions for communities.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ardor Aegis Limited - Professional Security & Protection Services',
    description: 'Cutting-edge security and protection solutions for communities.',
    creator: '@ardor-aegis',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://ardoraegis.org" />
      </head>
      <body>
        <AuthProvider>
          <div className="w-full site-main-header fixed top-0 z-50">
            <MessageSlider />
            <MainHeader />
          </div>
          <main>{children}</main>
          <div className="site-main-header">
            <FooterSection />
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  )
}
