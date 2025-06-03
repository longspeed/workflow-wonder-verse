
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        // Convert title and description to string for SimpleToast
        const message = String(description || title || '');
        
        return (
          <Toast 
            key={id} 
            message={message} 
            onClose={() => {}} 
            {...props}
          />
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
