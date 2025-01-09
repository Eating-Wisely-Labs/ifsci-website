import { IAnalysisRecord } from '@/apis/user.api'
import { memo } from 'react'

interface AnnotationItemProps {
  record?: IAnalysisRecord
  className?: string
  images?: string[]
  description?: string
  points?: number
}

export const AnnotationItem = memo(function AnnotationItem({
  record,
  className,
  images = [],
  description,
  points
}: AnnotationItemProps) {
  return (
    <div className={`flex gap-6 rounded-2xl bg-black/50 p-6 ${className || ''}`}>
      {/* Main Image */}
      <div className="flex-1">
        <img src={record?.image} alt="Food" className="aspect-[4/3] w-full rounded-xl bg-white/5 object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Description */}
        <div className="mb-6 flex-1">
          <p className="text-base text-white">{description}</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative w-full overflow-hidden rounded-lg">
              <img src={image} alt={`Reference ${index + 1}`} className="size-full object-cover" />
            </div>
          ))}
        </div>

        {/* Points */}
        {typeof points === 'number' && (
          <div className="mt-4 self-end rounded-full bg-[#65D01E] px-4 py-1 text-sm font-medium text-black">
            {points} Points
          </div>
        )}
      </div>
    </div>
  )
})
