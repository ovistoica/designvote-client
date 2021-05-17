import {ErrorMessage, FullPageErrorFallback} from 'components/lib'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route, Navigate} from 'react-router-dom'
import {HomeScreen} from 'pages/home'
import {NotFoundScreen} from 'pages/not-found'
import {CreateDesign} from 'pages/create-design'
import {ManageDesign} from 'pages/manage-design'
import {PublicVoteScreen} from 'pages/public-vote'
import {AppContainer} from 'components/app-container'
import {SettingsScreen} from 'pages/settings'
import {Privacy} from 'pages/privacy'
import {Terms} from 'pages/terms'

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
