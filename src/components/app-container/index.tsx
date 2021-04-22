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
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  Stack,
  Text,
  TextProps,
  useBoolean,
  useBreakpointValue,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {ColorModeSwitcher} from 'components/lib'
import {useAuth} from 'context/auth-context'
import * as React from 'react'
import {BsPencilSquare, BsSearch} from 'react-icons/bs'
import {HiMenu, HiChevronRight, HiX} from 'react-icons/hi'
import {MdDashboard, MdSettings} from 'react-icons/md'
import {useNavigate} from 'react-router'
import {useDesigns} from 'utils/design-query'
import {SidebarLink} from './sidebar-link'

export const AppContainer: React.FC = ({children}) => {
  const {isOpen, toggle} = useMobileMenuState()
  const {user} = useAuth()
  const navigate = useNavigate()
  // bg={mode('#0f123f', 'gray.800')}
  const {data: designs} = useDesigns()
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
          <Box
            as="a"
            href="#"
            p="3"
            display="block"
            transition="background 0.1s"
            rounded="xl"
            _hover={{bg: 'whiteAlpha.200'}}
            whiteSpace="nowrap"
          >
            <HStack display="inline-flex">
              <Avatar size="sm" name={user?.name} src={user?.picture} />
              <Box lineHeight="1">
                <Text fontWeight="semibold">{user?.name}</Text>
                <Text
                  fontSize="xs"
                  mt="1"
                  color={mode('whiteAlpha.700', 'gray.400')}
                >
                  {user?.email}
                </Text>
              </Box>
            </HStack>
          </Box>
          <ScrollArea pt="5" pb="6">
            <SidebarLink
              display={{base: 'block', lg: 'none'}}
              mb="2"
              icon={<BsSearch />}
            >
              Search
            </SidebarLink>
            <Stack pb="6">
              <SidebarLink
                icon={<MdDashboard />}
                onClick={() => navigate('/dashboard')}
              >
                Designs
              </SidebarLink>
              <SidebarLink
                icon={<BsPencilSquare />}
                onClick={() => navigate('/create')}
              >
                Create
              </SidebarLink>
              <SidebarLink icon={<MdSettings />}>Settings</SidebarLink>
            </Stack>
            <Stack pb="6">
              <NavSectionTitle>Designs</NavSectionTitle>
              {designs.map(design => (
                <SidebarLink
                  onClick={() => navigate(`design/${design.designId}`)}
                >
                  {design.name}
                </SidebarLink>
              ))}
              <SidebarLink>
                <ColorModeSwitcher />
              </SidebarLink>
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
        <Box
          maxW="2560px"
          bg={mode('gray.50', 'gray.800')}
          height="100%"
          pb="6"
        >
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
              <SearchInput />
            </Flex>
            <Flex
              direction="column"
              flex="1"
              overflow="auto"
              px={{base: '0', md: '10'}}
              pt="8"
            >
              {children}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

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

const NavBreadcrumb = (props: BreadcrumbProps) => (
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
      <BreadcrumbLink>Welcome</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem color="inherit" isCurrentPage>
      <BreadcrumbLink>Product Vision</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
)

const SearchInput = (props: InputProps & {rootProps?: InputGroupProps}) => {
  const {rootProps, ...rest} = props
  return (
    <InputGroup
      maxW="2xs"
      size="sm"
      variant="filled"
      display={{base: 'none', lg: 'block'}}
      {...rootProps}
    >
      <InputLeftElement color="gray.400" pointerEvents="none">
        <BsSearch />
      </InputLeftElement>
      <Input
        {...rest}
        placeholder="Search"
        rounded="md"
        _placeholder={{color: 'gray.400'}}
      />
    </InputGroup>
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
  const isMobile = useBreakpointValue({base: true, lg: false})
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
