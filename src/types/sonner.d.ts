declare module 'sonner' {
  import { ReactNode } from 'react'

  type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'
  type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

  interface ToastOptions {
    id?: string
    type?: ToastType
    title?: ReactNode
    description?: ReactNode
    duration?: number
    position?: ToastPosition
    action?: {
      label: string
      onClick: () => void
    }
    cancel?: {
      label: string
      onClick: () => void
    }
    onDismiss?: () => void
    onAutoClose?: () => void
  }

  interface ToasterProps {
    theme?: 'light' | 'dark' | 'system'
    position?: ToastPosition
    expand?: boolean
    richColors?: boolean
    closeButton?: boolean
    className?: string
    toastOptions?: {
      classNames?: {
        toast?: string
        title?: string
        description?: string
        actionButton?: string
        cancelButton?: string
      }
    }
  }

  export function toast(options: ToastOptions): void
  export function toast(message: string, options?: Omit<ToastOptions, 'title'>): void
  
  export const Toaster: React.FC<ToasterProps>
  
  export default toast
} 