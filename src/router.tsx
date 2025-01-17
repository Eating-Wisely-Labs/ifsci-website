import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { lazy } from 'react'

import HomePage from '@/views/home-page'
const LinkTwitter = lazy(() => import('@/views/link-twitter'))
const UserProfile = lazy(() => import('@/views/user-profile'))
const CheckinSettings = lazy(() => import('@/views/checkin/settings'))
const UserProfileHome = lazy(() => import('@/views/user-profile-home'))
const Annotation = lazy(() => import('@/views/annotation'))
const AnnotationList = lazy(() => import('@/views/annotation-list'))
const CheckinHome = lazy(() => import('@/views/checkin/home'))

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/link/x" element={<LinkTwitter></LinkTwitter>} />
        <Route path="/checkin" element={<CheckinHome></CheckinHome>} />
        <Route path="/profile/:address" element={<UserProfile></UserProfile>} />
        <Route path="/checkin/settings" element={<CheckinSettings></CheckinSettings>} />
        <Route path="/home/:address" element={<UserProfileHome></UserProfileHome>} />
        <Route path="/annotations/:address" element={<AnnotationList></AnnotationList>} />
        <Route path="/s/:id" element={<Annotation></Annotation>} />
      </Routes>
    </BrowserRouter>
  )
}
