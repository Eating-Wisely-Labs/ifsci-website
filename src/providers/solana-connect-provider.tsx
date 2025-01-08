import { clusterApiUrl } from '@solana/web3.js'
import { WalletAdapterNetwork, WalletReadyState } from '@solana/wallet-adapter-base'
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import {
  AlphaWalletAdapter,
  AvanaWalletAdapter,
  BitpieWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  CoinhubWalletAdapter,
  FractalWalletAdapter,
  HuobiWalletAdapter,
  HyperPayWalletAdapter,
  KeystoneWalletAdapter,
  KrystalWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  NekoWalletAdapter,
  NightlyWalletAdapter,
  NufiWalletAdapter,
  OntoWalletAdapter,
  ParticleAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SaifuWalletAdapter,
  SalmonWalletAdapter,
  SkyWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,
  SpotWalletAdapter,
  TokenaryWalletAdapter,
  TokenPocketWalletAdapter,
  TorusWalletAdapter,
  TrezorWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
  XDEFIWalletAdapter,
  BitgetWalletAdapter,
  WalletConnectWalletAdapterConfig
} from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { MessageSignerWalletAdapterProps } from '@solana/wallet-adapter-base'
import { useEffect, useMemo } from 'react'
import { encode } from 'bs58'
import accountApi from '@/apis/account.api'
import '@solana/wallet-adapter-react-ui/styles.css'

async function login(address: string, signMessage?: MessageSignerWalletAdapterProps['signMessage']) {
  if (!signMessage) return
  if (!address) return

  const messageRes = await accountApi.getSignMessage(address)
  const message = messageRes.data.message
  const signatureBuffer = await signMessage(Buffer.from(message, 'utf-8'))
  const signature = encode(signatureBuffer)
  console.log(address, signature, message)
  const { data } = await accountApi.login({ address, signature, message })
  return data.token
}

function SolanaWalletConnect() {
  const { wallet, publicKey, signMessage, disconnect, disconnecting } = useWallet()

  useEffect(() => {
    if (!publicKey) return

    const token = localStorage.getItem('token')
    if (token) return

    login(publicKey.toString(), signMessage)
      .then((token) => {
        if (token) localStorage.setItem('token', token)
      })
      .catch((e) => {
        console.log(e)
        disconnect()
      })
  }, [publicKey, signMessage, disconnect])

  useEffect(() => {
    if (!wallet) return
    if (wallet.readyState === WalletReadyState.Installed) wallet.adapter.connect()
    if (wallet.readyState === WalletReadyState.Loadable) wallet.adapter.connect()
    if (wallet.readyState === WalletReadyState.NotDetected) window.open(wallet.adapter.url, '_blank')
    if (wallet.readyState === WalletReadyState.Unsupported) window.open(wallet.adapter.url, '_blank')
  }, [wallet])

  useEffect(() => {
    if (!disconnecting) return
    localStorage.removeItem('token')
  }, [disconnecting])

  return <></>
}

export default function SolanaConnectProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(
    () => {
      const walletConnectConfig: WalletConnectWalletAdapterConfig = {
        network: WalletAdapterNetwork.Mainnet,
        options: { projectId: '962c9560071393709424384e20969e28', showQrModal: true }
      }

      const wallets = [
        new AlphaWalletAdapter(),
        new AvanaWalletAdapter(),
        new BitpieWalletAdapter(),
        new CloverWalletAdapter(),
        new Coin98WalletAdapter(),
        new CoinbaseWalletAdapter(),
        new CoinhubWalletAdapter(),
        new FractalWalletAdapter(),
        new HuobiWalletAdapter(),
        new HyperPayWalletAdapter(),
        new KeystoneWalletAdapter(),
        new KrystalWalletAdapter(),
        new LedgerWalletAdapter(),
        new MathWalletAdapter(),
        new NekoWalletAdapter(),
        new NightlyWalletAdapter(),
        new NufiWalletAdapter(),
        new OntoWalletAdapter(),
        new ParticleAdapter(),
        new PhantomWalletAdapter(),
        new SafePalWalletAdapter(),
        new SaifuWalletAdapter(),
        new SalmonWalletAdapter(),
        new SkyWalletAdapter(),
        new SolflareWalletAdapter(),
        new SolongWalletAdapter(),
        new SpotWalletAdapter(),
        new TokenaryWalletAdapter(),
        new TokenPocketWalletAdapter(),
        new TorusWalletAdapter(),
        new TrezorWalletAdapter(),
        new TrustWalletAdapter(),
        new WalletConnectWalletAdapter(walletConnectConfig),
        new XDEFIWalletAdapter(),
        new BitgetWalletAdapter()
      ]
      return wallets
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <SolanaWalletConnect></SolanaWalletConnect>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
