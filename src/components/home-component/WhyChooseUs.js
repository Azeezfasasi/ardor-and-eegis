'use client';

import { CheckCircle, ShieldCheck, Wrench, Sparkles, Clock } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const features = [
  {
    title: 'Elite Security Personnel',
    description:
      'Our team consists of professionally trained and disciplined security officers equipped to handle corporate, residential, executive, and high-risk security operations with confidence and professionalism.',
    icon: ShieldCheck,
  },
  {
    title: 'Advanced Protection Solutions',
    description: 'We utilize modern surveillance systems, strategic risk assessment, and proactive security measures to deliver reliable and effective protection tailored to every client’s needs.',
    icon: Sparkles,
  },
  {
    title: 'Rapid Response & Reliability',
    description:
      'We pride ourselves on maintaining swift response times, operational readiness, and dependable service to ensure the safety and peace of mind of our clients at all times',
    icon: Clock,
  },
  {
    title: 'Integrity & Vigilance',
    description: 'At Ardor Aegis, integrity, vigilance, and protection are at the core of everything we do. We are committed to maintaining the highest standards of trust, confidentiality, and operational excellence.',
    icon: Wrench,
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

function FeatureCard({ feature, delayMs = 0 }) {
  const Icon = feature.icon || CheckCircle;
  const { ref, inView } = useInView({ threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={
        'group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur transition-all duration-700 ' +
        (inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')
      }
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#7B542F]/10 blur-2xl" />
        <div className="absolute -bottom-16 -right-10 h-44 w-44 rounded-full bg-[#7B542F]/10 blur-2xl" />
      </div>

      <div className="relative p-7 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B542F]/80 to-[#7B542F]/100 text-white shadow-sm transition-transform duration-500 group-hover:scale-[1.04]">
          <Icon size={22} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const header = useMemo(() => ({ title: 'Why Choose Ardors Aegis Limited', subtitle: 'Trusted security solutions driven by vigilance, professionalism, and rapid response. At Ador Aegis Security Company, we combine highly trained personnel, modern security strategies, and a commitment to excellence to provide dependable protection for individuals, businesses, and organizations.' }), []);

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.15 });

  return (
    <section ref={headerRef} className="relative overflow-hidden bg-gray-50 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(30,64,175,0.10),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(2,132,199,0.10),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="container mx-auto px-6 lg:px-20 relative">
        <div
          className={
            'text-center mb-12 transition-all duration-700 ease-out ' +
            (headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')
          }
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-gray-200 backdrop-blur mb-4">
            <span className="h-2 w-2 rounded-full bg-[#7B542F]" />
            <span className="text-sm font-semibold text-gray-800">Quality assurance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{header.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {header.subtitle} Our experts combine dependable execution, modern tools, and sustainable practices to deliver outcomes you can trust.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} delayMs={index * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

