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
      className="min-h-[120px] w-full resize-none bg-white/0 outline-none"
    />
  )
}

export default function AnnotationInput({ value, onChange, placeholder, className }: AnnotationInputProps) {
  const [localValue, setLocalValue] = useState<IAnnotationData>(value)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onChange(localValue)
  }, [localValue, onChange])

  const handleTextChange = (text: string) => {
    setLocalValue((prev) => ({ ...prev, content: text }))
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    try {
      setUploading(true)
      const uploadPromises = Array.from(files).map((file) => commonApi.uploadFile(file))
      const results = await Promise.all(uploadPromises)
      const uploadedFiles = results.map((result) => ({
        name: result.data.filename,
        url: result.data.url
      }))

      setLocalValue((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedFiles]
      }))
    } catch (error) {
      console.error('Failed to upload images:', error)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    setLocalValue((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className={className}>
      <div className="relative">
        <div className="min-h-[300px] w-full resize-none rounded-lg bg-white/0 p-4 pb-16 text-white ring-2 placeholder:text-gray-500 focus-within:ring-primary">
          <AutoResizeTextarea
            value={localValue.content}
            onChange={handleTextChange}
            placeholder={placeholder}
            maxLength={512}
          />

          {/* Image Grid */}
          {localValue.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {localValue.images.map((image, index) => (
                <div key={index} className="group relative aspect-[16/9]">
                  <img src={image.url} alt="" className="size-full rounded-lg object-cover" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-1 top-1 hidden rounded-full bg-black/50 p-1 text-white hover:bg-black group-hover:block"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="absolute bottom-4 right-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
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
      </div>
    </div>
  )
}
