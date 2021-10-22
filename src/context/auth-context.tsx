import * as React from 'react'
import {
  AppState,
  Auth0Provider as BaseAuth0Provider,
  LogoutOptions,
  RedirectLoginOptions,
  useAuth0,
} from '@auth0/auth0-react'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'
import {client} from 'api/api-client'
import {useQueryClient} from 'react-query'
import {ApiConfig, Auth0User} from 'types'
import {apiClient} from 'api/axios-client'
import {history} from './history'

const onRedirectCallback = (appState: AppState) => {
  // If using a Hash Router, you need to use window.history.replaceState to
  // remove the `code` and `state` query parameters from the callback url.
  // window.history.replaceState({}, document.title, window.location.pathname);
  history.replace((appState && appState.returnTo) || window.location.pathname)
}

const Auth0Provider: React.FC = props => {
  if (
    !process.env.REACT_APP_AUTH0_DOMAIN ||
    !process.env.REACT_APP_AUTH0_CLIENT_ID
  ) {
    throw new Error(
      'Missing .env values for REACT_APP_AUTH0_DOMAIN or REACT_APP_AUTH0_CLIENT_ID',
    )
  }
  return (
    <BaseAuth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={process.env.REACT_APP_AUTH_AUDIENCE}
      scope="read:current_user update:current_user_metadata"
      {...props}
    />
  )
}

interface AuthState {
  token?: string
  logout: (options?: LogoutOptions | undefined) => void
  user?: Auth0User
  login: (options?: RedirectLoginOptions | undefined) => Promise<void>
  isAuthenticated: boolean
}

// Context placed under Auth0Context for easier access to token
const AuthContext = React.createContext<AuthState | undefined>({
  isAuthenticated: false,
  logout: () => {
    /* empty func */
  },
  login: () => {
    /* empty func */
    return new Promise<void>(() => undefined)
  },
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
      apiClient.defaults.headers.common.Authorization = 'Bearer ' + token
      ;(apiClient as any).logout = logout
    }
  }, [isTokenSuccess, logout, token])

  const value: AuthState = React.useMemo(
    () => ({token, logout, user, login: loginWithRedirect, isAuthenticated}),
    [token, logout, user, loginWithRedirect, isAuthenticated],
  )

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
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient<Result = unknown, Data = unknown>() {
  const {logout: authLogout, token} = useAuth()
  const qc = useQueryClient()

  // Clear react query cache and log out user
  const logout = React.useCallback(async () => {
    return Promise.all([qc.clear(), authLogout?.()])
  }, [authLogout, qc])

  return React.useCallback(
    (endpoint: string, config: ApiConfig<Data>) =>
      client<Result, Data>(endpoint, {...config, token, logout}),
    [token, logout],
  )
}

export {Auth0Provider, AuthProvider, useAuth, useClient}
