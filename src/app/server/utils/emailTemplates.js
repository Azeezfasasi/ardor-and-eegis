/**
 * Email Templates for Ardor Aegis
 * All email templates with professional styling and brand colors
 */

const BRAND_COLOR = '#7B542F';
const BRAND_NAME = 'Ardor Aegis Security Company Limited';
const WEBSITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Base email template wrapper with header and footer
 */
const createEmailTemplate = (content, title = '') => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f5f5;
          line-height: 1.6;
          color: #333;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background-color: ${BRAND_COLOR};
          color: white;
          padding: 30px;
          text-align: center;
          border-bottom: 5px solid #5a3a1f;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 600;
          margin: 0;
        }
        .header p {
          font-size: 14px;
          margin-top: 5px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
          background-color: #fafafa;
        }
        .content h2 {
          color: ${BRAND_COLOR};
          font-size: 22px;
          margin-bottom: 15px;
          font-weight: 600;
        }
        .content p {
          margin-bottom: 15px;
          line-height: 1.7;
          font-size: 14px;
        }
        .content a {
          color: ${BRAND_COLOR};
          text-decoration: none;
          font-weight: 600;
        }
        .content a:hover {
          text-decoration: underline;
        }
        .button {
          display: inline-block;
          background-color: ${BRAND_COLOR};
          color: white !important;
          padding: 12px 30px;
          border-radius: 5px;
          text-decoration: none !important;
          font-weight: 600;
          margin: 20px 0;
          font-size: 14px;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #5a3a1f;
          text-decoration: none !important;
        }
        .info-box {
          background-color: #fff;
          border-left: 4px solid ${BRAND_COLOR};
          padding: 15px;
          margin: 20px 0;
          border-radius: 3px;
        }
        .info-box strong {
          color: ${BRAND_COLOR};
        }
        .footer {
          background-color: #333;
          color: #aaa;
          text-align: center;
          padding: 30px;
          font-size: 12px;
          border-top: 3px solid ${BRAND_COLOR};
        }
        .footer a {
          color: ${BRAND_COLOR};
          text-decoration: none;
        }
        .footer p {
          margin-bottom: 10px;
        }
        .divider {
          height: 1px;
          background-color: #ddd;
          margin: 30px 0;
        }
        .highlight {
          color: ${BRAND_COLOR};
          font-weight: 600;
        }
        .text-center {
          text-align: center;
        }
        .greeting {
          font-size: 16px;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>${BRAND_NAME}</h1>
          ${title ? `<p>${title}</p>` : ''}
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
          <p>
            <a href="${WEBSITE_URL}">Visit our website</a> | 
            <a href="mailto:info@ardoraegis.org">Contact us</a>
          </p>
          <p style="margin-top: 15px; opacity: 0.8;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// ============================================
// 1. FORGOT PASSWORD EMAIL
// ============================================
export const forgotPasswordEmail = (firstName, resetLink) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${firstName}</span>,</p>
    
    <p>We received a request to reset your password. Click the button below to create a new password.</p>
    
    <p style="text-align: center;">
      <a href="${resetLink}" class="button">Reset Your Password</a>
    </p>
    
    <p>This link will expire in 24 hours for your security.</p>
    
    <div class="info-box">
      <strong>Didn't request this?</strong><br>
      If you didn't request a password reset, you can safely ignore this email. Your account will remain secure.
    </div>
    
    <p style="margin-top: 30px; font-size: 13px; color: #666;">
      If the button doesn't work, copy and paste this link in your browser:<br>
      <a href="${resetLink}">${resetLink}</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'Password Reset Request');
};

// ============================================
// 2. PASSWORD RESET SUCCESSFUL EMAIL
// ============================================
export const passwordResetSuccessEmail = (firstName) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${firstName}</span>,</p>
    
    <p>Your password has been successfully reset! You can now log in with your new password.</p>
    
    <p style="text-align: center;">
      <a href="${WEBSITE_URL}/login" class="button">Go to Login</a>
    </p>
    
    <div class="info-box">
      <strong>Security tip:</strong> Make sure your new password is strong and unique. Never share your password with anyone.
    </div>
    
    <p style="margin-top: 20px; font-size: 13px; color: #666;">
      If you didn't make this change or have concerns about your account security, please contact us immediately.
    </p>
  `;
  
  return createEmailTemplate(content, 'Password Reset Successful');
};

// ============================================
// 3. ADMIN NOTIFICATION - PASSWORD RESET
// ============================================
export const adminPasswordResetNotificationEmail = (userName, userEmail, timestamp) => {
  const content = `
    <p class="greeting">Hello Admin,</p>
    
    <p>A user has successfully reset their password. Here are the details:</p>
    
    <div class="info-box">
      <strong>User Name:</strong> ${userName}<br>
      <strong>Email:</strong> <a href="mailto:${userEmail}">${userEmail}</a><br>
      <strong>Date & Time:</strong> ${new Date(timestamp).toLocaleString()}
    </div>
    
    <p>This is an informational notification for your records.</p>
  `;
  
  return createEmailTemplate(content, 'User Password Reset Notification');
};

// ============================================
// 4. USER REGISTRATION EMAIL
// ============================================
export const userRegistrationEmail = (firstName, verificationLink, tempPassword) => {
  const content = `
    <p class="greeting">Welcome to <span class="highlight">${BRAND_NAME}</span>, ${firstName}!</p>
    
    <p>Thank you for registering with us. We're excited to have you on board!</p>
    
    <p>To complete your registration, please verify your email address by clicking the button below:</p>
    
    <p style="text-align: center;">
      <a href="${verificationLink}" class="button">Verify Email Address</a>
    </p>
    
    <div class="info-box">
      <strong>Temporary Login Password:</strong><br>
      For your security, a temporary password has been generated. You'll be prompted to change it upon first login.
    </div>
    
    <p style="margin-top: 20px;">
      <strong>Next Steps:</strong>
      <ol style="margin-left: 20px; margin-top: 10px;">
        <li>Click the verification link above</li>
        <li>Log in with your temporary password</li>
        <li>Change your password to something secure</li>
      </ol>
    </p>
    
    <p style="margin-top: 20px; font-size: 13px; color: #666;">
      This verification link will expire in 24 hours.
    </p>
  `;
  
  return createEmailTemplate(content, 'Welcome to Ardor Aegis!');
};

// ============================================
// 5. ADMIN NOTIFICATION - NEW USER REGISTRATION
// ============================================
export const adminNewUserNotificationEmail = (firstName, lastName, email, believerID, timestamp) => {
  const content = `
    <p class="greeting">Hello Admin,</p>
    
    <p>A new user has registered on ${BRAND_NAME}. Here are the details:</p>
    
    <div class="info-box">
      <strong>Name:</strong> ${firstName} ${lastName}<br>
      <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br>
      <strong>Believer ID:</strong> ${believerID}<br>
      <strong>Registration Date:</strong> ${new Date(timestamp).toLocaleString()}
    </div>
    
    <p style="text-align: center;">
      <a href="${WEBSITE_URL}/admin/users" class="button">View in Admin Panel</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'New User Registration');
};

// ============================================
// 6. CONTACT FORM SUBMISSION - USER CONFIRMATION
// ============================================
export const contactFormSubmissionEmail = (firstName, subject, message) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${firstName}</span>,</p>
    
    <p>Thank you for contacting us! We have received your message and will review it shortly.</p>
    
    <div class="info-box">
      <strong>Subject:</strong> ${subject}<br>
      <strong>Received on:</strong> ${new Date().toLocaleString()}
    </div>
    
    <p><strong>Your Message Summary:</strong></p>
    <p style="background-color: #fff; padding: 15px; border-radius: 3px; color: #666; font-size: 13px;">
      ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}
    </p>
    
    <p>Our team will get back to you within 24-48 business hours. If your inquiry is urgent, please contact us directly.</p>
    
    <div class="info-box">
      <strong>Contact Information:</strong><br>
      Email: <a href="mailto:info@ardoraegis.org">info@ardoraegis.org</a>
    </div>
  `;
  
  return createEmailTemplate(content, 'We Received Your Message');
};

// ============================================
// 7. ADMIN NOTIFICATION - NEW CONTACT FORM
// ============================================
export const adminNewContactNotificationEmail = (userName, userEmail, subject, message) => {
  const content = `
    <p class="greeting">Hello Admin,</p>
    
    <p>A new contact form has been submitted. Here are the details:</p>
    
    <div class="info-box">
      <strong>Name:</strong> ${userName}<br>
      <strong>Email:</strong> <a href="mailto:${userEmail}">${userEmail}</a><br>
      <strong>Subject:</strong> ${subject}<br>
      <strong>Submitted on:</strong> ${new Date().toLocaleString()}
    </div>
    
    <p><strong>Message:</strong></p>
    <p style="background-color: #fff; padding: 15px; border-radius: 3px; color: #666; font-size: 13px; white-space: pre-wrap;">
      ${message}
    </p>
    
    <p style="text-align: center;">
      <a href="${WEBSITE_URL}/admin/contacts" class="button">View in Admin Panel</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'New Contact Form Submission');
};

// ============================================
// 8. ADMIN REPLY TO CONTACT FORM - USER EMAIL
// ============================================
export const adminReplyContactFormEmail = (firstName, subject, replyMessage) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${firstName}</span>,</p>
    
    <p>Thank you for your patience! Our team has reviewed your inquiry and sent you a response.</p>
    
    <div class="info-box">
      <strong>Original Subject:</strong> ${subject}
    </div>
    
    <p><strong>Response from Our Team:</strong></p>
    <p style="background-color: #fff; padding: 15px; border-radius: 3px; color: #666; font-size: 13px; white-space: pre-wrap;">
      ${replyMessage}
    </p>
    
    <p>If you have any further questions or need additional assistance, please don't hesitate to reach out.</p>
    
    <p style="text-align: center;">
      <a href="${WEBSITE_URL}" class="button">Visit Our Website</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'We Replied to Your Message');
};

// ============================================
// 9. NEWSLETTER SUBSCRIPTION CONFIRMATION
// ============================================
export const newsletterSubscriptionEmail = (firstName) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${firstName}</span>,</p>
    
    <p>Thank you for subscribing to our newsletter! You're now part of our community.</p>
    
    <p>You'll receive:</p>
    <ul style="margin-left: 20px; margin-top: 10px;">
      <li>Exclusive updates and news from ${BRAND_NAME}</li>
      <li>Helpful resources and insights</li>
      <li>Special offers and announcements</li>
    </ul>
    
    <p style="margin-top: 20px;">
      <strong>What's next?</strong> Look out for our next newsletter in your inbox. We typically send updates once a week.
    </p>
    
    <div class="info-box">
      <strong>Manage Your Preferences:</strong><br>
      You can unsubscribe or manage your preferences at any time by clicking the link at the bottom of any future newsletter.
    </div>
    
    <p style="text-align: center; margin-top: 30px;">
      <a href="${WEBSITE_URL}" class="button">Visit Our Website</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'Welcome to Our Newsletter!');
};

// ============================================
// 10. ADMIN NOTIFICATION - NEW SUBSCRIBER
// ============================================
export const adminNewSubscriberNotificationEmail = (email, firstName, timestamp) => {
  const content = `
    <p class="greeting">Hello Admin,</p>
    
    <p>A new subscriber has joined your newsletter. Here are the details:</p>
    
    <div class="info-box">
      <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br>
      <strong>Name:</strong> ${firstName}<br>
      <strong>Subscribed on:</strong> ${new Date(timestamp).toLocaleString()}
    </div>
    
    <p style="text-align: center;">
      <a href="${WEBSITE_URL}/admin/newsletter/subscribers" class="button">View All Subscribers</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'New Newsletter Subscriber');
};

// ============================================
// 11. NEWSLETTER UNSUBSCRIPTION CONFIRMATION
// ============================================
export const newsletterUnsubscriptionEmail = (firstName) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${firstName}</span>,</p>
    
    <p>We've removed you from our mailing list as requested. You won't receive any more newsletters from us.</p>
    
    <div class="info-box">
      <strong>We'll miss you!</strong><br>
      If you change your mind, you can always subscribe again on our website.
    </div>
    
    <p style="text-align: center;">
      <a href="${WEBSITE_URL}" class="button">Visit Our Website</a>
    </p>
    
    <p style="margin-top: 30px; font-size: 13px; color: #666;">
      If you unsubscribed by mistake or have feedback about our newsletter, please let us know.
    </p>
  `;
  
  return createEmailTemplate(content, 'You have Unsubscribed');
};

// ============================================
// 12. ADMIN NOTIFICATION - UNSUBSCRIBER
// ============================================
export const adminUnsubscriberNotificationEmail = (email, firstName, timestamp) => {
  const content = `
    <p class="greeting">Hello Admin,</p>
    
    <p>A subscriber has unsubscribed from your newsletter. Here are the details:</p>
    
    <div class="info-box">
      <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br>
      <strong>Name:</strong> ${firstName}<br>
      <strong>Unsubscribed on:</strong> ${new Date(timestamp).toLocaleString()}
    </div>
    
    <p style="font-size: 13px; color: #666;">
      This is an informational notification. No action is required.
    </p>
  `;
  
  return createEmailTemplate(content, 'Newsletter Unsubscription');
};

// ============================================
// 13. NEWSLETTER CAMPAIGN EMAIL
// ============================================
export const newsletterCampaignEmail = (firstName, campaignTitle, campaignContent, unsubscribeLink) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${firstName}</span>,</p>
    
    <div class="divider"></div>
    
    <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
      ${campaignContent}
    </div>
    
    <div class="divider"></div>
    
    <p style="font-size: 13px; color: #999; text-align: center;">
      <a href="${unsubscribeLink}" style="color: #999; text-decoration: none;">Unsubscribe from this list</a>
    </p>
  `;
  
  return createEmailTemplate(content, campaignTitle);
};

// ============================================
// 14. NEWSLETTER CAMPAIGN SENT - ADMIN NOTIFICATION
// ============================================
export const adminCampaignSentNotificationEmail = (campaignName, recipientCount, timestamp) => {
  const content = `
    <p class="greeting">Hello Admin,</p>
    
    <p>Your newsletter campaign has been successfully sent!</p>
    
    <div class="info-box">
      <strong>Campaign Name:</strong> ${campaignName}<br>
      <strong>Recipients:</strong> ${recipientCount}<br>
      <strong>Sent on:</strong> ${new Date(timestamp).toLocaleString()}
    </div>
    
    <p>You can track the performance of this campaign in your admin dashboard.</p>
    
    <p style="text-align: center;">
      <a href="${WEBSITE_URL}/admin/newsletter/campaigns" class="button">View Campaign Analytics</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'Campaign Sent Successfully');
};

// ============================================
// 15. ADMIN NOTIFICATION - NEW QUOTE REQUEST
// ============================================
export const adminNewQuoteNotificationEmail = (userName, userEmail, serviceType, description, timestamp) => {
  const content = `
    <p class="greeting">Hello Admin,</p>
    
    <p>A new quote request has been submitted!</p>
    
    <div class="info-box">
      <strong>Customer Name:</strong> ${userName}<br>
      <strong>Email:</strong> <a href="mailto:${userEmail}">${userEmail}</a><br>
      <strong>Service Type:</strong> ${serviceType}<br>
      <strong>Submitted on:</strong> ${new Date(timestamp).toLocaleString()}
    </div>
    
    <p><strong>Request Description:</strong></p>
    <div class="info-box" style="background-color: #f9f9f9;">
      ${description || 'No description provided'}
    </div>
    
    <p>Please review this request and respond to the customer as soon as possible.</p>
    
    <p style="text-align: center;">
      <a href="${WEBSITE_URL}/admin/quote-requests" class="button">View Quote Request</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'New Quote Request');
};

// ============================================
// 16. QUOTE REQUEST SUBMISSION - USER CONFIRMATION
// ============================================
export const quoteRequestSubmissionEmail = (firstName, serviceType, subject = '') => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${firstName}</span>,</p>
    
    <p>Thank you for requesting a quote from Ardor Aegis! We have received your inquiry and will get back to you shortly with a customized quote.</p>
    
    <div class="info-box">
      <strong>Service Requested:</strong> ${serviceType}<br>
      <strong>Reference Date:</strong> ${new Date().toLocaleString()}
    </div>
    
    <p><strong>What happens next?</strong></p>
    <ol style="padding-left: 20px; margin: 15px 0;">
      <li>Our team will review your request</li>
      <li>We'll prepare a customized quote based on your requirements</li>
      <li>You'll receive our quote via email within 24-48 business hours</li>
    </ol>
    
    <p>If you have any urgent inquiries, please contact us directly:</p>
    <div class="info-box">
      <strong>Contact Information:</strong><br>
      Email: <a href="mailto:info@ardoraegis.org">info@ardoraegis.org</a>
    </div>
  `;
  
  return createEmailTemplate(content, 'Quote Request Received - Ardor Aegis');
};

// ============================================
// 17. JOB APPLICATION SUBMISSION - CANDIDATE CONFIRMATION
// ============================================
export const jobApplicationConfirmationEmail = (candidateName, jobTitle, applicationDate) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${candidateName}</span>,</p>
    
    <p>Thank you for submitting your application for the position of <span class="highlight">${jobTitle}</span>!</p>
    
    <p>We have successfully received your application and will review it carefully. Our HR team will evaluate your qualifications and experience against the role requirements.</p>
    
    <div class="info-box">
      <strong>Application Details:</strong><br>
      <strong>Position Applied For:</strong> ${jobTitle}<br>
      <strong>Application Received On:</strong> ${new Date(applicationDate).toLocaleString()}
    </div>
    
    <p><strong>What happens next?</strong></p>
    <ul style="margin-left: 20px; margin-top: 10px; font-size: 14px;">
      <li>Your application will be reviewed by our HR team</li>
      <li>If your profile matches our requirements, we'll contact you for an interview</li>
      <li>You'll hear from us within 2-3 business days</li>
    </ul>
    
    <p style="margin-top: 20px;">
      In the meantime, feel free to explore more about ${BRAND_NAME} and our opportunities on our website.
    </p>
    
    <p style="text-align: center; margin-top: 30px;">
      <a href="${WEBSITE_URL}/careers" class="button">Explore Other Positions</a>
    </p>
    
    <div class="info-box" style="margin-top: 30px;">
      <strong>Have questions?</strong><br>
      If you have any questions about your application, feel free to reach out to us at <a href="mailto:careers@ardoraegis.org">careers@ardoraegis.org</a>
    </div>
  `;
  
  return createEmailTemplate(content, 'Your Application Has Been Received');
};

// ============================================
// 18. ADMIN NOTIFICATION - NEW JOB APPLICATION
// ============================================
export const adminNewJobApplicationEmail = (candidateName, candidateEmail, jobTitle, experience, linkedinUrl, resumeUrl, timestamp) => {
  const content = `
    <p class="greeting">Hello Admin,</p>
    
    <p>A new job application has been submitted for review. Here are the candidate details:</p>
    
    <div class="info-box">
      <strong>Candidate Name:</strong> ${candidateName}<br>
      <strong>Email:</strong> <a href="mailto:${candidateEmail}">${candidateEmail}</a><br>
      <strong>Position Applied For:</strong> ${jobTitle}<br>
      <strong>Years of Experience:</strong> ${experience || 'Not provided'}<br>
      <strong>LinkedIn Profile:</strong> ${linkedinUrl ? `<a href="${linkedinUrl}" target="_blank">View Profile</a>` : 'Not provided'}<br>
      <strong>Application Submitted:</strong> ${new Date(timestamp).toLocaleString()}
    </div>
    
    <p style="text-align: center; margin-top: 30px;">
      ${resumeUrl ? `<a href="${resumeUrl}" class="button">Download Resume</a>` : '<p style="color: #999;">Resume file not available</p>'}
    </p>
    
    <p style="margin-top: 30px;">
      <a href="${WEBSITE_URL}/dashboard" class="button">View in Dashboard</a>
    </p>
    
    <p style="margin-top: 20px; font-size: 13px; color: #666;">
      Review the application details and take action by updating the application status in your admin dashboard.
    </p>
  `;
  
  return createEmailTemplate(content, 'New Job Application Received');
};

// ============================================
// 19. JOB APPLICATION STATUS UPDATE - REVIEWING
// ============================================
export const jobApplicationReviewingEmail = (candidateName, jobTitle) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${candidateName}</span>,</p>
    
    <p>Thank you for your patience! We're pleased to inform you that your application for the position of <span class="highlight">${jobTitle}</span> is currently under review.</p>
    
    <div class="info-box">
      <strong>Current Status:</strong> Reviewing<br>
      <strong>Position:</strong> ${jobTitle}<br>
      <strong>Status Updated:</strong> ${new Date().toLocaleString()}
    </div>
    
    <p>Our HR team is carefully evaluating your qualifications and will be in touch with you soon. We typically complete our review within 3-5 business days.</p>
    
    <p style="margin-top: 20px;">
      In the meantime, feel free to reach out if you have any questions about the position or application process.
    </p>
    
    <div class="info-box" style="margin-top: 30px;">
      <strong>Stay Connected:</strong><br>
      Keep an eye on your email for further updates. We look forward to hearing more about you!
    </div>
  `;
  
  return createEmailTemplate(content, 'Your Application is Under Review');
};

// ============================================
// 20. JOB APPLICATION STATUS UPDATE - SHORTLISTED
// ============================================
export const jobApplicationShortlistedEmail = (candidateName, jobTitle) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${candidateName}</span>,</p>
    
    <p>Great news! 🎉 Your application for the position of <span class="highlight">${jobTitle}</span> has been shortlisted!</p>
    
    <div class="info-box">
      <strong>Current Status:</strong> Shortlisted<br>
      <strong>Position:</strong> ${jobTitle}<br>
      <strong>Status Updated:</strong> ${new Date().toLocaleString()}
    </div>
    
    <p>Your qualifications and experience have impressed our team. We would like to move forward with your application and have you for an interview.</p>
    
    <p><strong>Next Steps:</strong></p>
    <ul style="margin-left: 20px; margin-top: 10px; font-size: 14px;">
      <li>Our HR team will reach out to you within 2-3 business days</li>
      <li>We will propose available interview times</li>
      <li>The interview will be conducted via video call or in-person</li>
    </ul>
    
    <p style="margin-top: 20px;">
      Congratulations again! We're excited to learn more about you and discuss how you can contribute to our team.
    </p>
    
    <p style="text-align: center; margin-top: 30px;">
      <a href="${WEBSITE_URL}" class="button">Learn More About Ardor Aegis</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'Exciting News - You\'ve Been Shortlisted!');
};

// ============================================
// 21. JOB APPLICATION STATUS UPDATE - REJECTED
// ============================================
export const jobApplicationRejectedEmail = (candidateName, jobTitle) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${candidateName}</span>,</p>
    
    <p>Thank you for your interest in ${BRAND_NAME} and for applying for the position of <span class="highlight">${jobTitle}</span>.</p>
    
    <div class="info-box">
      <strong>Current Status:</strong> Application Not Selected<br>
      <strong>Position:</strong> ${jobTitle}<br>
      <strong>Status Updated:</strong> ${new Date().toLocaleString()}
    </div>
    
    <p>After careful consideration of all applications, we have decided to move forward with other candidates whose qualifications more closely match our current requirements.</p>
    
    <p>This decision should not discourage you. We encourage you to:</p>
    <ul style="margin-left: 20px; margin-top: 10px; font-size: 14px;">
      <li>Keep an eye on our <a href="${WEBSITE_URL}/careers">careers page</a> for future opportunities</li>
      <li>Apply again for positions that match your skills and experience</li>
      <li>Connect with us on social media to stay updated</li>
    </ul>
    
    <p style="margin-top: 20px;">
      We genuinely appreciate your time and effort in applying. We wish you the very best in your career endeavors!
    </p>
    
    <p style="text-align: center; margin-top: 30px;">
      <a href="${WEBSITE_URL}/careers" class="button">Explore Other Positions</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'Thank You for Your Application');
};

// ============================================
// 22. JOB APPLICATION STATUS UPDATE - HIRED
// ============================================
export const jobApplicationHiredEmail = (candidateName, jobTitle) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${candidateName}</span>,</p>
    
    <p>Congratulations! 🎉 We are delighted to offer you the position of <span class="highlight">${jobTitle}</span> at ${BRAND_NAME}!</p>
    
    <div class="info-box">
      <strong>Current Status:</strong> Hired<br>
      <strong>Position:</strong> ${jobTitle}<br>
      <strong>Status Updated:</strong> ${new Date().toLocaleString()}
    </div>
    
    <p>Your skills, experience, and the exceptional performance throughout our interview process have convinced us that you are the perfect fit for this role.</p>
    
    <p><strong>Next Steps:</strong></p>
    <ul style="margin-left: 20px; margin-top: 10px; font-size: 14px;">
      <li>Our HR team will contact you shortly with the official offer letter</li>
      <li>We will discuss salary, benefits, and start date</li>
      <li>Onboarding process details will be provided</li>
    </ul>
    
    <p style="margin-top: 20px;">
      We are excited to welcome you to the ${BRAND_NAME} team! If you have any questions in the meantime, please don't hesitate to reach out.
    </p>
    
    <div class="info-box" style="margin-top: 30px;">
      <strong>Contact Information:</strong><br>
      Email: <a href="mailto:careers@ardoraegis.org">careers@ardoraegis.org</a><br>
      We look forward to working with you!
    </div>
  `;
  
  return createEmailTemplate(content, 'Congratulations - Welcome to Ardor Aegis!');
};

// ============================================
// 23. JOB APPLICATION STATUS UPDATE - ON HOLD
// ============================================
export const jobApplicationOnHoldEmail = (candidateName, jobTitle) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${candidateName}</span>,</p>
    
    <p>Thank you for your application for the position of <span class="highlight">${jobTitle}</span> at ${BRAND_NAME}.</p>
    
    <div class="info-box">
      <strong>Current Status:</strong> On Hold<br>
      <strong>Position:</strong> ${jobTitle}<br>
      <strong>Status Updated:</strong> ${new Date().toLocaleString()}
    </div>
    
    <p>Your application is currently on hold as we are still in the process of reviewing other candidates. We appreciate your patience during this time.</p>
    
    <p>We will get back to you with an update within 1-2 weeks. Your application remains active, and we will be in touch soon.</p>
    
    <p style="margin-top: 20px;">
      If you have any questions or need to provide additional information, please feel free to contact us.
    </p>
    
    <div class="info-box">
      <strong>Keep in Touch:</strong><br>
      <a href="mailto:careers@ardoraegis.org">careers@ardoraegis.org</a>
    </div>
  `;
  
  return createEmailTemplate(content, 'Application Status Update');
};

// ============================================
// 24. ADMIN NOTIFICATION - APPLICATION STATUS CHANGED
// ============================================
export const adminApplicationStatusChangedEmail = (candidateName, candidateEmail, jobTitle, oldStatus, newStatus, timestamp) => {
  const content = `
    <p class="greeting">Hello Admin,</p>
    
    <p>A job application status has been updated in the system. Here are the details:</p>
    
    <div class="info-box">
      <strong>Candidate Name:</strong> ${candidateName}<br>
      <strong>Email:</strong> <a href="mailto:${candidateEmail}">${candidateEmail}</a><br>
      <strong>Position:</strong> ${jobTitle}<br>
      <strong>Previous Status:</strong> ${oldStatus}<br>
      <strong>New Status:</strong> <span style="color: #7B542F; font-weight: bold;">${newStatus}</span><br>
      <strong>Updated:</strong> ${new Date(timestamp).toLocaleString()}
    </div>
    
    <p>A notification has been sent to the candidate informing them of this status change.</p>
    
    <p style="text-align: center; margin-top: 30px;">
      <a href="${WEBSITE_URL}/dashboard" class="button">View Application Details</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'Application Status Updated');
};

export default {
  forgotPasswordEmail,
  passwordResetSuccessEmail,
  adminPasswordResetNotificationEmail,
  userRegistrationEmail,
  adminNewUserNotificationEmail,
  contactFormSubmissionEmail,
  adminNewContactNotificationEmail,
  adminReplyContactFormEmail,
  newsletterSubscriptionEmail,
  adminNewSubscriberNotificationEmail,
  newsletterUnsubscriptionEmail,
  adminUnsubscriberNotificationEmail,
  newsletterCampaignEmail,
  adminCampaignSentNotificationEmail,
  adminNewQuoteNotificationEmail,
  quoteRequestSubmissionEmail,
  jobApplicationConfirmationEmail,
  adminNewJobApplicationEmail,
  jobApplicationReviewingEmail,
  jobApplicationShortlistedEmail,
  jobApplicationRejectedEmail,
  jobApplicationHiredEmail,
  jobApplicationOnHoldEmail,
  adminApplicationStatusChangedEmail,
};
