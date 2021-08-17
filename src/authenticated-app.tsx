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
import {ThankYouScreen} from 'screens/thank-you'
import {AuthenticatedNavBar} from 'components/nav-bar'
import {CheckoutScreen} from 'screens/checkout'
import {StripeContext} from 'context/stripe'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Navigate to="/home" />
      </Route>
      <Route
        path="/home"
        element={
          <AppContainer>
            <HomeScreen />
          </AppContainer>
        }
      />
      <Route
        path="/vote/:shortUrl"
        element={
          <>
            <AuthenticatedNavBar />
            <PublicVoteScreen />
          </>
        }
      />
      <Route
        path="/design/:designId"
        element={
          <AppContainer>
            <ManageDesign />
          </AppContainer>
        }
      />
      <Route
        path="/create"
        element={
          <AppContainer>
            <CreateDesign />
          </AppContainer>
        }
      />
      <Route
        path="/settings"
        element={
          <AppContainer>
            <SettingsScreen />
          </AppContainer>
        }
      />
      <Route
        path="/privacy"
        element={
          <AppContainer>
            <Privacy />
          </AppContainer>
        }
      />
      <Route
        path="/checkout"
        element={
          <StripeContext>
            <CheckoutScreen />
          </StripeContext>
        }
      />
      <Route path="/terms" element={<Terms />} />
      <Route path="/thank-you" element={<ThankYouScreen />} />

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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRoutes />
      </ErrorBoundary>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
