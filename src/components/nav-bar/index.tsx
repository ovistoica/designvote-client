import {
  Box,
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

export const NavBar = () => {
  const {login} = useAuth()
  return (
    <Box minH="480px" position="fixed" w="full" zIndex="1000">
      <Box as="header" bg={mode('white', 'gray.800')} borderBottomWidth="1px">
        <Box maxW="7xl" mx="auto" py="4" px={{base: '6', md: '8'}}>
          <Flex as="nav" justify="space-between">
            <HStack spacing="8">
              <Box as="a" href="#" rel="home">
                <VisuallyHidden>Designvote app</VisuallyHidden>
                <Logo h="6" iconColor="orange.500" />
              </Box>
              <HStack display={{base: 'none', lg: 'flex'}} spacing="8">
                <NavLink.Desktop active>Product</NavLink.Desktop>
                <NavLink.Desktop>Pricing</NavLink.Desktop>
                <NavLink.Desktop>Resources</NavLink.Desktop>
                <NavLink.Desktop>Help</NavLink.Desktop>
              </HStack>
            </HStack>
            <Flex align="center">
              <HStack spacing="8" display={{base: 'none', md: 'flex'}}>
                <NavLink.Desktop onClick={login}>Log in </NavLink.Desktop>
                <Button colorScheme="orange" rounded="full">
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
