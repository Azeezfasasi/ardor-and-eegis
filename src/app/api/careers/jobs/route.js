import { NextResponse } from 'next/server'
import { connectDB } from '@/app/server/db/connect'
import CareerJob from '@/app/server/models/CareerJob'
import User from '@/app/server/models/User'

export async function GET(req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const department = searchParams.get('department')
    const limit = parseInt(searchParams.get('limit')) || 10
    const page = parseInt(searchParams.get('page')) || 1

    let query = {}

    // Only show active jobs to public, but admins can see all
    if (!searchParams.get('admin')) {
      query.status = 'Active'
    }

    if (status) query.status = status
    if (department) query.department = department

    const skip = (page - 1) * limit

    const jobs = await CareerJob.find(query)
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const totalCount = await CareerJob.countDocuments(query)
    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json(
      {
        success: true,
        jobs,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching career jobs:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch career jobs',
        error: error.message,
      },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    await connectDB()

    const body = await req.json()
    const { title, department, location, type, level, salary, description, requirements, benefits, closingDate, createdBy } = body

    // Validation
    if (!title || !department || !location || !description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide all required fields',
        },
        { status: 400 }
      )
    }

    // Verify user exists (optional)
    if (createdBy) {
      const user = await User.findById(createdBy)
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        )
      }
    }

    const newJob = await CareerJob.create({
      title,
      department,
      location,
      type: type || 'Full-time',
      level: level || 'Mid-level',
      salary: salary || 'Competitive',
      description,
      requirements: requirements || [],
      benefits: benefits || [],
      closingDate,
      createdBy,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Job created successfully',
        job: newJob,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating career job:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create career job',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
