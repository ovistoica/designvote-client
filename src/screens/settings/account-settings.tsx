import {
  HStack,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Stack,
  StackDivider,
  StackProps,
} from '@chakra-ui/react'
import {FieldGroup} from './field-group'
import {HeadingGroup} from './heading-group'
import {Card} from './card'
import {useAuth} from 'context/auth-context'
import {ColorModeSwitcher} from 'components/lib'

export const AccountSettings = (props: StackProps) => {
  const {user} = useAuth()
  return (
    <Stack as="section" spacing="6" {...props}>
      <HeadingGroup title="Account Settings" />
      <Card>
        <Stack divider={<StackDivider />} spacing="6">
          <FieldGroup
            title="Name &amp; Avatar"
            description="Change your name and profile picture"
          >
            <HStack spacing="4">
              <Avatar src={user?.picture} name={user?.name} />
              <Box>
                <Text>{user?.name}</Text>
                <Text color="gray.500" fontSize="sm">
                  {user?.email}
                </Text>
              </Box>
            </HStack>
            <HStack mt="5">
              <ColorModeSwitcher />
            </HStack>
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
            <Button mt="5" size="sm" fontWeight="normal" colorScheme="orange">
              Save Changes
            </Button>
          </FieldGroup>
        </Stack>
      </Card>
    </Stack>
  )
}
