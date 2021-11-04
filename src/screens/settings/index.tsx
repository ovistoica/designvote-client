import {Box, Stack, useColorModeValue} from '@chakra-ui/react'
import {AccountSettings} from './account-settings'

export const SettingsScreen = () => (
  <Box
    pt="10"
    bg={useColorModeValue('gray.50', 'gray.800')}
    px={{base: '4', md: '10'}}
  >
    <Box maxW="xl" mx="auto">
      <Stack spacing="12">
        <AccountSettings />
      </Stack>
    </Box>
  </Box>
)
