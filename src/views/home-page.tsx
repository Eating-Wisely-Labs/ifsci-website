import HeroSection from '@/components/home-page/hero-section'
import VideoSection from '@/components/home-page/video-section'
import FigureOutSection from '@/components/home-page/figure-out-section'
import CommunitySection from '@/components/home-page/community-section'
import FoodScienceSection from '@/components/home-page/food-science-section'
import RoadmapSection from '@/components/home-page/roadmap-section'
import ExpectedDeliverables from '@/components/home-page/expected-deliverables'
import ReferrenceSection from '@/components/home-page/referrence-section'
import HeadSection from '@/components/home-page/head-section'

import PageFooter from '@/components/common/page-footer'
import PageHeader from '@/components/common/page-header'

export default function HomePage() {
  return (
    <div className="h-screen overflow-x-hidden bg-black">
      <PageHeader />
      <HeadSection />
      <HeroSection />
      <VideoSection />
      <FigureOutSection />
      <CommunitySection />
      <FoodScienceSection />
      <RoadmapSection />
      <ExpectedDeliverables />
      <ReferrenceSection />
      <PageFooter />
    </div>
  )
}
