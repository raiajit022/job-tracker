"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { JobApplication, ApplicationStatus } from "@/types/job-application"

interface JobFormProps {
  onSubmit: (application: JobApplication) => void
  onCancel: () => void
  initialData?: JobApplication | null
}

export function JobForm({ onSubmit, onCancel, initialData }: JobFormProps) {
  const [formData, setFormData] = useState<Omit<JobApplication, "id">>({
    company: "",
    position: "",
    location: "",
    status: "applied" as ApplicationStatus,
    appliedDate: new Date(),
    notes: "",
    url: "",
    contactName: "",
    contactEmail: "",
    reminder: null,
  })

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [reminderDate, setReminderDate] = useState<Date | undefined>()

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company,
        position: initialData.position,
        location: initialData.location,
        status: initialData.status,
        appliedDate: new Date(initialData.appliedDate),
        notes: initialData.notes,
        url: initialData.url,
        contactName: initialData.contactName,
        contactEmail: initialData.contactEmail,
        reminder: initialData.reminder ? new Date(initialData.reminder) : null,
      })
      setDate(new Date(initialData.appliedDate))
      setReminderDate(initialData.reminder ? new Date(initialData.reminder) : undefined)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: ApplicationStatus) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date)
      setFormData((prev) => ({ ...prev, appliedDate: date }))
    }
  }

  const handleReminderChange = (date: Date | undefined) => {
    setReminderDate(date)
    setFormData((prev) => ({ ...prev, reminder: date || null }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newApplication: JobApplication = {
      id: initialData?.id || crypto.randomUUID(),
      ...formData,
    }
    onSubmit(newApplication)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-lg border bg-white/80 backdrop-blur-sm dark:bg-card/30 dark:border-border/40 shadow-lg"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{initialData ? "Edit Application" : "Add New Application"}</h2>
        <Button type="button" variant="ghost" size="icon" onClick={onCancel} aria-label="Cancel">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wishlist">Wishlist</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Applied Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Set Reminder</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !reminderDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {reminderDate ? format(reminderDate, "PPP") : <span>Set a reminder</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={reminderDate} onSelect={handleReminderChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Job URL</Label>
          <Input id="url" name="url" value={formData.url} onChange={handleChange} type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            type="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update Application" : "Add Application"}</Button>
      </div>
    </form>
  )
}

