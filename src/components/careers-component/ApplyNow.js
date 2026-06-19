"use client"
import { useRef, useState, useEffect } from 'react'
import { Mail, Send, MapPin, Phone } from 'lucide-react'

export default function ApplyNow() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resume: null
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.keys(formData).forEach(key => {
        if (key === 'resume' && formData[key]) {
          formDataToSend.append(key, formData[key])
        } else if (key !== 'resume') {
          formDataToSend.append(key, formData[key])
        }
      })

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          message: '',
          resume: null
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        // Fallback: Direct email submission indication
        alert('Thank you for your application! Please send your resume to careers@adoraegis.org if you have any issues.')
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Thank you for your interest! Please email careers@adoraegis.org with your CV and details.')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} id="apply-now" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Ready to Apply?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Submit your application and let's explore the perfect opportunity for you at Ardor Aegis Security Company Limited.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className={`bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 ${
            inView ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#7b542f] to-[#7b542f] flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Email</h3>
            </div>
            <a
              href="mailto:careers@ardoraegis.org"
              className="text-[#7b542f] font-semibold hover:text-[#7b542f]/80 transition-colors"
            >
              careers@ardoraegis.org
            </a>
            <p className="text-gray-600 text-sm mt-3">
              Send us your CV and details directly
            </p>
          </div>

          <div className={`bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 ${
            inView ? 'animate-fadeInUp' : 'opacity-0'
          }`}
          style={{ animationDelay: inView ? '100ms' : '0ms' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#7b542f] to-[#7b542f] flex items-center justify-center">
                <MapPin className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Location</h3>
            </div>
            <p className="text-gray-700 font-semibold">Ardor Aegis Limited</p>
            <p className="text-gray-600 text-sm mt-3">
              Plot 104, House 3, Tos Douglas Kaura District, Abuja, Nigeria
            </p>
          </div>

          <div className={`bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 ${
            inView ? 'animate-fadeInUp' : 'opacity-0'
          }`}
          style={{ animationDelay: inView ? '200ms' : '0ms' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#7b542f] to-[#7b542f] flex items-center justify-center">
                <Send className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Response</h3>
            </div>
            <p className="text-gray-700 font-semibold">Quick Feedback</p>
            <p className="text-gray-600 text-sm mt-3">
              We review applications promptly
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className={`bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 ${
          inView ? 'animate-fadeInUp' : 'opacity-0'
        }`}
        style={{ animationDelay: inView ? '300ms' : '0ms' }}>
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Application Submitted!
              </h3>
              <p className="text-gray-600 mb-4">
                Thank you for your interest in Ardor Aegis. We've received your application and will review it shortly.
              </p>
              <p className="text-gray-600">
                Our HR team will reach out to you within the next 2-3 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/20 transition-all"
                    placeholder="+234 (0) 123 456 7890"
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Position Applying For *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/20 transition-all"
                    placeholder="e.g., Senior Security Analyst"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter / Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/20 transition-all resize-none"
                  placeholder="Tell us why you'd be a great fit for Ardor Aegis..."
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Resume / CV (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#7b542f] transition-colors">
                    <div className="flex flex-col items-center justify-center">
                      <Send className="text-gray-400 mb-2" size={24} />
                      <p className="text-gray-600 font-semibold">
                        {formData.resume ? formData.resume.name : 'Drag or click to upload'}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        PDF or DOC (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-3 bg-gradient-to-r from-[#7b542f] to-[#7b542f] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#7b542f]/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>

              {/* Alternative */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Prefer to send directly? Email us at{' '}
                  <a
                    href="mailto:careers@ardoraegis.org"
                    className="text-[#7b542f] font-semibold hover:text-[#7b542f]/80"
                  >
                    careers@ardoraegis.org
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg mb-3">
            Didn't find a suitable position? Don't worry!
          </p>
          <p className="text-gray-500">
            We're always looking for talented individuals. Send us your CV anyway, and we'll keep it on file for future opportunities.
          </p>
        </div>
      </div>
    </section>
  )
}
