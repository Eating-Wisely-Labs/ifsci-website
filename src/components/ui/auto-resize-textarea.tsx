import { ChangeEvent, useEffect, useRef } from 'react'

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  minHeight?: number
}

export default function AutoResizeTextarea({
  value,
  onChange,
  minHeight = 100,
  className = '',
  ...props
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`
  }, [value, minHeight])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{ minHeight }}
      className={`w-full resize-none bg-white/0 text-white placeholder:text-gray-500 focus:outline-none ${className}`}
      {...props}
    />
  )
}
