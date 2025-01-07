import FoodScienceImg1 from '@/assets/home-page/food-science-img-1.png'
import FoodScienceImg2 from '@/assets/home-page/food-science-img-2.png'
import FoodScienceImg3 from '@/assets/home-page/food-science-img-3.png'
import FoodScienceImg4 from '@/assets/home-page/food-science-img-4.png'
import FoodScienceImg5 from '@/assets/home-page/food-science-img-5.png'
import FoodScienceImg6 from '@/assets/home-page/food-science-img-6.png'
import FoodScienceImg7 from '@/assets/home-page/food-science-img-7.png'
import FoodScienceImg8 from '@/assets/home-page/food-science-img-8.png'

export default function FoodScienceSection() {
  return (
    <section className="relative mx-auto max-w-[1200px] bg-black p-6 md:p-[62px]">
      <div className="relative mb-8 inline-block">
        <h1 className="relative my-[60px] inline-block rounded-[4px] font-bold text-primary">
          <span className="text-[42px] sm:text-[88px]">Food Science</span>
          <br />
          <span className="text-2xl text-white sm:text-[42px]">(People, Culture and Nutrition)</span>
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <img src={FoodScienceImg1} className="order-1 border-4 border-white/0 opacity-60" alt="" />
          <div className="relative order-2 sm:order-4">
            <img src={FoodScienceImg4} className="border-4 border-second" alt="" />
            <div className="absolute -right-10 -top-16 md:-top-12">
              <div className="rounded-sm bg-second p-3 text-2xl font-bold text-white sm:text-[40px]">Carbs</div>
              <div className="absolute right-6 size-0 border-[18px] border-second border-b-black/0 border-r-[#00000000] sm:right-5 sm:block md:right-2 md:border-[24px]"></div>
            </div>
          </div>
          <img src={FoodScienceImg3} className="order-3 border-4 border-white/0 opacity-60" alt="" />
          <img src={FoodScienceImg2} className="order-4 border-4 border-white/0 opacity-60 sm:order-2" alt="" />
          <img src={FoodScienceImg7} className="order-5 border-4 border-white/0 opacity-60 sm:order-7" alt="" />
          <img src={FoodScienceImg6} className="order-6 border-4 border-white/0 opacity-60" alt="" />
          <div className="relative order-7 sm:order-5">
            <img src={FoodScienceImg5} className="origin-center -rotate-6 border-4 border-primary" alt="" />{' '}
            <div className="absolute -left-10 -top-16 md:-top-12">
              <div className="rounded-sm bg-primary p-3 text-2xl font-bold text-black sm:text-[40px]">Protein</div>
              <div className="absolute left-6 size-0 border-[18px] border-primary border-b-black/0 border-l-[#00000000] sm:right-5 sm:block md:left-2 md:border-[24px]"></div>
            </div>
          </div>

          <img src={FoodScienceImg8} className="order-8 border-4 border-white/0 opacity-60" alt="" />
        </div>
      </div>
    </section>
  )
}
