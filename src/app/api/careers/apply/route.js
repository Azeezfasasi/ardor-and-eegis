import { NextResponse } from 'next/server'
import { connectDB } from '@/app/server/db/connect'
import JobApplication from '@/app/server/models/JobApplication'
import CareerJob from '@/app/server/models/CareerJob'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    await connectDB()

    const formData = await request.formData()
    
    const fullName = formData.get('fullName')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const position = formData.get('position')
    const message = formData.get('message')
    const jobId = formData.get('jobId')
    const resume = formData.get('resume')

    // Validation
    if (!fullName || !email || !position) {
      return NextResponse.json({
        success: false,
        error: 'Please provide all required fields'
      }, {
        status: 400
      })
    }

    // Find the job or create application without job reference
    let findJobId = null
    if (jobId) {
      const job = await CareerJob.findById(jobId)
      if (job) {
        findJobId = jobId
      }
    }

    // Create application
    const applicationData = {
      fullName,
      email,
      phone: phone || '',
      position,
      message: message || '',
      job: findJobId,
      status: 'Received'
    }

    const application = await JobApplication.create(applicationData)

    // Update job applications count if job exists
    if (findJobId) {
      await CareerJob.findByIdAndUpdate(findJobId, { $inc: { applicationsCount: 1 } })
    }

    // Try to send email notifications
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      })

      // Email to HR
      const applicationDetails = `
        <h2>New Career Application Received</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No additional message'}</p>
        <hr>
        <p>Resume/CV: ${resume ? 'Attached' : 'Not attached'}</p>
      `

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'careers@adoraegis.org',
        subject: `New Application: ${position} from ${fullName}`,
        html: applicationDetails,
      })

      // Email to applicant
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Application Received - Ardor Aegis Limited',
        html: `
          <h2>Thank You for Your Application!</h2>
          <p>Dear ${fullName},</p>
          <p>We have received your application for the position of <strong>${position}</strong>.</p>
          <p>Our HR team will review your application and get back to you within 2-3 business days.</p>
          <p>We appreciate your interest in Ardor Aegis Limited!</p>
          <br>
          <p>Best regards,<br>Ardor Aegis Limited HR Team</p>
        `,
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      application
    })
  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to submit application'
    }, {
      status: 500
    })
  }
}
