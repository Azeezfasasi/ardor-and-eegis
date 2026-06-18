"use client"
import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function CareersHero() {
  const heroRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!heroRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#7b542f] via-[#7b542f] to-[#7b542f] pt-[250px]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-white font-semibold text-lg mb-4 tracking-wider uppercase">Join Our Team</p>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Build Your Career with 
            <span className="text-white text-transparent bg-clip-text"> Excellence</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            At Ardor Aegis Limited, we're not just a company—we're a community of innovators, professionals, and change-makers. 
            If you're passionate about security, engineering, and making a real impact, we want to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#job-listings"
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Explore Open Positions
            </a>
            <a
              href="#apply-now"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-orange-600/10 transition-all duration-300"
            >
              Send Your CV
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <ChevronDown className="text-white animate-bounce" size={32} />
        </div>
      </div>
    </div>
  )
}
