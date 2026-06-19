"use client"
import { useEffect, useRef, useState } from 'react'
import { Award, Users, Target, Zap, Heart, Briefcase } from 'lucide-react'

export default function WhyJoinUs() {
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

  const benefits = [
    {
      icon: Award,
      title: 'Professional Growth',
      description: 'Access to training, certifications, and mentorship programs to advance your skills and career.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented, passionate professionals who share your commitment to excellence.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Meaningful Impact',
      description: 'Contribute to security and protection solutions that make a real difference in the world.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Innovation Focus',
      description: 'Be part of a company that embraces protection in the communities.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Competitive benefits, flexible working arrangements, and employee wellness programs.',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Briefcase,
      title: 'Competitive Compensation',
      description: 'Attractive salary packages and comprehensive benefits reflecting your value to the team.',
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why Join Ardor Aegis?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer more than just a job, we offer an environment where your talents are valued, your ideas matter, and your future is bright.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  inView ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{
                  animationDelay: inView ? `${index * 100}ms` : '0ms'
                }}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} rounded-xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative bg-white rounded-lg p-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-r ${benefit.color} text-white mb-6`}>
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Ready to take the next step in your career?
          </p>
          <a
            href="#apply-now"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#7b542f] to-[#7b542f] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#7b542f]/50 transition-all duration-300 transform hover:scale-105"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </section>
  )
}
