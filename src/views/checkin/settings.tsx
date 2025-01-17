import React, { useEffect, useState } from 'react'
import { CheckCircleIcon, Loader2 } from 'lucide-react'
import accountApi, { TCheckInType } from '@/apis/account.api'
import PageHeader from '@/components/common/page-header'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAuthStore } from '@/stores/auth.store'
import Spin from '@/components/ui/spin'
import toast from '@/components/ui/toast'

const generateTimeOptions = () => {
  const options: string[] = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0')
      const formattedMinute = minute.toString().padStart(2, '0')
      options.push(`${formattedHour}:${formattedMinute}`)
    }
  }
  return options
}

const FastingPlanSettings: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<TCheckInType>('sixteen_and_eight')
  const [startTime, setStartTime] = useState('09:30')
  const [endTime, setEndTime] = useState('17:30')
  const timeOptions = generateTimeOptions()
  const { publicKey } = useWallet()
  const { token } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleTimeChange = (time: string, isStart: boolean) => {
    if (isStart) {
      setStartTime(time)
      // Calculate end time based on selected plan
      const [hours, minutes] = time.split(':').map(Number)
      const endHours = (hours + (selectedPlan === 'sixteen_and_eight' ? 8 : 6)) % 24
      setEndTime(`${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
    }
  }

  useEffect(() => {
    if (!publicKey || !token) return
    setLoading(true)
    accountApi
      .getUserCheckInSettings(publicKey.toString())
      .then((res) => {
        setSelectedPlan(res.data.checkin_type)
        setStartTime(res.data.start_time)
        setEndTime(res.data.end_time)
      })
      .finally(() => setLoading(false))
  }, [publicKey, token])

  useEffect(() => {
    // Calculate end time based on selected plan
    const [hours, minutes] = startTime.split(':').map(Number)
    const endHours = (hours + (selectedPlan === 'sixteen_and_eight' ? 8 : 6)) % 24
    setEndTime(`${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
  }, [selectedPlan, startTime])

  const handleSave = () => {
    const plan = {
      user_id: publicKey?.toString() || '',
      checkin_type: selectedPlan,
      start_time: startTime,
      end_time: endTime
    }
    setSaving(true)
    accountApi
      .updateUserCheckInSettings(plan)
      .then(() => {
        toast.success('Fasting plan saved successfully')
      })
      .catch((err) => {
        toast.error(err.message)
      })
      .finally(() => setSaving(false))
  }

  return (
    <div>
      <PageHeader></PageHeader>
      <div className="px-6 pt-[100px]">
        <div className="mx-auto max-w-[1200px] bg-black text-white">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-white">
              <span className="text-xl text-black">+</span>
            </div>
            <h1 className="text-2xl font-bold">Set Your Fasting Plan</h1>
          </div>

          <Spin loading={loading}>
            <div className="space-y-6">
              <div>
                <label className="mb-4 block text-lg">
                  Fasting plan type <span className="text-[#FF0000]">*</span>
                </label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <button
                    onClick={() => setSelectedPlan('sixteen_and_eight')}
                    className={`appearance-none rounded-lg border bg-white/0 p-4 outline-none ${
                      selectedPlan === 'sixteen_and_eight' ? 'border-primary transition-all' : 'border-gray-700'
                    } flex items-center justify-between gap-2`}
                  >
                    <span className="text-left">16 hour fasting period, 8 hour eating window</span>
                    {selectedPlan === 'sixteen_and_eight' && (
                      <CheckCircleIcon className="size-6 shrink-0 text-primary" />
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedPlan('eight_and_sixteen')}
                    className={`appearance-none rounded-lg border bg-white/0 p-4 outline-none ${
                      selectedPlan === 'eight_and_sixteen' ? 'border-primary transition-all' : 'border-gray-700'
                    } flex items-center justify-between gap-2`}
                  >
                    <span className="text-left">18 hour fasting period, 6 hour eating window</span>
                    {selectedPlan === 'eight_and_sixteen' && (
                      <CheckCircleIcon className="size-6 shrink-0 text-primary" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-4 block text-lg">
                  Daily Eating Window <span className="text-[#FF0000]">*</span>
                </label>
                <div className="relative">
                  <div className="flex items-center space-x-4 rounded-lg border border-gray-700 p-4 focus-within:border-primary">
                    <input
                      type="time"
                      value={startTime}
                      readOnly
                      disabled={true}
                      className="flex-1 border-none bg-white/0 px-3 py-0 text-white focus:ring-0"
                    />
                    <span className="shrink-0 text-gray-400">→</span>
                    <input
                      type="time"
                      value={endTime}
                      readOnly
                      disabled={true}
                      className="flex-1 border-none bg-white/0 px-3 py-0 text-white focus:ring-0"
                    />
                    <div className="shrink-0">
                      <svg className="size-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <select
                    value={startTime}
                    onChange={(e) => handleTimeChange(e.target.value, true)}
                    className="absolute top-0 size-full appearance-none rounded-lg border-none bg-white/0 px-3 py-0 text-white opacity-0 outline-none ring-0"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="flex min-w-[260px] justify-center rounded-lg bg-primary py-3 font-medium text-black transition-colors hover:bg-primary/80"
              >
                {saving ? <Loader2 className="animate-spin" /> : 'Save Fasting Plan'}
              </button>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}

export default FastingPlanSettings
