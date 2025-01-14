import { IPostRecord } from '@/apis/post.api'
import dayjs from 'dayjs'
import { memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface IFormattedRecord {
  image: string
  calories: string
  protein: string
  carbs: string
  fat: string
  text: string
  datetime: string
  score: number
}

interface AnalysisRecordCardProps {
  record?: IPostRecord
  showActions?: boolean
}

const FOOD_ITEM_MAPPING = {
  calories: true,
  protein: true,
  carbs: true,
  fat: true
} as const

export const AnalysisRecordCard = memo(function AnalysisRecordCard({ record, showActions }: AnalysisRecordCardProps) {
  const navigate = useNavigate()

  const formattedRecord: IFormattedRecord = useMemo(() => {
    const item = { image: '', calories: '', protein: '', carbs: '', fat: '', text: '', datetime: '', score: 0 }
    item.datetime = record ? dayjs(record.create_time * 1000).format('YYYY-MM-DD h:mm A') : ''
    item.text = record?.text ?? ''
    item.image = record?.image ?? ''
    item.score = record?.food_post_score ?? 0

    record?.food_items.forEach((foodItem) => {
      if (foodItem.name in FOOD_ITEM_MAPPING) {
        item[foodItem.name as keyof typeof FOOD_ITEM_MAPPING] = `${foodItem.value} ${foodItem.unit}`
      }
    })
    return item
  }, [record])

  function handleAnnotate() {
    navigate(`/s/${record?.comment_uid}`)
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white bg-opacity-[8%] p-6">
      {/* Food Image */}
      <div className="relative mb-4">
        {formattedRecord.image ? (
          <img
            src={formattedRecord.image}
            alt="Food"
            className="mb-5 aspect-[16/9] size-full rounded-xl bg-white/5 object-cover"
          />
        ) : (
          <div className="mb-5 aspect-[16/9] size-full rounded-xl bg-white/20 object-cover"></div>
        )}
        {formattedRecord.score && (
          <div className="absolute right-3 top-3 rounded-full bg-primary/80 px-2 py-1 text-xs text-black">
            {formattedRecord.score} Points
          </div>
        )}
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
      {/* Timestamp */}
      <div className="mt-4 text-sm text-gray-400">{formattedRecord.datetime}</div>
      {/* Comment */}
      <p className="mb-4 text-base text-white">{formattedRecord.text}</p>
      {/* Extra */}
      {showActions && (
        <>
          {record?.annotation_data ? (
            <p className="mt-auto text-base leading-[40px] text-gray-400">
              Annotated at {dayjs(record.annotation_data.create_time! * 1000).format('YYYY-MM-DD h:mm A')}
            </p>
          ) : (
            <div className="mt-auto flex">
              <button className="rounded-full bg-primary px-6 py-2 text-black" onClick={handleAnnotate}>
                Annotate
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
})
