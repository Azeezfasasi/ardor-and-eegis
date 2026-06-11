# Email Templates Guide - Ardor Aegis

## Overview

Comprehensive email templates have been created for all key user and admin interactions in the Ardor Aegis application. All templates feature:

- Professional design with brand color (#7B542F)
- Responsive HTML layout
- Consistent branding with Ardor Aegis logo and styling
- Clear call-to-action buttons
- Professional footer with contact info
- Mobile-friendly formatting

## Template File Location

`src/app/server/utils/emailTemplates.js`

## Available Templates

### 1. Authentication Emails

#### A. Forgot Password Email
**Function:** `forgotPasswordEmail(firstName, resetLink)`
- **Recipients:** User who requested password reset
- **Usage:** When user initiates forget password flow
- **Parameters:**
  - `firstName`: User's first name
  - `resetLink`: Full password reset link (expires in 24 hours)
- **Implementation:** `authController.js` - forgotPassword function

#### B. Password Reset Success Email
**Function:** `passwordResetSuccessEmail(firstName)`
- **Recipients:** User who successfully reset password
- **Usage:** After password is successfully changed
- **Parameters:**
  - `firstName`: User's first name
- **Implementation:** `authController.js` - resetPassword function

#### C. Admin Password Reset Notification
**Function:** `adminPasswordResetNotificationEmail(userName, userEmail, timestamp)`
- **Recipients:** Admin
- **Usage:** When user resets password
- **Parameters:**
  - `userName`: Full name of user
  - `userEmail`: Email of user
  - `timestamp`: When the reset occurred
- **Implementation:** `authController.js` - resetPassword function

---

### 2. Registration & User Management Emails

#### A. User Registration Email
**Function:** `userRegistrationEmail(firstName, verificationLink, tempPassword)`
- **Recipients:** New user
- **Usage:** Upon successful registration
- **Parameters:**
  - `firstName`: User's first name
  - `verificationLink`: Email verification link (expires in 24 hours)
  - `tempPassword`: Temporary password generated for user
- **Implementation:** `authController.js` - register function
- **Next Steps:** User should verify email, log in, and change password

#### B. Admin New User Notification
**Function:** `adminNewUserNotificationEmail(firstName, lastName, email, believerID, timestamp)`
- **Recipients:** Admin
- **Usage:** When new user registers
- **Parameters:**
  - `firstName`: New user's first name
  - `lastName`: New user's last name
  - `email`: New user's email
  - `believerID`: User's believer ID
  - `timestamp`: Registration timestamp
- **Implementation:** `authController.js` - register function
- **CTA:** Link to admin panel to view user

---

### 3. Contact Form Emails

#### A. Contact Form Submission Confirmation (User)
**Function:** `contactFormSubmissionEmail(firstName, subject, message)`
- **Recipients:** User who submitted contact form
- **Usage:** When user submits contact form
- **Parameters:**
  - `firstName`: User's first name
  - `subject`: Contact form subject
  - `message`: First 200 characters of message
- **Implementation:** `contactController.js` - createContact function
- **Note:** Confirms receipt and sets expectation of 24-48 hour response

#### B. New Contact Form Notification (Admin)
**Function:** `adminNewContactNotificationEmail(userName, userEmail, subject, message)`
- **Recipients:** Admin/Support team
- **Usage:** When user submits contact form
- **Parameters:**
  - `userName`: User's full name
  - `userEmail`: User's email address
  - `subject`: Contact form subject
  - `message`: Full message content
- **Implementation:** `contactController.js` - createContact function
- **CTA:** Link to admin panel to view and reply

#### C. Admin Reply to Contact Form (User)
**Function:** `adminReplyContactFormEmail(firstName, subject, replyMessage)`
- **Recipients:** User who submitted contact form
- **Usage:** When admin replies to contact form
- **Parameters:**
  - `firstName`: User's first name
  - `subject`: Original contact subject
  - `replyMessage`: Admin's reply message
- **Implementation:** `contactController.js` - replyToContact function
- **Timing:** Send immediately after admin submits reply

---

### 4. Newsletter Emails

#### A. Newsletter Subscription Confirmation
**Function:** `newsletterSubscriptionEmail(firstName)`
- **Recipients:** New newsletter subscriber
- **Usage:** When user successfully subscribes
- **Parameters:**
  - `firstName`: Subscriber's first name
- **Implementation:** `newsletterController.js` - subscribeToNewsletter function
- **Features:** Lists newsletter benefits, manages preferences

#### B. Admin New Subscriber Notification
**Function:** `adminNewSubscriberNotificationEmail(email, firstName, timestamp)`
- **Recipients:** Admin
- **Usage:** When new subscriber joins
- **Parameters:**
  - `email`: Subscriber's email
  - `firstName`: Subscriber's first name
  - `timestamp`: Subscription timestamp
- **Implementation:** `newsletterController.js` - subscribeToNewsletter function
- **CTA:** Link to subscriber management in admin panel

#### C. Newsletter Unsubscription Confirmation
**Function:** `newsletterUnsubscriptionEmail(firstName)`
- **Recipients:** Unsubscribed user
- **Usage:** When user unsubscribes from newsletter
- **Parameters:**
  - `firstName`: Subscriber's first name
- **Implementation:** `newsletterController.js` - unsubscribeFromNewsletter function
- **Note:** Offers option to resubscribe

#### D. Admin Unsubscriber Notification
**Function:** `adminUnsubscriberNotificationEmail(email, firstName, timestamp)`
- **Recipients:** Admin
- **Usage:** When subscriber unsubscribes
- **Parameters:**
  - `email`: Unsubscriber's email
  - `firstName`: Unsubscriber's first name
  - `timestamp`: Unsubscription timestamp
- **Implementation:** `newsletterController.js` - unsubscribeFromNewsletter function
- **Note:** Informational only

#### E. Newsletter Campaign Email (Generic)
**Function:** `newsletterCampaignEmail(firstName, campaignTitle, campaignContent, unsubscribeLink)`
- **Recipients:** Newsletter subscribers
- **Usage:** When sending newsletter campaign
- **Parameters:**
  - `firstName`: Subscriber's first name
  - `campaignTitle`: Campaign/newsletter title
  - `campaignContent`: HTML content of campaign
  - `unsubscribeLink`: Link to unsubscribe from list
- **Implementation:** `newsletterController.js` - sendNewsletter function
- **Note:** Wraps custom campaign content with brand template

#### F. Admin Campaign Sent Notification
**Function:** `adminCampaignSentNotificationEmail(campaignName, recipientCount, timestamp)`
- **Recipients:** Admin
- **Usage:** After newsletter campaign is sent
- **Parameters:**
  - `campaignName`: Name/title of campaign
  - `recipientCount`: Number of recipients
  - `timestamp`: When campaign was sent
- **Implementation:** `newsletterController.js` - sendNewsletter function
- **CTA:** Link to campaign analytics

---

## Implementation Examples

### Example 1: Using Template in Controller

```javascript
import * as emailTemplates from "../utils/emailTemplates.js";
import { sendEmailViaBrevo } from "../utils/brevoEmailService.js";

// In your controller function:
const userFirstName = user.firstName;
const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

const emailContent = emailTemplates.forgotPasswordEmail(userFirstName, resetLink);

await sendEmailViaBrevo({
  to: user.email,
  subject: "Reset Your Password - Ardor Aegis",
  htmlContent: emailContent,
});
```

### Example 2: Sending Email with Admin Notification

```javascript
// Send user confirmation
const userEmailContent = emailTemplates.contactFormSubmissionEmail(
  user.firstName,
  contactForm.subject,
  contactForm.message
);
await sendEmailViaBrevo({
  to: user.email,
  subject: `We Received Your Message - ${contactForm.subject}`,
  htmlContent: userEmailContent,
});

// Send admin notification
const adminEmailContent = emailTemplates.adminNewContactNotificationEmail(
  user.fullName,
  user.email,
  contactForm.subject,
  contactForm.message
);
await sendEmailViaBrevo({
  to: process.env.ADMIN_EMAIL || "admin@ardoraegis.org",
  subject: `New Contact: ${contactForm.subject}`,
  htmlContent: adminEmailContent,
});
```

---

## Configuration

### Environment Variables Required

Add these to your `.env.local`:

```
# Brevo Email Service
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=info@ardoraegis.org
BREVO_SENDER_NAME=Ardor Aegis

# Admin Email
ADMIN_EMAIL=admin@ardoraegis.org

# Frontend URL (for links in emails)
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Brevo Configuration

1. Create account at [Brevo.com](https://www.brevo.com)
2. Get API key from Account Settings
3. Verify sender email address
4. Create contact lists if needed
5. Set up email templates if using template IDs

---

## Customization

### Changing Brand Color

Edit `src/app/server/utils/emailTemplates.js`:

```javascript
const BRAND_COLOR = '#7B542F'; // Change this hex color
```

### Changing Brand Name

```javascript
const BRAND_NAME = 'Ardor Aegis'; // Change this
```

### Changing Footer Content

Edit the footer section in the `createEmailTemplate` function to include:
- Different contact information
- Social media links
- Custom legal text
- Company address

### Creating New Template

```javascript
export const customEmail = (firstName, customData) => {
  const content = `
    <p class="greeting">Hello <span class="highlight">${firstName}</span>,</p>
    
    <!-- Your custom content here -->
    
    <p style="text-align: center;">
      <a href="your-link" class="button">Call to Action</a>
    </p>
  `;
  
  return createEmailTemplate(content, 'Your Email Title');
};
```

---

## Testing Emails

### Test in Development

1. Use [Brevo's sandbox mode](https://www.brevo.com)
2. Or configure test email account
3. Verify email content and styling before sending to users

### Email Preview

Most templates include:
- Mobile-responsive design
- Proper heading hierarchy
- Clear typography with proper contrast
- Professional styling
- Brand color integration

---

## Best Practices

1. **Always include sender name and email**
   ```javascript
   SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL
   SENDER_NAME = process.env.BREVO_SENDER_NAME
   ```

2. **Add error handling**
   ```javascript
   try {
     await sendEmailViaBrevo({ ... });
   } catch (error) {
     console.error('Email send failed:', error);
     // Don't fail the main operation
   }
   ```

3. **Log email activities**
   ```javascript
   console.log('Email sent to:', user.email);
   ```

4. **Use meaningful subject lines**
   - Include action/event type
   - Include brand name
   - Keep under 50 characters

5. **Personalize emails**
   - Use first name in greeting
   - Reference specific actions/subjects
   - Use professional tone

6. **Include unsubscribe links**
   - Required by email laws (CAN-SPAM, GDPR)
   - Placed in footer of all marketing emails
   - Newsletter emails include unsubscribe link

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Emails not sending | Check BREVO_API_KEY in .env.local |
| HTML rendering issues | Test in different email clients |
| Links not working | Verify NEXT_PUBLIC_APP_URL is correct |
| Sender shows as "UNVERIFIED" | Verify sender email in Brevo dashboard |
| High bounce rate | Check email list quality in admin |

---

## Monitoring & Analytics

Monitor email performance in:
1. **Brevo Dashboard** - See delivery, open, click rates
2. **Activity Logs** - Track email events per subscriber
3. **Campaign Analytics** - Newsletter campaign performance
4. **Admin Notifications** - Email delivery confirmations

---

## Email List

| Email Type | User | Admin | Count | Status |
|-----------|------|-------|-------|--------|
| Forgot Password | ✓ | ✓ | 2 | ✓ |
| Password Reset Success | ✓ | - | 1 | ✓ |
| User Registration | ✓ | ✓ | 2 | ✓ |
| Contact Submission | ✓ | ✓ | 2 | ✓ |
| Contact Reply | ✓ | - | 1 | ✓ |
| Newsletter Subscribe | ✓ | ✓ | 2 | ✓ |
| Newsletter Unsubscribe | ✓ | ✓ | 2 | ✓ |
| Newsletter Campaign | ✓ | ✓ | 2 | ✓ |
| **Total** | | | **14** | **✓** |

---

## Support & Updates

For questions or updates needed:
1. Check Brevo documentation: https://developers.brevo.com
2. Review template styling in emailTemplates.js
3. Test email rendering in different clients
4. Monitor error logs for delivery issues

---

**Last Updated:** May 10, 2026
**Template Version:** 1.0
**Brand Color:** #7B542F
**Brand Name:** Ardor Aegis
