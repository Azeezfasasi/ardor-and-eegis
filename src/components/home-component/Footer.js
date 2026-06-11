import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
  return (
    <>
    <div className="relative overflow-hidden bg-[#1A1A1A] py-16 mt-20">
      {/* Ambient accents */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[rgba(123,84,47,0.25)] blur-3xl" />
        <div className="absolute -top-16 right-1/3 h-64 w-64 rounded-full bg-[rgba(123,84,47,0.18)] blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(123,84,47,0.18)] to-transparent" />
      </div>

      <div className="container relative mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4" aria-label="Footer content">
          {/* Brand / About */}
          <div className="animate-[fadeInUp_700ms_ease-out_forwards] opacity-0 [animation-delay:80ms]">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(123,84,47,0.55)] bg-[rgba(123,84,47,0.12)] shadow-[0_0_0_1px_rgba(123,84,47,0.25)]">
                <span className="text-[28px] leading-none font-black text-[#7B542F]">A</span>
              </span>
              <div>
                <h3 className="text-white text-xl font-bold leading-tight">Ardor Aegis Security</h3>
                <p className="text-xs text-gray-200 mt-0.5">Vigilance • Integrity • Protection</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Ardor Aegis Security Company stands for trust and readiness—combining trained personnel,
              modern surveillance, and proactive protection strategies.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
                { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
                { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:border-[rgba(123,84,47,0.6)] hover:bg-[rgba(123,84,47,0.12)]"
                >
                  <Icon size={18} className="text-gray-300 group-hover:scale-105 transition" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-[fadeInUp_700ms_ease-out_forwards] opacity-0 [animation-delay:140ms]">
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="group inline-flex items-center gap-2 text-gray-300 hover:text-white transition">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7B542F] opacity-100 group-hover:opacity-100 transition" />
                  Home
                  <span className="ml-auto text-gray-500 group-hover:text-gray-300 transition">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="group inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7B542F] opacity-100 group-hover:opacity-100 transition" />
                  About Us
                  <span className="ml-auto text-gray-500 group-hover:text-gray-300 transition">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7B542F] opacity-100 group-hover:opacity-100 transition" />
                  Services
                  <span className="ml-auto text-gray-500 group-hover:text-gray-300 transition">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/programmes"
                  className="group inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7B542F] opacity-100 group-hover:opacity-100 transition" />
                  Programmes
                  <span className="ml-auto text-gray-500 group-hover:text-gray-300 transition">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="group inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7B542F] opacity-100 group-hover:opacity-100 transition" />
                  Contact Us
                  <span className="ml-auto text-gray-500 group-hover:text-gray-300 transition">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services - add a link to the services */} 
          <div className="animate-[fadeInUp_700ms_ease-out_forwards] opacity-0 [animation-delay:200ms]">
            <h4 className="text-white text-lg font-semibold mb-4">Security Solutions</h4>
            <ul className="space-y-3 text-sm">
              {[
                "Integrity & Vigilance Guards",
                "Surveillance & Monitoring",
                "Access Control Support",
                "Rapid Response Coordination",
                "Risk Assessment & Planning",
                "Corporate / Residential Security",
                "Asset Protection",
                "24/7 Operations Guidance",
              ].map((item) => (
                <li key={item} className="group">
                  <span className="relative inline-flex items-center text-gray-300 hover:text-white transition">
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#7B542F] group-hover:bg-[#7B542F] transition" />
                    {item}
                    <span className="ml-2 text-[11px] text-gray-500 group-hover:text-gray-300 transition">•</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-[fadeInUp_700ms_ease-out_forwards] opacity-0 [animation-delay:260ms]">
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <div className="rounded-2xl border border-white/10 bg-white/15 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/60">
                    <MapPin size={18} className="text-[#7B542F] mt-0.5 w-[38px]" />
                  </div>
                  <span className="text-gray-300">
                    Plot 104, House 3, tos Douglas kaura district, 
                    <br /> 
                    Abuja, Nigeria
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <div className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/60">
                    <Phone size={18} className="text-[#7B542F]" />
                  </div>
                  <a href="tel:+2348152260336" className="text-gray-300 hover:text-white transition relative">
                    (+234) 08152260336
                    <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#7B542F] transition-all group-hover:w-full" />
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/60">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                          fill="#7B542F"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                          fill="#7B542F"
                        />
                      </g>
                    </svg>
                  </span>
                  <a href="https://wa.me/08030960533" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition">
                    (+234) 08030960533
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <div className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/60">
                    <Mail size={18} className="text-[#7B542F]" />
                  </div>
                  <a href="mailto:info@ardoragis.com" className="text-gray-300 hover:text-white transition">
                    info@ardoragis.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500 animate-[fadeIn_600ms_ease-out_forwards] opacity-0 [animation-delay:320ms]">
          © {new Date().getFullYear()} <span className="text-gray-200 font-semibold">Ardor Aegis Security</span>. All rights reserved. | Developed by{" "}
          <a
            href="https://wa.me/2348117256648"
            target="_blank"
            rel="noreferrer"
            className="text-[#7B542F] hover:text-[#A97A4F] transition"
          >
            Sense Solutions
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

