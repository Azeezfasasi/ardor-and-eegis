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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Career Jobs Management</h1>
            <p className="text-gray-600 mt-2">Create and manage job listings for your organization</p>
          </div>
          <Link
            href="/dashboard/manage-career-jobs/create"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            Add New Job
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by title or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value)
                setPage(1)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Title</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Department</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Location</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Applications</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{job.title}</p>
                          <p className="text-sm text-gray-600">{job.level}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{job.department}</td>
                        <td className="px-6 py-4 text-gray-700">{job.location}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleStatusToggle(job._id, job.status)}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition ${
                              job.status === 'Active'
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : job.status === 'Inactive'
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {job.status === 'Active' ? <Eye size={16} /> : <EyeOff size={16} />}
                            {job.status}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            {job.applicationsCount || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/dashboard/manage-career-jobs/${job._id}`}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </Link>
                            <Link
                              href={`/dashboard/manage-career-jobs/${job._id}/applications`}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                              title="View Applications"
                            >
                              <Eye size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(job._id, job.title)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <p className="text-gray-600 text-sm">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
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
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
