'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, BadgeCheck, Sparkles } from 'lucide-react';

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

export default function OurGallantOfficers() {
  const brand = '#7B542F';

  const images = useMemo(
    () => [
      { id: 1, src: '/img/ardor2.jpg', alt: 'Our Gallant Officers - Group 1' },
      { id: 2, src: '/img/ardor3.jpg', alt: 'Our Gallant Officers - Group 2' },
      { id: 3, src: '/img/ardor4.jpg', alt: 'Our Gallant Officers - Group 3' },
      { id: 4, src: '/img/ardor5.jpg', alt: 'Our Gallant Officers - Group 4' },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const { ref: sectionRef, inView } = useInView({ threshold: 0.12 });

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsAutoPlay(false);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_10%,rgba(123,84,47,0.7),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.35),transparent_40%)]"
      />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/10 backdrop-blur mb-4">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full" style={{ backgroundColor: `${brand}33` }}>
              <BadgeCheck size={14} color={brand} />
            </span>
            <span className="text-sm font-semibold text-white/90">Charismatic & disciplined officers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Our Gallant Officers
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: brand }} />
        </div>

        <div
          className="relative w-full group"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className={`relative w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="aspect-video md:aspect-auto md:h-96 lg:h-[500px] relative">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Image src={image.src} alt={image.alt} fill className="object-contain" priority={index === currentIndex} />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <div className="hidden absolute left-5 top-5 md:left-7 md:top-7 lg:inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
                <Sparkles size={16} color="white" />
                <span className="text-xs md:text-sm font-semibold text-white/90">
                  Officer Showcase • {currentIndex + 1}/{images.length}
                </span>
              </div>
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/15 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm group/btn"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/15 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm group/btn"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="absolute bottom-4 right-4 bg-black/45 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm ring-1 ring-white/10">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-3 h-3 md:w-4 md:h-4' : 'w-2 h-2 md:w-3 md:h-3'}`}
                style={{ backgroundColor: index === currentIndex ? brand : '#D1D5DB' }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className={`text-gray-200 text-sm md:text-base leading-relaxed max-w-2xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Meet our dedicated team of security professionals committed to excellence, integrity, and rapid response—built for real-world missions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

