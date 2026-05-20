'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Mail, MessageSquare, Send, User } from 'lucide-react';

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

export default function AskUs() {
  const brand = '#7B542F';
  const { ref: sectionRef, inView } = useInView({ threshold: 0.15 });
  const title = useMemo(() => 'Ask Us Anything', []);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "" });
        // Clear success message after 10 seconds
        setTimeout(() => setSubmitStatus(null), 10000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 10000);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error("Contact form error:", error);
      setTimeout(() => setSubmitStatus(null), 10000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
      <div
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(123,84,47,0.65),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.35),transparent_40%)]"
      />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 backdrop-blur mb-4">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: brand }} />
            <span className="text-sm font-semibold text-white/90">Secure communications</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 ease-out text-white mb-2`}>
            <span className='text-[#7B542F]'>{title}</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            Send your question and our team will respond quickly with clear, actionable guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className={`flex justify-center ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 ease-out`}>
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/img/ardor5.jpg"
                alt="Our Officers"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/30 to-black/45" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-6 top-6 w-20 h-2 rounded-full" style={{ backgroundColor: brand, opacity: 0.6 }} />
                <div className="absolute bottom-10 right-8 w-28 h-2 rounded-full" style={{ backgroundColor: '#38BDF8', opacity: 0.35 }} />
              </div>
            </div>
          </div>

          <div className={`w-full ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 ease-out`}>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl shadow-[0_0_0_1px_rgba(123,84,47,0.08)] p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 text-green-200 rounded-xl text-sm md:text-base">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl text-sm md:text-base">
                    ✕ Failed to send message. Please try again.
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2 text-sm md:text-base">
                    Your Name <span style={{ color: '#D4A574' }}>*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3 w-5 h-5 text-[#7B542F] font-bold" strokeWidth={1.5} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/95 text-gray-900 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2 text-sm md:text-base">
                    Your Email <span style={{ color: '#D4A574' }}>*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3 w-5 h-5 text-[#7B542F]" strokeWidth={1.5} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                      className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/95 text-gray-900 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2 text-sm md:text-base">
                    Subject <span style={{ color: '#D4A574' }}>*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3 w-5 h-5 text-[#7B542F]" strokeWidth={1.5} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/95 text-gray-900 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-40"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2 text-sm md:text-base">
                    Message <span style={{ color: '#D4A574' }}>*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#7B542F] pointer-events-none" strokeWidth={1.5} />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ask anything"
                      required
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/95 text-gray-900 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3 md:py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed bg-[#7B542F]"
                  // style={{ backgroundColor: '#D97E6F' }}
                >
                  <Send className="w-5 h-5" strokeWidth={2} />
                  {loading ? 'Sending...' : 'Submit'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 text-green-200 rounded-xl text-sm md:text-base">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl text-sm md:text-base">
                    ✕ Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className={`mt-12 md:mt-16 text-center ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 ease-out`}>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Have a question? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
}

