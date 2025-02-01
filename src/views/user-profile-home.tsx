import PageHeader from '@/components/common/page-header'
import { useAuthStore } from '@/stores/auth.store'
import { userStoreActions, useUserStore } from '@/stores/user.store'
import { shortenAddress } from '@/utils/shorten-address'
import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MuscleMeowImage from '@/assets/user-profile/muscle-meow.webp'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import toast from '@/components/ui/toast'
import { IAccountScoreItem } from '@/apis/account.api'
import { cn } from '@udecode/cn'
import ClaimModal from '@/components/user-profile-home/claim-modal'

import { Connection, PublicKey } from '@solana/web3.js'
import { utils, AnchorProvider, Program } from '@coral-xyz/anchor'
import { IDL, Airdrop } from '@/target/idl'
import * as spl from '@solana/spl-token'
import Spin from '@/components/ui/spin'

dayjs.extend(utc)
// function sleep(time: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time)
//   })
// }

const UserProfileHome: React.FC = () => {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const { twitter_user_name, score, sol_token, airdropList } = useUserStore()
  const { publicKey } = useWallet()
  const { setVisible } = useWalletModal()
  const wallet = useAnchorWallet()
  const [loading, setLoading] = useState(false)
  const [isClaimed, setIsClaimed] = useState(false)
  const [points, setPoints] = useState(0)
  console.log(wallet)

  useEffect(() => {
    console.log(token, publicKey)
    if (!token || !publicKey) return

    userStoreActions.getUserInfo(publicKey?.toString() || '')
    userStoreActions.getAccountScore(publicKey?.toString() || '', 1)
  }, [token, publicKey])

  const handleCheckIn = () => {
    navigate('/checkin')
  }

  async function claimSol(item: IAccountScoreItem) {
    if (!publicKey || publicKey?.toString() === '') {
      toast.info('Please connect wallet')
      return
    }
    if ([2, 3].includes(item.claim_status)) return
    setLoading(true)
    try {
      const mint = new PublicKey(import.meta.env.VITE_SOLANT_MINT)
      const rpcURL = import.meta.env.VITE_SOLANA_RPC_URL
      const connection = new Connection(rpcURL)

      if (!wallet) return
      console.log('wallet====', wallet)
      const provider = new AnchorProvider(connection, wallet)
      const program = new Program(IDL as Airdrop, provider)
      const [configPDA] = PublicKey.findProgramAddressSync([utils.bytes.utf8.encode('config')], program.programId)
      const vault = spl.getAssociatedTokenAddressSync(mint, configPDA, true)
      console.log(mint)
      const tx_hash = await program.methods
        .claim()
        .accounts({
          recipient: publicKey?.toString(),
          vault,
          mint
        })
        .rpc()
      console.log(tx_hash)
      const confirmRes = await connection.confirmTransaction(tx_hash, 'finalized')
      console.log(confirmRes)
      await connection.confirmTransaction(tx_hash)
      const [userPDA] = PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode('claim-states'), publicKey!.toBuffer()],
        program.programId
      )
      const claimState = await program.account.claimState.fetch(userPDA)
      console.log(claimState.claimed)
      if (!claimState.claimed) return
      // await sleep(2000)
      const res = await userStoreActions.exchangeScore({
        exchange_id: item.exchange_id,
        user_id: publicKey?.toString() ?? '',
        hash: '',
        score: item.score ?? 0,
        token: item.score ?? 0,
        claim_status: 2
      })
      console.log(res)
      if (res?.claim_status === 3) {
        setIsClaimed(true)
        setPoints(item.score ?? 0)
      }
      userStoreActions.getUserInfo(publicKey?.toString() || '')
      userStoreActions.getAccountScore(publicKey?.toString() || '', 1)
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  const getFormattedDate = (timestamp: number) => {
    const utcTime = dayjs.utc(timestamp * 1000).format()
    const time1 = utcTime.split('T')
    const time2 = time1[0].split('-')
    return [time2[1], time2[2], time2[0]].join('/') + ' UTC ' + time1[1].slice(0, time1[1].length - 1)
  }

  return (
    <div className="text-white">
      <PageHeader></PageHeader>
      <ClaimModal isOpen={isClaimed} points={points} onClose={() => setIsClaimed(false)} />
      <div className="px-6">
        <div className="mx-auto max-w-[1200px] pt-[120px] text-white">
          <h1 className="mb-12 text-4xl font-bold">User Profile Home</h1>
          <Spin loading={loading}>
            {/* Wallet Address Section */}
            <div className="mb-12 flex gap-6">
              <div className="flex flex-1 flex-col gap-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="mb-2 block shrink-0 text-lg sm:basis-[132px]">Total points</label>
                  <div className="w-full rounded border border-white/10 bg-primary/10 px-3 text-white">
                    <strong className="text-2xl leading-[50px] text-primary">
                      {score > 1 ? `${score} points` : `${score} point`}
                    </strong>
                  </div>
                  <button
                    onClick={() => navigate('/reward/history')}
                    className="rounded bg-primary px-4 py-3 font-semibold text-black hover:bg-primary/80 disabled:opacity-40"
                  >
                    History
                  </button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="mb-2 block shrink-0 text-lg sm:basis-[132px]">Redeemed token</label>
                  <div className="w-full rounded border border-white/10 bg-primary/10 px-3 text-white">
                    <strong className="text-2xl leading-[50px] text-primary">
                      {sol_token > 1 ? `${sol_token} IFSCI` : `${sol_token} IFSCI`}
                    </strong>
                  </div>
                  <button
                    onClick={() => navigate('/redeem/history')}
                    className="rounded bg-primary px-4 py-3 font-semibold text-black hover:bg-primary/80 disabled:opacity-40"
                  >
                    History
                  </button>
                </div>
              </div>
              <div className="shrink-0">
                <img className="h-[220px]" src={MuscleMeowImage} alt="" />
              </div>
            </div>

            <div className="rounded-xl bg-[#FFFFFF14]">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Season</th>
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Start Date - End Date</th>
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Points</th>
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Release</th>
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {airdropList?.map((item, index) => {
                    return (
                      <tr key={index} className="border-b border-white/10">
                        <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4">
                          <span>{item.name}</span>
                          <div className="rounded-[100px] bg-[#A4EF3014] px-3 py-1 text-sm leading-[22px] text-[#A4EF30]">
                            Current
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          01/05/2025 UTC 00:00:00 - {getFormattedDate(item.end_time)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{+item.score} Points</td>
                        <td className="whitespace-nowrap px-6 py-4">{getFormattedDate(item.release_time)}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div
                            className={cn(
                              'mx-3 cursor-pointer text-base text-[#A4EF30]',
                              [2, 3].includes(item.claim_status) ? 'opacity-40' : ''
                            )}
                            onClick={() => claimSol(item)}
                          >
                            Claim
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="border-b border-white/10">
                    <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4">
                      <span>First Season</span>
                      <div className="rounded-[100px] bg-[#A4EF3014] px-3 py-1 text-sm leading-[22px] text-[#A4EF30]">
                        Coming Soon
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cards Grid */}
            <div className="mt-[48px] grid grid-cols-1 gap-6 md:grid-cols-3">
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
          </Spin>
        </div>
      </div>
    </div>
  )
}

export default UserProfileHome
