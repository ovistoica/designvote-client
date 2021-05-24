import {
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {useAuth0} from '@auth0/auth0-react'
import {useRouter} from 'next/router'
import {Logo} from '../logo'
import {MobileNav} from './mobile-nav'
import {NavLink} from './nav-link'
import NextLink from 'next/link'

interface NavBarProps extends BoxProps {}

export const NavBar = (props: NavBarProps) => {
  const {loginWithRedirect} = useAuth0()
  const {pathname} = useRouter()
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
            <HStack spacing="8">
              <NextLink href="/">
                <Box cursor="pointer">
                  <Logo h="6" iconColor="orange.500" />
                </Box>
              </NextLink>
              <HStack display={{base: 'none', lg: 'flex'}} spacing="8">
                <NavLink.Desktop active={pathname === '/'} href="/">
                  Product
                </NavLink.Desktop>
                <NavLink.Desktop
                  href="/pricing"
                  active={pathname === '/pricing'}
                >
                  Pricing
                </NavLink.Desktop>
              </HStack>
            </HStack>
            <Flex align="center">
              <HStack spacing="8" display={{base: 'none', md: 'flex'}}>
                <NavLink.Desktop onClick={loginWithRedirect}>
                  Log in
                </NavLink.Desktop>
                <Button
                  colorScheme="orange"
                  rounded="full"
                  onClick={loginWithRedirect}
                >
                  Start Free Trial
                </Button>
              </HStack>
              <Box ml="5">
                <MobileNav />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
