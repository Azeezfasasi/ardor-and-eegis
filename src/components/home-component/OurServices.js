"use client"
import React, { useState, useEffect } from 'react'
import { Loader, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

// SVG Icons
function ServiceIcon({ name }) {
  const size = 24
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true }

  switch ((name || '').toLowerCase()) {
    case 'general engineering services':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
          <path strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a7.5 7.5 0 00.6-2.5 7.5 7.5 0 00-.6-2.5l2.1-1.6-1.8-3.1-2.5 1a8 8 0 00-2.2-1.3L14.6 1h-4l-.9 4.1a7.9 7.9 0 00-2.2 1.3l-2.5-1L2.9 8.4 5 10a7.5 7.5 0 000 5l-2.1 1.6 1.8 3.1 2.5-1c.6.5 1.3.9 2.2 1.3L10.6 23h4l.9-4.1c.8-.3 1.6-.8 2.2-1.3l2.5 1 1.8-3.1L19.4 15z" />
        </svg>
      )
    case 'telecoms services':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 20v-4m0-8V4m4 16a8 8 0 10-8 0" />
        </svg>
      )
    case 'building & construction services':
    case 'building & construction':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V10l7-4 7 4v11" />
        </svg>
      )
    case 'sales and distribution of telecoms equipment and materials':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M7 7v14m10-14v14M3 7l4-4h10l4 4" />
        </svg>
      )
    case 'supply & distribution of building materials':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l1.2-6H6.2L7 13zM7 13l-1 7h12l-1-7" />
        </svg>
      )
    case 'procurement services':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'project management services':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3v3M5 6h14" />
        </svg>
      )
    case 'risk management services':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5-3.6 9.7-8 11-4.4-1.3-8-6-8-11V6l8-4z" />
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
        </svg>
      )
    case 'training and manpower development':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M17 20v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" strokeWidth="1.5" />
        </svg>
      )
    case 'general contracts':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'optical fibre implementation & maintenance':
    case 'optical fibre implementation & maintenance.':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'corporate social responsibility':
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292m0 0H8.646a4 4 0 010-5.292m3.354 0l-3.535 3.535M9 20h6m-6 0a9 9 0 110-18 9 9 0 010 18z" />
        </svg>
      )
    default:
      return (
        <svg {...common} stroke="currentColor" className="text-white">
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        </svg>
      )
  }
}

// Modal Component
function ServiceModal({ service, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const serviceImages = service && service.images && service.images.length > 0
    ? [...service.images].sort((a, b) => (a.order || 0) - (b.order || 0))
    : []

  // Auto-slide effect
  useEffect(() => {
    if (!isOpen || serviceImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === serviceImages.length - 1 ? 0 : prev + 1))
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [isOpen, serviceImages.length])

  if (!isOpen || !service) return null

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? serviceImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === serviceImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#7B542F]/90 text-white p-6 flex items-start justify-between z-30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <ServiceIcon name={service.title} />
            </div>
            <h2 className="text-2xl font-bold">{service.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image Slider */}
        {serviceImages.length > 0 && serviceImages[currentImageIndex] && (
          <div className="relative bg-gray-900 aspect-video w-full">
            <Image
              src={serviceImages[currentImageIndex].url}
              alt={serviceImages[currentImageIndex].alt || `${service.title} image`}
              fill
              className="object-contain"
              priority
            />

            {/* Navigation Buttons */}
            {serviceImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-900 rounded-full p-2 transition z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-900 rounded-full p-2 transition z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {serviceImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        idx === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {serviceImages.length}
                </div>
              </>
            )}
          </div>
        )}

        <div className="p-6 space-y-4 text-gray-700">
          {service.details && service.details.length > 0 ? (
            service.details.map((detail, idx) => (
              <div key={idx}>
                {detail.section && (
                  <h3 className="text-lg font-semibold text-indigo-600 mb-3">{detail.section}</h3>
                )}
                {detail.text && (
                  <p className="leading-relaxed">{detail.text}</p>
                )}
                {detail.items && detail.items.length > 0 && (
                  <ul className="space-y-2 ml-4">
                    {detail.items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="leading-relaxed">{service.shortDesc}</p>
          )}
        </div>

        <div className="bg-gray-50 p-6 border-t text-center">
          <button
            onClick={onClose}
            className="bg-[#7B542F] text-white px-6 py-2 rounded-lg hover:bg-[#7B542F]/80 transition font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function OurServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)
  const [animateReady, setAnimateReady] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        const data = await response.json()

        if (data.success && data.services) {
          const sortedServices = [...data.services].sort((a, b) => (a.order || 0) - (b.order || 0))
          setServices(sortedServices)
        }
      } catch (error) {
        console.error('Failed to fetch services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  useEffect(() => {
    if (!loading) setAnimateReady(true)
  }, [loading])

  if (loading) {
    return (
      <section className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_0%,rgba(123,84,47,0.25),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(2,132,199,0.20),transparent_40%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-96 relative z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border border-[#7B542F]/30 bg-white/60 animate-pulse" />
            <Loader className="w-8 h-8 animate-spin text-[#7B542F]" />
          </div>
        </div>
      </section>
    )
  }

  if (!services || services.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">No services configured</p>
        </div>
      </section>
    )
  }

  const brand = '#7B542F'

  return (
    <>
      <section className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_0%,rgba(123,84,47,0.25),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(2,132,199,0.20),transparent_40%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-gray-200 backdrop-blur mb-5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: brand }} />
              <span className="text-sm font-semibold text-gray-800">Security-forward services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              At Ardor Aegis Security Company, we deliver professional security and protection services designed to safeguard people, properties, businesses, and critical assets. Our highly trained personnel and advanced security strategies ensure reliable protection, rapid response, and peace of mind for every client.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <article
                key={service._id}
                onClick={() => setSelectedService(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelectedService(service)
                }}
                className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm backdrop-blur transition-all cursor-pointer p-6 flex flex-col h-full
                  ${animateReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  duration-700 ease-out`}
                style={{ transitionDelay: `${Math.min(idx * 90, 360)}ms` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `radial-gradient(circle at 20% 0%, ${brand}33, transparent 50%)` }} />

                <div className="flex flex-col items-start gap-4 h-full relative z-10">
                  <div
                    className="flex items-center gap-4"
                    style={{
                      // no-op; keeping for clarity
                    }}
                  >
                    <div
                      className="p-4 rounded-xl text-white w-12 h-12 flex items-center justify-center shrink-0 shadow-sm bg-[#7B542F]/85"
                      // style={{ background: `linear-gradient(135deg, ${brand}, #0ea5e9)` }}
                    >
                      <ServiceIcon name={service.title} />
                    </div>
                  </div>

                  <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-950 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.shortDesc}</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                    <span className="text-gray-900">Learn More</span>
                    <span className="h-7 w-7 rounded-full bg-gray-100 group-hover:bg-[#7B542F]/15 flex items-center justify-center transition">
                      <svg className="w-4 h-4" fill="none" stroke="#7B542F" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceModal service={selectedService} isOpen={!!selectedService} onClose={() => setSelectedService(null)} />
    </>
  )
}

