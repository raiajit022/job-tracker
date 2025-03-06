import type { JobApplication } from "@/types/job-application"

export function checkReminders(applications: JobApplication[]): void {
  // Check if browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notifications")
    return
  }

  // Check for due reminders
  const now = new Date()
  const dueReminders = applications.filter((app) => app.reminder && new Date(app.reminder) <= now)

  if (dueReminders.length > 0 && Notification.permission === "granted") {
    showReminderNotifications(dueReminders)
  } else if (dueReminders.length > 0 && Notification.permission !== "denied") {
    // Request permission if not already granted or denied
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showReminderNotifications(dueReminders)
      }
    })
  }
}

function showReminderNotifications(applications: JobApplication[]): void {
  applications.forEach((app) => {
    const notification = new Notification("Job Application Reminder", {
      body: `Follow up on your application for ${app.position} at ${app.company}`,
      icon: "/favicon.ico", // Add a favicon to your project for this to work
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  })
}

