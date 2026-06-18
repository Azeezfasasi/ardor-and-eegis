'use client'
import { useState, useEffect } from 'react'
import { Edit2, Trash2, Plus, Eye, EyeOff, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ManageCareerJobsComponent() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDept, setSelectedDept] = useState('all')
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    fetchJobs()
  }, [page, selectedStatus, selectedDept])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      let url = `/api/careers/jobs?page=${page}&limit=10&admin=true`
      
      if (selectedStatus !== 'all') url += `&status=${selectedStatus}`
      if (selectedDept !== 'all') url += `&department=${selectedDept}`

      const res = await fetch(url)
      const data = await res.json()

      if (data.success) {
        setJobs(data.jobs)
        setTotalPages(data.pagination.totalPages)
        
        // Extract unique departments
        const depts = [...new Set(data.jobs.map(job => job.department))]
        setDepartments(depts)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      toast.error('Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/careers/jobs/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (data.success) {
        setJobs(jobs.filter(job => job._id !== id))
        toast.success('Job deleted successfully')
      } else {
        toast.error(data.message || 'Failed to delete job')
      }
    } catch (error) {
      console.error('Error deleting job:', error)
      toast.error('Failed to delete job')
    }
  }

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'

    try {
      const res = await fetch(`/api/careers/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await res.json()

      if (data.success) {
        setJobs(jobs.map(job => job._id === id ? { ...job, status: newStatus } : job))
        toast.success(`Job ${newStatus}`)
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Career Jobs Management</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Create and manage job listings for your organization</p>
          </div>
          <Link
            href="/dashboard/manage-career-jobs/create"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#7b542f] to-[#7b542f] text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            <span>Add New Job</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 md:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Search by title or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b542f]"
            />

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value)
                setPage(1)
              }}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b542f]"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value)
                setPage(1)
              }}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b542f]"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Jobs Table - Desktop View */}
        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm text-gray-700">Title</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm text-gray-700">Department</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm text-gray-700">Location</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm text-gray-700">Status</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm text-gray-700">Applications</th>
                      <th className="px-4 lg:px-6 py-3 lg:py-4 text-left font-semibold text-sm text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-4 lg:px-6 py-4">
                          <p className="font-semibold text-gray-900 text-sm">{job.title}</p>
                          <p className="text-xs text-gray-600">{job.level}</p>
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-gray-700 text-sm">{job.department}</td>
                        <td className="px-4 lg:px-6 py-4 text-gray-700 text-sm">{job.location}</td>
                        <td className="px-4 lg:px-6 py-4">
                          <button
                            onClick={() => handleStatusToggle(job._id, job.status)}
                            className={`flex items-center gap-1 px-2 lg:px-3 py-1 rounded-full text-xs font-semibold transition ${
                              job.status === 'Active'
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : job.status === 'Inactive'
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {job.status === 'Active' ? <Eye size={14} /> : <EyeOff size={14} />}
                            {job.status}
                          </button>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <span className="px-2 lg:px-3 py-1 bg-[#7b542f] text-white rounded-full text-xs font-semibold">
                            {job.applicationsCount || 0}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <div className="flex items-center gap-1 lg:gap-2">
                            <Link
                              href={`/dashboard/manage-career-jobs/${job._id}`}
                              className="p-1.5 lg:p-2 text-[#7b542f] hover:bg-[#7b542f]/10 rounded-lg transition"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </Link>
                            <Link
                              href={`/dashboard/manage-career-jobs/${job._id}/applications`}
                              className="p-1.5 lg:p-2 text-[#7b542f] hover:bg-[#7b542f]/10 rounded-lg transition"
                              title="View Applications"
                            >
                              <Eye size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(job._id, job.title)}
                              className="p-1.5 lg:p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600 text-xs sm:text-sm">
                  Page {page} of {totalPages}
                </p>
                <div className="w-full sm:w-auto flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-600 text-lg mb-4">No jobs found</p>
              <Link
                href="/dashboard/manage-career-jobs/create"
                className="inline-block px-6 py-2 bg-[#7b542f] text-white rounded-lg hover:bg-[#7b542f]/90 transition text-sm"
              >
                Create First Job
              </Link>
            </div>
          )}
        </div>

        {/* Jobs Card View - Mobile/Tablet */}
        <div className="md:hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <>
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job._id} className="bg-white rounded-lg shadow-md p-4">
                    {/* Card Header */}
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{job.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{job.level}</p>
                      </div>
                      <button
                        onClick={() => handleStatusToggle(job._id, job.status)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                          job.status === 'Active'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : job.status === 'Inactive'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {job.status === 'Active' ? <Eye size={12} /> : <EyeOff size={12} />}
                        {job.status}
                      </button>
                    </div>

                    {/* Card Details */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xs text-gray-600">Department:</p>
                        <p className="text-xs font-medium text-gray-900">{job.department}</p>
                      </div>
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xs text-gray-600">Location:</p>
                        <p className="text-xs font-medium text-gray-900">{job.location}</p>
                      </div>
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xs text-gray-600">Applications:</p>
                        <span className="px-2 py-0.5 bg-[#7b542f] text-white rounded-full text-xs font-semibold">
                          {job.applicationsCount || 0}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/manage-career-jobs/${job._id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#7b542f] text-white rounded-lg hover:bg-[#7b542f]/90 transition text-xs font-medium"
                      >
                        <Edit2 size={14} />
                        Edit
                      </Link>
                      <Link
                        href={`/dashboard/manage-career-jobs/${job._id}/applications`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#7b542f] text-white rounded-lg hover:bg-[#7b542f]/90 transition text-xs font-medium"
                      >
                        <Eye size={14} />
                        Apps
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id, job.title)}
                        className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Pagination */}
              <div className="mt-6 flex flex-col items-center gap-4">
                <p className="text-gray-600 text-xs sm:text-sm">
                  Page {page} of {totalPages}
                </p>
                <div className="w-full flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-600 text-sm mb-4">No jobs found</p>
              <Link
                href="/dashboard/manage-career-jobs/create"
                className="inline-block px-6 py-2 bg-[#7b542f] text-white rounded-lg hover:bg-[#7b542f]/90 transition text-sm"
              >
                Create First Job
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
