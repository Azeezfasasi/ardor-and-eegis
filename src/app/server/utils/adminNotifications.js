import User from "../models/User.js";
import { sendEmailViaBrevo } from "./brevoEmailService.js";
import * as emailTemplates from "./emailTemplates.js";

/**
 * Get all admin user emails
 * @returns {Promise<Array<string>>} Array of admin email addresses
 */
export const getAllAdminEmails = async () => {
  try {
    const admins = await User.find(
      { role: { $in: ['admin', 'super-admin', 'staff-member'] } },
      { email: 1 }
    );
    return admins.map(admin => admin.email).filter(email => email);
  } catch (error) {
    console.error('Error fetching admin emails:', error);
    // Fallback to environment variable if query fails
    return [process.env.ADMIN_EMAIL || 'admin@ardoraegis.org'];
  }
};

/**
 * Send email to all admins
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML email content
 * @param {Array<string>} adminEmails - List of admin emails
 */
export const sendToAllAdmins = async (subject, htmlContent, adminEmails = null) => {
  try {
    // Get admin emails if not provided
    const emails = adminEmails || (await getAllAdminEmails());

    if (!emails || emails.length === 0) {
      console.warn('No admin emails found for notification');
      return;
    }

    console.log(`📧 Sending admin notification to ${emails.length} admin(s):`);
    console.log(emails);

    // Send email to each admin
    const results = {
      successful: [],
      failed: [],
    };

    for (const email of emails) {
      try {
        await sendEmailViaBrevo({
          to: email,
          subject,
          htmlContent,
        });
        results.successful.push(email);
        console.log(`✓ Email sent to admin: ${email}`);
      } catch (error) {
        results.failed.push({ email, error: error.message });
        console.error(`✗ Failed to send email to admin ${email}:`, error.message);
      }
    }

    return results;
  } catch (error) {
    console.error('Error in sendToAllAdmins:', error);
    throw error;
  }
};

/**
 * Send new contact form notification to all admins
 */
export const notifyAdminsNewContact = async (userName, userEmail, subject, message) => {
  try {
    const adminEmails = await getAllAdminEmails();
    const emailContent = emailTemplates.adminNewContactNotificationEmail(
      userName,
      userEmail,
      subject,
      message
    );

    return await sendToAllAdmins(
      `New Contact Form Submission - ${subject}`,
      emailContent,
      adminEmails
    );
  } catch (error) {
    console.error('Error notifying admins of new contact:', error);
  }
};

/**
 * Send new user registration notification to all admins
 */
export const notifyAdminsNewUser = async (firstName, lastName, email, believerID) => {
  try {
    const adminEmails = await getAllAdminEmails();
    const emailContent = emailTemplates.adminNewUserNotificationEmail(
      firstName,
      lastName,
      email,
      believerID,
      new Date()
    );

    return await sendToAllAdmins(
      `New User Registration - ${firstName} ${lastName}`,
      emailContent,
      adminEmails
    );
  } catch (error) {
    console.error('Error notifying admins of new user:', error);
  }
};

/**
 * Send password reset notification to all admins
 */
export const notifyAdminsPasswordReset = async (userName, userEmail) => {
  try {
    const adminEmails = await getAllAdminEmails();
    const emailContent = emailTemplates.adminPasswordResetNotificationEmail(
      userName,
      userEmail,
      new Date()
    );

    return await sendToAllAdmins(
      `User Password Reset - ${userName}`,
      emailContent,
      adminEmails
    );
  } catch (error) {
    console.error('Error notifying admins of password reset:', error);
  }
};

/**
 * Send new newsletter subscriber notification to all admins
 */
export const notifyAdminsNewSubscriber = async (email, firstName) => {
  try {
    const adminEmails = await getAllAdminEmails();
    const emailContent = emailTemplates.adminNewSubscriberNotificationEmail(
      email,
      firstName,
      new Date()
    );

    return await sendToAllAdmins(
      `New Newsletter Subscriber - ${email}`,
      emailContent,
      adminEmails
    );
  } catch (error) {
    console.error('Error notifying admins of new subscriber:', error);
  }
};

/**
 * Send newsletter unsubscriber notification to all admins
 */
export const notifyAdminsUnsubscriber = async (email, firstName) => {
  try {
    const adminEmails = await getAllAdminEmails();
    const emailContent = emailTemplates.adminUnsubscriberNotificationEmail(
      email,
      firstName,
      new Date()
    );

    return await sendToAllAdmins(
      `Newsletter Unsubscription - ${email}`,
      emailContent,
      adminEmails
    );
  } catch (error) {
    console.error('Error notifying admins of unsubscriber:', error);
  }
};

/**
 * Send campaign sent notification to all admins
 */
export const notifyAdminsCampaignSent = async (campaignName, recipientCount) => {
  try {
    const adminEmails = await getAllAdminEmails();
    const emailContent = emailTemplates.adminCampaignSentNotificationEmail(
      campaignName,
      recipientCount,
      new Date()
    );

    return await sendToAllAdmins(
      `Newsletter Campaign Sent - ${campaignName}`,
      emailContent,
      adminEmails
    );
  } catch (error) {
    console.error('Error notifying admins of campaign sent:', error);
  }
};

/**
 * Send new quote request notification to all admins
 */
export const notifyAdminsNewQuote = async (userName, userEmail, serviceType, description) => {
  try {
    const adminEmails = await getAllAdminEmails();
    const emailContent = emailTemplates.adminNewQuoteNotificationEmail(
      userName,
      userEmail,
      serviceType,
      description,
      new Date()
    );

    return await sendToAllAdmins(
      `New Quote Request - ${serviceType}`,
      emailContent,
      adminEmails
    );
  } catch (error) {
    console.error('Error notifying admins of new quote:', error);
  }
};

export default {
  getAllAdminEmails,
  sendToAllAdmins,
  notifyAdminsNewContact,
  notifyAdminsNewUser,
  notifyAdminsPasswordReset,
  notifyAdminsNewSubscriber,
  notifyAdminsUnsubscriber,
  notifyAdminsCampaignSent,
  notifyAdminsNewQuote,
};
