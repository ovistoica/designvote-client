import React from 'react'
import {
  Link,
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useColorMode,
  Text,
} from '@chakra-ui/react'

import Logo from './logo'
import {useAuth} from 'context/auth-context'
import {useTheme} from '@emotion/react'
import {useMatch, Link as RouterLink, useNavigate} from 'react-router-dom'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import {FaMoon, FaSun} from 'react-icons/fa'

const NavBar = props => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const {colors} = useTheme()
  const brand = useColorModeValue(colors.primary[500], colors.primary[600])
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  const to = isAuthenticated ? '/dashboard' : '/'

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color={['white', 'white', brand, brand]}
        cursor="pointer"
        onClick={() => navigate(to)}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  )
}

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
)

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
)

const MenuToggle = ({toggle, isOpen}) => {
  return (
    <Box display={{base: 'block', md: 'none'}} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  )
}

function NavLink(props) {
  const match = useMatch(props.to)
  const {colors} = useTheme()
  const brand = useColorModeValue(colors.primary[500], colors.primary[600])
  return (
    <Link
      as={RouterLink}
      color={['white', 'white', 'current']}
      _hover={{
        color: brand,
        textDecoration: 'none',
      }}
      _focus={{outline: 'none'}}
      _active={{outline: 'none'}}
      display="block"
      width="100%"
      height="100%"
      borderRadius="2px"
      borderLeft="5px solid transparent"
      {...(match
        ? {
            color: ['white', 'white', brand],
            // borderLeft: `5px solid ${colors.brand}`,
          }
        : null)}
      {...props}
    />
  )
}

const MenuLinks = ({isOpen}) => {
  const {isAuthenticated, user, logout, login} = useAuth()
  const {colors} = useTheme()
  const brand = useColorModeValue(colors.primary[500], colors.primary[600])
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const {toggleColorMode} = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const colorSwithcerText = `Switch to ${text} mode`
  return (
    <Box
      display={{base: isOpen ? 'block' : 'none', md: 'block'}}
      flexBasis={{base: '100%', md: 'auto'}}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/Settings">Settings</NavLink>
            <Text
              color={['white', 'white', 'current']}
              _focus={{outline: 'none'}}
              _active={{outline: 'none'}}
              display="block"
              width="100%"
              cursor="default"
              height="100%"
              borderRadius="2px"
              borderLeft="5px solid transparent"
            >
              {user.given_name}
            </Text>
            <Menu>
              <MenuButton
                cursor="pointer"
                as={Avatar}
                size="sm"
                onClick={e => e.stopPropagation()}
                src={user.picture}
              ></MenuButton>
              <MenuList>
                <MenuItem
                  icon={<SwitchIcon />}
                  onClick={toggleColorMode}
                  aria-label={colorSwithcerText}
                >
                  {colorSwithcerText}
                </MenuItem>
                <MenuItem onClick={logout} icon={<ExternalLinkIcon />}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <NavLink to="/demo">Demo</NavLink>
            <NavLink to="/features">Features </NavLink>
            <NavLink to="/pricing">Pricing </NavLink>
            <Button
              width="100%"
              height="100%"
              bg="transparent"
              fontWeight="regular"
              fontSize="xl"
              _hover={{
                color: brand,
              }}
              onClick={login}
              color={['white', 'white', 'current']}
            >
              Login
            </Button>
            <NavLink to="/signup" isLast>
              <Button
                size="sm"
                rounded="md"
                color={['primary.500', 'primary.500', 'white', 'white']}
                bg={['white', 'white', 'primary.500', 'primary.500']}
                _hover={{
                  bg: [
                    'primary.100',
                    'primary.100',
                    'primary.600',
                    'primary.600',
                  ],
                }}
              >
                Create Account
              </Button>
            </NavLink>
          </>
        )}
      </Stack>
    </Box>
  )
}

const NavBarContainer = ({children, ...props}) => {
  const {colors} = useTheme()
  const brand = useColorModeValue(colors.primary[500], colors.primary[600])
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={[brand, brand, 'transparent', 'transparent']}
      {...props}
    >
      {children}
    </Flex>
  )
}

export {NavBar}
