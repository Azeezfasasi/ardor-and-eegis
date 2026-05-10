'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ShieldCheck, Users, Trophy, MapPin } from 'lucide-react';

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

function useCountUp({ start, end, durationMs, enabled }) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();
    const from = start;
    const to = end;

    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, start, end, durationMs]);

  return value;
}

export default function CompanyInsights() {
  const brand = '#7B542F';

  const stats = useMemo(
    () => [
      {
        id: 1,
        number: 15,
        suffix: '+',
        label: 'Years of Experience',
        icon: ShieldCheck,
      },
      {
        id: 2,
        number: 10000,
        suffix: '+',
        label: 'Trained Personnel',
        icon: Users,
      },
      {
        id: 3,
        number: 10,
        suffix: '+',
        label: 'Quality & Awards',
        icon: Trophy,
      },
      {
        id: 4,
        number: 2000,
        suffix: '+',
        label: 'Service Locations',
        icon: MapPin,
      },
    ],
    []
  );

  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2 });

  const countA = useCountUp({ start: 0, end: 15, durationMs: 900, enabled: statsInView });
  const countB = useCountUp({ start: 0, end: 10000, durationMs: 1100, enabled: statsInView });
  const countC = useCountUp({ start: 0, end: 10, durationMs: 700, enabled: statsInView });
  const countD = useCountUp({ start: 0, end: 2000, durationMs: 1200, enabled: statsInView });

  const countsById = useMemo(
    () => ({
      1: countA,
      2: countB,
      3: countC,
      4: countD,
    }),
    [countA, countB, countC, countD]
  );

  return (
    <section className="w-full bg-[#7B542F]/20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_10%_0%,rgba(123,84,47,0.35),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(2,132,199,0.25),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10">
        <div className="py-2 lg:py-6 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 ring-1 ring-gray-200 backdrop-blur mb-4">
                <span className="inline-flex h-2 w-2 rounded-full bg-[#7B542F]" />
                <span className="text-sm font-semibold text-gray-800">Security that performs</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Company Insights
              </h2>
              <div className="w-20 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: brand }} />

              <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                Ador Aegis Security Company stands as a symbol of trust, discipline, and elite protection in today&apos;s evolving security landscape. Our insight is driven by the understanding that modern security goes beyond physical presence, it requires intelligence, vigilance, rapid response, and strategic risk management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
              <div className="relative h-48 md:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <Image
                  src="/img/place2.jpeg"
                  alt="Security Operations Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-white/95 text-sm font-semibold">Our security personels</div>
                </div>
              </div>

              <div className="relative h-48 md:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <Image
                  src="/img/place2.jpeg"
                  alt="Security Leadership Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-white/95 text-sm font-semibold">Our security personels</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fun facts section  */}
        <div ref={statsRef} className="py2 lg:py-6 md:py-20 lg:border-t border-[#B59C5B]/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                const current = countsById[stat.id] ?? 0;
                const formatted = stat.id === 2 || stat.id === 4 ? current.toLocaleString() : String(current);

                return (
                  <div
                    key={stat.id}
                    className={`group text-center rounded-2xl border border-white/30 bg-white/50 backdrop-blur shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md ${
                      statsInView ? 'opacity-100' : 'opacity-0 translate-y-3'
                    }`}
                  >
                    <div className="mx-auto h-12 w-12 mt-6 mb-3 rounded-2xl bg-[#7B542F]/15 flex items-center justify-center text-[#7B542F]">
                      <Icon size={22} />
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 transition-transform duration-700">
                      {formatted}
                      {stat.suffix}
                    </h3>

                    <p className="text-sm md:text-base font-semibold text-gray-700 pb-7 px-2">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="h-px my-12 md:my-16 mx-auto max-w-md" style={{ backgroundColor: brand }} />

            <div className="text-center px-2">
              <p className="text-gray-700 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                At Ador Aegis, we believe that every client deserves a security solution tailored to their unique environment and challenges. By combining professionally trained personnel, advanced surveillance systems, and proactive security strategies, we provide comprehensive protection that ensures confidence and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

