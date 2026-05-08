"use client"
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MainHeader() {
  const [open, setOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const btnRef = useRef(null)
  const panelRef = useRef(null)
  // const router = useRouter()

  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact-us', label: 'Contact Us' }
  ]
  const pathname = usePathname()

  // About submenu state/ref
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutRef = useRef(null)
  const mobileSubmenuRef = useRef(null)

  const DRAWER_DURATION_MS = 220

  // Close on Escape or click outside + prevent background scroll
  useEffect(() => {
    function closeDrawer() {
      setIsClosing(true)
      setOpen(false)
      setAboutOpen(false)
      window.setTimeout(() => setIsClosing(false), DRAWER_DURATION_MS)
    }

    function onKey(e) {
      if (e.key === 'Escape') closeDrawer()
    }

    function onClick(e) {
      if (!panelRef.current || !btnRef.current) return
      if (open && !panelRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        closeDrawer()
      }
    }

    function onBodyScrollLock() {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    onBodyScrollLock()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Close about submenu on outside click or Escape
  useEffect(() => {
    function onDocClick(e) {
      if (!aboutRef.current) return
      // Don't close if clicking inside the mobile submenu
      if (mobileSubmenuRef.current && mobileSubmenuRef.current.contains(e.target)) return
      if (!aboutRef.current.contains(e.target)) setAboutOpen(false)
    }
    function onDocKey(e) {
      if (e.key === 'Escape') setAboutOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onDocKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onDocKey)
    }
  }, [])

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  const isActive = (href) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/') || pathname.startsWith(href)
  }

  const shouldRenderDrawer = open || isClosing

  return (
    <>
    <header className="w-full left-0 right-0 sticky top-0 z-50 px-2 lg:px-20 py-3">
      <div className="mx-auto sm:px-6 lg:px-12 rounded-[100px] bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md">
        <div className="flex items-center justify-between h-23 md:h-27">
          {/* Logo */}
          <div className="flex items-center gap-3 p-1">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/img/ardorlogotrans.png" alt="Portal House" width={130} height={50} className="w-[80px] md:w-[110px] block rounded-md" />
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-6" ref={aboutRef}>
            {navLinks.map((l) => {
              if (l.label === 'About Us') {
                const submenu = [
                  { href: '/about-us', label: 'About Us' },
                  { href: '/request-a-quote', label: 'Request a Quote' },
                  // { href: '/gallery', label: 'Gallery' },
                  // { href: '/careers', label: 'Careers' }
                ]

                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => setAboutOpen(true)}
                    onMouseLeave={() => setAboutOpen(false)}
                  >
                    <button
                      aria-haspopup="menu"
                      aria-expanded={aboutOpen}
                      onClick={() => setAboutOpen(s => !s)}
                      className={`transition inline-flex items-center gap-2 ${isActive(l.href) ? 'text-[#7B542F] font-semibold' : 'text-[#7B542F] hover:text-gray-900'}`}
                    >
                      {l.label}
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.672l3.71-3.484a.75.75 0 111.04 1.08l-4.24 3.99a.75.75 0 01-1.04 0l-4.24-3.99a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    {aboutOpen && (
                      <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 z-40">
                        {submenu.map(si => (
                          <Link
                            key={si.href}
                            href={si.href}
                            className={`block px-4 py-2 text-sm ${isActive(si.href) ? 'text-[#7B542F] font-medium' : 'text-[#7B542F] hover:bg-gray-50'}`}
                          >
                            {si.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`transition ${isActive(l.href) ? 'text-[#7B542F] font-semibold' : 'text-[#7B542F] hover:text-gray-900'}`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-300">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="flex flex-col text-sm font-semibold text-gray-700">
                        {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.firstName}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <Link href="/dashboard" className="block px-4 py-2 font-medium text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-300">
                      Dashboard
                    </Link>
                    {user?.role === 'admin' || user?.role === 'staff-member' ? (
                    <Link href="/dashboard/all-programmes" className="block px-4 py-2 font-medium text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-300">
                     Manage Programmes
                    </Link>
                    ) : null}
                    <Link href="/dashboard/my-profile" className="block px-4 py-2 font-medium text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-300">
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 font-medium text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* <Link href="/login" className="px-4 py-2 text-sm font-semibold border border-purple-900 hover:border-purple-800 text-gray-900 hover:text-blue-950 rounded-md">Login</Link> */}
                <Link href="/request-a-quote" className="px-4 py-2 bg-[#7B542F] text-white rounded-md text-sm font-medium hover:bg-yellow-800">Request a Quote</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              ref={btnRef}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="relative z-20 flex items-center justify-center w-11 h-11 rounded-lg bg-white/70 backdrop-blur border border-purple-200 shadow-sm ml-[-60px]"
            >
              <Menu size={24} className="text-[#7B542F]" /> 
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile panel (animated) */}
    {shouldRenderDrawer && (
      <div ref={panelRef} className="fixed inset-0 z-50" aria-hidden={!open}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${open && !isClosing ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => {
            // close immediately with closing animation
            setAboutOpen(false)
            setIsClosing(true)
            setOpen(false)
            window.setTimeout(() => setIsClosing(false), DRAWER_DURATION_MS)
          }}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl border-l border-gray-100 transition-transform duration-220 ease-out ${open && !isClosing ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="h-full overflow-y-auto">
            {/* Drawer header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Link href="/" className="flex items-center gap-3">
                    <Image
                      src="/img/ardorlogotrans.png"
                      alt="Ador Aegis Logo"
                      width={100}
                      height={50}
                      className="w-[84px] block rounded-md"
                    />
                  </Link>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-xs font-semibold tracking-wide text-gray-500">PORTAL HOUSE</span>
                    <span className="text-sm font-bold text-[#7B542F]">Ardor Aegis</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAboutOpen(false)
                    setIsClosing(true)
                    setOpen(false)
                    window.setTimeout(() => setIsClosing(false), DRAWER_DURATION_MS)
                  }}
                  className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white/70 hover:bg-white transition"
                  aria-label="Close menu"
                >
                  <span className="text-red-600 text-2xl leading-none font-semibold">✕</span>
                </button>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-amber-50 via-white to-purple-50 p-4 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">Your safety starts with great security</p>
                <p className="text-xs text-gray-600 mt-1">Explore our services, about us or request a quote.</p>
              </div>
            </div>

            {/* Drawer nav */}
            <div className="px-4 pb-4">
              <nav className="flex flex-col space-y-2 pt-2">
                {navLinks.map((l) => {
                  if (l.label === 'About Us') {
                    const submenu = [
                      { href: '/about-us', label: 'About Us' },
                      { href: '/request-a-quote', label: 'Request a Quote' }
                    ]

                    return (
                      <div key={l.href}>
                        <button
                          onClick={() => setAboutOpen((s) => !s)}
                          className={`w-full group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition ${isActive(l.href) ? 'border-[#7B542F]/30 bg-[#7B542F]/5 text-[#7B542F]' : 'border-gray-100 bg-white hover:bg-gray-50 text-[#7B542F]'}`}
                        >
                          <span className="font-semibold">{l.label}</span>
                          <svg
                            className={`w-4 h-4 text-[#7B542F] transition-transform duration-200 ${aboutOpen ? 'rotate-180' : 'rotate-0'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path d="M5.23 7.21a.75.75 0 011.06-.02L10 10.672l3.71-3.484a.75.75 0 111.04 1.08l-4.24 3.99a.75.75 0 01-1.04 0l-4.24-3.99a.75.75 0 01-.02-1.06z" />
                          </svg>
                        </button>

                        {/* Animated submenu */}
                        <div
                          ref={mobileSubmenuRef}
                          className={`mt-1 pl-2 overflow-hidden transition-all duration-220 ease-out ${aboutOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="flex flex-col gap-1.5 pr-1">
                            {submenu.map((si) => (
                              <Link
                                key={si.href}
                                href={si.href}
                                onClick={() => {
                                  setAboutOpen(false)
                                  setIsClosing(true)
                                  setOpen(false)
                                  window.setTimeout(() => setIsClosing(false), DRAWER_DURATION_MS)
                                }}
                                className={`px-3 py-2 rounded-xl border transition ${isActive(si.href) ? 'border-blue-500/30 bg-blue-50 text-blue-700' : 'border-gray-100 bg-white hover:bg-gray-50 text-gray-700'}`}
                              >
                                <span className="font-medium text-sm">{si.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => {
                        setIsClosing(true)
                        setOpen(false)
                        window.setTimeout(() => setIsClosing(false), DRAWER_DURATION_MS)
                      }}
                      className={`block px-3 py-2.5 rounded-xl border transition ${isActive(l.href) ? 'border-[#7B542F]/30 bg-[#7B542F]/5 text-[#7B542F] font-semibold' : 'border-gray-100 bg-white hover:bg-gray-50 text-[#7B542F]'} `}
                    >
                      {l.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Drawer bottom actions */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-300">
                        {user.avatar ? (
                          <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm font-semibold text-gray-700">
                            {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => {
                        setIsClosing(true)
                        setOpen(false)
                        window.setTimeout(() => setIsClosing(false), DRAWER_DURATION_MS)
                      }}
                      className="block text-center text-gray-700 border border-[#B59C5B]/40 bg-[#B59C5B]/10 rounded-xl px-4 py-2.5 font-semibold hover:bg-blue-100 transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/my-profile"
                      onClick={() => {
                        setIsClosing(true)
                        setOpen(false)
                        window.setTimeout(() => setIsClosing(false), DRAWER_DURATION_MS)
                      }}
                      className="block text-center text-gray-700 border border-[#B59C5B]/40 bg-[#B59C5B]/10 rounded-xl px-4 py-2.5 font-semibold hover:bg-blue-100 transition"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setAboutOpen(false)
                        setIsClosing(true)
                        setOpen(false)
                        window.setTimeout(() => setIsClosing(false), DRAWER_DURATION_MS)
                      }}
                      className="block w-full bg-red-500 text-white px-4 py-2.5 rounded-xl text-center font-semibold hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/request-a-quote"
                    onClick={() => {
                      setIsClosing(true)
                      setOpen(false)
                      window.setTimeout(() => setIsClosing(false), DRAWER_DURATION_MS)
                    }}
                    className="block text-center bg-[#7B542F] text-white rounded-xl px-4 py-2.5 font-semibold hover:brightness-110 transition"
                  >
                    Request a Quote
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

