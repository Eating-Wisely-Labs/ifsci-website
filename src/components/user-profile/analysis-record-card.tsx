import { IAnalysisRecord } from '@/apis/user.api'
import dayjs from 'dayjs'
import { memo, useMemo } from 'react'

interface IFormattedRecord {
  image: string
  calories: string
  protein: string
  carbs: string
  fat: string
  text: string
  datetime: string
}

interface AnalysisRecordCardProps {
  record: IAnalysisRecord
}

export const AnalysisRecordCard = memo(function AnalysisRecordCard({ record }: AnalysisRecordCardProps) {
  const formattedRecord: IFormattedRecord = useMemo(() => {
    const item = { image: '', calories: '', protein: '', carbs: '', fat: '', text: '', datetime: '' }
    item.datetime = dayjs(record.create_time * 1000).format('YYYY-MM-DD h:mm A')
    item.text = record.text
    return item
  }, [record])

  return (
    <div className="overflow-hidden rounded-xl bg-white bg-opacity-[8%] p-6">
      {/* Food Image */}
      <div className="relative">
        <img
          src={formattedRecord.image}
          alt="Food"
          className="mb-5 aspect-[16/9] size-full rounded-xl bg-white object-cover"
        />
      </div>

      {/* Nutrition Info */}
      <div className="rounded-lg bg-white bg-opacity-[8%]">
        <div className="rounded-t-lg bg-[#9eff00] px-3 py-2 text-black">
          <div className="flex justify-between">
            <span>Calories:</span>
            <span>{formattedRecord.calories} kcal</span>
          </div>
        </div>

        <div className="space-y-2 px-3 py-2 text-gray-300">
          <div className="flex justify-between">
            <span>Protein:</span>
            <span>{formattedRecord.protein}g</span>
          </div>
          <div className="flex justify-between">
            <span>Carbs:</span>
            <span>{formattedRecord.carbs}g</span>
          </div>
          <div className="flex justify-between">
            <span>Fat:</span>
            <span>{formattedRecord.fat}g</span>
          </div>
        </div>
      </div>
      {/* Comment */}
      <p className="mt-4 text-sm text-white">{formattedRecord.text}</p>

      {/* Timestamp */}
      <div className="mt-4 text-sm text-gray-400">{formattedRecord.datetime}</div>
    </div>
  )
})
