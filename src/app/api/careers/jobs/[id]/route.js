import { NextResponse } from 'next/server'
import { connectDB } from '@/app/server/db/connect'
import CareerJob from '@/app/server/models/CareerJob'

export async function GET(req, { params }) {
  try {
    await connectDB()

    const { id } = params

    const job = await CareerJob.findById(id).populate('createdBy', 'firstName lastName email')

    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, job },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching career job:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch job', error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB()

    const { id } = params
    const body = await req.json()

    const job = await CareerJob.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('createdBy', 'firstName lastName email')

    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Job updated successfully', job },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating career job:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update job', error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB()

    const { id } = params

    const job = await CareerJob.findByIdAndDelete(id)

    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Job deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting career job:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete job', error: error.message },
      { status: 500 }
    )
  }
}
