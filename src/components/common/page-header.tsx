import LogoImageSvg from '@/assets/page-header/logo.png'
import { cn } from '@udecode/cn'
import { MenuIcon, ChevronRight, X, Wallet } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { shortenAddress } from '@/utils/shorten-address'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import Dropdown from '../ui/dropdown'
import { useNavigate } from 'react-router-dom'

function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const { publicKey, disconnect } = useWallet()
  const navigate = useNavigate()
  const { setVisible } = useWalletModal()

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDisconnect = () => {
    localStorage.removeItem('token')
    disconnect()
  }

  async function handleLinkTwitter() {
    navigate('/link/twitter')
  }

  return (
    <div className="flex md:hidden">
      <MenuIcon onClick={toggleMobileMenu}></MenuIcon>

      <div
        className={cn(
          'fixed left-0 top-0 h-screen w-screen transition-all',
          isMenuOpen ? 'z-[1000]' : 'pointer-events-none z-[-1]'
        )}
      >
        <div
          className={cn('size-full bg-black/80 transition-all', isMenuOpen ? 'bg-black/80' : 'bg-black/0')}
          onClick={toggleMobileMenu}
        ></div>
        <nav
          className={cn(
            'absolute top-0 w-full overflow-hidden bg-black p-6 transition-all',
            isMenuOpen ? 'translate-y-0' : 'translate-y-[-100%]'
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img className="h-10 rounded-full" src={LogoImageSvg} alt="logo" />
              Intermittent Fasting
            </div>
            <div className="mr-[-8px] p-2" onClick={toggleMobileMenu}>
              <X></X>
            </div>
          </div>
          <ul>
            <li className="">
              <a href="/" className="flex justify-between py-6">
                <span>Home</span>
                <ChevronRight></ChevronRight>
              </a>
            </li>
            <li>
              <a href="https://s.ifsci.wtf/static/whitepaper.pdf" target="_blank" className="flex justify-between py-6">
                <span>Whitepaper</span>
                <ChevronRight></ChevronRight>
              </a>
            </li>
            {publicKey && (
              <>
                <li onClick={handleLinkTwitter}>
                  <span className="flex justify-between py-6">
                    <span>Link Twitter</span>
                    <ChevronRight></ChevronRight>
                  </span>
                </li>
                <li onClick={handleDisconnect}>
                  <span className="flex justify-between py-6">
                    <span>Disconnect</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white/45">{shortenAddress(publicKey.toString(), 8)}</span>
                      <ChevronRight></ChevronRight>
                    </div>
                  </span>
                </li>
              </>
            )}
            {!publicKey && (
              <li onClick={() => setVisible(true)}>
                <span className="flex justify-between py-6">
                  <span>Connect Wallet</span>
                  <ChevronRight></ChevronRight>
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default function PageHeader() {
  const { setVisible } = useWalletModal()
  const { publicKey, disconnect } = useWallet()
  const navigate = useNavigate()

  const handleDisconnect = () => {
    localStorage.removeItem('token')
    disconnect()
  }

  async function handleLinkTwitter() {
    navigate('/link/twitter')
  }

  return (
    <header className="fixed top-0 z-[99] w-full bg-black/20 px-6 py-4 text-white backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <a className="flex items-center gap-3" href="/">
          <img className="h-10 rounded-full" src={LogoImageSvg} alt="logo" />
          Intermittent Fasting
        </a>
        <MobileNavigation />
        <nav className="hidden h-full justify-between gap-8 md:flex">
          <a href="https://s.ifsci.wtf/static/whitepaper.pdf" target="_blank" className="hover:text-primary">
            Whitepaper
          </a>
          {publicKey ? (
            <>
              {/* <div onClick={handleProfileClick}>Profile</div> */}
              <div onClick={handleLinkTwitter}>Link Twitter</div>
              <Dropdown className="h-full" menu={[{ label: 'Disconnect', onClick: handleDisconnect }]}>
                <div className="flex items-center gap-2">
                  <Wallet />
                  {shortenAddress(publicKey?.toString() || '')}
                </div>
              </Dropdown>
            </>
          ) : (
            <div onClick={() => setVisible(true)}>Connect Wallet</div>
          )}
        </nav>
      </div>
      <div></div>
    </header>
  )
}
