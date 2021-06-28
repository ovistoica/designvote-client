import {
  HStack,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Stack,
  StackDivider,
  StackProps,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react'
import {FaMoon, FaSun} from 'react-icons/fa'

import {Card} from './card'
import {FieldGroup} from './field-group'
import {HeadingGroup} from './heading-group'

export const AccountSettings = (props: StackProps) => {
  const value = useColorModeValue('dark', 'light')
  const {toggleColorMode} = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Stack as="section" spacing="6" {...props}>
      <HeadingGroup title="Account Settings" />
      <Card>
        <Stack divider={<StackDivider />} spacing="6">
          <FieldGroup title="Name &amp; Avatar">
            <HStack spacing="4">
              {/* <Avatar src={user?.picture} name={user?.name} /> */}
              {/* <Box> */}
              {/*  <Text>{user?.name}</Text> */}
              {/*  <Text color="gray.500" fontSize="sm"> */}
              {/*    {user?.email} */}
              {/*  </Text> */}
              {/* </Box> */}
            </HStack>
          </FieldGroup>

          <FieldGroup title="Color theme" description="Change light/dark mode">
            <Button onClick={toggleColorMode} rightIcon={<SwitchIcon />}>
              Switch to {value} mode
            </Button>
          </FieldGroup>

          <FieldGroup
            title="Communications"
            description="Manage your email preference"
          >
            <Stack spacing="3">
              <FormControl display="flex" alignItems="center">
                <FormLabel
                  htmlFor="email-marketing"
                  flex="1"
                  fontSize="sm"
                  mb="0"
                >
                  Product intro, tips, and inspiration
                </FormLabel>
                <Switch id="email-marketing" colorScheme="orange" />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-news" flex="1" fontSize="sm" mb="0">
                  Updates about company news and features
                </FormLabel>
                <Switch id="email-news" colorScheme="orange" />
              </FormControl>
            </Stack>
          </FieldGroup>
          <FieldGroup>
            <Button>Logout</Button>
          </FieldGroup>
        </Stack>
      </Card>
    </Stack>
  )
}
