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
  record?: IAnalysisRecord
}

const FOOD_ITEM_MAPPING = {
  calories: true,
  protein: true,
  carbs: true,
  fat: true
} as const

export const AnalysisRecordCard = memo(function AnalysisRecordCard({ record }: AnalysisRecordCardProps) {
  const formattedRecord: IFormattedRecord = useMemo(() => {
    const item = { image: '', calories: '', protein: '', carbs: '', fat: '', text: '', datetime: '' }
    item.datetime = record ? dayjs(record.create_time * 1000).format('YYYY-MM-DD h:mm A') : ''
    item.text = record?.text ?? ''
    item.image = record?.image ?? ''

    record?.food_items.forEach((foodItem) => {
      if (foodItem.name in FOOD_ITEM_MAPPING) {
        item[foodItem.name as keyof typeof FOOD_ITEM_MAPPING] = `${foodItem.value} ${foodItem.unit}`
      }
    })
    return item
  }, [record])

  return (
    <div className="overflow-hidden rounded-xl bg-white bg-opacity-[8%] p-6">
      {/* Food Image */}
      <div className="relative">
        <img
          src={formattedRecord.image}
          alt="Food"
          className="mb-5 aspect-[16/9] size-full rounded-xl bg-white/5 object-cover"
        />
      </div>

      {/* Nutrition Info */}
      <div className="rounded-lg bg-white bg-opacity-[8%]">
        <div className="rounded-t-lg bg-white px-3 py-2 text-black">
          <div className="flex justify-between text-xl">
            <span>Calories:</span>
            <strong>{formattedRecord.calories}</strong>
          </div>
        </div>

        <div className="space-y-2 px-3 py-2 text-gray-300">
          <div className="flex justify-between">
            <span>Protein:</span>
            <span>{formattedRecord.protein}</span>
          </div>
          <div className="flex justify-between">
            <span>Carbs:</span>
            <span>{formattedRecord.carbs}</span>
          </div>
          <div className="flex justify-between">
            <span>Fat:</span>
            <span>{formattedRecord.fat}</span>
          </div>
        </div>
      </div>
      {/* Comment */}
      <p className="mt-4 text-base text-white">{formattedRecord.text}</p>

      {/* Timestamp */}
      <div className="mt-4 text-sm text-gray-400">{formattedRecord.datetime}</div>
    </div>
  )
})
