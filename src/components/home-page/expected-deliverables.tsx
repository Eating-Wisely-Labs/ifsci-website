import OrgnizationsImg from '@/assets/home-page/orgnizations-img.png'
import DatasetImage from '@/assets/home-page/dataset-img.png'
import SnowLineUp from '@/assets/home-page/snow-line-up.svg'

export default function ExpectedDeliverables() {
  return (
    <section className="mx-auto max-w-[1200px] bg-black">
      <div className="p-6 text-white md:p-[62px]">
        <div className="mx-auto text-white">
          <h1 className="py-10 text-4xl md:py-[100px] md:text-[88px] md:leading-none">
            <span className="text-white">Expected</span> <br />
            <span className="text-primary">Deliverables</span>
          </h1>
        </div>

        <div className="mb-[60px] text-xl sm:text-right sm:text-[40px]">1. Scientific Reports</div>
        <div className="mb-[80px] flex justify-center bg-white">
          <img src={OrgnizationsImg} className="md:w-4/5" alt="" />
        </div>

        <div className="items-center md:flex">
          <div className="mb-[60px] shrink-0 text-xl leading-tight sm:text-right sm:text-[40px] md:order-2 md:w-1/2">
            2 . AI Agent & App <br /> (community-driven)
          </div>
          <div className="md:w-1/2">
            <img src={DatasetImage} alt="" className="md:order-1" />
          </div>
        </div>
      </div>

      <img src={SnowLineUp} alt="" className="-my-px w-full" />
    </section>
  )
}
