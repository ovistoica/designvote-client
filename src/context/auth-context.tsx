import * as React from 'react'

import {
  Auth0Provider as BaseAuth0Provider,
  LogoutOptions,
  RedirectLoginOptions,
  useAuth0,
} from '@auth0/auth0-react'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'
import {useQueryClient} from 'react-query'
import {ApiConfig, User} from 'types'
import {client} from 'utils/api-client'
import {apiClient} from 'utils/axios-client'
import {useAsync} from 'utils/hooks'

const Auth0Provider: React.FC = props => {
  if (
    !process.env.NEXT_PUBLIC_AUTH0_DOMAIN ||
    !process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
  ) {
    throw new Error(
      'Missing .env values for NEXT_PUBLIC_AUTH0_DOMAIN or NEXT_PUBLIC_AUTH0_CLIENT_ID',
    )
  }
  return (
    <BaseAuth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URL}
      audience={process.env.NEXT_PUBLIC_AUTH_AUDIENCE}
      scope="read:current_user update:current_user_metadata"
      {...props}
    />
  )
}

interface AuthState {
  token?: string
  logout: (options?: LogoutOptions | undefined) => void
  user?: User
  login: (options?: RedirectLoginOptions | undefined) => Promise<void>
  isAuthenticated: boolean
}

// Context placed under Auth0Context for easier access to token
const AuthContext = React.createContext<AuthState | undefined>({
  isAuthenticated: false,
  logout: () => {
    /* empty func */
  },
  login: () =>
    /* empty func */
    new Promise<void>(() => undefined),
})
AuthContext.displayName = 'AuthContext'

const AuthProvider: React.FC = props => {
  const {
    getAccessTokenSilently,
    isLoading,
    error,
    logout,
    loginWithRedirect,
    user,
    isAuthenticated,
  } = useAuth0()

  const {run, data: token, isSuccess: isTokenSuccess} = useAsync<string>()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    if (isAuthenticated) {
      run(getAccessTokenSilently())
    }
  }, [run, getAccessTokenSilently, isAuthenticated])

  /**
   * Authenticate the api client
   */
  React.useEffect(() => {
    if (isTokenSuccess) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
      ;(apiClient as any).logout = logout
    }
  }, [isTokenSuccess, logout, token])

  const value: AuthState = React.useMemo(
    () => ({token, logout, user, login: loginWithRedirect, isAuthenticated}),
    [token, logout, user, loginWithRedirect, isAuthenticated],
  )

  if (!isMounted) {
    return null
  }

  if (isLoading) {
    return <FullPageSpinner />
  }

  if (error) {
    return <FullPageErrorFallback error={error} />
  }

  return <AuthContext.Provider value={value} {...props} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

function useClient<Result = unknown, Data = unknown>() {
  const {logout: authLogout, token} = useAuth()
  const qc = useQueryClient()

  // Clear react query cache and log out user
  const logout = React.useCallback(
    async () => Promise.all([qc.clear(), authLogout?.()]),
    [authLogout, qc],
  )

  return React.useCallback(
    (endpoint: string, config: ApiConfig<Data>) =>
      client<Result, Data>(endpoint, {...config, token, logout}),
    [token, logout],
  )
}

export {Auth0Provider, AuthProvider, useAuth, useClient}
