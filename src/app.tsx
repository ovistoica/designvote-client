import * as React from 'react'
import {FullPageSpinner} from 'components/lib'
import {useAuth} from 'context/auth-context'
import LogRocket from 'logrocket'
import SplitBee from '@splitbee/web'
import {hotjar} from 'react-hotjar'

if (process.env.NODE_ENV === 'production') {
  LogRocket.init('zbpdjy/designvote')

  SplitBee.init()

  hotjar.initialize(3027725, 6)
}

const UnauthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './unauthenticated-app'),
)

function App() {
  const {isAuthenticated, user} = useAuth()

  React.useEffect(() => {
    if (isAuthenticated && user && process.env.NODE_ENV === 'production') {
      hotjar.identify(user.sub, {
        name: user.name,
        email: user.email,
      })

      //Log current session in production
      LogRocket.identify(user.sub, {
        name: user.name,
        email: user.email,
      })
    }
  }, [isAuthenticated, user])

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <UnauthenticatedApp />
    </React.Suspense>
  )
}

export default App
