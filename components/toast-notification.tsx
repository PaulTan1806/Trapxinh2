"use client"

import { CheckCircle2 } from "lucide-react"

interface ToastNotificationProps {
  message: string | null
}

export default function ToastNotification({ message }: ToastNotificationProps) {
  if (!message) return null

  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-toast-in"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 bg-[var(--crimson-dark)] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[var(--gold)]/30 max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0" aria-hidden="true" />
        <span className="text-sm font-medium leading-snug">{message}</span>
      </div>
    </div>
  )
}
