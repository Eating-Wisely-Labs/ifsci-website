import { useCallback, useState } from 'react'

import Card from './card'
import LoadingSpinner from '@/components/ui/spinner'
import { TToastProps } from './toast'

import twitterIcon from '@/assets/twitter-page/twitter-icon.svg?url'

import api from '@/apis/twitter.api'
import { useWallet } from '@solana/wallet-adapter-react'

export default function Tweet({ onToast }: { onToast: (props: TToastProps) => void }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { publicKey } = useWallet()

  const onTweet = useCallback(async () => {
    setLoading(true)
    if (!publicKey) return

    try {
      const address = publicKey.toString()
      const { data } = await api.getTwitterUserInfo(address)
      if (data.twitter_user_name) throw new Error('You have already bound your X account.')

      const verifyRes = await api.getTwitterVerifyCode(address)
      if (!verifyRes.data?.link) throw new Error('Failed to get verification code.')
      window.open(verifyRes.data?.link, '_blank')
    } catch (e) {
      console.log(e)
      onToast({ type: 'fail', message: e.message })
    }

    setLoading(false)
  }, [publicKey, onToast])

  return (
    <div className="items-center lg:flex lg:gap-[60px]">
      <div className="mt-1 flex-1 space-y-6 py-6 text-white">
        <h3 className="text-lg font-bold lg:text-xl">STEP 2</h3>
        <p className="font-normal tracking-tighter lg:text-lg">
          Click this button below and post a verification message on X
        </p>
        <button
          disabled={!publicKey}
          className={
            'flex min-w-[108px] items-center justify-center gap-2 rounded-[4px] bg-primary py-3 text-sm font-semibold text-[#1C1C26] disabled:cursor-not-allowed disabled:opacity-25'
          }
          onClick={onTweet}
        >
          {loading && <LoadingSpinner />}
          <span>
            <img src={twitterIcon} className="h-5" />
          </span>
          <span>Tweet</span>
        </button>
      </div>
      <Card>
        <div className="h-full w-[60px] rounded-full bg-primary"></div>
      </Card>
    </div>
  )
}
