import { useNavigate } from 'react-router-dom'
import { Share2 } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface TwitterActionsProps {
  hasBindTwitter: boolean
  isMine: boolean
}

export const TwitterActions: React.FC<TwitterActionsProps> = ({ hasBindTwitter, isMine }) => {
  const navigate = useNavigate()
  const { publicKey } = useWallet()

  const handleLinkTwitter = () => {
    navigate('/link/x')
  }

  const handleShareTwitter = () => {
    const shareLink = `https://ifsci.wtf/profile/${publicKey?.toString()}`
    const shareText = `Check out the nutritional analysis of my meals powered by the first vertical DeSAI agent to enhance your health and achieve your intermittent fasting goals! 
User profile link:`
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`
    window.open(url, '_blank')
  }

  const handleHaveATry = () => {
    const shareText = `@${import.meta.env.VITE_TWITTER_BOT},  `
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank')
  }

  const handleMyProfileClick = () => {
    const address = publicKey?.toString()
    navigate(`/profile/${address}`)
  }

  if (isMine && hasBindTwitter) {
    return (
      <button
        className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-black"
        onClick={handleShareTwitter}
      >
        <Share2 />
        Share on X
      </button>
    )
  }

  if (isMine && !hasBindTwitter) {
    return (
      <button
        className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-black"
        onClick={handleLinkTwitter}
      >
        Link X
      </button>
    )
  }

  if (!isMine && hasBindTwitter) {
    return (
      <button
        className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-black"
        onClick={handleMyProfileClick}
      >
        My Profile
      </button>
    )
  }

  return (
    <div className="flex gap-4">
      <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-black" onClick={handleHaveATry}>
        Have a Try
      </button>
    </div>
  )
}
