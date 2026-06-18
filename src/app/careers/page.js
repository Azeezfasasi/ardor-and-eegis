import React from 'react'
import CareersHero from '@/components/careers-component/CareersHero'
import WhyJoinUs from '@/components/careers-component/WhyJoinUs'
import JobListings from '@/components/careers-component/JobListings'
import CultureShowcase from '@/components/careers-component/CultureShowcase'
import ApplyNow from '@/components/careers-component/ApplyNow'

export const metadata = {
  title: 'Careers | Ardor Aegis Limited',
  description: 'Join Ardor Aegis Limited and grow your career with a leading security and engineering solutions company. Explore exciting job opportunities and be part of our innovative team.',
  keywords: ['careers', 'jobs', 'employment', 'security jobs', 'engineering jobs'],
  openGraph: {
    title: 'Careers | Ardor Aegis Limited',
    description: 'Join Ardor Aegis Limited and grow your career with a leading security and engineering solutions company.',
    url: 'https://ardoraegis.org/careers',
    type: 'website',
  },
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <WhyJoinUs />
      <JobListings />
      <CultureShowcase />
      <ApplyNow />
    </>
  )
}
