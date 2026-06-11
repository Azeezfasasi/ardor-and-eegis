import React from 'react'
import AvailableProgrammesPublic from '@/components/AvailableProgrammesPublic'

export const metadata = {
  title: 'Available Programmes - Ardor Aegis Limited',
  description: 'Discover and enrol in our spiritual development programmes. Transform your life and join our community for meaningful growth and learning.',
  openGraph: {
    title: 'Available Programmes - Ardor Aegis',
    description: 'Explore our spiritual development programmes.',
    url: 'https://ardor-aegis.com/available-programmes',
    type: 'website',
  },
}

export default function AvailableProgrammesPage() {
  return <AvailableProgrammesPublic />
}
