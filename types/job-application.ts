export type ApplicationStatus = "wishlist" | "applied" | "interview" | "offer" | "rejected" | "accepted"

export interface JobApplication {
  id: string
  company: string
  position: string
  location: string
  status: ApplicationStatus
  appliedDate: Date
  notes: string
  url: string
  contactName: string
  contactEmail: string
  reminder: Date | null
  reminderSent: boolean
}

