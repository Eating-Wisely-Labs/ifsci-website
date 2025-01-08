import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/page-header'
import AnnotationInput, { AnnotationData } from '@/components/annotation/annotation-input'
import { useParams } from 'react-router-dom'

interface AnnotationProps {
  className?: string
}

export default function Annotation({ className }: AnnotationProps) {
  const [annotationData, setAnnotationData] = useState<AnnotationData>({
    text: '',
    images: []
  })

  const params = useParams()

  useEffect(() => {
    if (!params.id) return
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
            <div className="rounded-full border border-white px-4 py-2">Level up Label</div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column - Food Card */}
            <div className="rounded-2xl bg-[#1A1A1A] p-6">
              <img
                src="https://example.com/food-image.jpg" // Replace with actual image source
                alt="Food"
                className="mb-6 h-[300px] w-full rounded-lg object-cover"
              />

              <div className="mb-4 rounded-lg">
                <div className="rounded-t-lg bg-white px-4 py-2 text-black">
                  <div className="flex justify-between">
                    <span>Calories:</span>
                    <span>450 kcal</span>
                  </div>
                </div>
                <div className="space-y-2 p-4 text-black">
                  <div className="flex justify-between">
                    <span>Protein:</span>
                    <span>450 g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbs:</span>
                    <span>60 g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fat:</span>
                    <span>15 g</span>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-gray-400">
                A balanced meal with moderate calories. Good protein and carbs but could reduce fat for a healthier
                option.
              </p>

              <div className="text-sm text-gray-500">2024-01-02 07:45 PM</div>
            </div>

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
