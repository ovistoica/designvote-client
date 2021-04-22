import {ErrorMessage, FullPageErrorFallback} from 'components/lib'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Dashboard} from 'screens/dashboard'
import {NotFoundScreen} from 'screens/not-found'
import {CreateDesign} from 'screens/create-design'
import {ManageDesign} from 'screens/manage-design'
import {PublicVoteScreen} from 'screens/public-vote'
import {AppContainer} from 'components/app-container'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Navigate to="/dashboard" />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vote/:shortUrl" element={<PublicVoteScreen />} />
      <Route path="/design/:designId" element={<ManageDesign />} />
      <Route path="/create" element={<CreateDesign />} />
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
