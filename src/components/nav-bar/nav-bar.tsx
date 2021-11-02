import {
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
import {MobileNav} from './mobile-nav'
import {NavLink} from './nav-link'
import {Link as RouterLink, useLocation} from 'react-router-dom'

interface NavBarProps extends BoxProps {}

export const UnauthenticatedNavBar = (props: NavBarProps) => {
  const {login} = useAuth()
  const {pathname} = useLocation()
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
                <NavLink.Desktop active={pathname === '/latest'} to="/latest">
                  Latest
                </NavLink.Desktop>
                <NavLink.Desktop active={pathname === '/popular'} to="/popular">
                  Popular
                </NavLink.Desktop>
                <NavLink.Desktop active={pathname === '/support'} to="/support">
                  Support
                </NavLink.Desktop>
              </HStack>
              <Flex align="center">
                <HStack spacing="8" display={{base: 'none', md: 'flex'}}>
                  <NavLink.Desktop onClick={login} to="">
                    Log in{' '}
                  </NavLink.Desktop>
                  <Button colorScheme="orange" rounded="full" onClick={login}>
                    Sign Up
                  </Button>
                </HStack>
                <Box ml="5">
                  <MobileNav />
                </Box>
              </Flex>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
