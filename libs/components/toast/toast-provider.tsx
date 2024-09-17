'use client'
import { createContext, useState } from 'react'

import { ToastMessage } from './toast-message'

type Toast = {
  id: number
  message: string
  title?: string
  type: 'success' | 'error'
}

type AddToastProps = {
  message: string
  title?: string
  type: 'success' | 'error'
}

export const ToastContext = createContext<{
  addToast: ({ message, title, type }: AddToastProps) => void
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addToast: () => {},
})

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [id, setId] = useState(0)

  const addToast = ({ message, title, type }: AddToastProps) => {
    setToasts([...toasts, { id, message, title, type }])
    setId(id + 1)
  }

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider
      value={{
        addToast,
      }}
    >
      {children}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex flex-col gap-4 items-start px-4 py-6 sm:py-14 justify-end"
        style={{ zIndex: 9999 }}
      >
        {toasts.map((toast) => (
          <ToastMessage
            key={toast.id}
            message={toast.message}
            title={toast.title}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
