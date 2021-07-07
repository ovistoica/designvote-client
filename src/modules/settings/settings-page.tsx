import {Box, Stack, useColorModeValue} from '@chakra-ui/react'

import {AccountSettings} from './account-settings'
import {AppContainer} from '../../components/app-container'

const SettingsPage = () => (
  <AppContainer>
    <Box
      bg={useColorModeValue('gray.50', 'gray.800')}
      px={{base: '4', md: '10'}}
    >
      <Box maxW="xl" mx="auto">
        <Stack spacing="12">
          <AccountSettings />
        </Stack>
      </Box>
    </Box>
  </AppContainer>
)

export default SettingsPage
