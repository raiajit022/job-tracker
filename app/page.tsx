import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { JobTracker } from "@/components/job-tracker"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="container mx-auto py-8 px-4 md:px-6 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Job Application Tracker</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav user={session.user} />
          </div>
        </div>
        <JobTracker />
      </div>
    </main>
  )
}

