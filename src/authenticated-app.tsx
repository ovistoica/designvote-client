import {ErrorMessage, FullPageErrorFallback} from 'components/lib'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route, Navigate} from 'react-router-dom'
import {HomeScreen} from 'screens/home'
import {NotFoundScreen} from 'screens/not-found'
import {CreateDesign} from 'screens/create-design'
import {ManageDesign} from 'screens/manage-design'
import {PublicVoteScreen} from 'screens/public-vote'
import {AppContainer} from 'components/app-container'
import {SettingsScreen} from 'screens/settings'
import {Privacy} from 'screens/privacy'
import {Terms} from 'screens/terms'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Navigate to="/home" />
      </Route>
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/vote/:shortUrl" element={<PublicVoteScreen />} />
      <Route path="/design/:designId" element={<ManageDesign />} />
      <Route path="/create" element={<CreateDesign />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

function ErrorFallback({error}: {error: Error}) {
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

function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <AppContainer>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRoutes />
        </ErrorBoundary>
      </AppContainer>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
