import * as React from 'react'
import {NavBar} from 'components/nav-bar'
import {Route, Routes} from 'react-router-dom'
import {NotFoundScreen} from 'screens/not-found'
import {LandingPage} from 'screens/landing'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorMessage, FullPageErrorFallback} from 'components/lib'
import {PublicVoteScreen} from 'screens/public-vote'
import {useScrollPosition} from '@n8tb1t/use-scroll-position'
import {DarkMode, LightMode} from '@chakra-ui/color-mode'
import {Privacy} from 'screens/privacy'
import {Terms} from 'screens/terms'
import {Pricing} from 'screens/pricing'
import {ThankYouScreen} from 'screens/thank-you'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/vote/:shortUrl" element={<PublicVoteScreen />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/thank-you" element={<ThankYouScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}
interface ErrorFallBackProps {
  error: Error
}

function ErrorFallback({error}: ErrorFallBackProps) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

function UnauthenticatedApp() {
  const [startedScrolling, setStartedScrolling] = React.useState(false)
  useScrollPosition(({currPos}) => {
    if (currPos.y < -60) {
      setStartedScrolling(true)
    } else {
      setStartedScrolling(false)
    }
  })
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <DarkMode>
        <NavBar
          transition="0.3s all"
          {...{
            opacity: startedScrolling ? 0 : 1,
            visibility: startedScrolling ? 'hidden' : 'visible',
          }}
        />
      </DarkMode>
      <LightMode>
        <NavBar
          transition="0.3s all"
          {...{
            opacity: startedScrolling ? 1 : 0,
            visibility: startedScrolling ? 'visible' : 'hidden',
          }}
        />
      </LightMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRoutes />
      </ErrorBoundary>
    </ErrorBoundary>
  )
}

export default UnauthenticatedApp
