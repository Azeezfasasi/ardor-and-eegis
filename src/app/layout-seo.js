// SEO Configuration template for root layout
// Add these to your root layout.js metadata

export const seoMetadata = {
  title: {
    template: '%s | Ardor Aegis - Security Solutions',
    default: 'Ardor Aegis - Professional Security & Protection Services',
  },
  description: 'Ardor Aegis provides cutting-edge security and protection solutions for communities. Trust us to keep your community safe, secure, and protected with professional services.',
  keywords: 'security services, protection solutions, community safety, professional security, surveillance, security personnel',
  creator: 'Ardor Aegis',
  publisher: 'Ardor Aegis',
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
    url: 'https://ardor-aegis.com',
    siteName: 'Ardor Aegis',
    title: 'Ardor Aegis - Professional Security & Protection Services',
    description: 'Cutting-edge security and protection solutions for communities. Professional services you can trust.',
    images: [
      {
        url: 'https://ardor-aegis.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ardor Aegis - Security Solutions',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ardor Aegis - Professional Security & Protection Services',
    description: 'Cutting-edge security and protection solutions for communities.',
    creator: '@ardor-aegis',
    images: ['https://ardor-aegis.com/og-image.png'],
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
    canonical: 'https://ardor-aegis.com',
  },
};
