'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { ArrowLeft, Mail, Phone, Download, Edit2, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

export default function JobApplicationsComponent() {
  const router = useRouter()
  const params = useParams()
  const jobId = params.id

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchJobDetails()
    fetchApplications()
  }, [jobId, page, statusFilter])

  const fetchJobDetails = async () => {
    try {
      const res = await fetch(`/api/careers/jobs/${jobId}`)
      const data = await res.json()
      if (data.success) {
        setJob(data.job)
      }
    } catch (error) {
      console.error('Error fetching job:', error)
    }
  }

  const fetchApplications = async () => {
    try {
      setLoading(true)
      let url = `/api/careers/applications?jobId=${jobId}&page=${page}&limit=10`
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`
      }

      const res = await fetch(url)
      const data = await res.json()

      if (data.success) {
        setApplications(data.applications)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast.error('Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const res = await fetch(`/api/careers/applications/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await res.json()

      if (data.success) {
        setApplications(applications.map(app =>
          app._id === appId ? { ...app, status: newStatus } : app
        ))
        if (selectedApplication?._id === appId) {
          setSelectedApplication({ ...selectedApplication, status: newStatus })
        }
        toast.success('Status updated successfully')
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const handleDeleteApplication = async (appId) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return

    try {
      const res = await fetch(`/api/careers/applications/${appId}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (data.success) {
        setApplications(applications.filter(app => app._id !== appId))
        if (selectedApplication?._id === appId) {
          setSelectedApplication(null)
        }
        toast.success('Application deleted successfully')
      } else {
        toast.error('Failed to delete application')
      }
    } catch (error) {
      console.error('Error deleting application:', error)
      toast.error('Failed to delete application')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received':
        return 'bg-blue-100 text-blue-700'
      case 'Reviewing':
        return 'bg-yellow-100 text-yellow-700'
      case 'Shortlisted':
        return 'bg-green-100 text-green-700'
      case 'Hired':
        return 'bg-emerald-100 text-emerald-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      case 'On Hold':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard/manage-career-jobs"
            className="p-2 hover:bg-gray-200 rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Applications for {job?.title}
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and review job applications
            </p>
          </div>
        </div>

        {/* Stats */}
        {job && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{job.applicationsCount || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">Position</p>
              <p className="text-lg font-semibold text-gray-900 mt-2">{job.position || job.title}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">Department</p>
              <p className="text-lg font-semibold text-gray-900 mt-2">{job.department}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">Status</p>
              <p className={`text-lg font-semibold mt-2 ${job.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {job.status}
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
          >
            <option value="all">All Status</option>
            <option value="Received">Received</option>
            <option value="Reviewing">Reviewing</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">Loading applications...</p>
                </div>
              ) : applications.length > 0 ? (
                <>
                  <div className="divide-y divide-gray-200">
                    {applications.map((app) => (
                      <div
                        key={app._id}
                        onClick={() => setSelectedApplication(app)}
                        className={`p-4 cursor-pointer transition ${
                          selectedApplication?._id === app._id
                            ? 'bg-blue-50 border-l-4 border-blue-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{app.fullName}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                              <Mail size={14} />
                              {app.email}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                              <Phone size={14} />
                              {app.phone || 'N/A'}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              Applied: {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))}
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
                  <p className="text-gray-600">No applications found</p>
                </div>
              )}
            </div>
          </div>

          {/* Application Details */}
          {selectedApplication && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Details</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900 break-all">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedApplication.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Applied Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <select
                    value={selectedApplication.status}
                    onChange={(e) => handleStatusChange(selectedApplication._id, e.target.value)}
                    className={`w-full mt-2 px-3 py-2 rounded-lg border font-semibold ${getStatusColor(selectedApplication.status)}`}
                  >
                    <option value="Received">Received</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              {selectedApplication.message && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Message</p>
                  <p className="text-gray-900 text-sm whitespace-pre-wrap">{selectedApplication.message}</p>
                </div>
              )}

              {selectedApplication.adminNotes && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Admin Notes</p>
                  <p className="text-gray-900 text-sm whitespace-pre-wrap">{selectedApplication.adminNotes}</p>
                </div>
              )}

              {selectedApplication.rating && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Rating</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < selectedApplication.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteApplication(selectedApplication._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-medium"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
