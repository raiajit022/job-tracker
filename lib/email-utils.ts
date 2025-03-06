import { Resend } from "resend"
import type { JobApplication } from "@/types/job-application"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendReminderEmail(userEmail: string, userName: string, application: JobApplication) {
  try {
    const result = await resend.emails.send({
      from: "Job Tracker <notifications@yourdomain.com>",
      to: userEmail,
      subject: `Reminder: Follow up on your ${application.position} application at ${application.company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Job Application Reminder</h2>
          <p>Hello ${userName},</p>
          <p>This is a reminder to follow up on your job application:</p>
          <div style="padding: 15px; border-left: 4px solid #3b82f6; background-color: #f9fafb; margin: 20px 0;">
            <p><strong>Position:</strong> ${application.position}</p>
            <p><strong>Company:</strong> ${application.company}</p>
            <p><strong>Status:</strong> ${application.status}</p>
            <p><strong>Applied Date:</strong> ${new Date(application.appliedDate).toLocaleDateString()}</p>
            ${application.url ? `<p><strong>Job URL:</strong> <a href="${application.url}">${application.url}</a></p>` : ""}
            ${application.contactName ? `<p><strong>Contact:</strong> ${application.contactName}</p>` : ""}
            ${application.contactEmail ? `<p><strong>Contact Email:</strong> <a href="mailto:${application.contactEmail}">${application.contactEmail}</a></p>` : ""}
          </div>
          ${application.notes ? `<p><strong>Notes:</strong> ${application.notes}</p>` : ""}
          <p>Good luck with your job search!</p>
          <p>Your Job Tracker</p>
          <hr />
          <p style="font-size: 12px; color: #6b7280;">This is an automated reminder from your Job Application Tracker.</p>
        </div>
      `,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error("Failed to send reminder email:", error)
    return { success: false, error }
  }
}

