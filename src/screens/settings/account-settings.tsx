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
  useColorModeValue,
  useColorMode,
  BoxProps,
  Heading,
  Flex,
} from '@chakra-ui/react'
import {FieldGroup} from './field-group'
import {HeadingGroup} from './heading-group'
import {Card} from './card'
import {useAuth} from 'context/auth-context'
import {FaMoon, FaSun} from 'react-icons/fa'
import {Property} from './property'
import {useApiUser} from 'api/design-query'
import {FullPageSpinner} from 'components/lib'
import {SubscriptionStatus} from 'types'
import {LockIcon} from '@chakra-ui/icons'
import {useNavigate} from 'react-router-dom'

export const CardContent = (props: BoxProps) => <Box {...props} />

interface Props {
  title: string
  action?: React.ReactNode
}

export const CardHeader = (props: Props) => {
  const {title, action} = props
  return (
    <Flex align="center" justify="space-between" py="4" borderBottomWidth="1px">
      <Heading as="h2" fontSize="lg">
        {title}
      </Heading>
      {action}
    </Flex>
  )
}

export const AccountSettings = (props: StackProps) => {
  const {user, logout} = useAuth()
  const value = useColorModeValue('dark', 'light')
  const {toggleColorMode} = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const {data} = useApiUser()
  const {account: apiUser} = data ?? {}
  const navigate = useNavigate()

  const subscriptionPlan =
    apiUser?.subscriptionStatus === SubscriptionStatus.Active
      ? 'Pro'
      : 'Starter'

  if (!user) {
    return <FullPageSpinner />
  }

  return (
    <Stack as="section" spacing="6" {...props}>
      <HeadingGroup title="Account Settings" />
      <Card>
        <Stack divider={<StackDivider />} spacing="6">
          <FieldGroup title="Name &amp; Avatar">
            <HStack spacing="4">
              <Avatar src={user?.picture} name={user?.name} />
              <Box>
                <Text>{user?.name}</Text>
                <Text color="gray.500" fontSize="sm">
                  {user?.email}
                </Text>
              </Box>
            </HStack>

            <Box as="section" py="12">
              <CardHeader title="Account Info" />
              <CardContent>
                <Property label="Name" value={user?.name} />
                <Property label="Email" value={user.email} />
                <Property
                  label="Subscription Plan"
                  value={subscriptionPlan}
                  action={
                    apiUser?.subscriptionStatus !==
                    SubscriptionStatus.Active ? (
                      <Button
                        size="sm"
                        colorScheme="orange"
                        title="Upgrade"
                        onClick={() => navigate('/checkout')}
                        py="0"
                        leftIcon={<LockIcon />}
                      >
                        Upgrade
                      </Button>
                    ) : null
                  }
                />
              </CardContent>
            </Box>
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
            <Button onClick={() => logout({returnTo: window.location.origin})}>
              Logout
            </Button>
          </FieldGroup>
        </Stack>
      </Card>
    </Stack>
  )
}
