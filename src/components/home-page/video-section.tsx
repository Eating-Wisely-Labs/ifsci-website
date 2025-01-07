import RibbonImg from '@/assets/home-page/ribbon.svg'

export default function VideoSection() {
  return (
    <section className="relative mx-auto max-w-[1200px] bg-black p-6 text-white md:p-[62px]">
      <img src={RibbonImg} className="absolute right-3 top-14 w-1/2 sm:top-32 sm:w-[38%]" alt="" />

      <div className="relative mb-12 md:mb-24">
        <h1 className="ms:text-[80px] mb-3 text-4xl font-bold sm:text-[80px] sm:leading-[96px]">
          Known Benefits, <br />
          <strong className="text-primary">Risks</strong>
        </h1>
        <p className="text-sm sm:text-base">We had known subset of its benefits and risk via scientific researches.</p>
      </div>
      <div className="mb-20 md:mb-[80px]">
        <iframe
          className="relative aspect-[16/9] size-full origin-center rotate-6 rounded-[4px] border-8 border-white"
          src={`https://www.youtube.com/embed/9tRohh0gErM`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="block gap-8 md:flex md:flex-row md:items-start">
        <div className="relative top-0 mb-[60px] ml-auto w-11/12 rounded-[4px] border-4 border-white md:top-11 md:flex-1 md:basis-1/2">
          <div className="flex justify-between bg-white p-[10px] text-2xl text-black">
            <h2 className="relative inline-block font-bold">
              Known Benefits
              <div className="absolute left-1/2 top-1/2 h-20 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-[5px] border-primary"></div>
            </h2>
            <span>😊</span>
          </div>
          <div className="p-[10px] text-sm md:text-lg [&>p]:mb-2">
            <ul className="list-decimal pl-3 md:pl-5 [&>li]:my-1">
              <li>
                <strong>Weight Loss</strong>: Enhances fat burning through metabolic switching.
              </li>
              <li>
                <strong>Improved Insulin Sensitivity</strong>: Reduces risk of Type 2 diabetes.
              </li>
              <li>
                <strong>Cellular Repair</strong>: Activates autophagy for cellular rejuvenation.
              </li>
              <li>
                <strong>Brain Health</strong>: Boosts cognitive function and reduces neurodegeneration risk.
              </li>
              <li>
                <strong>Reduced Inflammation</strong>: Lowers inflammatory markers, improving overall health.
              </li>
              <li>
                <strong>Heart Health</strong>: Improves blood pressure and cholesterol levels.
              </li>
            </ul>
          </div>
        </div>

        <div className="relative w-11/12 rounded-[4px] border-white bg-black md:flex-1 md:basis-1/2">
          <div className="absolute left-5 top-5 size-full bg-second"></div>
          <div className="relative border-4 border-white">
            <div className="flex justify-between bg-white p-[10px] text-2xl text-black">
              <h2 className="inline-block font-bold">Known Risks</h2>
              <span>😟</span>
            </div>
            <div className="bg-black p-[10px] text-sm md:text-lg [&>p]:mb-2">
              <ul className="list-decimal pl-3 md:pl-5 [&>li]:my-1">
                <li>
                  <strong>Nutrient Deficiencies</strong>: Poorly planned fasting may lack essential nutrients.
                </li>
                <li>
                  <strong>Muscle Loss</strong>: Insufficient protein during fasting can cause muscle breakdown.
                </li>
                <li>
                  <strong>Hormonal Imbalance</strong>: Irregular cycles in women with extreme fasting regimens.
                </li>
                <li>
                  <strong>Disordered Eating</strong>: Risk of binge eating or exacerbation of eating disorders.
                </li>
                <li>
                  <strong>Fatigue and Dizziness</strong>: Low blood glucose during fasting periods can cause energy
                  depletion.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
