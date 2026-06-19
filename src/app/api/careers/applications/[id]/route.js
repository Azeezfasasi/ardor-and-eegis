import { NextResponse } from 'next/server'
import { connectDB } from '@/app/server/db/connect'
import JobApplication from '@/app/server/models/JobApplication'
import { sendEmailViaBrevo } from '@/app/server/utils/brevoEmailService'
import { getAllAdminEmails } from '@/app/server/utils/adminNotifications'
import * as emailTemplates from '@/app/server/utils/emailTemplates'
import nodemailer from 'nodemailer'

export async function GET(req, { params }) {
  try {
    await connectDB()

    const { id } = await params

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

    const { id } = await params
    const body = await req.json()
    const { status, adminNotes, rating } = body

    // Get the current application to check if status changed
    const currentApplication = await JobApplication.findById(id).populate('job')
    
    if (!currentApplication) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      )
    }

    const oldStatus = currentApplication.status
    const statusChanged = status && status !== oldStatus

    // Update the application
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

    // Send emails if status changed
    if (statusChanged) {
      try {
        const candidateName = application.fullName
        const candidateEmail = application.email
        const jobTitle = application.position
        const newStatus = application.status

        // Determine which email template to use based on new status
        let candidateEmailContent = null
        
        switch (newStatus) {
          case 'Reviewing':
            candidateEmailContent = emailTemplates.jobApplicationReviewingEmail(candidateName, jobTitle)
            break
          case 'Shortlisted':
            candidateEmailContent = emailTemplates.jobApplicationShortlistedEmail(candidateName, jobTitle)
            break
          case 'Rejected':
            candidateEmailContent = emailTemplates.jobApplicationRejectedEmail(candidateName, jobTitle)
            break
          case 'Hired':
            candidateEmailContent = emailTemplates.jobApplicationHiredEmail(candidateName, jobTitle)
            break
          case 'On Hold':
            candidateEmailContent = emailTemplates.jobApplicationOnHoldEmail(candidateName, jobTitle)
            break
        }

        // Send email to candidate
        if (candidateEmailContent) {
          try {
            await sendEmailViaBrevo({
              to: candidateEmail,
              subject: `Application Status Update - ${jobTitle}`,
              htmlContent: candidateEmailContent,
            })
            console.log(`✓ Candidate email sent for status change: ${newStatus}`)
          } catch (candidateEmailError) {
            console.error('Error sending candidate email:', candidateEmailError.message)
          }
        }

        // Send notification to all admins
        try {
          const adminEmails = await getAllAdminEmails()
          if (adminEmails && adminEmails.length > 0) {
            const adminEmailContent = emailTemplates.adminApplicationStatusChangedEmail(
              candidateName,
              candidateEmail,
              jobTitle,
              oldStatus,
              newStatus,
              new Date()
            )

            for (const adminEmail of adminEmails) {
              try {
                await sendEmailViaBrevo({
                  to: adminEmail,
                  subject: `Application Status Changed - ${candidateName} (${jobTitle})`,
                  htmlContent: adminEmailContent,
                })
                console.log(`✓ Admin notification sent to: ${adminEmail}`)
              } catch (adminEmailError) {
                console.error(`✗ Failed to send admin email to ${adminEmail}:`, adminEmailError.message)
              }
            }
          }
        } catch (adminEmailError) {
          console.error('Error sending admin emails:', adminEmailError.message)
        }
      } catch (emailError) {
        console.error('Error in status change email process:', emailError.message)
        // Continue without failing - email errors shouldn't prevent status update
      }
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

    const { id } = await params

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
