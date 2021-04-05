import {ErrorMessage, FullPageErrorFallback} from 'components/lib'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Dashboard} from 'screens/dashboard'
import {Design} from 'screens/design'
import {NotFoundScreen} from 'screens/not-found'
import {UploadDesign} from 'screens/upload-design'
import {PreviewScreen} from 'screens/preview-design'
import {NavBar} from 'components/nav'
import {VoteDesign} from 'screens/vote'
import {CreateDesign} from 'screens/create-design'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Navigate to="/dashboard" />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vote/:shortUrl" element={<VoteDesign />} />
      <Route path="/design/:designId" element={<Design />} />
      <Route path="/preview/:designId" element={<PreviewScreen />} />
      <Route path="/upload-design/:designId" element={<UploadDesign />} />
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
      <NavBar />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRoutes />
      </ErrorBoundary>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
