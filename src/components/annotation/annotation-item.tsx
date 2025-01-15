import { IAnnotationRecord } from '@/apis/post.api'
import { memo } from 'react'

interface AnnotationItemProps {
  record?: IAnnotationRecord
  className?: string
}

export const AnnotationItem = memo(function AnnotationItem({ record, className }: AnnotationItemProps) {
  return (
    <section
      className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/50 p-4 md:flex-row ${className || ''}`}
    >
      {/* Main Image */}
      <div className="basis-2/12">
        <img src={record?.image} alt="Food" className="aspect-[4/3] w-full rounded-xl bg-white/5 object-cover" />
      </div>

      {/* Content */}
      <div className="basis-4/12">
        <h2 className="font-bold text-primary">Analysis Result: </h2>
        <p className="text-base text-white">{record?.text}</p>
      </div>

      <div className="basis-4/12">
        <h2 className="font-bold text-primary">Annotation: </h2>
        <div className="">
          {record?.annotation_data.category && (
            <p className="text-white/45">
              Category: <span className="text-white">{record.annotation_data.category}</span>
            </p>
          )}
          {record?.annotation_data.brand && (
            <p className="text-white/45">
              Brand: <span className="text-white">{record.annotation_data.brand}</span>
            </p>
          )}
          {record?.annotation_data.region && (
            <p className="text-white/45">
              Region: <span className="text-white">{record.annotation_data.region}</span>
            </p>
          )}
        </div>
        <div className="mb-4 text-white/45">
          Description: <span className="text-white">{record?.annotation_data.content}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {record?.annotation_data.images.map((file, index) => (
            <img
              src={file.url}
              alt={`Reference ${index + 1}`}
              className="aspect-[16/9] rounded-lg border border-white/10 object-cover"
            />
          ))}
        </div>
      </div>
      <div className="flex basis-2/12 items-start md:justify-end">
        <div className="inline-block rounded-full bg-[#65D01E] px-4 py-1 text-sm font-medium text-black">
          {record?.annotation_data.score} Points
        </div>
      </div>
    </section>
  )
})
