import * as React from 'react'

import {
  Avatar,
  Box,
  BoxProps,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
  Flex,
  HStack,
  Stack,
  Text,
  TextProps,
  useBoolean,
  useBreakpointValue,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {BsPencilSquare} from 'react-icons/bs'
import {HiMenu, HiChevronRight, HiX} from 'react-icons/hi'
import {MdDashboard, MdSettings} from 'react-icons/md'
import {useFormattedLocationName} from 'utils/hooks'
import Link from 'next/link'

import {SidebarLink} from './sidebar-link'
import {useRouter} from 'next/router'
import {usePolls} from '../../utils/design-query'
import {useUser} from '../../store/user'

const MobileMenuButton = (props: {onClick: () => void; isOpen: boolean}) => {
  const {onClick, isOpen} = props
  return (
    <Box
      display={{base: 'block', md: 'none'}}
      ml="-8"
      mr="2"
      as="button"
      type="button"
      rounded="md"
      p="1"
      fontSize="xl"
      color="gray.500"
      _hover={{bg: 'gray.100'}}
      onClick={onClick}
    >
      <Box srOnly>{isOpen ? 'Close Menu' : 'Open Menu'}</Box>
      {isOpen ? <HiX /> : <HiMenu />}
    </Box>
  )
}

const NavBreadcrumb = (props: BreadcrumbProps) => {
  const {push: navigate} = useRouter()
  const currentLocation = useFormattedLocationName()

  return (
    <Breadcrumb
      fontSize="sm"
      {...props}
      separator={
        <Box
          as={HiChevronRight}
          color="gray.400"
          fontSize="md"
          top="2px"
          pos="relative"
        />
      }
    >
      <BreadcrumbItem color="inherit">
        <BreadcrumbLink onClick={() => navigate('/app')}>Home</BreadcrumbLink>
      </BreadcrumbItem>
      {currentLocation ? (
        <BreadcrumbItem color="inherit" isCurrentPage>
          <BreadcrumbLink>{currentLocation}</BreadcrumbLink>
        </BreadcrumbItem>
      ) : null}
    </Breadcrumb>
  )
}

const ScrollArea = (props: BoxProps) => (
  <Box
    overflowY="auto"
    height="80vh"
    minH="px"
    maxH="full"
    {...props}
    sx={{
      '&::-webkit-scrollbar-track': {
        bg: 'transparent',
      },
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        bg: mode('blue.600', 'gray.700'),
        borderRadius: '20px',
      },
    }}
  />
)

const useMobileMenuState = () => {
  const [isOpen, actions] = useBoolean()
  const isMobile = useBreakpointValue({base: true, md: false})
  React.useEffect(() => {
    if (isMobile === false) {
      actions.off()
    }
  }, [isMobile, actions])
  return {isOpen, ...actions}
}

const NavSectionTitle = (props: TextProps) => (
  <Text
    casing="uppercase"
    fontSize="xs"
    fontWeight="semibold"
    letterSpacing="wide"
    paddingStart="3"
    color="gray.400"
    {...props}
  />
)

export const AppContainer: React.FC = ({children}) => {
  const {isOpen, toggle} = useMobileMenuState()
  const {push: navigate} = useRouter()
  const user = useUser(state => state.user)
  const {data: polls} = usePolls()

  // @ts-ignore
  return (
    <Flex
      height="100vh"
      bg={mode('blue.800', 'gray.900')}
      overflow="hidden"
      sx={{'--sidebar-width': '220px'}}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <Link href="/home">
            <Box
              p="3"
              display="block"
              transition="background 0.1s"
              rounded="xl"
              _hover={{bg: 'whiteAlpha.200'}}
              whiteSpace="nowrap"
              onClick={() => {
                navigate('/')
                toggle()
              }}
            >
              <HStack display="inline-flex">
                <Avatar size="sm" name={user?.name} src={user?.picture} />
                <Box lineHeight="1">
                  <Text fontWeight="semibold">{user?.name}</Text>
                </Box>
              </HStack>
            </Box>
          </Link>
          <ScrollArea pt="5" pb="6">
            <Stack pb="6">
              <SidebarLink href="/home" icon={<MdDashboard />}>
                Your Surveys
              </SidebarLink>
              <SidebarLink href="/create-survey" icon={<BsPencilSquare />}>
                Create
              </SidebarLink>
              <SidebarLink href="/settings" icon={<MdSettings />}>
                Settings
              </SidebarLink>
            </Stack>
            <Stack pb="6">
              <NavSectionTitle>Designs</NavSectionTitle>
              {polls.map(poll => (
                <SidebarLink
                  href={`survey/${poll.pollId}`}
                  key={`sideBarSurvey${poll.pollId}`}
                >
                  {poll.name}
                </SidebarLink>
              ))}
            </Stack>
          </ScrollArea>
        </Box>
      </Box>
      <Box
        flex="1"
        pl={{base: '0', md: '6'}}
        marginStart={{md: 'var(--sidebar-width)'}}
        position="relative"
        left={isOpen ? 'var(--sidebar-width)' : '0'}
        transition="left 0.2s"
      >
        <Box maxW="2560px" bg={mode('gray.50', 'gray.800')} height="100%">
          <Flex direction="column" height="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                <NavBreadcrumb />
              </Flex>
            </Flex>
            <Flex
              direction="column"
              flex="1"
              overflowX="hidden"
              overFlowY="scroll"
              // align={currentLocation === 'Create Design' ? 'center' : undefined}
              px={{base: '0', md: '10'}}
            >
              {children}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
