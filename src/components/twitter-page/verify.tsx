import { useCallback, useRef, useState } from 'react'

import Card from './card'
import LoadingSpinner from '@/components/ui/spinner'
import { TToastProps } from './toast'

import api from '@/apis/twitter.api'
import useCountdown from '@/hooks/use-countdown'
import { useWallet } from '@solana/wallet-adapter-react'

export default function Verify({ onToast }: { onToast: (props: TToastProps) => void }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [shareLink, setShareLink] = useState<string>('')
  const userName = useRef<string>('')

  const { remainingSeconds, start } = useCountdown()

  const { publicKey } = useWallet()

  const onVerify = useCallback(async () => {
    if (!publicKey) throw new Error('Please connect wallet first.')
    const timeStamp = +new Date()

    if (!shareLink) {
      onToast({ type: 'fail', message: '', timeStamp })
      return
    }

    if (userName.current) {
      start(60)
      return onToast({ type: 'success', message: 'Binding successful.', timeStamp })
    }

    try {
      setLoading(true)
      const res = await api.verifyTwitter(publicKey.toString(), shareLink)

      if (res.data?.status === 1) {
        userName.current = res.data.twitter_user_name
        onToast({ type: 'success', message: res.data.message, timeStamp })
      } else {
        onToast({ type: 'fail', message: res.data.message, timeStamp })
        start(60)
      }
    } catch (e) {
      console.log(e)
      onToast({ type: 'fail', message: 'Failed to verify X account' })
    } finally {
      setLoading(false)
    }
  }, [shareLink, userName, publicKey, start, onToast])

  return (
    <div className="items-center lg:flex lg:gap-[60px]">
      <div className="mt-1 flex-1 space-y-6 py-7 text-white">
        <h3 className="text-lg font-bold">STEP 3</h3>
        <p className="font-normal tracking-tighter lg:text-lg">
          Once posted, look for the share button and copy the link. Input the link below and click on "Verify" to link
          your account.
        </p>
        <div className="lg:flex lg:items-center lg:gap-3">
          <input
            type="text"
            className="w-full flex-1 rounded-[4px] border border-[#FFFFFF1F] bg-black px-4 py-3 outline-none"
            placeholder="Paste the link here"
            value={shareLink}
            onChange={(e) => setShareLink(e.target.value)}
          ></input>
          <button
            className={`mt-3 flex min-w-[108px] items-center justify-center gap-2 rounded-[4px] bg-primary py-3 text-sm font-semibold text-[#1C1C26] lg:mt-0 ${!publicKey ? 'cursor-not-allowed opacity-25' : ''}`}
            onClick={onVerify}
          >
            {remainingSeconds ? `${remainingSeconds}s` : <>{loading && <LoadingSpinner />} Verify</>}
          </button>
        </div>
      </div>
      <Card>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="24" height="24" rx="12" fill="#A4EF30" fillOpacity="0.2" />
          <path
            d="M7.44724 16.7368H17.5525V12.3158H18.8157V17.3684C18.8157 17.7172 18.5329 18 18.1841 18H6.81566C6.46685 18 6.18408 17.7172 6.18408 17.3684V12.3158H7.44724V16.7368ZM13.763 10.4211V14.2105H11.2367V10.4211H8.07882L12.4999 6L16.9209 10.4211H13.763Z"
            fill="#A4EF30"
          />
        </svg>
      </Card>
    </div>
  )
}
