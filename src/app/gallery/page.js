import React from 'react'
import Gallery from '@/components/home-component/Gallery'

export const metadata = {
  title: 'Gallery - Ardor Aegis Security Solutions',
  description: 'Explore our gallery showcasing our team, operations, and community engagement. See Ardor Aegis in action.',
  openGraph: {
    title: 'Gallery - Ardor Aegis',
    description: 'View our work and team in action.',
    url: 'https://ardor-aegis.com/gallery',
    type: 'website',
  },
};

export default function GalleryComponent() {
  return (
    <Gallery />
  )
}
