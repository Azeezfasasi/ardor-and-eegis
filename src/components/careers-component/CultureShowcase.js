"use client"
import { useEffect, useRef, useState } from 'react'
import { Users, Lightbulb, Handshake, TrendingUp } from 'lucide-react'

export default function CultureShowcase() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const culturePoints = [
    {
      icon: Users,
      title: 'Diverse & Inclusive',
      description: 'We celebrate diverse perspectives and backgrounds. Our strength comes from the unique talents of each team member.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We encourage creative thinking and are always looking for better ways to solve problems and serve our clients.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Handshake,
      title: 'Team Collaboration',
      description: 'We believe great results come from working together. Collaboration and support are at our core values.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Growth',
      description: 'We invest in your development. Access to training, mentorship, and opportunities to advance your career.',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Culture & Values
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're more than just a workplace. We're a community united by shared values and a common mission.
          </p>
        </div>

        {/* Culture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {culturePoints.map((point, index) => {
            const Icon = point.icon
            return (
              <div
                key={index}
                className={`group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ${
                  inView ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{
                  animationDelay: inView ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${point.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Visual Story Section */}
        <div className="bg-gradient-to-r from-[#7b542f] to-[#7b542f] rounded-2xl p-12 text-white overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7b542f]/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Stat 1 */}
              <div className="text-center">
                <p className="text-4xl font-bold mb-2 text-white text-transparent bg-clip-text">
                  500+
                </p>
                <p className="text-white text-lg">
                  Professionals
                </p>
              </div>

              {/* Stat 2 */}
              <div className="text-center border-l border-r border-white">
                <p className="text-4xl font-bold mb-2 text-white text-transparent bg-clip-text">
                  15+
                </p>
                <p className="text-white text-lg">
                  Years Experience
                </p>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <p className="text-4xl font-bold mb-2 text-white text-transparent bg-clip-text">
                  2000+
                </p>
                <p className="text-white text-lg">
                  Service Locations
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-12 pt-12 border-t border-[#7b542f]/30">
              <p className="text-xl mb-6 italic leading-relaxed max-w-2xl">
                "Working at Ardor Aegis has been transformative. The collaborative environment, continuous learning opportunities, and the chance to protect the communities make this an exceptional place to build a career."
              </p>
              {/* <p className="font-semibold">
                — Recent Team Member
              </p> */}
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to be part of our story?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a team where your contributions matter, your growth is supported, and your success is celebrated.
          </p>
          <a
            href="#apply-now"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#7b542f] to-[#7b542f] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey with Us
          </a>
        </div>
      </div>
    </section>
  )
}
