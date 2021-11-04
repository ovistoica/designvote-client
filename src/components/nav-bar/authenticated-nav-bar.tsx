import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  useColorModeValue as mode,
  VisuallyHidden,
} from '@chakra-ui/react'
import {useAuth} from 'context/auth-context'
import {Logo} from '../logo'
import {NavLink} from './nav-link'
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom'
import {AuthenticatedMobileNav} from './authenticated-mobile-nav'

interface NavBarProps extends BoxProps {}

export const AuthenticatedNavBar = (props: NavBarProps) => {
  const {user} = useAuth()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  return (
    <Box position="fixed" w="full" zIndex="1000" {...props}>
      <Box
        as="header"
        bg={mode('white', 'gray.800')}
        borderBottomWidth="1px"
        borderBottomColor={mode('inherit', 'gray.600')}
      >
        <Box maxW="7xl" mx="auto" py="4" px={{base: '6', md: '8'}}>
          <Flex as="nav" justify="space-between">
            <HStack>
              <RouterLink to="/" rel="home">
                <VisuallyHidden>Designvote app</VisuallyHidden>
                <Logo h="6" iconColor="orange.500" />
              </RouterLink>
            </HStack>
            <HStack spacing="8">
              <HStack display={{base: 'none', lg: 'flex'}} spacing="8">
                <NavLink.Desktop active={pathname === '/'} to="/">
                  Discover
                </NavLink.Desktop>
                <NavLink.Desktop
                  active={pathname === '/settings'}
                  to="/settings"
                >
                  Settings
                </NavLink.Desktop>
              </HStack>
              <Flex align="center">
                <HStack spacing="4" display={{base: 'none', lg: 'flex'}}>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    fontWeight="400"
                    leftIcon={<FaRegStar />}
                  >
                    <Text as="span" fontWeight="600" mr="1">
                      4
                    </Text>
                    Favorites
                  </Button> */}
                  <Button
                    as={RouterLink}
                    to="/create"
                    colorScheme="orange"
                    size="sm"
                    onClick={() => {
                      navigate('/create')
                    }}
                  >
                    New Question
                  </Button>
                  <Avatar src={user?.picture} />
                </HStack>
                <Box ml={{base: '0', lg: '0'}}>
                  <AuthenticatedMobileNav />
                </Box>
              </Flex>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
