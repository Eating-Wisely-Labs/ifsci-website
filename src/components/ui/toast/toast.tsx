import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Info, CircleCheckBig, CircleX } from 'lucide-react'

export type ToastType = 'info' | 'success' | 'error'

export interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose: () => void
}

const toastTypeConfig = {
  info: {
    icon: Info,
    bgColor: 'bg-[#222]',
    iconColor: 'text-[blue]',
    borderColor: 'border-[blue]'
  },
  success: {
    icon: CircleCheckBig,
    bgColor: 'bg-[#222]',
    iconColor: 'text-[green]',
    borderColor: 'border-[green]'
  },
  error: {
    icon: CircleX,
    bgColor: 'bg-[#222]',
    iconColor: 'text-[red]',
    borderColor: 'border-[red]'
  }
}

export const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  const [show, setShow] = React.useState(false)

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const config = toastTypeConfig[type]
  const Icon = config.icon

  return createPortal(
    <div
      className={`fixed left-1/2 z-[1000000] flex max-w-[80%] -translate-x-1/2 items-center rounded-full border px-4 py-3 text-white shadow-lg transition-all duration-300 ease-in-out ${config.bgColor} ${config.borderColor} ${
        show ? 'top-4 translate-y-0 opacity-100' : '-top-20 -translate-y-0 opacity-0'
      }`}
    >
      <Icon className={`size-5 ${config.iconColor} mr-2`} />
      <span className="">{message}</span>
    </div>,
    document.body
  )
}
