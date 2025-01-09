import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/page-header'
import AnnotationInput, { AnnotationData } from '@/components/annotation/annotation-input'
import { useParams } from 'react-router-dom'
import { AnalysisRecordCard } from '@/components/user-profile/analysis-record-card'
import userApi, { IAnalysisRecord } from '@/apis/user.api'
import { HelpCircle } from 'lucide-react'

interface AnnotationProps {
  className?: string
}

export default function Annotation({ className }: AnnotationProps) {
  const [annotationData, setAnnotationData] = useState<AnnotationData>({
    text: '',
    images: []
  })

  const [record, setRecord] = useState<IAnalysisRecord>()
  const params = useParams()

  useEffect(() => {
    if (!params.id) return
    userApi.getAnalysisRecord(params.id).then((res) => {
      setRecord(res.data)
    })
  }, [params.id])

  const handleSubmit = () => {
    console.log('Submitting:', annotationData)
  }

  return (
    <div className={`bg-black py-[100px] text-white ${className || ''}`}>
      <PageHeader />
      <div className="px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Food Annotation</h1>
            <a
              className="rounded-full border border-white px-4 py-2"
              href="https://fasting.super.site/level-up-your-labels"
              target="_blank"
            >
              <HelpCircle className="mr-2 inline-block" size={18} />
              Help
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column - Food Card */}
            <AnalysisRecordCard record={record}></AnalysisRecordCard>

            {/* Right Column - Annotation Form */}
            <div className="rounded-2xl bg-[#1A1A1A] p-6">
              <h2 className="mb-4 text-2xl font-bold">Submit valid data annotation descriptions to earn rewards.</h2>
              <p className="mb-8 text-gray-400">Random or fake entries will not be rewarded.</p>

              <div className="mb-6">
                <AnnotationInput
                  value={annotationData}
                  onChange={setAnnotationData}
                  placeholder="Please enter the data annotation description"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full rounded-full bg-primary px-6 py-3 text-center text-black transition-all hover:bg-primary/90"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
