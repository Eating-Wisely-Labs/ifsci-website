import PageHeader from '@/components/common/page-header'
import { useAuthStore } from '@/stores/auth.store'
import { userStoreActions, useUserStore } from '@/stores/user.store'
import { shortenAddress } from '@/utils/shorten-address'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MuscleMeowImage from '@/assets/user-profile/muscle-meow.webp'

const UserProfileHome: React.FC = () => {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const { twitter_user_name, score } = useUserStore()
  const { publicKey } = useWallet()
  const { setVisible } = useWalletModal()

  useEffect(() => {
    console.log(token, publicKey)
    if (!token || !publicKey) return

    userStoreActions.getUserInfo(publicKey?.toString() || '')
  }, [token, publicKey])

  const handleCheckIn = () => {
    navigate('/checkin')
  }

  return (
    <div className="text-white">
      <PageHeader></PageHeader>
      <div className="px-6">
        <div className="mx-auto max-w-[1200px] pt-[120px] text-white">
          <h1 className="mb-12 text-4xl font-bold">User Profile Home</h1>

          {/* Wallet Address Section */}
          <div className="mb-20 flex gap-6">
            <div className="flex flex-1 flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="mb-2 block shrink-0 text-lg sm:basis-[132px]">Wallet address</label>
                {publicKey && token ? (
                  <div className="w-full rounded border border-white/10 bg-[#111111] px-3 leading-[50px] text-white">
                    {shortenAddress(publicKey?.toString() || '')}
                  </div>
                ) : (
                  <button className="h-[52px] rounded-md bg-primary px-4 text-black" onClick={() => setVisible(true)}>
                    Connect Wallet
                  </button>
                )}
              </div>

              {/* Twitter Account Section */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="mb-2 block shrink-0 text-lg sm:basis-[132px]">X account</label>
                {token && twitter_user_name ? (
                  <div className="w-full rounded border border-white/10 bg-[#111111] px-3 leading-[50px] text-white">
                    @{twitter_user_name}
                  </div>
                ) : (
                  <button
                    disabled={!token}
                    className="h-[52px] rounded-md bg-primary px-4 text-black disabled:opacity-40"
                    onClick={() => navigate('/link/x')}
                  >
                    Link X
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="mb-2 block shrink-0 text-lg sm:basis-[132px]">Total points</label>
                <div className="w-full rounded border border-white/10 bg-primary/10 px-3 text-white">
                  <strong className="text-2xl leading-[50px] text-primary">
                    {score > 1 ? `${score} points` : `${score} point`}
                  </strong>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <img className="h-[220px]" src={MuscleMeowImage} alt="" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Daily Check in Card */}
            <div className="rounded-lg border-b border-primary bg-primary/10 p-6">
              <h2 className="mb-8 text-center text-2xl font-bold">Daily Check in</h2>
              <button
                disabled={!token}
                onClick={handleCheckIn}
                className="w-full rounded bg-primary py-3 text-center font-semibold text-black hover:bg-primary/80 disabled:opacity-40"
              >
                Check In
              </button>
            </div>

            {/* Food Analysis Records Card */}
            <div className="rounded-lg bg-white/10 p-6">
              <h2 className="mb-8 text-center text-2xl font-bold">Food Analysis Records</h2>
              <button
                disabled={!token}
                onClick={() => navigate(`/profile/${publicKey?.toString()}`)}
                className="w-full rounded bg-white py-3 text-center font-semibold text-black hover:bg-gray-100 disabled:opacity-40"
              >
                View More
              </button>
            </div>

            {/* Food Annotation Records Card */}
            <div className="rounded-lg bg-white/10 p-6">
              <h2 className="mb-8 text-center text-2xl font-bold">Food Annotation Records</h2>
              <button
                disabled={!token}
                onClick={() => navigate(`/annotations/${publicKey?.toString()}`)}
                className="w-full rounded bg-white py-3 text-center font-semibold text-black hover:bg-gray-100 disabled:opacity-40"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileHome
