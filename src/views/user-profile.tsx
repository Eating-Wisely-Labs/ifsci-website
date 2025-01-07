import PageHeader from '@/components/common/page-header'
import { profileStoreActions, useProfileStore } from '@/stores/profile.store'
import { shortenAddress } from '@/utils/shorten-address'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spin from '@/components/ui/spin'
import { AnalysisRecordCard } from '@/components/user-profile/analysis-record-card'
import { ErrorBoundary } from '@/components/common/error-boundary'
import { useUserStore } from '@/stores/user.store'

interface UserProfileProps {
  className?: string
}

const RecordsList = () => {
  const { records } = useProfileStore()
  const params = useParams()
  const [page] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!params.address) return
    setLoading(true)
    profileStoreActions
      .getAnalysisRecords(params.address, page)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [params.address, page])

  return (
    <Spin loading={loading}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {records.map((record, index) => (
          <AnalysisRecordCard record={record} key={index}></AnalysisRecordCard>
        ))}
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

  return (
    <div className={`pt-[100px] ${className || ''}`}>
      <PageHeader />
      <div className="px-6">
        <div className="mx-auto max-w-[1200px] bg-black text-white">
          {/* Wallet Address */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Wallet address</span>
              <div className="rounded bg-gray-900 px-4 py-2">{shortenAddress(params.address || '')}</div>
            </div>

            {isMyProfile && (
              <button className="flex items-center gap-2 rounded-full bg-[#9eff00] px-6 py-2 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share
              </button>
            )}
          </div>

          {/* Food Analysis Records Title */}
          <h1 className="mb-8 text-3xl font-bold">Food Analysis Records</h1>
          {/* Grid of Food Records */}
          <ErrorBoundary>
            {!twitter_user_name && (
              <button
                onClick={handleLinkTwitter}
                className="flex items-center gap-2 rounded-full bg-[#9eff00] px-6 py-2 text-black"
              >
                Link Twitter
              </button>
            )}
            <RecordsList />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
