import React from 'react'
import {Box, Grid, Text, VStack} from '@chakra-ui/react'
import {NavBar} from 'components/nav'
import {Route, Routes} from 'react-router-dom'
import {NotFoundScreen} from 'screens/not-found'
import {VoteDesign} from 'screens/vote-unauthenticated'
import {ErrorBoundary} from 'react-error-boundary'
import {Button, ErrorMessage, FullPageErrorFallback} from 'components/lib'
import {useAuth} from 'context/auth-context'

function WelcomePage() {
  const {login} = useAuth()
  return (
    <Grid minH="100vh" p={3}>
      <VStack spacing={8}>
        <Text>Welcome to Designvote</Text>
        <Button onClick={login}>Login</Button>
      </VStack>
    </Grid>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/vote/:shortUrl" element={<VoteDesign />} />
      <Route path="/" element={<WelcomePage />} />
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

function UnauthenticatedApp() {
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

export default UnauthenticatedApp
