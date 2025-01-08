import PageHeader from '@/components/common/page-header'
import { profileStoreActions, useProfileStore } from '@/stores/profile.store'
import { shortenAddress } from '@/utils/shorten-address'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spin from '@/components/ui/spin'
import { AnalysisRecordCard } from '@/components/user-profile/analysis-record-card'
import { userStoreActions, useUserStore } from '@/stores/user.store'
import { Pagination } from '@/components/ui/pagination'

interface UserProfileProps {
  className?: string
}

const RecordsList = () => {
  const { records, total, pageSize } = useProfileStore()
  const params = useParams()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!params.address) return
    setLoading(true)
    profileStoreActions
      .getAnalysisRecords(params.address, page)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [params.address, page])

  const totalPage = useMemo(() => {
    return Math.ceil(total / pageSize)
  }, [total, pageSize])

  return (
    <Spin loading={loading}>
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {records.map((record, index) => (
          <AnalysisRecordCard record={record} key={index}></AnalysisRecordCard>
        ))}
      </div>
      <div>
        <Pagination current={page} total={totalPage} onChange={(page) => setPage(page)}></Pagination>
      </div>
    </Spin>
  )
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const params = useParams()
  const { publicKey } = useWallet()
  const { twitter_user_name } = useUserStore()
  const navigate = useNavigate()

  const isMyProfile = useMemo(() => {
    const address = publicKey?.toString()
    return address === params.address
  }, [publicKey, params.address])

  function handleLinkTwitter() {
    navigate('/link/twitter')
  }

  useEffect(() => {
    if (!publicKey) return
    userStoreActions.getTwitterUserInfo(publicKey.toString())
  }, [publicKey])

  function handleShareTwitter() {
    const shareLink = `https://ifsci.wtf/profile/${publicKey?.toString()}`
    const shareText = `Check out my food analysis records on ifsci.wtf!`
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`
    window.open(url, '_blank')
  }

  function handleHaveATry() {
    const shareText = `@${import.meta.env.VITE_TWITTER_BOT},  `
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank')
  }

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
            <h1 className="text-lg font-bold sm:text-3xl">Food Analysis Records</h1>
            {isMyProfile && twitter_user_name && (
              <button
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-black"
                onClick={handleShareTwitter}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share
              </button>
            )}
            {!isMyProfile && (
              <button
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-black"
                onClick={handleHaveATry}
              >
                Have a try
              </button>
            )}
          </div>
          {/* Grid of Food Records */}

          {!twitter_user_name && isMyProfile && (
            <div className="flex w-full items-center justify-center rounded-2xl border border-white/20 py-20">
              <button
                onClick={handleLinkTwitter}
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-black"
              >
                Link Twitter
              </button>
            </div>
          )}
          <RecordsList />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
