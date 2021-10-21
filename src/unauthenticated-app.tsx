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
import {DesignScreen} from 'screens/design/voting-screen'
import {useAuth} from 'context/auth-context'
import {SettingsScreen} from 'screens/settings'
import {ResultsScreen} from 'screens/design/results-screen'
import {CreateDesign} from 'screens/create-design'
import {LatestScreen} from 'screens/latest'
import {PopularScreen} from 'screens/popular'
import {SupportScreen} from 'screens/support'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/vote/:shortUrl" element={<PublicVoteScreen />} />
      <Route path="/design/:shortUrl" element={<DesignScreen />} />
      <Route path="/results/:shortUrl" element={<ResultsScreen />} />
      <Route path="/" element={<Home />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/thank-you" element={<ThankYouScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/create" element={<CreateDesign />} />
      <Route path="/latest" element={<LatestScreen />} />
      <Route path="/popular" element={<PopularScreen />} />
      <Route path="/support" element={<SupportScreen />} />
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
