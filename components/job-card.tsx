"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { format } from "date-fns"
import type { JobApplication } from "@/types/job-application"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, Bell, BellOff, CheckCircle, ExternalLink, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { getStatusColor } from "@/lib/status-utils"

interface JobCardProps {
  application: JobApplication
  onEdit: (application: JobApplication) => void
  onDelete: (id: string) => void
  onUpdate: (application: JobApplication) => void
}

export function JobCard({ application, onEdit, onDelete, onUpdate }: JobCardProps) {
  const [reminderDate, setReminderDate] = useState<Date | undefined>(
    application.reminder ? new Date(application.reminder) : undefined,
  )

  const handleReminderChange = (date: Date | undefined) => {
    setReminderDate(date)
    onUpdate({
      ...application,
      reminder: date || null,
      reminderSent: false, // Reset the reminder sent status when setting a new reminder
    })
  }

  const removeReminder = () => {
    setReminderDate(undefined)
    onUpdate({
      ...application,
      reminder: null,
      reminderSent: false,
    })
  }

  const statusColor = getStatusColor(application.status)
  const hasReminder = application.reminder !== null
  const isReminderDue = hasReminder && new Date(application.reminder as Date).getTime() <= new Date().getTime()
  const isReminderSent = application.reminderSent

  return (
    <Card className="overflow-hidden border bg-white/80 backdrop-blur-sm dark:bg-background/95 dark:border-border/40 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {application.company}
              {isReminderDue && !isReminderSent && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow-up reminder is due!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardTitle>
            <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
              <span>{application.position}</span>
              {application.location && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>{application.location}</span>
                </>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("px-2 py-1 rounded-full text-xs font-medium", statusColor)}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(application)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                {application.url && (
                  <DropdownMenuItem onClick={() => window.open(application.url, "_blank")}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open job listing
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(application.id)} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Applied:</span>{" "}
            {format(new Date(application.appliedDate), "MMM d, yyyy")}
          </div>
          {application.contactName && (
            <div>
              <span className="text-muted-foreground">Contact:</span> {application.contactName}
              {application.contactEmail && (
                <a href={`mailto:${application.contactEmail}`} className="ml-1 text-primary hover:underline">
                  ({application.contactEmail})
                </a>
              )}
            </div>
          )}
          {application.notes && (
            <div className="md:col-span-2 mt-2">
              <p className="text-muted-foreground mb-1">Notes:</p>
              <p className="whitespace-pre-line">{application.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="text-xs text-muted-foreground">
          {hasReminder && (
            <div className="flex items-center gap-1">
              {isReminderSent ? <CheckCircle className="h-3 w-3 text-green-500" /> : <Bell className="h-3 w-3" />}
              <span>
                Reminder: {format(new Date(application.reminder as Date), "MMM d, yyyy")}
                {isReminderSent && " (email sent)"}
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {hasReminder ? (
            <Button variant="outline" size="sm" onClick={removeReminder} className="h-8">
              <BellOff className="mr-1 h-3 w-3" /> Remove reminder
            </Button>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Bell className="mr-1 h-3 w-3" /> Set reminder
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={reminderDate} onSelect={handleReminderChange} initialFocus />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

