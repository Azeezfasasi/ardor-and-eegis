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
import Footer from '@/components/home-component/Footer'



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
