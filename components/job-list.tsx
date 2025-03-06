"use client"

import { useState, useEffect } from "react"
import { JobCard } from "@/components/job-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { JobApplication } from "@/types/job-application"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { checkReminders } from "@/lib/reminder-utils"
import { Skeleton } from "@/components/ui/skeleton"

interface JobListProps {
  applications: JobApplication[]
  onEdit: (application: JobApplication) => void
  onDelete: (id: string) => void
  onUpdate: (application: JobApplication) => void
  isLoading: boolean
}

export function JobList({ applications, onEdit, onDelete, onUpdate, isLoading }: JobListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([])

  // Check for reminders when component mounts
  useEffect(() => {
    checkReminders(applications)
  }, [applications])

  // Filter and sort applications
  useEffect(() => {
    let result = [...applications]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (app) =>
          app.company.toLowerCase().includes(term) ||
          app.position.toLowerCase().includes(term) ||
          app.location?.toLowerCase().includes(term),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((app) => app.status === statusFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "company":
          return a.company.localeCompare(b.company)
        case "status":
          return a.status.localeCompare(b.status)
        case "date":
        default:
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      }
    })

    setFilteredApplications(result)
  }, [applications, searchTerm, statusFilter, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-white/80 backdrop-blur-sm dark:bg-card/30 dark:border-border/40 border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-8 bg-white/80 dark:bg-background/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-white/80 dark:bg-background/50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="wishlist">Wishlist</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] bg-white/80 dark:bg-background/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date (newest)</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border bg-white/80 dark:bg-background/95 dark:border-border/40"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                  <Skeleton className="h-8 w-[100px] rounded-full" />
                </div>
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No applications yet. Add your first job application!
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">No applications match your search criteria.</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                Showing {filteredApplications.length} of {applications.length} applications
              </div>
              <div className="flex gap-2">
                {statusFilter !== "all" && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {statusFilter}
                    <button
                      onClick={() => setStatusFilter("all")}
                      className="ml-1 hover:text-destructive"
                      aria-label="Clear filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {searchTerm && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-1 hover:text-destructive"
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 animate-in fade-in-50 duration-500">
              {filteredApplications.map((application, index) => (
                <div
                  key={application.id}
                  className="transition-all"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <JobCard application={application} onEdit={onEdit} onDelete={onDelete} onUpdate={onUpdate} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

