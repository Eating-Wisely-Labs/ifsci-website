import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import DotBg from '@/assets/checkin-page/dot-bg.png'
import PageHeader from '@/components/common/page-header'
import Spin from '@/components/ui/spin'
import { useWallet } from '@solana/wallet-adapter-react'
import { useUserStore } from '@/stores/user.store'
import accountApi from '@/apis/account.api'

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

const CheckinHome: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 })
  const [endOfTime, setEndTime] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const { publicKey } = useWallet()
  const { twitter_user_name } = useUserStore()

  const calculateTimeLeft = (targetTime: Dayjs) => {
    const now = dayjs()
    const diff = targetTime.diff(now, 'second')
    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 }
    }
    const hours = Math.floor(diff / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    const seconds = diff % 60
    return { hours, minutes, seconds }
  }

  useEffect(() => {
    const targetTime = dayjs(endOfTime)
    calculateTimeLeft(targetTime)
  }, [endOfTime])

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!publicKey || !twitter_user_name) return
    setLoading(true)
    accountApi
      .getUserCheckInSettings(publicKey.toString())
      .then((res) => {
        set
      })
      .catch(console.error)
    setLoading(false)
  }, [publicKey, twitter_user_name])

  const padNumber = (num: number) => num.toString().padStart(2, '0')

  return (
    <div>
      <PageHeader></PageHeader>
      <div className="px-6 pt-[100px]">
        <div className={`mx-auto max-w-[1200px] text-white`}>
          <h1 className="mb-16 text-3xl font-bold">Fasting Daily Check in</h1>
          <Spin loading={loading}>
            <div
              className="mx-auto rounded-lg bg-white/5 px-8 py-16"
              style={{ backgroundImage: `url(${DotBg})`, backgroundSize: '100% auto', backgroundPosition: 'center' }}
            >
              <h2 className="mb-12 text-center text-[36px] font-bold">Fasting Status</h2>

              <div className="mb-20 flex items-center justify-center gap-4">
                <div className="w-32 rounded-lg bg-white/10 px-6 py-10 text-center">
                  <div className="text-[60px] font-bold">{padNumber(timeLeft.hours)}</div>
                  <div className="text-white/30">hours</div>
                </div>

                <div className="text-4xl font-bold">:</div>

                <div className="w-32 rounded-lg bg-white/10 px-6 py-10 text-center">
                  <div className="text-[60px] font-bold">{padNumber(timeLeft.minutes)}</div>
                  <div className="text-white/30">minutes</div>
                </div>

                <div className="text-4xl font-bold">:</div>

                <div className="w-32 rounded-lg bg-white/10 px-6 py-10 text-center">
                  <div className="text-[60px] font-bold">{padNumber(timeLeft.seconds)}</div>
                  <div className="text-white/30">seconds</div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="rounded-lg bg-second px-8 py-3 font-semibold text-white hover:bg-second/80"
                  onClick={() => {
                    /* Handle setting fasting plan */
                  }}
                >
                  Set Fasting Plan
                </button>
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}

export default CheckinHome
