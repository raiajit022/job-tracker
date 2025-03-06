import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { sendReminderEmail } from "@/lib/email-utils"

const prisma = new PrismaClient()

// This route will be called by a scheduled job (e.g., Vercel Cron)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || token !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Get current date
    const now = new Date()

    // Find all reminders that are due (reminder date is today or in the past)
    const dueReminders = await prisma.jobApplication.findMany({
      where: {
        reminder: {
          lte: now,
        },
        // Only get reminders that haven't been sent yet
        reminderSent: false,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })

    console.log(`Found ${dueReminders.length} due reminders`)

    // Send emails for each due reminder
    const results = await Promise.all(
      dueReminders.map(async (reminder) => {
        if (!reminder.user.email) {
          return { id: reminder.id, success: false, error: "User has no email" }
        }

        const emailResult = await sendReminderEmail(reminder.user.email, reminder.user.name || "there", reminder)

        if (emailResult.success) {
          // Mark reminder as sent
          await prisma.jobApplication.update({
            where: { id: reminder.id },
            data: { reminderSent: true },
          })
        }

        return {
          id: reminder.id,
          success: emailResult.success,
          error: emailResult.success ? null : emailResult.error,
        }
      }),
    )

    return NextResponse.json({
      processed: dueReminders.length,
      results,
    })
  } catch (error) {
    console.error("Error checking reminders:", error)
    return NextResponse.json({ error: "Failed to check reminders" }, { status: 500 })
  }
}

