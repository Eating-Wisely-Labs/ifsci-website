import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Image } from 'lucide-react'
import commonApi from '@/apis/common.api'
import { IAnnotationData } from '@/apis/post.api'

interface AnnotationInputProps {
  value: IAnnotationData
  onChange: (value: IAnnotationData) => void
  placeholder?: string
  className?: string
}

interface AutoResizeTextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength: number
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ value, onChange, placeholder, maxLength }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [value])

  return (
    <textarea
      maxLength={maxLength}
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full resize-none bg-white/0 outline-none"
    />
  )
}

export default function AnnotationInput({ value, onChange, placeholder, className }: AnnotationInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleTextChange = (text: string) => {
    onChange({
      ...value,
      content: text
    })
  }

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      // Generate base64 preview first
      const base64Preview = await getBase64(file)

      // Upload file in background
      const res = await commonApi.uploadFile(file)

      onChange({
        ...value,
        images: [
          ...value.images,
          {
            name: file.name,
            url: res.data.url,
            preview: base64Preview
          }
        ]
      })
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDeleteImage = (indexToDelete: number) => {
    onChange({
      ...value,
      images: value.images.filter((_, index) => index !== indexToDelete)
    })
  }

  return (
    <div className={className}>
      <div className="relative">
        <div className="min-h-[300px] w-full resize-none rounded-lg bg-white/5 p-4 pb-16 text-white ring-1 ring-primary/0 placeholder:text-gray-500 focus-within:ring-primary">
          <AutoResizeTextarea
            value={value.content}
            onChange={handleTextChange}
            placeholder={placeholder}
            maxLength={500}
          />

          {/* Upload Button */}
          <div className="absolute bottom-4 right-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-white transition-all hover:bg-white/20"
            >
              <Image size={20} />
              {uploading ? 'Uploading...' : 'Add Image'}
            </button>
          </div>

          {value.images.length > 0 && (
            <div className="mt-4 flex gap-4">
              {value.images.map((image, index) => (
                <div key={image.url} className="group relative size-20 overflow-hidden rounded-lg">
                  <img src={image.preview || image.url} alt={image.name} className="size-full object-cover" />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute right-1 top-1 hidden size-6 items-center justify-center rounded-full bg-black/50 text-sm text-white transition-all hover:bg-black/80 group-hover:flex"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
