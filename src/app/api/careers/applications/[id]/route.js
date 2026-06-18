import { NextResponse } from 'next/server'
import { connectDB } from '@/app/server/db/connect'
import JobApplication from '@/app/server/models/JobApplication'
import nodemailer from 'nodemailer'

export async function GET(req, { params }) {
  try {
    await connectDB()

    const { id } = params

    const application = await JobApplication.findById(id).populate('job')

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, application },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch application', error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB()

    const { id } = params
    const body = await req.json()
    const { status, adminNotes, rating } = body

    const updateData = {}
    if (status) updateData.status = status
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes
    if (rating !== undefined) updateData.rating = rating

    const application = await JobApplication.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('job')

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Application updated successfully', application },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update application', error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB()

    const { id } = params

    const application = await JobApplication.findByIdAndDelete(id)

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Application deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete application', error: error.message },
      { status: 500 }
    )
  }
}
