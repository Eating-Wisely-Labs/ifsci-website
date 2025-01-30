import modalBackgroundSvg from './modal-background.svg'
import claimedPng from './claimed.png'
import { X } from 'lucide-react'
import twitterXLine from './twitter-x-line.svg'

interface ComponentProps {
  isOpen: boolean
  points: number
  onClose: () => void
}

export default function Component({ isOpen, points, onClose }: ComponentProps) {
  if (!isOpen) return null

  function shareOnX() {
    const shareText = `I just claimed @${points} IFSCI in the Surprise Airdrop on Intermittent Fasting Science! 🎉 Hurry and click @ifsci_ai on Twitter to learn more and seize this amazing opportunity!`
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent('https://test.ifsci.wtf/static/share/twitter-share-landing.html')}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="relative w-full max-w-[386px] rounded-3xl bg-[#1A1A1A] p-6 text-center"
        style={{
          backgroundImage: `url(${modalBackgroundSvg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        }}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-4 top-4 text-white/50 transition-colors hover:text-white">
          <X size={24} />
        </button>
        <div>
          <img className="mx-auto size-[180px]" src={claimedPng} alt="" />
          {/* <p className="mt-4 text-[26px] leading-[34px] text-white">
            Miss it? New Airdrop <br />
            Season is now underway!
          </p> */}
          <div className="mt-4">{points} $IFSCI Claimed!</div>
          <p>Please login your wallet to check it.</p>
          <button
            className="mx-auto mt-6 flex h-[42px] w-[152px] items-center justify-center rounded bg-white text-sm leading-[22p] text-[#1C1C26]"
            onClick={shareOnX}
          >
            <span>Share on </span>
            <img src={twitterXLine} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}
