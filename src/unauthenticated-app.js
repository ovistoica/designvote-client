import React from 'react'
import {Box, Text, VStack, Grid, Button} from '@chakra-ui/react'
import {useAuth0} from '@auth0/auth0-react'
import {NavBar} from 'components/nav'

function UnauthenticatedApp() {
  const {loginWithRedirect} = useAuth0()
  return (
    <Box textAlign="center" fontSize="xl">
      <NavBar />
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Text>Welcome to Designvote</Text>
          <Button onClick={loginWithRedirect}>Login</Button>
        </VStack>
      </Grid>
    </Box>
  )
}

export default UnauthenticatedApp
