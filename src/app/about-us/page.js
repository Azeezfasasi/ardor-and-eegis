import CompanyOverview from '@/components/home-component/CompanyOverview'
import PageTitle from '@/components/home-component/PageTitle'
import TeamSection from '@/components/home-component/TeamSection'
import WhyChooseUs from '@/components/home-component/WhyChooseUs'
import React from 'react'

export const metadata = {
  title: 'About Us - Ardor Aegis Security Solutions',
  description: 'Learn about Ardor Aegis, our mission, values, and the team dedicated to providing professional security and protection solutions for communities.',
  openGraph: {
    title: 'About Us - Ardor Aegis',
    description: 'Discover who we are and our commitment to community security.',
    url: 'https://ardor-aegis.com/about-us',
    type: 'website',
  },
};

export default function page() {
  return (
    <>
    <PageTitle title="About Us" subtitle="Learn more about our company and values" />
    <CompanyOverview />
    <TeamSection />
    <WhyChooseUs />
    </>
  )
}
