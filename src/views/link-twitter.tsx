import { useState } from 'react'

import PageHeader from '@/components/common/page-header'
import Toast, { type TToastProps } from '@/components/twitter-page/toast'
import Tweet from '@/components/twitter-page/tweet'
import Verify from '@/components/twitter-page/verify'
import LinkWallet from '@/components/twitter-page/link-wallet'
import arrowLeftIcon from '@/assets/twitter-page/arrow-left-circle-icon.svg'

export default function HomePage() {
  const [toastData, setToastData] = useState<TToastProps>({ type: null })

  return (
    <div className="">
      <PageHeader />
      <div className="px-6">
        <div className="relative mx-auto max-w-[1200px] pb-10 pt-[60px]">
          <div className="space-y-[60px] bg-black pb-[60px] pt-10 lg:my-[80px]">
            <h2 className="flex items-center text-2xl font-bold text-white lg:text-[32px] lg:leading-[48px]">
              <img src={arrowLeftIcon} alt="" className="mr-2 size-8" />
              <span>Connect X Account</span>
            </h2>
            <LinkWallet></LinkWallet>
            <Tweet onToast={(props) => setToastData({ ...props, timeStamp: +new Date() })} />
            <Verify onToast={(props) => setToastData({ ...props, timeStamp: +new Date() })} />
          </div>
        </div>
      </div>
      <Toast type={toastData.type} message={toastData.message} timeStamp={toastData.timeStamp} />
    </div>
  )
}
