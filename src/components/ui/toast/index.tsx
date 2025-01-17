import { createRoot } from 'react-dom/client'
import { Toast, ToastType } from './toast'

class ToastService {
  private static container: HTMLElement | null = null
  private static root: ReturnType<typeof createRoot> | null = null

  private static getContainer() {
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.id = 'toast-container'
      document.body.appendChild(this.container)
      this.root = createRoot(this.container)
    }
    return this.container
  }

  private static show(message: string, type: ToastType, duration: number = 3000) {
    this.getContainer()

    if (this.root) {
      const handleClose = () => {
        if (this.root) {
          this.root.render(null)
        }
      }

      this.root.render(<Toast message={message} type={type} duration={duration} onClose={handleClose} />)
    }
  }

  static success(message: string, duration?: number) {
    this.show(message, 'success', duration)
  }

  static error(message: string, duration?: number) {
    this.show(message, 'error', duration)
  }

  static info(message: string, duration?: number) {
    this.show(message, 'info', duration)
  }
}

const toast = {
  success: ToastService.success.bind(ToastService),
  error: ToastService.error.bind(ToastService),
  info: ToastService.info.bind(ToastService)
}

export default toast
