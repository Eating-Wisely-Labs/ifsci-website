import TwitterIcon from '@/assets/page-footer/x.svg'
import DexScreenerIcon from '@/assets/page-footer/dex-screen.svg'
import DocumentationIcon from '@/assets/page-footer/notion.svg'

export default function PageFooter() {
  const socialLinks = {
    twitter: 'https://x.com/ifsci_ai',
    dexScreener: 'https://dexscreener.com/solana/9ysofy2attxjfz1qnqsymqf2jdtwpqrnytnghjd1kgja',
    documentation: 'https://fasting.super.site/'
  }

  return (
    <footer className="mx-auto max-w-[1200px] bg-[#000] px-6 text-[#fff]">
      <div className="flex justify-between py-8 md:py-[80px]">
        <a href="https://x.com/ifsci_ai" target="_blank" rel="noopener noreferrer">
          Follow @ifsci_ai
        </a>
        <div className="flex gap-6 text-white">
          <a href={socialLinks.twitter} className="block h-8 p-[3px]" target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} alt="Twitter" className="size-full" />
          </a>
          <a href={socialLinks.dexScreener} className="block h-8" target="_blank" rel="noopener noreferrer">
            <img src={DexScreenerIcon} alt="DexScreener" className="size-full" />
          </a>
          <a href={socialLinks.documentation} className="block h-8 p-[2px]" target="_blank" rel="noopener noreferrer">
            <img src={DocumentationIcon} alt="Documentation" className="size-full" />
          </a>
        </div>
        <a href="https://t.me/ifsci" target="_blank" rel="noopener noreferrer">
          Join Telegram
        </a>
      </div>
    </footer>
  )
}
