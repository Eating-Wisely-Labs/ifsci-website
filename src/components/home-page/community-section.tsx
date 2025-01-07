import FootImage from '@/assets/home-page/foot.png'
import HealthIn from '@/assets/home-page/health.png'
import LogsImage from '@/assets/home-page/logs.png'
import SnowLineDown from '@/assets/home-page/snow-line-down.svg'
import RibbonImg from '@/assets/home-page/ribbon.svg'

export default function CommunitySection() {
  return (
    <section className="mx-auto max-w-[1200px] bg-second">
      <div className="relative p-6 text-white md:p-[62px] md:pb-0">
        <h1 className="relative mb-12 font-bold md:mb-[60px]">
          <img src={RibbonImg} alt="" className="absolute right-0 w-1/2 md:-top-12" />
          <span className="inline-block text-[42px] leading-none text-primary md:mb-6 md:text-[88px]">Call for</span>
          <br />
          <span className="relative text-2xl md:left-10 md:text-[48px]">Community Participation</span>
        </h1>

        <div className="relative grid grid-cols-1 gap-9 sm:grid-cols-3">
          <div className="bg-white/15 p-5">
            <img src={FootImage} className="mb-3 w-full" alt="" />
            <div>
              <h2 className="text-2xl">Food Science</h2>
              <hr className="my-4" />
              <p>- French fries - 200g</p>
              <p>- deep-fried - 600kcal</p>
              <p>- ...</p>
            </div>
          </div>
          <div>
            <div className="bg-white/15 p-5">
              <img src={HealthIn} className="mb-3 w-full" alt="" />
              <div>
                <h2 className="text-2xl">Health Information</h2>
                <hr className="my-4" />
                <p>- BMI: 20 - BF%: 15% - HR: 65/min</p>
                <p>- BP: 75 mmHg ~ 110 mmHg</p>
                <p>- ...</p>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white/0 p-5">
              <img src={LogsImage} className="mb-3 w-full" alt="" />
              <div>
                <h2 className="text-2xl">Fasting Logs</h2>
                <hr className="my-4" />
                <p>- 1201: XXX - 1202: XXX</p>
                <p>- 1203: XXX - 1204: XXX</p>
                <p>- ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={SnowLineDown} alt="" className="w-full" />
      </div>
    </section>
  )
}
