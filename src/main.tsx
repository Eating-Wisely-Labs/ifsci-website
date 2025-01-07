import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer'
window.Buffer = Buffer

import '@/styles/tailwind.css'
import '@/styles/global.css'

import ReactGA from 'react-ga4'
import App from './app'

const container = document.getElementById('root')
if (!container) {
  throw new Error('root container not found')
}

initReactGA()

const root = createRoot(container)
root.render(<App />)

function initReactGA() {
  ReactGA.initialize([{ trackingId: import.meta.env.VITE_GA_TRACKING_ID }])
}
