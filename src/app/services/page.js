import OurServices from '@/components/home-component/OurServices'
import PageTitle from '@/components/home-component/PageTitle'
import React from 'react'

export const metadata = {
  title: 'Our Services - Ardor Aegis Limited',
  description: 'Explore our comprehensive security and protection services designed to meet the unique needs of your community. Professional solutions you can trust.',
  openGraph: {
    title: 'Our Services - Ardor Aegis Limited',
    description: 'Discover our comprehensive range of security and protection services.',
    url: 'https://ardor-aegis.com/services',
    type: 'website',
  },
};

export default function page() {
  return (
    <>
    <PageTitle title="Our Services" subtitle="Welcome to our services page" />
    <OurServices />
    </>
  )
}
