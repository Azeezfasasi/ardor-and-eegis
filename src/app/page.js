import React from 'react'
import Hero from '@/components/home-component/Hero'
import WhyChooseUs from '@/components/home-component/WhyChooseUs'
import OurServices from '@/components/home-component/OurServices'
import HomeAbout from '@/components/home-component/HomeAbout'
import TestimonialsSection from '@/components/home-component/TestimonialsSection'
import SubscribeToNewsletter from '@/components/home-component/SubscribeToNewsletter'
import OurGallantOfficers from '@/components/home-component/OurGallantOfficers'
import AskUs from '@/components/home-component/AskUs'
import CompanyInsights from '@/components/home-component/CompanyInsights'

export const metadata = {
  title: 'Ardor Aegis Limited - Professional Security & Protection Services',
  description: 'Ardor Aegis Limited provides cutting-edge security and protection solutions for communities. Trust us to keep your community safe, secure, and protected with professional services.',
  openGraph: {
    title: 'Ardor Aegis Limited - Professional Security & Protection Services',
    description: 'Cutting-edge security and protection solutions for communities.',
    url: 'https://ardor-aegis.com',
    type: 'website',
    images: [
      {
        url: 'https://ardor-aegis.com/ardorfav.png',
        width: 1200,
        height: 630,
        alt: 'Ardor Aegis - Security Solutions',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <CompanyInsights />
      <WhyChooseUs />
      <OurServices />
      <OurGallantOfficers />
      <TestimonialsSection />
      <AskUs />
      <SubscribeToNewsletter />
    </>
  )
}
