import React from 'react'
import {
  Box,
  Flex,
  Stack,
  useColorModeValue,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useColorMode,
  FlexProps,
  IconButton,
  Button,
} from '@chakra-ui/react'

import {Logo} from './logo'
import {useAuth} from 'context/auth-context'
import {useTheme} from '@emotion/react'
import {useNavigate} from 'react-router-dom'
import {ExternalLinkIcon, SettingsIcon} from '@chakra-ui/icons'
import {FaMoon, FaSun} from 'react-icons/fa'
import {NavLink} from './lib'
import {Link as BrowserLink} from 'react-router-dom'
import {useIsMobile} from 'utils/hooks'

function AuthenticatedMenu() {
  const {isAuthenticated, user, logout} = useAuth()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const {toggleColorMode} = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const colorSwithcerText = `Switch to ${text} mode`

  return isAuthenticated && user ? (
    <Menu>
      <MenuButton
        alignSelf={['center', 'flex-start']}
        cursor="pointer"
        as={Avatar}
        size="sm"
        alt="Avatar"
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
        <MenuItem as={BrowserLink} to="/settings" icon={<SettingsIcon />}>
          Settings
        </MenuItem>
        <MenuItem onClick={() => logout()} icon={<ExternalLinkIcon />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  ) : null
}

function NavBar(props: FlexProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const theme = useTheme()
  const {colors} = theme as any
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  const to = isAuthenticated ? '/dashboard' : '/'
  const fill = useColorModeValue(colors.orange[500], colors.orange[300])

  return (
    <NavBarContainer {...props} zIndex={9999}>
      <Logo
        w="100px"
        color={fill}
        cursor="pointer"
        onClick={() => navigate(to)}
      />

      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <UnauthenticatedMenuLinks isOpen={isOpen} />
      <AuthenticatedMenu />
    </NavBarContainer>
  )
}

const CloseIcon = () => {
  const {colors} = useTheme() as any
  const fill = useColorModeValue(colors.orange[500], colors.orange[300])

  return (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>Close</title>
      <path
        fill={fill}
        d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
      />
    </svg>
  )
}

const MenuIcon = () => {
  const {colors} = useTheme() as any
  const fill = useColorModeValue(colors.orange[500], colors.orange[300])

  return (
    <svg
      width="24px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      <title>Menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  )
}

function MenuToggle({toggle, isOpen}: {toggle: () => void; isOpen: boolean}) {
  const {isAuthenticated} = useAuth()

  return (
    <Box
      display={{base: isAuthenticated ? 'none' : 'block', md: 'none'}}
      onClick={toggle}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  )
}

function UnauthenticatedMenuLinks({isOpen}: {isOpen: boolean}) {
  const {isAuthenticated, login} = useAuth()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const {toggleColorMode} = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const colorSwithcerText = `Switch to ${text} mode`
  const isMobile = useIsMobile()
  return (
    <Box
      display={{base: isOpen ? 'block' : 'none', md: 'block'}}
      flexBasis={{base: '100%', md: 'auto'}}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'center', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {!isAuthenticated ? (
          <Flex
            direction={['column', 'row', 'row']}
            align="center"
            justify="center"
          >
            <IconButton
              my={['0.5em', '0.5em', 0]}
              mx={'0.5em'}
              variant="ghost"
              icon={<SwitchIcon />}
              aria-label={colorSwithcerText}
              onClick={toggleColorMode}
            />
            <NavLink to="/how-it-works" my={['0.5em', '0.5em', 0]}>
              How it works
            </NavLink>
            <NavLink to="/contact" my={['0.5em', '0.5em', 0]}>
              Contact
            </NavLink>
            <Button
              my={['0.5em', '0.5em', 0]}
              mx={'0.5em'}
              onClick={login}
              variant={isMobile ? 'link' : 'outline'}
              h="2em"
            >
              Login
            </Button>

            <Button
              my={['0.5em', '0.5em', 0]}
              mx={'0.5em'}
              onClick={login}
              colorScheme="teal"
              variant={isMobile ? 'link' : 'solid'}
              h="2em"
            >
              Signup
            </Button>
          </Flex>
        ) : null}
      </Stack>
    </Box>
  )
}

const NavBarContainer = ({children, ...props}: FlexProps) => {
  const {colors} = useTheme() as any
  const bgBig = useColorModeValue(colors.whiteAlpha[900], colors.gray[700])
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p="1em"
      position="fixed"
      bg={bgBig}
      borderBottomWidth="1px"
      {...props}
    >
      {children}
    </Flex>
  )
}

export {NavBar}
