import React from 'react'
import {Box, Text, VStack, Grid, Button} from '@chakra-ui/react'
import {ColorModeSwitcher} from 'components/lib'
import {useAuth0} from '@auth0/auth0-react'

function UnauthenticatedApp() {
  const {loginWithRedirect} = useAuth0()
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Text>Welcome to Designvote</Text>
          <Button onClick={loginWithRedirect}>Login</Button>
        </VStack>
      </Grid>
    </Box>
  )
}

export default UnauthenticatedApp
