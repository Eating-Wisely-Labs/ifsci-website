import SnowLineUp from '@/assets/home-page/snow-line-up.svg'

function WhiteArrow(props: { className: string; style?: object }) {
  return (
    <div className={props.className} style={props.style}>
      <svg width="50" height="64" viewBox="0 0 50 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 21L50 0L23.5099 29L33.4437 64L0 21Z" fill="white" />
      </svg>
    </div>
  )
}

export default function FigureOutSection() {
  return (
    <section className="mx-auto max-w-[1200px]">
      <div className="relative bg-black p-6 text-white md:p-[62px]">
        <div className="mx-auto mb-[60px] flex max-w-[413px] items-center gap-9">
          <div className="block size-[120px] shrink-0 items-center justify-center bg-white/10 text-center text-[100px] font-bold leading-[120px] text-black">
            ?
          </div>
          <p className="text-white/40">We’ve cracked the basics, but here’s what we still need to figure out:</p>
        </div>

        <div className="ms:gap-12 mb-20 flex items-center gap-6">
          <WhiteArrow className="shrink-0"></WhiteArrow>
          <div className="relative left-0 inline-block translate-x-0">
            <div className="absolute left-3 top-3 size-full bg-primary"></div>
            <div className="relative inline-block bg-white p-5 text-lg font-bold text-black md:text-2xl">
              1. How does fasting affect <br /> your mood long-term? 🤔
            </div>
          </div>
        </div>

        <div className="ms:gap-12 mb-20 flex items-center gap-6">
          <div className="relative ml-auto inline-block">
            <div className="absolute right-3 top-3 size-full bg-second"></div>
            <div className="relative inline-block bg-white p-5 text-lg font-bold text-black md:text-2xl">
              <p className="hidden sm:inline">
                2. Can we customize fasting to fit every
                <br /> lifestyle (like travel, stress, and sleep)?
              </p>
              <p className="inline sm:hidden">
                2. Can we customize fasting to fit every lifestyle (like travel, stress, and sleep)?
              </p>
            </div>
          </div>
          <WhiteArrow className="shrink-0" style={{ transform: 'rotateY(180deg)' }}></WhiteArrow>
        </div>

        <div className="ms:gap-12 mb-20 flex items-center gap-6">
          <WhiteArrow className="shrink-0"></WhiteArrow>

          <div className="relative inline-block">
            <div className="absolute left-3 top-3 size-full"></div>
            <div className="relative inline-block bg-white p-5 text-lg font-bold text-black md:text-2xl">
              <p className="hidden sm:inline">
                3. What’s happening in your gut during
                <br /> fasting—and how does it make you feel?
              </p>
              <p className="inline sm:hidden">
                3. What’s happening in your gut during fasting—and how does it make you feel?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={SnowLineUp} alt="" className="-my-px w-full" />
      </div>
    </section>
  )
}
