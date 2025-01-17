import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import DotBg from '@/assets/checkin-page/dot-bg.png'
import PageHeader from '@/components/common/page-header'
import Spin from '@/components/ui/spin'
import { useWallet } from '@solana/wallet-adapter-react'
import { userStoreActions, useUserStore } from '@/stores/user.store'
import accountApi from '@/apis/account.api'
import { useAuthStore } from '@/stores/auth.store'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useNavigate } from 'react-router-dom'

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

const CheckinHome: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 })
  const [endOfTime, setEndTime] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('')
  const [inTimeRange, setInTimeRange] = useState(false)
  const [nextEatingTime, setNextEatingTime] = useState<string>('')

  const [loading, setLoading] = useState(true)
  const { publicKey } = useWallet()
  const { twitter_user_name } = useUserStore()
  const { token } = useAuthStore()
  const [action, setAction] = useState<'login' | 'bindX' | 'setTime' | 'checkin'>('login')
  const { setVisible } = useWalletModal()
  const navigate = useNavigate()

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
    if (!endOfTime) return
    const [endHours, endMinutes] = endOfTime.split(':').map(Number)
    const [startHours, startMinutes] = startTime.split(':').map(Number)
    const now = dayjs()

    const startTimeDateTime = dayjs().set('hour', startHours).set('minute', startMinutes).set('second', 0)
    let endDateTime = dayjs().set('hour', endHours).set('minute', endMinutes).set('second', 0)
    if (endHours < startHours) {
      endDateTime = endDateTime.add(1, 'day')
    }

    if (now.isBefore(startTimeDateTime) || now.isAfter(endDateTime)) {
      setAction('checkin')
      setInTimeRange(false)
      setNextEatingTime(startTimeDateTime.add(1, 'day').format('HH:mm MM/DD/YYYY'))
    } else {
      setInTimeRange(true)
      setTimeLeft(calculateTimeLeft(endDateTime))
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(endDateTime))
      }, 1000)
      setAction('checkin')
      return () => clearInterval(timer)
    }
  }, [endOfTime, startTime])

  useEffect(() => {
    if (!publicKey || !twitter_user_name) return
    if (!twitter_user_name) {
      setAction('bindX')
      return
    }
    setLoading(true)
    accountApi
      .getUserCheckInSettings(publicKey.toString())
      .then((res) => {
        if (!res.data?.end_time) {
          setAction('setTime')
        } else {
          setEndTime(res.data.end_time)
          setStartTime(res.data.start_time)
        }
      })
      .catch(() => {
        setAction('checkin')
      })
      .finally(() => setLoading(false))
  }, [publicKey, twitter_user_name])

  useEffect(() => {
    if (!publicKey || !token) {
      setAction('login')
      return
    }
    setLoading(true)
    userStoreActions
      .getUserInfo(publicKey?.toString() || '')
      .then((res) => {
        if (!res.twitter_name) {
          setAction('bindX')
          setLoading(false)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }, [publicKey, token])

  function handleCheckinClick() {
    const date = dayjs().format('HH:mm')
    const shareText = `✅ Daily check-in completed at ${date}

@${import.meta.env.VITE_TWITTER_BOT}
`
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank')
  }

  const padNumber = (num: number) => num.toString().padStart(2, '0')

  return (
    <div>
      <PageHeader></PageHeader>
      <div className="px-6 pt-[100px]">
        <div className={`mx-auto max-w-[1200px] text-white`}>
          <h1 className="mb-16 text-3xl font-bold">Daily Check in</h1>
          <Spin loading={loading}>
            <div
              className="mx-auto rounded-lg bg-white/5 px-8 py-16"
              style={{ backgroundImage: `url(${DotBg})`, backgroundSize: '100% auto', backgroundPosition: 'center' }}
            >
              <h2 className="mb-12 text-center text-[36px] font-bold">Intermittent Fasting Eating Window</h2>

              <div className={`mb-20 flex items-center justify-center gap-4`}>
                <div
                  className={`${endOfTime && inTimeRange ? 'bg-white text-black' : 'bg-white/10'} w-32 rounded-lg px-6 py-10 text-center transition-all`}
                >
                  <div className="text-[60px] font-bold">{padNumber(timeLeft.hours)}</div>
                  <div className={`${endOfTime && inTimeRange ? 'text-black/30' : 'text-white/30'}`}>hours</div>
                </div>

                <span className="text-4xl font-bold">:</span>

                <div
                  className={`${endOfTime && inTimeRange ? 'bg-white text-black' : 'bg-white/10'} w-32 rounded-lg px-6 py-10 text-center transition-all`}
                >
                  <div className="text-[60px] font-bold">{padNumber(timeLeft.minutes)}</div>
                  <div className={`${endOfTime && inTimeRange ? 'text-black/30' : 'text-white/30'}`}>minutes</div>
                </div>

                <span className="text-4xl font-bold">:</span>

                <div
                  className={`${endOfTime && inTimeRange ? 'bg-white text-black' : 'bg-white/10'} w-32 rounded-lg px-6 py-10 text-center transition-all`}
                >
                  <div className="text-[60px] font-bold">{padNumber(timeLeft.seconds)}</div>
                  <div className={`${endOfTime && inTimeRange ? 'text-black/30' : 'text-white/30'}`}>seconds</div>
                </div>
              </div>

              {!inTimeRange && action === 'checkin' && (
                <p className="mb-12 text-center">
                  Based on your Intermittent Fasting selection and time input, your next eating window will be{' '}
                  {nextEatingTime}
                </p>
              )}

              <div className="flex justify-center">
                {action === 'login' && (
                  <button
                    className="rounded-lg bg-second px-8 py-3 font-semibold text-white hover:bg-second/80"
                    onClick={() => setVisible(true)}
                  >
                    Connect Wallet
                  </button>
                )}

                {action === 'bindX' && (
                  <button
                    className="rounded-lg bg-second px-8 py-3 font-semibold text-white hover:bg-second/80"
                    onClick={() => navigate('/link/x')}
                  >
                    Bind X
                  </button>
                )}

                {action === 'setTime' && (
                  <button
                    className="rounded-lg bg-second px-8 py-3 font-semibold text-white hover:bg-second/80"
                    onClick={() => navigate('/checkin/settings')}
                  >
                    Set Fasting Plan
                  </button>
                )}

                {action === 'checkin' && (
                  <button
                    disabled={!inTimeRange}
                    className="rounded-lg bg-primary px-8 py-3 font-semibold text-black hover:bg-primary/80 disabled:bg-white/10"
                    onClick={handleCheckinClick}
                  >
                    {inTimeRange ? 'Record New Meal' : 'In fasting time'}
                  </button>
                )}
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}

export default CheckinHome
