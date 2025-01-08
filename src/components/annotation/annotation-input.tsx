import { ChangeEvent, useRef, useState } from 'react'
import AutoResizeTextarea from '@/components/ui/auto-resize-textarea'

export interface AnnotationData {
  text: string
  images: string[] // Base64 encoded image strings
}

interface AnnotationInputProps {
  value?: AnnotationData
  onChange?: (data: AnnotationData) => void
  placeholder?: string
  className?: string
}

export default function AnnotationInput({ value, onChange, placeholder, className }: AnnotationInputProps) {
  const [localValue, setLocalValue] = useState<AnnotationData>(value || { text: '', images: [] })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = { ...localValue, text: e.target.value }
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith('image/')) continue

      try {
        const base64 = await readFileAsBase64(file)
        newImages.push(base64)
      } catch (error) {
        console.error('Error reading file:', error)
      }
    }

    const newValue = {
      ...localValue,
      images: [...localValue.images, ...newImages]
    }
    setLocalValue(newValue)
    onChange?.(newValue)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = (index: number) => {
    const newImages = localValue.images.filter((_, i) => i !== index)
    const newValue = { ...localValue, images: newImages }
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  return (
    <div className={className}>
      <div className="relative">
        <div className="min-h-[300px] w-full resize-none rounded-lg bg-[#2A2A2A] p-4 text-white placeholder:text-gray-500 focus-within:ring-2 focus-within:ring-primary">
          <AutoResizeTextarea
            value={localValue.text}
            onChange={handleTextChange}
            placeholder={placeholder}
            minHeight={100}
          />
          {localValue.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {localValue.images.map((image, index) => (
                <div key={index} className="group relative">
                  <img src={image} alt="" className="h-24 w-full rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-2 top-2 hidden rounded-full bg-black/50 p-1 text-white group-hover:block"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="button" onClick={handleImageClick} className="absolute bottom-4 right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          className="hidden"
        />
      </div>
    </div>
  )
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to read file as base64'))
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
