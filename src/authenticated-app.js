import {Box, Text, VStack, Grid, Button, Flex} from '@chakra-ui/react'
import {
  ColorModeSwitcher,
  ErrorMessage,
  FullPageErrorFallback,
} from 'components/lib'
import {useAuth0} from '@auth0/auth0-react'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route, Link as RouterLink, useMatch} from 'react-router-dom'
import {Dashboard} from 'screens/dashboard'
import {Design} from 'screens/design'
import {NotFoundScreen} from 'screens/not-found'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/design" element={<Design />} />
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
      <Grid minH="100vh" p={3}>
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
