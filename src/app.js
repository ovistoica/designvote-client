import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import {FullPageSpinner} from 'components/lib'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {isAuthenticated, isLoading} = useAuth0()
  if (isLoading) {
    return <FullPageSpinner />
  }
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
