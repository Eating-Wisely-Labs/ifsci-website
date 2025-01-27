import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { lazy } from 'react'

import HomePage from '@/views/home-page'
const LinkTwitter = lazy(() => import('@/views/link-twitter'))
const UserProfile = lazy(() => import('@/views/user-profile'))
const UserProfileHome = lazy(() => import('@/views/user-profile-home'))
const CheckinSettings = lazy(() => import('@/views/checkin/settings'))
const Annotation = lazy(() => import('@/views/annotation'))
const AnnotationList = lazy(() => import('@/views/annotation-list'))
const CheckinHome = lazy(() => import('@/views/checkin/home'))
const RewardHistory = lazy(() => import('@/views/reward/history'))
const RedeemHistory = lazy(() => import('@/views/redeem/history'))

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/link/x" element={<LinkTwitter />} />
        <Route path="/checkin" element={<CheckinHome />} />
        <Route path="/home/:address" element={<UserProfileHome />} />
        <Route path="/profile/:address" element={<UserProfile />} />
        <Route path="/reward/history" element={<RewardHistory />} />
        <Route path="/redeem/history" element={<RedeemHistory />} />
        <Route path="/checkin/settings" element={<CheckinSettings />} />
        <Route path="/annotations/:address" element={<AnnotationList />} />
        <Route path="/s/:id" element={<Annotation />} />
      </Routes>
    </BrowserRouter>
  )
}
