import {AppContainer} from 'components/app-container'
import {ErrorMessage, FullPageErrorFallback} from 'components/lib'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route, Navigate} from 'react-router-dom'

import {ManageDesign} from '../pages/manage-survey/[surveyId]'
import {SettingsScreen} from '../pages/settings'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Navigate to="/app" />
      </Route>
      <Route path="/design/:designId" element={<ManageDesign />} />
      <Route path="/settings" element={<SettingsScreen />} />
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
