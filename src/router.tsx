import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { lazy } from 'react'

import HomePage from '@/views/home-page'
const LinkTwitter = lazy(() => import('@/views/link-twitter'))
const UserProfile = lazy(() => import('@/views/user-profile'))

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/link/twitter" element={<LinkTwitter></LinkTwitter>} />
        <Route path="/profile/:address" element={<UserProfile></UserProfile>} />
      </Routes>
    </BrowserRouter>
  )
}
