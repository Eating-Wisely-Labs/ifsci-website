import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import PageHeader from '@/components/common/page-header'
import { Pagination } from '@/components/ui/pagination'
import { useWallet } from '@solana/wallet-adapter-react'
import { redeemStoreActions, useredeemStore } from '@/stores/redeem.store'
import dayjs from 'dayjs'
import Spin from '@/components/ui/spin'

const RewardHistory: React.FC = () => {
  const navigate = useNavigate()
  const { records, total, pageSize } = useredeemStore()
  const [loading, setLoading] = useState(false)
  const { publicKey } = useWallet()
  const [page, setPage] = useState(1)
  const [noData, setNoData] = useState(false)

  const totalPages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])

  useEffect(() => {
    if (!publicKey) return

    setLoading(true)
    redeemStoreActions
      .getRedeemedList(publicKey.toString(), page)
      .then((data) => {
        if (data.count === 0) setNoData(true)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [publicKey, page])

  const getFormattedDate = (timestamp: number) => {
    return dayjs(timestamp * 1000).format('YYYY-MM-DD h:mm A')
  }

  return (
    <>
      <PageHeader />
      <div className="px-6 pt-[100px]">
        <div className="mx-auto max-w-[1200px] text-white">
          <div className="mb-16 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
            >
              <ChevronLeft className="size-6" />
            </button>
            <h1 className="text-3xl font-bold">Redeem History</h1>
          </div>

          <Spin loading={loading}>
            {noData ? (
              <div className="flex h-[120px] items-center justify-center rounded-2xl border border-white/15">
                No Data
              </div>
            ) : (
              <>
                <div className="mb-6 overflow-hidden rounded-lg bg-white/5 backdrop-blur">
                  <div className="grid grid-cols-[1fr_1fr_auto] border-b border-white/10 px-6 py-4">
                    <div className="text-sm text-white/60">Date</div>
                    <div className="text-sm text-white/60">Redeemed Points</div>
                    <div className="text-sm text-white/60">Earned Tokens</div>
                  </div>
                  <div className="divide-y divide-white/10">
                    {records.map((record, index) => (
                      <div key={index} className="grid grid-cols-[1fr_1fr_auto] items-center px-6 py-4">
                        <div>{getFormattedDate(record.finish_time)}</div>
                        <div>{record.redeemed_points}</div>
                        <div>
                          <span className="rounded-full bg-primary px-3 py-1 text-sm text-black">
                            {record.earned_tokens} Tokens
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Pagination current={page} total={totalPages} onChange={setPage} />
                </div>
              </>
            )}
          </Spin>
        </div>
      </div>
    </>
  )
}

export default RewardHistory
