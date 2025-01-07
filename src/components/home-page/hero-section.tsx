import HeroImg1 from '@/assets/home-page/long.png'
import HeroImg2 from '@/assets/home-page/ken.png'
import HeroImg3 from '@/assets/home-page/james.png'
import HeroTitleImage from '@/assets/home-page/hero-title.svg'
import SnowLineUp from '@/assets/home-page/snow-line-up.svg'
import SnowLineDown from '@/assets/home-page/snow-line-down.svg'

export default function HeroSection() {
  return (
    <section className="mx-auto mt-[48px] max-w-[1200px] bg-black text-white md:mt-[62px]">
      <div className="px-6 pt-6 md:px-[62px] md:pt-[60px]">
        <div className="mb-8 md:mb-4">
          <img src={HeroTitleImage} alt="" className="w-full" />
          <p className="hidden leading-6 md:block">
            Hack your health with Fasting. Max results, zero sacrifices. <br />
            Be partof the science, make gains for all.
          </p>
          <p className="leading-6 md:hidden">
            Hack your health with Fasting.Max results, zero sacrifices. Be partof the science, make gains for all.
          </p>
        </div>
      </div>

      <div className="ms:pb-[160px] relative pb-[42px]">
        <div className="absolute bottom-0 w-full">
          <img src={SnowLineUp} alt="" className="-my-px w-full" />
          <div className="h-[310px] bg-second md:h-0"></div>
        </div>
        <div className="flex flex-col items-center justify-between md:flex-row md:items-end md:px-[60px] md:pb-28">
          <div className="relative order-2 md:order-1">
            <div className="relative shrink-0 md:pb-[52px]">
              <div className="mb-1 inline-block rounded-sm bg-primary p-[10px] text-sm text-black sm:text-base">
                What is Intermittent Fasting?
              </div>
              <br />
              <div className="relative mb-1">
                <div className="relative inline-block whitespace-nowrap rounded-sm bg-white p-[10px] text-2xl font-bold text-black sm:text-4xl">
                  "16:8-Eat Smart, Live Better"
                </div>
                <div className="absolute right-4 size-0 border-[24px] border-white border-b-black/0 border-r-[#00000000] sm:right-[152px] sm:block"></div>
              </div>
              <div>
                <div className="inline-block rounded-sm bg-white p-[10px] text-sm text-black md:text-sm">
                  Simple,sustainable, and life-changing
                </div>
                <div className="relative left-3 size-0 border-[24px] border-white border-b-[#00000000] border-l-[#00000000]"></div>
              </div>
            </div>
          </div>

          <div className="order-1 mb-10 w-[82%] md:w-[42.5%] lg:order-2 lg:mb-0">
            <img src={HeroImg1} className="relative z-10" alt="" />
          </div>
        </div>
      </div>

      {/* </section> */}
      {/* <section className="relative mb-[82px]"> */}
      {/* <div className="absolute -bottom-16 left-1/2 w-[6000px] origin-center -translate-x-1/2 rotate-[5deg] border-t-8 border-t-[#000] text-center text-[120px] font-bold uppercase leading-[96px] text-[#fff]/10">
        Known benefits, risks
      </div> */}

      <div className="relative bg-second pb-[48px] md:-mt-10 md:pb-[60px]">
        <div className="flex flex-col items-center gap-3 md:flex-row md:px-[60px]">
          <div className="mb-6 w-[82%] md:order-2 md:w-[42.5%]">
            <img src={HeroImg2} alt="" />
          </div>
          <div className="flex shrink-0 flex-col md:order-2 md:ml-auto">
            <div className="text-right">
              <div className="mb-1 inline-block rounded-sm bg-primary p-[10px] text-sm text-black sm:text-base">
                Body fat loss
              </div>
              <br />
              <div className="relative mb-1">
                <div className="relative inline-block rounded-sm bg-white p-[10px] text-2xl font-bold text-black sm:text-4xl">
                  "Lose 7% in 12 Weeks" <span className="text-sm sm:text-xl">([1], [2])</span>
                </div>
                <div className="absolute right-48 size-0 border-[24px] border-white border-b-[#00000000] border-l-[#00000000] sm:left-[52px]"></div>
              </div>
              <div className="relative">
                <div className="inline-block max-w-[188px] rounded-sm bg-white p-[10px] text-sm text-black sm:max-w-none sm:text-sm">
                  Science-backed weight loss with intermittent fasting.
                </div>
                <br />
                <div className="relative right-0 inline-block size-0 border-[24px] border-white border-b-[#00000000] border-r-[#00000000]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-second">
        <div className="absolute bottom-0 w-full">
          <img src={SnowLineDown} alt="" className="w-full" />
          <div className="bg-second"></div>
        </div>
        <div className="relative flex flex-col items-center gap-3 px-6 md:flex-row">
          <div className="order-2 flex-1 md:order-1">
            <div className="relative">
              <div className="relative mx-auto max-w-[402px]">
                <div className="mb-1 inline-block rounded-sm bg-primary p-[10px] text-sm text-black sm:text-base">
                  Muscle Building
                </div>
                <br />
                <div className="relative mb-1">
                  <div className="relative inline-block w-[245px] rounded-sm bg-white p-[10px] text-xl font-bold text-black sm:w-auto sm:text-4xl">
                    "Gain 5% Lean Muscle in 8 Weeks" <span className="text-lg">[3]</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="inline-block w-full rounded-sm bg-white p-[10px] text-sm text-black sm:text-sm">
                    Intermittent fasting paired with resistance training boosts muscle growth and fat loss efficiently.
                  </div>
                  <br />
                  <div className="relative left-3 inline-block size-0 border-[24px] border-white border-b-[#00000000] border-l-[#00000000]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 w-full md:order-2 md:w-[42.5%]">
            <img src={HeroImg3} className="relative z-10" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
