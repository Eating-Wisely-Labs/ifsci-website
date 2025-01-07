import Router from './router'
import SolanaConnectProvider from './providers/solana-connect-provider'

export default function App() {
  return (
    <SolanaConnectProvider>
      <Router />
    </SolanaConnectProvider>
  )
}
