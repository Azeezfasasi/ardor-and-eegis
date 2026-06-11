'use client';
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";

const DEFAULT_DATA = {
  companyInfo: {
    title: "Who We Are",
    image: "/img/ardor6.jpg",
    paragraphs: [
      {
        text: "Ardor Aegis Limited is a dynamic, solutions-driven Engineering and Management Company committed to delivering world-class services across multiple sectors. Established in 2020 and legally incorporated in Nigeria in 2025 with a passion for innovation, engineering excellence, and sustainable project delivery.",
        order: 0,
      },
      {
        text: "We bring together nearly two decades of multidisciplinary experience spanning construction, telecommunications, optical fibre implementation, operations and maintenance, project management, corporate governance, and corporate social responsibility.",
        order: 1,
      },
      {
        text: "The Chairman/CEO is strongly supported by highly experienced professionals in engineering, accounting and finance, law, management, and more. Together, we deliver value, promote excellence, and exceed the expectations of our clients and customers.",
        order: 2,
      },
      {
        text: "Our goal: to become a trusted African leader in engineering excellence, telecommunications infrastructure development, and strategic project delivery.",
        order: 3,
      },
    ],
  },
  vision: {
    title: "Our Vision",
    description:
      "To be a Globally Recognized Engineering and Management Brand known for Excellence, Innovation, and Reliable Project Delivery.",
  },
  mission: {
    title: "Our Mission",
    description:
      "To Provide Superior Engineering and Management Services Using Modern Technology, Professional Expertise, and a Commitment to Quality, Safety, and Customer Satisfaction.",
  },
  coreValues: [
    { name: "Excellence", description: "We deliver superior outcomes in every project.", color: "indigo", order: 0 },
    { name: "Integrity", description: "Ethical, transparent, and trustworthy operations.", color: "blue", order: 1 },
    { name: "Innovation", description: "Smart, modern, technology-driven solutions.", color: "green", order: 2 },
    { name: "Professionalism", description: "High standards, certified competence, quality delivery.", color: "yellow", order: 3 },
    { name: "Customer-centric", description: "Solutions tailored to each client's needs.", color: "pink", order: 4 },
  ],
};

const VALUE_COLORS = {
  indigo: "bg-indigo-600",
  blue: "bg-blue-600",
  green: "bg-green-600",
  yellow: "bg-yellow-600",
  pink: "bg-pink-600",
};

function useInView({ rootMargin = "-10% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin, threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

function SectionHeader({ kicker, title, align = "center" }) {
  return (
    <div className={`mb-12 text-${align}`}>
      {kicker ? (
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#7B542F]/70 uppercase">
          {kicker}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
        {title}
      </h2>
    </div>
  );
}

export default function CompanyOverview() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);

  const coreValuesSorted = useMemo(() => {
    const values = data?.coreValues || [];
    return [...values].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/company-overview");
        const result = await response.json();

        if (result?.success && result?.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch company overview:", error);
        setData(DEFAULT_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { ref: overviewRef, inView: overviewInView } = useInView();
  const { ref: visionRef, inView: visionInView } = useInView();
  const { ref: missionRef, inView: missionInView } = useInView();
  const { ref: valuesRef, inView: valuesInView } = useInView();

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20 flex items-center justify-center min-h-96">
          <Loader className="w-8 h-8 animate-spin text-[#7B542F]" />
        </div>
      </section>
    );
  }

  const paragraphsSorted = [...(data?.companyInfo?.paragraphs || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <>
      {/* Company Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div ref={overviewRef} className="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative w-full h-[400px] sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={data?.companyInfo?.image || "/img/ardor6.jpg"}
                    alt="Ador Aegis Security Services"
                    fill
                    sizes="100%"
                    className="object-cover object-top"
                  />

                  {/* overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(123,84,47,0.35),transparent_55%)]" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur px-4 py-3">
                      <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/90">
                        Trusted Security Partner
                      </p>
                      <p className="mt-1 text-sm font-bold text-white">
                        Built for resilience and protected outcomes.
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-transform duration-700 hover:translate-x-24" />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="order-1 lg:order-2">
                <SectionHeader kicker="Company Overview" title={data?.companyInfo?.title} />

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  {paragraphsSorted.map((para, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === paragraphsSorted.length - 1
                          ? "text-[#7B542F] font-semibold text-lg pt-2"
                          : ""
                      }
                    >
                      {para.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div ref={visionRef} className="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <SectionHeader kicker="Vision" title={data?.vision?.title} />
              <div className="relative bg-white rounded-2xl shadow-md p-8 md:p-12 border border-gray-100">
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-[#7B542F]/10 blur-sm" />
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed relative">
                  {data?.vision?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div ref={missionRef} className="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <SectionHeader kicker="Mission" title={data?.mission?.title} />
              <div className="relative bg-gradient-to-r from-[#7B542F]/8 via-white to-[#7B542F]/12 rounded-2xl shadow-md p-8 md:p-12 border border-[#7B542F]/15">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_30%,rgba(123,84,47,0.25),transparent_55%)]" />
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed relative">
                  {data?.mission?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div ref={valuesRef} className="fade-up">
            <SectionHeader kicker="Core Values" title="Our Core Values" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {coreValuesSorted.map((value, idx) => (
                <div
                  key={`${value.name}-${idx}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${Math.min(idx * 70, 280)}ms` }}
                >
                  <div
                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${VALUE_COLORS[value.color] || "bg-indigo-600"}`}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-white/15 blur-sm" />
                    <svg
                      className="relative w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                    {value.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>

                  <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#7B542F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

