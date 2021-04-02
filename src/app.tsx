import * as React from 'react'
import {FullPageSpinner} from 'components/lib'
import {useAuth} from 'context/auth-context'
import LogRocket from 'logrocket'

LogRocket.init('zbpdjy/designvote')

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './unauthenticated-app'),
)

function App() {
  const {isAuthenticated, user} = useAuth()

  React.useEffect(() => {
    if (isAuthenticated && user && process.env.NODE_ENV === 'production') {
      //Log current session in production
      LogRocket.identify(user.sub, {
        name: user.name,
        email: user.email,
      })
    }
  }, [isAuthenticated, user])

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
