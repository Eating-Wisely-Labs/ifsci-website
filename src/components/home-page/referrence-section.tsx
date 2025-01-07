export default function ReferrenceSection() {
  function handleFollowClick() {
    window.open('https://x.com/adesciagent')
  }

  return (
    <section className="mx-auto max-w-[1200px] bg-second pb-[60px]">
      <div className="pb-[80px] pt-6 text-center">
        <button
          className="mx-auto mb-4 flex max-w-[400px] items-center justify-center gap-2 bg-primary px-9 py-5 text-2xl font-bold text-black"
          onClick={handleFollowClick}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.3653 13.4872L16 0L14.6347 13.4872L8.39251 8.39265L13.487 14.6347L0 16L13.4872 17.3653L8.39251 23.6076L14.6347 18.513L16 32L17.3653 18.513L23.6075 23.6076L18.5128 17.3653L32 16L18.513 14.6347L23.6075 8.39265L17.3653 13.4872Z"
              fill="black"
            />
          </svg>
          Follow Twitter
        </button>
        <a href="https://s.ifsci.wtf/static/whitepaper.pdf" target="_blank" className="text-white hover:underline">
          Whitepaper
        </a>
      </div>
      <div className="px-6 text-white">
        <div className="mb-6 border-b border-b-white py-3 text-2xl">Reference</div>
        <div className="leading-loose">
          <p>
            [1] Lowe, D. A., Wu, N., Rohdin-Bibby, L., Moore, A. H., Kelly, N., Liu, Y., & Phillips, S. A. (2023).
            Time-Restricted Eating and Weight Loss in Adults with Obesity: A Randomized Controlled Trial. Annals of
            Internal Medicine.
          </p>
          <p>
            [2] Templeman, I., Smith, H. A., Chowdhury, E. K., & Gonzalez, J. T. (2021). Intermittent Fasting and Weight
            Loss: A Systematic Review and Meta-Analysis. JAMA Network Open, 4(12), e2137395.
          </p>
          <p>
            [3] Moro, T., Tinsley, G., Bianco, A., Marcolin, G., Pacelli, Q. F., Battaglia, G., ... & Paoli, A. (2016).
            Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body
            composition, inflammation, and cardiovascular risk factors in resistance-trained males. Journal of
            Translational Medicine, 14(1), 290.
          </p>
        </div>
      </div>
    </section>
  )
}
