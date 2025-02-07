import oauthApi, { OAuthClientInfo } from '@/apis/oauth.api'
import { useAuthStore } from '@/stores/auth.store'
import { useCallback, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import LogoImageSvg from '@/assets/page-header/logo.png'
import { Loader2, ArrowLeftRight, User2, Settings, CalendarDays } from 'lucide-react'

const ScopeMap = new Map<string, React.ReactNode>([
  [
    'basic_data',
    <div className="relative pl-16 text-white">
      <div className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full bg-white/10">
        <User2 />
      </div>
      <div>
        <strong>Access account information</strong>
        <p className="text-white/60">Know who your are in Intermittent Fasting</p>
      </div>
    </div>
  ],
  [
    'checkin_plans',
    <div className="relative pl-16 text-white">
      <div className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full bg-white/10">
        <Settings />
      </div>
      <div>
        <strong>Access check-in plans</strong>
        <p className="text-white/60">View your check-in plans settings</p>
      </div>
    </div>
  ],
  [
    'checkin_data',
    <div className="relative pl-16 text-white">
      <div className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full bg-white/10">
        <CalendarDays />
      </div>
      <div>
        <strong>Access check-in records</strong>
        <p className="text-white/60">View your check-in records</p>
      </div>
    </div>
  ]
])

export default function OAuthAuthorize() {
  const params = new URLSearchParams(window.location.search)
  const redirectUri = params.get('redirect_uri')
  const state = params.get('state')
  const scope = params.get('scope')
  const appId = params.get('client_id')
  const { token } = useAuthStore()

  const [error, setError] = useState('')
  const [customerInfo, setCustomerInfo] = useState<OAuthClientInfo>()
  const [authorizing, setAuthorizing] = useState(false)

  const getAuthorizeInfo = useCallback(async (appId: string | null) => {
    if (!appId) throw new Error('client_id is required')
    const res = await oauthApi.getClientInfo(appId)
    if (!res.data) throw new Error('No such app, please check client_id.')
    else setCustomerInfo(res.data)
  }, [])

  async function handleAuthorize() {
    setAuthorizing(true)
    try {
      if (!appId) throw new Error('client_id is required')
      if (!redirectUri) throw new Error('redirect_uri is required')
      if (!scope) throw new Error('scope is required')

      const res = await oauthApi.userAuthorize({
        response_type: 'code',
        client_id: appId,
        scope: scope,
        redirect_uri: redirectUri
      })
      const authCode = res.data.authorization_code
      const url = new URL(redirectUri)
      url.searchParams.set('code', authCode)
      url.searchParams.set('state', state || '')
      window.location.href = url.toString()
    } catch (err) {
      setError(err.message)
    }
    setAuthorizing(false)
  }

  async function handleDeny() {
    if (!redirectUri) throw new Error('redirect_uri is required')
    const url = new URL(redirectUri)
    url.searchParams.set('error', 'access_denied')
    url.searchParams.set('error_description', 'user denied access')
    window.location.href = url.toString()
  }

  useEffect(() => {
    if (!appId) {
      setError('client_id is required')
      return
    }

    if (!redirectUri) {
      setError('redirect_uri is required')
      return
    }

    if (!scope) {
      setError('scope is required')
      return
    }

    getAuthorizeInfo(appId).catch((err) => {
      setError(err.message)
    })
  }, [appId, getAuthorizeInfo, redirectUri, scope])

  if (!token) {
    const redirect = window.location.href
    return <Navigate to={`/account/signin?redirect_uri=${encodeURIComponent(redirect)}`} />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-8 text-white">
      {/* Main Content */}
      <div className="mx-auto max-w-[400px] rounded-2xl bg-white/5 p-8">
        {error ? (
          <div className="mb-8 rounded-xl border border-[red]/30 bg-[red]/10 p-4">
            <p className="text-[red]">{error}</p>
          </div>
        ) : customerInfo ? (
          <div>
            {/* App Info */}
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-center gap-6">
                <img className="h-12 rounded-full" src={LogoImageSvg} alt="logo" />
                <ArrowLeftRight />
                <img src={customerInfo.avatar_url} alt={customerInfo.name} className="h-12" />
              </div>
              <h1 className="text-center text-xl font-semibold">
                Connect to <span className="text-primary">{customerInfo.name}</span>
              </h1>
            </div>

            {/* Permissions */}
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-medium">This app would like to:</h3>
              <ul className="my-2 space-y-6">{scope?.split(',').map((permission) => ScopeMap.get(permission))}</ul>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                disabled={authorizing}
                onClick={handleDeny}
                className="flex-1 rounded-xl bg-white/20 px-6 py-3 font-medium text-white transition-colors"
              >
                Deny
              </button>
              <button
                onClick={handleAuthorize}
                className="flex flex-1 items-center justify-center rounded-xl bg-[#9CE636] px-6 py-3 font-medium text-black transition-colors hover:bg-[#8BD52F]"
              >
                {authorizing ? <Loader2 className="size-6 animate-spin" /> : 'Authorize'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-12">
            <Loader2 className="size-8 animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
