import type { ApplicationStatus } from "@/types/job-application"

export function getStatusColor(status: ApplicationStatus): string {
  switch (status) {
    case "wishlist":
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
    case "applied":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
    case "interview":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
    case "offer":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    case "accepted":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  }
}

