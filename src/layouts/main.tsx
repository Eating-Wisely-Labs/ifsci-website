import accountApi from '@/apis/account.api'
import { authStoreActions } from '@/stores/auth.store'
import { MessageSignerWalletAdapterProps, WalletReadyState } from '@solana/wallet-adapter-base'
import { useWallet } from '@solana/wallet-adapter-react'
import { encode } from 'bs58'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
async function login(address: string, signMessage?: MessageSignerWalletAdapterProps['signMessage']) {
  if (!signMessage) return
  if (!address) return

  const messageRes = await accountApi.getSignMessage(address)
  const message = messageRes.data.message
  const signatureBuffer = await signMessage(Buffer.from(message, 'utf-8'))
  const signature = encode(signatureBuffer)
  const { data } = await accountApi.login({ address, signature, message })
  return data.token
}

function AutoLogin() {
  const { publicKey, signMessage, disconnect, disconnecting } = useWallet()

  useEffect(() => {
    if (!publicKey) return

    const token = localStorage.getItem('token')
    if (token) return

    login(publicKey.toString(), signMessage)
      .then((token) => authStoreActions.login(token || ''))
      .catch((e) => {
        disconnect()
        authStoreActions.logout()
        console.log(e)
      })
  }, [publicKey, signMessage, disconnect])

  useEffect(() => {
    if (!disconnecting) return
    authStoreActions.logout()
  }, [disconnecting])

  return <></>
}

export default function MainLayout() {
  return (
    <>
      <AutoLogin />
      <Outlet />
    </>
  )
}
