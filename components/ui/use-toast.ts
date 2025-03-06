"use client"

import { useState, useEffect, useCallback } from "react"

type ToastType = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const toast = useCallback(({ title, description, variant = "default", duration = 5000 }: Omit<ToastType, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant, duration }])
    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  useEffect(() => {
    const timers = toasts.map((toast) => {
      const timer = setTimeout(() => {
        dismiss(toast.id)
      }, toast.duration)
      return { id: toast.id, timer }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer.timer))
    }
  }, [toasts, dismiss])

  return { toast, dismiss, toasts }
}

