import HeadBg from '@/assets/home-page/head-bg.png'
import { useEffect, useState } from 'react'

export default function HeadSection() {
  const [show, setShow] = useState(false)

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
        <div className="rounded-md bg-primary px-8 py-3 text-[26px] text-black">
          CA:RqGHXg2eh3zPjyzNM7kUyrrSmhb9M9q4mCKFH1mpump
        </div>
      </div>
    </section>
  )
}
