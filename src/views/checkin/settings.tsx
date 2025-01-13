import React, { useState } from 'react'
import { CheckCircleIcon } from 'lucide-react'
import { TCheckInType } from '@/apis/account.api'
import PageHeader from '@/components/common/page-header'

interface FastingPlan {
  type: TCheckInType
  startTime: string
  endTime: string
}

const FastingPlanSettings: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<TCheckInType>('sixteen_and_eight')
  const [startTime, setStartTime] = useState('09:30')
  const [endTime, setEndTime] = useState('17:30')

  const handleTimeChange = (time: string, isStart: boolean) => {
    if (isStart) {
      setStartTime(time)
      // Calculate end time based on selected plan
      const [hours, minutes] = time.split(':').map(Number)
      const endHours = (hours + (selectedPlan === 'sixteen_and_eight' ? 8 : 6)) % 24
      setEndTime(`${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
    }
  }

  const handleSave = () => {
    const plan: FastingPlan = {
      type: selectedPlan,
      startTime,
      endTime
    }
    console.log('Saving plan:', plan)
    // Add your save logic here
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

          <div className="space-y-6">
            <div>
              <label className="mb-4 block text-lg">
                Fasting plan type <span className="text-[#FF0000]">*</span>
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <button
                  onClick={() => setSelectedPlan('sixteen_and_eight')}
                  className={`rounded-lg border p-4 ${
                    selectedPlan === 'sixteen_and_eight' ? 'border-primary transition-all' : 'border-gray-700'
                  } flex items-center justify-between`}
                >
                  <span>16 hour fasting period, 8 hour eating window</span>
                  {selectedPlan === 'sixteen_and_eight' && <CheckCircleIcon className="size-6 text-primary" />}
                </button>
                <button
                  onClick={() => setSelectedPlan('sixteen_and_eight')}
                  className={`rounded-lg border p-4 ${
                    selectedPlan === 'sixteen_and_eight' ? 'border-primary transition-all' : 'border-gray-700'
                  } flex items-center justify-between`}
                >
                  <span>18 hour fasting period, 6 hour eating window</span>
                  {selectedPlan === 'eight_and_sixteen' && <CheckCircleIcon className="size-6 text-primary" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-4 block text-lg">
                Daily Eating Window <span className="text-[#FF0000]">*</span>
              </label>
              <div className="relative flex items-center space-x-4 rounded-lg border border-gray-700 p-4">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => handleTimeChange(e.target.value, true)}
                  className="border-none bg-white/0 text-white focus:ring-0"
                />
                <span className="text-gray-400">→</span>
                <input
                  type="time"
                  value={endTime}
                  readOnly
                  className="border-none bg-white/0 text-white focus:ring-0"
                />
                <button className="absolute right-4">
                  <svg className="size-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="min-w-[260px] rounded-lg bg-primary py-3 font-medium text-black transition-colors hover:bg-primary/80"
            >
              Save Fasting Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FastingPlanSettings
