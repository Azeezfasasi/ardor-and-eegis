'use client';

import { Loader, Star } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const brand = '#7B542F';

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'John Adewale',
    position: 'Project Manager, Alpha Industries',
    message:
      'Rayob Engineering delivered beyond expectations. Their team showed exceptional professionalism and technical expertise throughout our factory upgrade project.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Maria Okafor',
    position: 'Director, GreenBuild Ltd.',
    message:
      'The Rayob team provided innovative solutions that reduced our construction costs and improved overall efficiency. Highly recommended for quality engineering services.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Engr. David Uche',
    position: 'CEO, Uche Group',
    message:
      'They combine strong technical skills with a great sense of client service. Every project we’ve done with Rayob Engineering has been a success story.',
    rating: 5,
  },
];

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

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();

        if (data?.success && Array.isArray(data?.testimonials)) {
          const sortedTestimonials = [...data.testimonials].sort((a, b) => (a.order || 0) - (b.order || 0));
          setTestimonials(sortedTestimonials);
        } else {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        setTestimonials(DEFAULT_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const { ref: sectionRef, inView } = useInView({ threshold: 0.15 });

  const safeTestimonials = useMemo(() => {
    return Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
  }, [testimonials]);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gray-50 py-16">
        <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_0%,rgba(123,84,47,0.35),transparent_45%)]" />
        <div className="container mx-auto px-6 lg:px-20 flex items-center justify-center min-h-64 relative">
          <Loader className="w-8 h-8 animate-spin text-[#7B542F]" />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_15%,rgba(123,84,47,0.25),transparent_50%),radial-gradient(circle_at_85%_25%,rgba(2,132,199,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className={`container mx-auto px-6 lg:px-20 relative transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="text-center mb-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-gray-200 backdrop-blur mb-4">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: brand }} />
            <span className="text-sm font-semibold text-gray-800">Client trust, measured</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hear from satisfied clients who trusted Rayob Engineering with their projects—backed by professionalism, quality, and results.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {safeTestimonials.map((testimonial, idx) => {
            const key = testimonial?._id || testimonial?.id || idx;
            const rating = Number(testimonial?.rating || 5);

            return (
              <div
                key={key}
                className={`relative bg-white/70 backdrop-blur p-8 rounded-2xl border border-white/60 shadow-sm hover:shadow-lg transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${Math.min(idx * 90, 360)}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <div className="ml-auto">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-[#7B542F]/15 text-[#7B542F]">
                      <Star size={16} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 italic leading-relaxed">“{testimonial?.message}”</p>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial?.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial?.position}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="/contact-us"
            className="group inline-flex items-center justify-center gap-2 bg-[#7B542F] text-white px-8 py-3 rounded-xl shadow-sm hover:bg-[#6a4528] transition focus:outline-none focus:ring-2 focus:ring-[#7B542F]/40"
          >
            Work With Us
            <svg
              className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 transition"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

