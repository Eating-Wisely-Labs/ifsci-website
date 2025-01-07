import RoadmapImage from '@/assets/home-page/roadmap-img.png'
import RoadmapMobileImage from '@/assets/home-page/roadmap-m.png'
import Ribbon2Img from '@/assets/home-page/ribbon-2.svg'

export default function RoadmapSection() {
  return (
    <>
      <section className="relative mx-auto max-w-[1200px] bg-black text-white">
        <div className="p-6 py-10 md:p-[62px]">
          <h1 className="text-4xl font-bold text-[#fff] sm:text-[80px] sm:leading-none">
            Roadmap Of <br />
            <span className="text-primary">Experiments</span>
          </h1>
        </div>
        <div>
          <div className="relative hidden md:block">
            <img src={RoadmapImage} alt="" className="" />
            <div className="absolute right-[12%] top-[-6%] aspect-[10/4] w-1/5 rounded-[50%] border-8 border-primary"></div>
          </div>
          <div className="relative block md:hidden">
            <img src={RoadmapMobileImage} alt="" className="" />
            <div className="absolute right-[5%] top-[-2%] aspect-[10/4] w-[33%] rounded-[50%] border-[6px] border-primary"></div>
          </div>
        </div>
        <div className="bg-[#000] p-6 text-[#fff] md:p-[62px]">
          <div className="relative mx-auto text-base">
            <img
              src={Ribbon2Img}
              className="absolute -right-20 bottom-16 w-1/2 md:right-auto md:top-[140px] md:w-auto"
              alt=""
            />

            <div className="mb-12 flex justify-start">
              <div className="relative w-full max-w-[462px] bg-[#1a1a1a] p-5">
                <p>Phash 1:</p>
                <h2 className="text-3xl sm:text-3xl">Data Sourcing</h2>
                <hr className="my-3" />
                <p className="text-xs leading-loose sm:text-sm sm:leading-8">
                  Collect nutritional and fasting data to build AI-Agent 1.0.
                </p>
              </div>
            </div>

            <div className="relative mb-12 flex justify-center">
              <div className="w-full max-w-[462px] bg-white/10 p-5">
                <p>Phash 2:</p>
                <h2 className="text-3xl sm:text-3xl">Experiment 1.0</h2>
                <hr className="my-3" />
                <p className="text-xs leading-loose sm:text-sm sm:leading-8">
                  Scale up intermittent fasting participation with AI-Agent 1.0. <br />
                  Analyze factors affecting long-term IF outcomes (2 quarters).
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="w-full max-w-[462px] bg-[#1a1a1a] p-5">
                <p>Phash 3:</p>
                <h2 className="text-3xl sm:text-3xl">Controlled Experiment 2.0</h2>
                <hr className="my-3" />
                <p className="text-xs leading-loose sm:text-sm sm:leading-8">
                  Develop AI-Agent 2.0 with refined heuristics.
                  <br />
                  Test control (no AI), AI-Agent 1.0, and AI-Agent 2.0.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
