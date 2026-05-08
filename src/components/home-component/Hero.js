"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { ArrowBigRightDash, ArrowBigLeftDash, Loader } from 'lucide-react'

const DEFAULT_SLIDES = [
  {
    _id: '1',
    title: 'Innovative Engineering, Strategic Management!',
    subtitle: 'We build robust infrastructure and engineering solutions tailored to your needs.',
    ctaLabel: 'Request a Quote',
    ctaHref: '/request-a-quote',
    image: '/images/telecom2.jpeg',
    alt: 'Engineering excellence'
  },
  {
    _id: '2',
    title: 'Reliable teams. On time.',
    subtitle: 'Scale with experienced engineers and project managers who get things done.',
    ctaLabel: 'Our Services',
    ctaHref: '/services',
    image: '/images/telecom1.jpeg',
    alt: 'Engineering excellence'
  },
  {
    _id: '3',
    title: 'From concept to delivery',
    subtitle: 'We partner with you through project discovery, engineering and deployment.',
    ctaLabel: 'Contact Us',
    ctaHref: '/contact-us',
    image: '/images/fibre1.jpeg',
    alt: 'Engineering excellence'
  }
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return

    const update = () => setReduced(Boolean(mq.matches))
    update()

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }

    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  return reduced
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState({ active: false, startX: 0, dx: 0 })
  const containerRef = useRef(null)
  const [slideWidth, setSlideWidth] = useState(0)

  const heroRef = useRef(null)
  const [inView, setInView] = useState(false)

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/hero')
        const data = await response.json()

        if (data.success && data.slides && data.slides.length > 0) {
          const sortedSlides = [...data.slides].sort((a, b) => (a.order || 0) - (b.order || 0))
          setSlides(sortedSlides)
        } else {
          setSlides(DEFAULT_SLIDES)
        }
      } catch (error) {
        console.error('Failed to fetch hero slides:', error)
        setSlides(DEFAULT_SLIDES)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  // Entrance animations via IntersectionObserver
  useEffect(() => {
    if (!heroRef.current) return

    if (reducedMotion) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) setInView(true)
      },
      { threshold: 0.15 }
    )

    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [reducedMotion])

  // pointer handlers (works for mouse & touch)
  function handlePointerDown(e) {
    const x = e.clientX ?? (e.touches && e.touches[0].clientX)
    if (typeof x !== 'number') return
    setDrag({ active: true, startX: x, dx: 0 })
  }

  function handlePointerMove(e) {
    if (!drag.active) return
    const x = e.clientX ?? (e.touches && e.touches[0].clientX)
    if (typeof x !== 'number') return
    setDrag((d) => ({ ...d, dx: x - d.startX }))
  }

  function handlePointerUp() {
    if (!drag.active) return

    const threshold = (containerRef.current?.offsetWidth || 600) * 0.15
    if (drag.dx > threshold) setIndex((i) => Math.max(0, i - 1))
    else if (drag.dx < -threshold) setIndex((i) => Math.min(slides.length - 1, i + 1))

    setDrag({ active: false, startX: 0, dx: 0 })
  }

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(slides.length - 1, i + 1))
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slides.length])

  // track container width and update on resize so we translate by exact pixels
  useLayoutEffect(() => {
    function update() {
      const w = containerRef.current?.offsetWidth || 0
      setSlideWidth(w)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (loading) {
    return (
      <section className="w-full">
        <div className="h-[420px] md:h-[540px] flex items-center justify-center bg-yellow-50">
          <Loader className="w-8 h-8 animate-spin text-[#7B542F]" />
        </div>
      </section>
    )
  }

  if (!slides || slides.length === 0) {
    return (
      <section className="w-full">
        <div className="h-[420px] md:h-[540px] flex items-center justify-center bg-yellow-400">
          <p className="text-gray-600">No hero slides configured</p>
        </div>
      </section>
    )
  }

  const progressPct = slides.length > 1 ? (index / (slides.length - 1)) * 100 : 100

  return (
    <section className="w-full">
      <div className="mx-auto">
        <div ref={heroRef} className="relative">
          {/* Background accents */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#7B542F]/10 blur-3xl" />
            <div className="absolute -bottom-40 right-[-140px] h-[520px] w-[520px] rounded-full bg-[#7B542F]/10 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(to_right,rgba(123,84,47,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(123,84,47,0.35)_1px,transparent_1px)] bg-[size:42px_42px]" />
          </div>

          <div
            ref={containerRef}
            className="relative overflow-hidden"
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            style={{ touchAction: 'pan-y' }}
          >
            {/* Slide track */}
            <div
              className="flex transition-transform duration-300"
              style={{
                transform: slideWidth
                  ? `translateX(${-(index * slideWidth) + drag.dx}px)`
                  : `translateX(calc(${-(index * 100)}% + ${drag.dx}px))`
              }}
            >
              {slides.map((s, i) => {
                const active = i === index

                return (
                  <div key={s._id} className="min-w-full flex-none" style={{ flex: '0 0 100%' }}>
                    <div className="h-[700px] md:h-[750px] flex items-center">
                      <div
                        className="w-full h-full p-8 md:p-12 flex items-center justify-between gap-6 relative overflow-hidden"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(123,84,47,0.08) 0%, rgba(123,84,47,0.04) 45%, rgba(123,84,47,0.16) 100%)'
                        }}
                      >
                        {/* active soft overlay */}
                        <div
                          aria-hidden="true"
                          className={[
                            'absolute inset-0 opacity-0 transition-opacity duration-500',
                            active ? 'opacity-100' : ''
                          ].join(' ')}
                          style={{
                            background:
                              'radial-gradient(circle at 20% 10%, rgba(123,84,47,0.20), transparent 55%), radial-gradient(circle at 90% 60%, rgba(123,84,47,0.18), transparent 50%)'
                          }}
                        />

                        <div className="flex-1 max-w-full md:max-w-2xl pt-20 lg:pt-40 relative">
                          <h2
                            className={[
                              'text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4',
                              reducedMotion ? '' : 'transition-all duration-700',
                              'opacity-100 translate-y-0'
                            ].join(' ')}
                          >
                            {s.title}
                          </h2>

                          <p
                            className={[
                              'text-gray-700 mb-6 text-base md:text-lg',
                              reducedMotion ? '' : 'transition-all duration-700 delay-75',
                              'opacity-100 translate-y-0'
                            ].join(' ')}
                          >
                            {s.subtitle}
                          </p>

                          <div
                            className={[
                              'flex gap-3 flex-wrap',
                              reducedMotion ? '' : 'transition-all duration-700 delay-150',
                              'opacity-100 translate-y-0'
                            ].join(' ')}
                          >
                            <Link
                              href={s.ctaHref}
                              className="inline-flex items-center gap-2 px-2 md:px-5 py-3 bg-[#7B542F] text-white rounded-md font-medium hover:bg-yellow-600 transition-colors shadow-sm hover:shadow-md"
                            >
                              <span>{s.ctaLabel}</span>
                              <ArrowBigRightDash className="w-5 h-5" />
                            </Link>

                            <Link
                              href="/about-us"
                              className="inline-flex items-center px-2 md:px-5 py-3 font-semibold border border-[#7B542F] rounded-md text-gray-800 hover:bg-[#7B542F] hover:text-white transition-colors"
                            >
                              Learn more
                            </Link>
                          </div>
                        </div>

                        {/* Right image */}
                        {s.image && (
                          <div className="hidden lg:block shrink-0 lg:w-[40%] pt-40 relative">
                            <div
                              className={[
                                'rounded-2xl overflow-hidden w-full h-[500px]',
                                reducedMotion ? '' : 'transition-all duration-700',
                                'opacity-100 translate-y-0 scale-100'
                              ].join(' ')}
                            >
                              <Image
                                src={s.image}
                                alt={s.alt || 'Slide image'}
                                width={420}
                                height={500}
                                className="w-full h-[500px] object-cover"
                                priority={i === 0}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Progress bar */}
            <div className="absolute left-0 right-0 bottom-0 px-6 md:px-12 pb-5">
              <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
                <div
                  className="h-full bg-[#7B542F] transition-[width] duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Prev/Next arrows */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 md:bg-white/80 hover:bg-white p-0.5 md:p-2 rounded-full shadow-md text-[#7B542F] cursor-pointer transition-all hover:scale-105"
                >
                  <ArrowBigLeftDash />
                </button>

                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 md:bg-white/80 hover:bg-white p-0.5 md:p-2 rounded-full shadow-md text-[#7B542F] cursor-pointer transition-all hover:scale-105"
                >
                  <ArrowBigRightDash />
                </button>

                {/* Dots */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === index
                          ? 'bg-[#7B542F] shadow-[0_0_0_4px_rgba(123,84,47,0.15)]'
                          : 'bg-white/70 border border-gray-200 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

