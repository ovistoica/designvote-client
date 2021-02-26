import {Box, Grid} from '@chakra-ui/react'
import {ErrorMessage, FullPageErrorFallback} from 'components/lib'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Dashboard} from 'screens/dashboard'
import {Design} from 'screens/design'
import {NotFoundScreen} from 'screens/not-found'
import {UploadDesign} from 'screens/upload-design-versions'
import {VoteScreen} from 'screens/vote-design'
import {NavBar} from 'components/nav'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact>
        <Navigate to="/dashboard" />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/design/:designId" element={<Design />} />
      <Route path="/vote/:designId" element={<VoteScreen />} />
      <Route path="/upload-design/:designId" element={<UploadDesign />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

function ErrorFallback({error}) {
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
      <Grid minH="100vh" p="2em 4em" m="0 auto" maxW="1440px" w="100%">
        <Box as="main" w="100%">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </Box>
      </Grid>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
