import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { encode } from 'bs58'
import toast from '@/components/ui/toast'
import accountApi from '@/apis/account.api'
import { authStore } from '@/stores/auth.store'
import { shortenAddress } from '@/utils/shorten-address'
import LogoImageSvg from '@/assets/page-header/logo.png'
import { Loader2 } from 'lucide-react'

export default function SignIn() {
  const navigate = useNavigate()
  const { publicKey, signMessage, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const [loading, setLoading] = useState(false)

  const params = new URLSearchParams(window.location.search)
  const redirectUri = params.get('redirect_uri')

  const handleSignIn = async () => {
    if (!publicKey || !signMessage) return
    setLoading(true)

    try {
      const messageRes = await accountApi.getSignMessage(publicKey.toString())
      const message = messageRes.data.message
      const encodedMessage = new TextEncoder().encode(message)
      const signedMessage = await signMessage(encodedMessage)
      const signature = encode(signedMessage)

      const loginRes = await accountApi.login({
        address: publicKey.toString(),
        signature,
        message
      })

      const { token } = loginRes.data
      authStore.token = token
      localStorage.setItem('token', token)

      if (redirectUri) {
        window.location.href = redirectUri
      } else {
        navigate(`/home/${publicKey.toString()}`)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Failed to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    authStore.token = ''
    localStorage.removeItem('token')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-[400px] rounded-2xl bg-white/5 p-8 backdrop-blur-md">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          {/* You can add your logo image here */}
          <div className="mb-4 flex h-full items-center justify-center text-2xl text-white">
            <img className="h-16 rounded-full" src={LogoImageSvg} alt="logo" />
          </div>
          <h1 className="text-2xl font-bold text-white">Intermittent Fasting</h1>
        </div>

        {/* Main Content */}
        <div className="my-12">
          <div className="mb-4 text-center">
            {publicKey && <p className="mt-2 text-sm text-white/60">{shortenAddress(publicKey.toString())}</p>}
          </div>
          {publicKey ? (
            <>
              <button
                onClick={handleSignIn}
                className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-medium text-black transition-colors"
              >
                {loading ? <Loader2 className="size-6 animate-spin"></Loader2> : 'Sign Message to Login'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setVisible(true)}
              className="w-full rounded-lg bg-primary px-4 py-3 text-center font-medium text-black transition-colors"
            >
              Connect Wallet
            </button>
          )}
          {publicKey && (
            <div className="mt-4 text-center text-white/60" onClick={handleDisconnect}>
              Disconnect
            </div>
          )}
        </div>

        {/* Terms and Service */}
        <p className="mt-6 text-center text-xs text-white/40">
          By clicking the button, I acknowledge to IFSCI's{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </a>
          {' and '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
