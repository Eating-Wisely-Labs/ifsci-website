import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/page-header'
import { useParams } from 'react-router-dom'
import { AnalysisRecordCard } from '@/components/user-profile/analysis-record-card'
import { HelpCircle } from 'lucide-react'
import postApi, { IPostRecord, IAnnotationData, IAnnotationResult } from '@/apis/post.api'
import Spin from '@/components/ui/spin'
import { useWallet } from '@solana/wallet-adapter-react'
import AnnotationDialog from '@/components/annotation/annotation-dialog'
import AnnotationForm from '@/components/annotation/annotation-form'

interface AnnotationProps {
  className?: string
}

export default function Annotation({ className }: AnnotationProps) {
  const [record, setRecord] = useState<IPostRecord>()
  const [submitResult, setSubmitResult] = useState<IAnnotationResult>()
  const [submitStatus, setSubmitStatus] = useState<'loading' | 'success' | 'error' | 'fail'>()
  const params = useParams()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (!params.id) return
    postApi.getPostDetail(params.id).then((res) => setRecord(res.data))
  }, [params.id])

  const handleSubmit = async (formData: IAnnotationData) => {
    try {
      const address = publicKey?.toString() || ''
      const result = await postApi.getAnnotationResult({ user_id: address, code: params.id || '' })
      if (result.data && result.data.level > 1) {
        setSubmitStatus('fail')
        setSubmitResult({ level: 1, reason: 'You have already submitted the annotation.', score: 0 })
        return
      }
      setSubmitStatus('loading')
      const res = await postApi.submitAnnotation({
        user_id: publicKey?.toString() || '',
        comment_uid: record?.comment_uid || '',
        ...formData
      })
      if (res.data.level > 1) {
        setSubmitStatus('success')
        setSubmitResult(res.data)
      } else {
        setSubmitStatus('fail')
        setSubmitResult(res.data)
      }
    } catch (error) {
      console.error('Failed to submit annotation:', error)
      setSubmitStatus('error')
    }
  }

  return (
    <div className={className}>
      <PageHeader></PageHeader>
      <div className="px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="py-[80px]">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-lg font-bold text-white sm:text-3xl">Annotation</h1>
              <a
                href="https://fasting.super.site/level-up-your-labels"
                target="_blank"
                className="flex items-center gap-2 text-primary"
              >
                <HelpCircle />
                Help
              </a>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-8 text-white md:grid-cols-2">
              {/* Left Column - Food Card */}
              <Spin loading={!record}>
                <AnalysisRecordCard record={record} showActions={false}></AnalysisRecordCard>
              </Spin>
              {/* Right Column - Annotation Form */}
              <AnnotationForm handleSubmit={handleSubmit}></AnnotationForm>
            </div>
            <div className="text-white">
              <h2 className="mb-4 text-2xl">Level up your labels</h2>
              <div className="mx-auto overflow-x-auto rounded-xl bg-white/10">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-white/10 text-left">
                        <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Level</th>
                        <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Description</th>
                        <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Effort Level</th>
                        <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Reward</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="whitespace-nowrap px-6 py-4">Level 1</td>
                        <td className="px-6 py-4">
                          The annotation fails to accurately match any food details or provide relevant corrections.
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">Inaccurate</td>
                        <td className="whitespace-nowrap px-6 py-4">0</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="whitespace-nowrap px-6 py-4">Level 2</td>
                        <td className="px-6 py-4">
                          Correctly identifies basic details without enhancing the model's initial interpretation.
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">Minimal</td>
                        <td className="whitespace-nowrap px-6 py-4">10</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="whitespace-nowrap px-6 py-4">Level 3</td>
                        <td className="px-6 py-4">
                          Corrects nutritional information accurately but lacks new visual evidence.
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">Moderate</td>
                        <td className="whitespace-nowrap px-6 py-4">50</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="whitespace-nowrap px-6 py-4">Level 4</td>
                        <td className="px-6 py-4">
                          Significantly improves important food details but without additional visual support.
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">Significant</td>
                        <td className="whitespace-nowrap px-6 py-4">100</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="whitespace-nowrap px-6 py-4">Level 5</td>
                        <td className="px-6 py-4">
                          Provides accurate major improvements and includes helpful annotated images.
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">Comprehensive</td>
                        <td className="whitespace-nowrap px-6 py-4">200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnnotationDialog
        open={!!submitStatus}
        onClose={() => setSubmitStatus(undefined)}
        status={submitStatus || 'loading'}
        result={submitResult!}
      />
    </div>
  )
}
