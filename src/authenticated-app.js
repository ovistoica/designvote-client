import {Box, Grid, Button, Flex} from '@chakra-ui/react'
import {
  ColorModeSwitcher,
  ErrorMessage,
  FullPageErrorFallback,
  Nav,
} from 'components/lib'
import {useAuth0} from '@auth0/auth0-react'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Dashboard} from 'screens/dashboard'
import {Design} from 'screens/design'
import {NotFoundScreen} from 'screens/not-found'
import {UploadDesign} from 'screens/upload-design-versions'
import {VoteScreen} from 'screens/vote-design'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact>
        <Navigate to="/dashboard" />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/design/:designId" element={<Design />} />
      <Route path="/upload-design/:designId" element={<UploadDesign />} />
      <Route path="/vote/:designId" element={<VoteScreen />} />

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
  const {user, logout} = useAuth0()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Flex
        align="center"
        justify="center"
        position="absolute"
        top="10px"
        right="10px"
      >
        <ColorModeSwitcher justifySelf="flex-end" mr="5px" />
        {user.name}
        <Button variant="secondary" css={{marginLeft: '10px'}} onClick={logout}>
          Logout
        </Button>
      </Flex>

      <Grid
        minH="100vh"
        p="4em 2em"
        m="0 auto"
        maxW="1440px"
        w="100%"
        gridGap="1em"
        gridTemplateColumns="1fr 6fr"
      >
        <Box css={{position: 'relative'}}>
          <Nav />
        </Box>
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
