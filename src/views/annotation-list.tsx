import PageHeader from '@/components/common/page-header'
import { annotationStoreActions, useAnnotationStore } from '@/stores/annotation.store'
import { shortenAddress } from '@/utils/shorten-address'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spin from '@/components/ui/spin'
import { userStoreActions } from '@/stores/user.store'
import { Pagination } from '@/components/ui/pagination'
import { AnnotationItem } from '@/components/annotation/annotation-item'

interface AnnotationListProps {
  className?: string
}

const RecordsList = () => {
  const { records, total, pageSize } = useAnnotationStore()
  const params = useParams()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    if (!params.address) return

    setLoading(true)
    annotationStoreActions
      .getAnnotationRecords(params.address, page)
      .then((data) => {
        if (data.count === 0) setNoData(true)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [params.address, page])

  return (
    <Spin loading={loading}>
      {noData ? (
        <div className="flex h-[120px] items-center justify-center rounded-2xl border border-white/15">No Data</div>
      ) : (
        <>
          <div className="mb-10 space-y-6">
            {records.map((record) => (
              <AnnotationItem key={record.comment_uid} record={record} />
            ))}
          </div>
          <div>
            <Pagination current={page} total={totalPages} onChange={setPage} />
          </div>
        </>
      )}
    </Spin>
  )
}

const AnnotationList: React.FC<AnnotationListProps> = ({ className }) => {
  const params = useParams()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (!publicKey) return
    userStoreActions.getTwitterUserInfo(publicKey.toString())
  }, [publicKey])

  return (
    <div className={`py-[100px] ${className || ''}`}>
      <PageHeader />
      <div className="px-6">
        <div className="mx-auto max-w-[1200px] bg-black text-white">
          {/* Wallet Address */}
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Wallet address</span>
              <div className="rounded border border-white/15 px-4 py-2">{shortenAddress(params.address || '')}</div>
            </div>
          </div>
          {/* Food Analysis Records Title */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-lg font-bold sm:text-3xl">Annotation Records</h1>
          </div>

          {/* Records List */}
          <RecordsList />
        </div>
      </div>
    </div>
  )
}

export default AnnotationList
