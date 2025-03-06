import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

// Get a specific application
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const application = await prisma.jobApplication.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    // Check if the application belongs to the current user
    if (application.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// Update an application
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if the application exists and belongs to the user
    const existingApplication = await prisma.jobApplication.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingApplication) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    if (existingApplication.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const data = await request.json()

    const application = await prisma.jobApplication.update({
      where: {
        id: params.id,
      },
      data: {
        ...data,
        appliedDate: new Date(data.appliedDate),
        reminder: data.reminder ? new Date(data.reminder) : null,
      },
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// Delete an application
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if the application exists and belongs to the user
    const existingApplication = await prisma.jobApplication.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingApplication) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    if (existingApplication.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    await prisma.jobApplication.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Application deleted" })
  } catch (error) {
    console.error("Error deleting application:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

