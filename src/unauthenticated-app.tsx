import {NavBar} from 'components/nav'
import {Route, Routes} from 'react-router-dom'
import {NotFoundScreen} from 'screens/not-found'
import {LandingPage} from 'screens/landing'
import {VoteDesign} from 'screens/vote'
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorMessage, FullPageErrorFallback} from 'components/lib'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/vote/:shortUrl" element={<VoteDesign />} />
      <Route path="/" element={<LandingPage />} />
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
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <NavBar />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRoutes />
      </ErrorBoundary>
      {/* <Grid
        minH="100vh"
        p={['4em 1em', '4em 2em', '4em 4em']}
        m="0 auto"
        maxW="1440px"
        w="100%"
      >
        <Box as="main" w="100%"></Box>
      </Grid> */}
    </ErrorBoundary>
  )
}

export default UnauthenticatedApp
