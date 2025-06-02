import { toast } from "sonner"

export { toast }

export function Sonner() {
  return (
    <div
      className="toaster group"
      style={{
        '--toast-bg': 'var(--background)',
        '--toast-text': 'var(--foreground)',
        '--toast-border': 'var(--border)',
        '--toast-shadow': 'var(--shadow-lg)',
        '--toast-description': 'var(--muted-foreground)',
        '--toast-action-bg': 'var(--primary)',
        '--toast-action-text': 'var(--primary-foreground)',
        '--toast-cancel-bg': 'var(--muted)',
        '--toast-cancel-text': 'var(--muted-foreground)',
      } as React.CSSProperties}
    >
      <div className="toast-container" />
    </div>
  )
}

export const Toaster = Sonner
