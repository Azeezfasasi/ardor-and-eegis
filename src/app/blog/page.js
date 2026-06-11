import BlogNews from '@/components/home-component/BlogNews'
import PageTitle from '@/components/home-component/PageTitle'
import React from 'react'

export const metadata = {
  title: 'Security Insights & News Blog - Ardor Aegis Limited',
  description: 'Read our latest blog posts about security trends, insights, and best practices to keep your community safe.',
  openGraph: {
    title: 'Security Insights & News - Ardor Aegis Limited Blog',
    description: 'Stay updated with the latest trends and insights in security.',
    url: 'https://ardor-aegis.com/blog',
    type: 'website',
  },
};

export default function page() {
  return (
    <>
    <PageTitle title="Security Insights & News" subtitle="Stay updated with the latest trends, insights, and news in security and safety." />
    <BlogNews />
    </>
  )
}
