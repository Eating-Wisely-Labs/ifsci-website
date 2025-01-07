import { shortenAddress } from '@/utils/shorten-address'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useMemo } from 'react'

export default function LinkWallet() {
  const { publicKey } = useWallet()
  const { setVisible } = useWalletModal()

  const address = useMemo(() => {
    if (publicKey) return publicKey.toString()
    return ''
  }, [publicKey])

  // function handleUnbind() {
  //   twitterApi.unbindTwitter(address).then(() => {
  //     Toast({ type: 'success', message: 'Unbind success' })
  //   })
  // }

  return (
    <div className="items-center">
      <div className="mt-1 flex-1 space-y-6 py-6 text-white">
        <h3 className="text-lg font-bold lg:text-xl">STEP 1</h3>
      </div>
      <div className="text-white">
        {address ? (
          <span className="leading-[44px]">Wallet Address: {shortenAddress(address)}</span>
        ) : (
          <button
            className={
              'flex min-w-[108px] items-center justify-center gap-2 rounded-[4px] bg-primary py-3 font-semibold text-[#1C1C26]'
            }
            onClick={() => setVisible(true)}
          >
            Connect Wallet
          </button>
        )}
      </div>
      {/* <button className="bg-primary px-6 py-3" onClick={handleUnbind}>
        unbind
      </button> */}
    </div>
  )
}
