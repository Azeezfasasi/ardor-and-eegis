import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { connectDB } from '@/app/server/db/connect'
import JobApplication from '@/app/server/models/JobApplication'
import CareerJob from '@/app/server/models/CareerJob'
import { sendEmailViaBrevo } from '@/app/server/utils/brevoEmailService'
import { getAllAdminEmails } from '@/app/server/utils/adminNotifications'
import * as emailTemplates from '@/app/server/utils/emailTemplates'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  try {
    await connectDB()

    const formData = await request.formData()
    
    const fullName = formData.get('fullName')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const jobTitle = formData.get('jobTitle')
    const coverLetter = formData.get('coverLetter')
    const jobId = formData.get('jobId')
    const experience = formData.get('experience')
    const linkedinUrl = formData.get('linkedinUrl')
    const resume = formData.get('resume')

    // Validation
    if (!fullName || !email || !jobTitle || !coverLetter) {
      return NextResponse.json({
        success: false,
        error: 'Please provide all required fields'
      }, {
        status: 400
      })
    }

    if (!resume) {
      return NextResponse.json({
        success: false,
        error: 'Resume is required'
      }, {
        status: 400
      })
    }

    // Upload resume to Cloudinary
    let resumeUrl = null
    try {
      const bytes = await resume.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'career-applications',
            resource_type: 'auto',
            public_id: `${Date.now()}-${resume.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        stream.end(buffer)
      })
      
      resumeUrl = result.secure_url
    } catch (uploadError) {
      console.error('Resume upload error:', uploadError)
      // Continue without resume URL - it's not critical
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
      position: jobTitle,
      message: coverLetter || '',
      experience: experience || '',
      linkedinUrl: linkedinUrl || '',
      resumeUrl: resumeUrl || '',
      job: findJobId,
      status: 'Received'
    }

    const application = await JobApplication.create(applicationData)

    // Update job applications count if job exists
    if (findJobId) {
      await CareerJob.findByIdAndUpdate(findJobId, { $inc: { applicationsCount: 1 } })
    }

    // Send emails via Brevo
    try {
      // 1. Send confirmation email to candidate
      const candidateEmailContent = emailTemplates.jobApplicationConfirmationEmail(
        fullName,
        jobTitle,
        new Date()
      )
      
      await sendEmailViaBrevo({
        to: email,
        subject: `Application Received - ${jobTitle} Position`,
        htmlContent: candidateEmailContent,
      })

      // 2. Send notification to all admins
      const adminEmails = await getAllAdminEmails()
      if (adminEmails && adminEmails.length > 0) {
        const adminEmailContent = emailTemplates.adminNewJobApplicationEmail(
          fullName,
          email,
          jobTitle,
          experience,
          linkedinUrl,
          resumeUrl,
          new Date()
        )

        // Send to each admin
        for (const adminEmail of adminEmails) {
          try {
            await sendEmailViaBrevo({
              to: adminEmail,
              subject: `New Job Application - ${jobTitle} from ${fullName}`,
              htmlContent: adminEmailContent,
            })
            console.log(`✓ Admin notification sent to: ${adminEmail}`)
          } catch (adminEmailError) {
            console.error(`✗ Failed to send admin email to ${adminEmail}:`, adminEmailError.message)
          }
        }
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError.message)
      // Continue without failing - emails are not critical for application submission
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
