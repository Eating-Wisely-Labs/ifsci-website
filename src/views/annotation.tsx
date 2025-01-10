import { useEffect, useMemo, useState } from 'react'
import PageHeader from '@/components/common/page-header'
import AnnotationInput from '@/components/annotation/annotation-input'
import { useParams } from 'react-router-dom'
import { AnalysisRecordCard } from '@/components/user-profile/analysis-record-card'
import { HelpCircle } from 'lucide-react'
import { useAuthStore } from '@/stores/auth.store'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import postApi, { IPostRecord, IAnnotationData, IAnnotationResult } from '@/apis/post.api'
import Spin from '@/components/ui/spin'
import { useWallet } from '@solana/wallet-adapter-react'
import AnnotationDialog from '@/components/annotation/annotation-dialog'

interface AnnotationProps {
  className?: string
}

export default function Annotation({ className }: AnnotationProps) {
  const [annotationData, setAnnotationData] = useState<IAnnotationData>({
    content: '',
    images: []
  })

  const [record, setRecord] = useState<IPostRecord>()
  const [submitResult, setSubmitResult] = useState<IAnnotationResult>()
  const [submitStatus, setSubmitStatus] = useState<'loading' | 'success' | 'error' | 'fail'>()
  const params = useParams()
  const { token } = useAuthStore()
  const { setVisible } = useWalletModal()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (!params.id) return
    postApi.getPostDetail(params.id).then((res) => setRecord(res.data))
  }, [params.id])

  const canSubmit = useMemo(() => {
    return !!annotationData.content
  }, [annotationData.content])

  const handleSubmit = async () => {
    try {
      const address = publicKey?.toString() || ''
      const result = await postApi.getAnnotationResult({ user_id: address, code: params.id || '' })
      if (result.data) {
        setSubmitStatus('fail')
        setSubmitResult({ level: 1, reason: 'You have already submitted the annotation.', score: 0 })
        return
      }
      setSubmitStatus('loading')
      const res = await postApi.submitAnnotation({
        user_id: publicKey?.toString() || '',
        comment_uid: record?.comment_uid || '',
        content: annotationData.content,
        images: annotationData.images
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
                href="https://docs.google.com/document/d/1ZqgFy68jnAQHwgbE5RoKJhXVNHxPNJpP0YlPQa_W6Uc/edit?usp=sharing"
                target="_blank"
                className="flex items-center gap-2 text-primary"
              >
                <HelpCircle />
                Help
              </a>
            </div>

            <div className="grid grid-cols-1 gap-8 text-white md:grid-cols-2">
              {/* Left Column - Food Card */}
              <Spin loading={!record}>
                <AnalysisRecordCard record={record}></AnalysisRecordCard>
              </Spin>
              {/* Right Column - Annotation Form */}
              <div className="rounded-2xl bg-white/10 p-6">
                <h2 className="mb-4 text-2xl font-bold">Submit valid data annotation descriptions to earn rewards.</h2>
                <p className="mb-8 text-gray-400">Random or fake entries will not be rewarded.</p>

                {token ? (
                  <>
                    <div className="mb-6">
                      <AnnotationInput
                        value={annotationData}
                        onChange={setAnnotationData}
                        placeholder="Please enter the data annotation description"
                      />
                    </div>

                    <button
                      disabled={!canSubmit}
                      onClick={handleSubmit}
                      className="w-full rounded-lg bg-primary px-6 py-3 text-center text-black transition-all hover:bg-primary/90 disabled:opacity-25 md:min-w-32"
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setVisible(true)}
                    className="w-full rounded-full bg-primary px-6 py-3 text-center text-black transition-all hover:bg-primary/90"
                  >
                    Feedback
                  </button>
                )}
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
