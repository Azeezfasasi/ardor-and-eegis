"use client"
import { useState, useEffect, useRef } from 'react'
import { MapPin, Briefcase, Clock, ChevronDown, ChevronUp, X } from 'lucide-react'

export default function JobListings() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [expandedJob, setExpandedJob] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [applicationModal, setApplicationModal] = useState({ isOpen: false, job: null })
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    experience: '',
    linkedinUrl: ''
  })
  const [submitting, setSubmitting] = useState(false)

  // Default job listings
  const DEFAULT_JOBS = [
    {
      _id: '1',
      title: 'Senior Security Analyst',
      department: 'Security',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      level: 'Senior',
      salary: 'Competitive',
      postedDate: '2 weeks ago',
      description: 'We are looking for an experienced Security Analyst to lead our security initiatives and protect our critical infrastructure.',
      requirements: [
        '5+ years of security analysis experience',
        'Strong knowledge of cybersecurity frameworks',
        'Experience with SIEM tools and threat detection',
        'Relevant certifications (CISSP, CEH preferred)',
        'Excellent problem-solving skills'
      ],
      benefits: ['Health Insurance', 'Professional Development', 'Flexible Hours', 'Remote Work Options']
    }
  ]

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/careers/jobs')
        if (response.ok) {
          const data = await response.json()
          setJobs(data.jobs || DEFAULT_JOBS)
        } else {
          setJobs(DEFAULT_JOBS)
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
        setJobs(DEFAULT_JOBS)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const departments = ['all', ...new Set(jobs.map(job => job.department))]
  
  const filteredJobs = selectedDepartment === 'all'
    ? jobs
    : jobs.filter(job => job.department === selectedDepartment)

  const openApplicationModal = (job) => {
    setApplicationModal({ isOpen: true, job })
  }

  const closeApplicationModal = () => {
    setApplicationModal({ isOpen: false, job: null })
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
      experience: '',
      linkedinUrl: ''
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0]
    setFormData(prev => ({ ...prev, resume: file }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('jobId', applicationModal.job._id)
      formDataToSend.append('jobTitle', applicationModal.job.title)
      formDataToSend.append('fullName', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('coverLetter', formData.coverLetter)
      formDataToSend.append('experience', formData.experience)
      formDataToSend.append('linkedinUrl', formData.linkedinUrl)
      
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume)
      }

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        alert('Application submitted successfully! We will review your application and contact you soon.')
        closeApplicationModal()
      } else {
        alert('Failed to submit application. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('An error occurred while submitting your application.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} id="job-listings" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Open Positions
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore opportunities to join our growing team
          </p>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedDepartment === dept
                    ? 'bg-gradient-to-r from-[#7b542f] to-[#7b542f] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading positions...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div
                key={job._id}
                className={`border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:border-[#7b542f] ${
                  inView ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{
                  animationDelay: inView ? `${index * 100}ms` : '0ms'
                }}
              >
                <button
                  onClick={() => setExpandedJob(expandedJob === job._id ? null : job._id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {job.type}
                      </div>
                      <span className="px-3 py-1 bg-[#7b542f]/10 text-[#7b542f] rounded-full text-xs font-semibold">
                        {job.level}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedJob === job._id ? (
                      <ChevronUp className="text-[#7b542f]" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={24} />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {expandedJob === job._id && (
                  <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">About the Role</h4>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {job.description}
                        </p>

                        <h4 className="font-bold text-gray-900 mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <span className="text-[#7b542f] font-bold mt-0.5">✓</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">What We Offer</h4>
                        <ul className="space-y-2 mb-6">
                          {job.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-700">
                              <span className="w-2 h-2 bg-[#7b542f] rounded-full"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                          <p className="text-sm text-gray-600 mb-2">Salary Range</p>
                          <p className="text-lg font-bold text-gray-900">{job.salary}</p>
                        </div>

                        <a
                          onClick={() => openApplicationModal(job)}
                          className="block w-full px-4 py-3 bg-gradient-to-r from-[#7b542f] to-[#7b542f] text-white rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-[#7b542f]/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No positions available in this category at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for new opportunities!</p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Don't see the right position?</p>
          <p className="text-lg font-semibold text-gray-900 mb-6">
            Send us your CV and let's explore opportunities together.
          </p>
          <a
            href="mailto:careers@ardoraegis.org"
            className="inline-block px-8 py-3 border-2 border-[#7b542f] text-[#7b542f] rounded-lg font-semibold hover:bg-[#7b542f]/10 transition-all duration-300"
          >
            Send Your CV
          </a>
        </div>

        {/* Application Modal */}
        {applicationModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#7b542f] to-[#7b542f] text-white p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{applicationModal.job?.title}</h3>
                  <p className="text-[#7b542f]/20">{applicationModal.job?.department}</p>
                </div>
                <button
                  onClick={closeApplicationModal}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/10"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/10"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/10"
                    placeholder="+234 (0) 1234567890"
                  />
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/10"
                    placeholder="e.g., 5 years in Security"
                  />
                </div>

                {/* LinkedIn URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/10"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Upload Resume *
                  </label>
                  <input
                    type="file"
                    onChange={handleResumeChange}
                    required
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/10"
                  />
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleFormChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7b542f] focus:ring-2 focus:ring-[#7b542f]/10"
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeApplicationModal}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#7b542f] to-[#7b542f] text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
