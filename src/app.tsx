import React from 'react'
import {FullPageSpinner} from 'components/lib'
import {useAuth} from 'context/auth-context'

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './unauthenticated-app'),
)

function App() {
  const {isAuthenticated} = useAuth()

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
