'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_CONTENT = {
  title: 'About Rayob Engineering & Mgt. Co. Ltd.',
  paragraphs: [
    {
      _id: '1',
      text: 'Rayob Engineering & Mgt. Co. Ltd is a dynamic, solutions-driven Engineering and Management Company committed to delivering world-class services across multiple sectors. Established in 2020 and legally incorporated in Nigeria in 2025 with a passion for innovation, engineering excellence, and sustainable project delivery.',
      order: 0,
    },
    {
      _id: '2',
      text: 'We bring together nearly two decades of multidisciplinary experience spanning construction, telecommunications, optical fibre implementation, operations and maintenance, project management, corporate governance, and corporate social responsibility.',
      order: 1,
    },
  ],
  image: {
    url: '/images/telecom2.jpeg',
    alt: 'Rayob Engineering Team',
  },
  ctaButton: {
    label: 'Learn More',
    href: '/about-us',
  },
};

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

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, inView };
}

function SkeletonLine({ className = '' }) {
  return <div className={`h-4 rounded-md bg-gray-200 animate-pulse ${className}`} />;
}

export default function HomeAbout() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/home-about');
        const data = await response.json();

        if (data?.success && data?.data) {
          setContent(data.data);
        } else {
          setContent(DEFAULT_CONTENT);
        }
      } catch (error) {
        console.error('Failed to fetch home about content:', error);
        setContent(DEFAULT_CONTENT);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const sortedParagraphs = useMemo(() => {
    const paragraphs = Array.isArray(content?.paragraphs) ? content.paragraphs : DEFAULT_CONTENT.paragraphs;
    return [...paragraphs].sort((a, b) => (a?.order || 0) - (b?.order || 0));
  }, [content?.paragraphs]);

  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.15 });
  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.15 });
  const { ref: textRef, inView: textInView } = useInView({ threshold: 0.15 });

  const imageUrl = content?.image?.url || DEFAULT_CONTENT.image.url;
  const imageAlt = content?.image?.alt || DEFAULT_CONTENT.image.alt;

  const ctaHref = content?.ctaButton?.href || DEFAULT_CONTENT.ctaButton.href;
  const ctaLabel = content?.ctaButton?.label || DEFAULT_CONTENT.ctaButton.label;

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gray-50 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(30,64,175,0.08),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(2,132,199,0.08),transparent_40%)]" />
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="aspect-[4/3] w-full animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
              <div className="absolute left-6 top-6 h-3 w-24 rounded bg-gray-200 animate-pulse" />
              <div className="absolute bottom-6 left-6 h-3 w-32 rounded bg-gray-200 animate-pulse" />
            </div>

            <div>
              <SkeletonLine className="w-44" />
              <div className="mt-3">
                <SkeletonLine className="w-11/12" />
                <SkeletonLine className="mt-3 w-10/12" />
                <SkeletonLine className="mt-3 w-9/12" />
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-11 w-36 rounded-xl bg-gray-200 animate-pulse" />
                <div className="h-11 w-24 rounded-xl bg-gray-200 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={`relative overflow-hidden bg-[#7B542F]/5 py-16 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 ease-out`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(30,64,175,0.10),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(2,132,199,0.10),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div
              className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-700 ease-out ${
                imageInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7B542F]/10 via-[#7B542F]/10 to-transparent" />
              <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#7B542F]/10 blur-2xl" />
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#7B542F]/10 blur-2xl" />

              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              <div className="absolute left-6 top-6">
                <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur">
                  Vigilance • Integrity • Protection
                </span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="relative">
            <div
              className={`transition-all duration-700 ease-out ${
                textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#7B542F]/10 px-4 py-2 ring-1 ring-gray-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#7B542F]" />
                <span className="text-sm font-semibold text-gray-800">Who we are</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {content?.title || DEFAULT_CONTENT.title}
              </h2>

              <div className="mt-5 space-y-4">
                {sortedParagraphs.map((para, idx) => (
                  <p
                    key={para?._id || idx}
                    className={`text-gray-600 leading-relaxed transition-all duration-700 ease-out ${
                      textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    } ${idx * 120}ms`}
                    style={{ transitionDelay: `${idx * 120}ms` }}
                  >
                    {para?.text}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={ctaHref}
                  className="group inline-flex items-center justify-center rounded-xl bg-[#7B542F] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7B542F]/80 focus:outline-none focus:ring-2 focus:ring-[#7B542F]/50"
                  aria-label={ctaLabel}
                >
                  <span className="mr-2">{ctaLabel}</span>
                  <span className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/20 transition group-hover:bg-white/20">
                    <span className="absolute left-0 top-0 h-full w-full translate-x-0 transition duration-300 group-hover:translate-x-full" />
                    <svg
                      className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 10H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

