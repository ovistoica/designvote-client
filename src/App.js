import React from 'react'
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react'
import {ColorModeSwitcher} from 'components/lib'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>Welcome to Designvote</Text>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default App
