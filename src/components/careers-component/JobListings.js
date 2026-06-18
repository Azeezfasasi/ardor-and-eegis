"use client"
import { useState, useEffect, useRef } from 'react'
import { MapPin, Briefcase, Clock, ChevronDown, ChevronUp } from 'lucide-react'

export default function JobListings() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [expandedJob, setExpandedJob] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

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
    },
    {
      _id: '2',
      title: 'Civil Engineer',
      department: 'Engineering',
      location: 'Abuja, Nigeria',
      type: 'Full-time',
      level: 'Mid-level',
      salary: 'Competitive',
      postedDate: '1 week ago',
      description: 'Join our engineering team to design and oversee construction projects that shape our future infrastructure.',
      requirements: [
        'Bachelor\'s degree in Civil Engineering',
        '3+ years of project experience',
        'Proficiency in CAD and project management tools',
        'Strong understanding of building codes and regulations',
        'Excellent communication skills'
      ],
      benefits: ['Health Insurance', 'Performance Bonus', 'Professional Development', 'Team Building Activities']
    },
    {
      _id: '3',
      title: 'Network Infrastructure Specialist',
      department: 'Engineering',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      level: 'Mid-level',
      salary: 'Competitive',
      postedDate: '3 days ago',
      description: 'Design and maintain robust network infrastructure solutions for our clients across various industries.',
      requirements: [
        '4+ years of network infrastructure experience',
        'Expertise in routing, switching, and firewalls',
        'Knowledge of cloud networking (AWS/Azure preferred)',
        'Vendor certifications (Cisco, Juniper, or equivalent)',
        'Strong documentation and troubleshooting skills'
      ],
      benefits: ['Health Insurance', 'Training Budget', 'Competitive Salary', 'Career Growth']
    },
    {
      _id: '4',
      title: 'Customer Success Manager',
      department: 'Business',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      level: 'Mid-level',
      salary: 'Competitive',
      postedDate: '5 days ago',
      description: 'Build lasting relationships with our clients and ensure they achieve their goals with our solutions.',
      requirements: [
        '3+ years of customer success or account management experience',
        'Excellent communication and interpersonal skills',
        'Problem-solving and organizational abilities',
        'Experience with CRM software',
        'Track record of achieving customer satisfaction goals'
      ],
      benefits: ['Performance Bonus', 'Health Insurance', 'Flexible Schedule', 'Professional Development']
    },
    {
      _id: '5',
      title: 'Project Manager',
      department: 'Operations',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      level: 'Senior',
      salary: 'Competitive',
      postedDate: '1 week ago',
      description: 'Lead complex projects from inception to completion, ensuring timely delivery and client satisfaction.',
      requirements: [
        'PMP or PRINCE2 certification',
        '5+ years of project management experience',
        'Expertise in managing multi-disciplinary teams',
        'Strong risk management and stakeholder management skills',
        'Proficiency in project management software'
      ],
      benefits: ['Health Insurance', 'Performance Bonus', 'Professional Development', 'Flexible Work']
    },
    {
      _id: '6',
      title: 'Systems Administrator',
      department: 'IT',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      level: 'Entry-level',
      salary: 'Competitive',
      postedDate: '4 days ago',
      description: 'Support and maintain our IT infrastructure to ensure smooth operations across all departments.',
      requirements: [
        'Bachelor\'s degree in IT or related field',
        '2+ years of systems administration experience',
        'Knowledge of Windows and Linux environments',
        'Experience with Active Directory and Group Policy',
        'Strong troubleshooting and support skills'
      ],
      benefits: ['Health Insurance', 'Training Opportunities', 'Mentorship Program', 'Career Path']
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
                          href="#apply-now"
                          className="block w-full px-4 py-3 bg-gradient-to-r from-[#7b542f] to-[#7b542f] text-white rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-[#7b542f]/50 transition-all duration-300 transform hover:scale-105"
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
            href="mailto:careers@adoraegis.org"
            className="inline-block px-8 py-3 border-2 border-[#7b542f] text-[#7b542f] rounded-lg font-semibold hover:bg-[#7b542f]/10 transition-all duration-300"
          >
            Send Your CV
          </a>
        </div>
      </div>
    </section>
  )
}
