import { NextResponse } from 'next/server'
import { connectDB } from '@/app/server/db/connect'
import JobApplication from '@/app/server/models/JobApplication'
import CareerJob from '@/app/server/models/CareerJob'
import nodemailer from 'nodemailer'

export async function GET(req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const jobId = searchParams.get('jobId')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit')) || 20
    const page = parseInt(searchParams.get('page')) || 1

    let query = {}

    if (jobId) query.job = jobId
    if (status) query.status = status

    const skip = (page - 1) * limit

    const applications = await JobApplication.find(query)
      .populate('job', 'title department location')
      .sort({ appliedDate: -1 })
      .skip(skip)
      .limit(limit)

    const totalCount = await JobApplication.countDocuments(query)
    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json(
      {
        success: true,
        applications,
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
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch applications',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
