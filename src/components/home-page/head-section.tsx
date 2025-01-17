import HeadBg from '@/assets/home-page/head-bg.png'
import { useEffect, useState } from 'react'
import { CircleCheck } from 'lucide-react'

export default function HeadSection() {
  const [show, setShow] = useState(false)
  const [showCopied, setShowCopied] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])
  return (
    <section
      className={`relative mx-auto flex min-h-screen max-w-[1200px] origin-center scale-0 items-center justify-center text-white transition-all delay-100 duration-1000 ${show ? 'scale-100' : ''}`}
    >
      <img src={HeadBg}></img>
      <div className="absolute top-0 flex size-full flex-col items-center justify-center">
        <h1 className="whitespace-nowrap text-[130px] font-bold">Eat smart, Live long</h1>
        <p className="relative -top-2 mb-4 text-xl">Take the red pill, then the blue bill.</p>
        <div className="mb-16 size-0 origin-center rotate-[-135deg] border-[18px] border-white border-b-black/0 border-r-[#00000000] sm:right-[152px] sm:block"></div>
        <div className="flex items-center justify-between rounded-md bg-primary px-8 py-3 text-[26px] text-black">
          <span className="flex-1">CA:RqGHXg2eh3zPjyzNM7kUyrrSmhb9M9q4mCKFH1mpump</span>
          <button
            className="ml-2 flex items-center"
            onClick={() => {
              navigator.clipboard.writeText('RqGHXg2eh3zPjyzNM7kUyrrSmhb9M9q4mCKFH1mpump')
              setShowCopied(true)
              setTimeout(() => setShowCopied(false), 1000)
            }}
          >
            {showCopied ? (
              <CircleCheck size={22} />
            ) : (
              <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.94772 5.24191V1.58807C4.94772 0.915417 5.49302 0.370117 6.16567 0.370117H20.7811C21.4537 0.370117 21.999 0.915417 21.999 1.58807V18.6393C21.999 19.312 21.4537 19.8573 20.7811 19.8573H17.1272V23.51C17.1272 24.1833 16.5793 24.7291 15.901 24.7291H1.30223C0.624967 24.7291 0.0761719 24.1876 0.0761719 23.51L0.0793385 6.46092C0.0794603 5.78769 0.627464 5.24191 1.30559 5.24191H4.94772ZM2.51502 7.67781L2.5123 22.2932H14.6913V7.67781H2.51502ZM7.38362 5.24191H17.1272V17.4214H19.5631V2.80601H7.38362V5.24191Z"
                  fill="black"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
