import { sendEmailViaBrevo } from "./src/app/server/utils/brevoEmailService.js";
import * as emailTemplates from "./src/app/server/utils/emailTemplates.js";

const testEmail = async () => {
  try {
    const userEmail = "hayzedboy20@gmail.com";
    const firstName = "Azeez";
    const serviceType = "Security Consultancy & Risk Assessment";

    console.log("🧪 Testing quote confirmation email...");
    console.log(`📧 Sending to: ${userEmail}`);

    const emailContent = emailTemplates.quoteRequestSubmissionEmail(firstName, serviceType);

    const result = await sendEmailViaBrevo({
      to: userEmail,
      subject: "Quote Request Received - Ardor Aegis",
      htmlContent: emailContent,
    });

    console.log("✅ Email test completed!");
    console.log("📨 Response:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Email test failed:", error.message);
  }
};

testEmail();
