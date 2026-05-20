export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ardor Aegis',
    alternateName: 'Ardor & Aegis',
    url: 'https://ardoraegis.org',
    logo: 'https://ardoraegis.org/ardorfav.png',
    description: 'Professional security and protection solutions for communities',
    sameAs: [
      'https://www.facebook.com/ardoraegis',
      'https://www.twitter.com/ardoraegis',
      'https://www.instagram.com/ardoraegis',
      'https://www.linkedin.com/company/ardor-aegis',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
      addressRegion: 'Abuja',
      addressLocality: 'Abuja',
      streetAddress: 'Plot 104, House 3, tos Douglas kaura district, Abuja',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+2348152260336',
      email: 'info@ardoraegis.org',
    },
    foundingDate: '2020-04-04',
    founders: [
      {
        '@type': 'Person',
        name: 'Chinenye Abiodun',
      },
    ],
    knowsAbout: [
      'Security Services',
      'Community Protection',
      'Surveillance',
      'Protection Solutions',
    ],
    knowsLanguage: ['en'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
