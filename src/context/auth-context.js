import * as React from 'react'
import {Auth0Provider as BaseAuth0Provider, useAuth0} from '@auth0/auth0-react'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'
import {client} from 'utils/api-client'
import {useQueryClient} from 'react-query'

function Auth0Provider({children}) {
  return (
    <BaseAuth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH_AUDIENCE}
      scope="read:current_user update:current_user_metadata"
    >
      {children}
    </BaseAuth0Provider>
  )
}

// Context placed under Auth0Context for easier access to token
const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    getAccessTokenSilently,
    isLoading,
    error,
    logout,
    loginWithPopup,
    user,
    isAuthenticated,
  } = useAuth0()

  const {run, data: token} = useAsync()

  React.useEffect(() => {
    if (isAuthenticated) {
      run(getAccessTokenSilently())
    }
  }, [run, getAccessTokenSilently, isAuthenticated])

  const value = React.useMemo(
    () => ({token, logout, user, login: loginWithPopup, isAuthenticated}),
    [token, logout, user, loginWithPopup, isAuthenticated],
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

function useClient() {
  const {logout: authLogout, token} = useAuth()
  const qc = useQueryClient()

  // Clear react query cache and log out user
  const logout = React.useCallback(async () => {
    return Promise.all([qc.clear(), authLogout()])
  }, [authLogout, qc])

  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token, logout}),
    [token, logout],
  )
}

export {Auth0Provider, AuthProvider, useAuth, useClient}
