import {Route, Routes} from 'react-router-dom'
import {NotFoundScreen} from 'screens/not-found'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorMessage, FullPageErrorFallback} from 'components/lib'
import {PublicVoteScreen} from 'screens/public-vote'
import {Privacy} from 'screens/privacy'
import {Terms} from 'screens/terms'
import {Pricing} from 'screens/pricing/index'
import {ThankYouScreen} from 'screens/thank-you'
import {UnauthenticatedNavBar, AuthenticatedNavBar} from 'components/nav-bar'
import {Home} from 'screens/new-home'
import {DesignScreen} from 'screens/design'
import {useAuth} from 'context/auth-context'
import {SettingsScreen} from 'screens/settings'

//redeploy comment

function AppRoutes() {
  return (
    <Routes>
      <Route path="/vote/:shortUrl" element={<PublicVoteScreen />} />
      <Route path="/design/:shortUrl" element={<DesignScreen />} />
      <Route path="/" element={<Home />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/thank-you" element={<ThankYouScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
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
  const {isAuthenticated} = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      {!isAuthenticated ? <UnauthenticatedNavBar /> : <AuthenticatedNavBar />}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRoutes />
      </ErrorBoundary>
    </ErrorBoundary>
  )
}

export default UnauthenticatedApp
