"use client"

import { useState, useEffect } from "react"
import { JobList } from "@/components/job-list"
import { JobForm } from "@/components/job-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { JobApplication } from "@/types/job-application"
import { useToast } from "@/components/ui/use-toast"

export function JobTracker() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Fetch applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/applications")
        if (!response.ok) {
          throw new Error("Failed to fetch applications")
        }
        const data = await response.json()
        setApplications(data)
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Failed to load your applications",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [toast])

  const addApplication = async (application: JobApplication) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
      })

      if (!response.ok) {
        throw new Error("Failed to add application")
      }

      const newApplication = await response.json()
      setApplications([...applications, newApplication])
      setIsFormOpen(false)
      toast({
        title: "Success",
        description: "Application added successfully",
      })
    } catch (error) {
      console.error("Error adding application:", error)
      toast({
        title: "Error",
        description: "Failed to add application",
        variant: "destructive",
      })
    }
  }

  const updateApplication = async (updatedApplication: JobApplication) => {
    try {
      const response = await fetch(`/api/applications/${updatedApplication.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApplication),
      })

      if (!response.ok) {
        throw new Error("Failed to update application")
      }

      const updated = await response.json()
      setApplications(applications.map((app) => (app.id === updated.id ? updated : app)))
      setEditingJob(null)
      setIsFormOpen(false)
      toast({
        title: "Success",
        description: "Application updated successfully",
      })
    } catch (error) {
      console.error("Error updating application:", error)
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      })
    }
  }

  const deleteApplication = async (id: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete application")
      }

      setApplications(applications.filter((app) => app.id !== id))
      toast({
        title: "Success",
        description: "Application deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting application:", error)
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (application: JobApplication) => {
    setEditingJob(application)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6">
      {!isFormOpen ? (
        <div className="flex justify-end">
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Application
          </Button>
        </div>
      ) : (
        <JobForm
          onSubmit={editingJob ? updateApplication : addApplication}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingJob(null)
          }}
          initialData={editingJob}
        />
      )}

      {!isFormOpen && (
        <JobList
          applications={applications}
          onEdit={handleEdit}
          onDelete={deleteApplication}
          onUpdate={updateApplication}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

