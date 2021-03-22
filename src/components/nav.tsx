import React from 'react'
import {
  Link,
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
  Text,
  FlexProps,
  LinkProps,
} from '@chakra-ui/react'

import Logo from './logo'
import {useAuth} from 'context/auth-context'
import {useTheme} from '@emotion/react'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import {FaMoon, FaSun} from 'react-icons/fa'

function NavBar(props: FlexProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const theme = useTheme()
  const {colors} = theme as any
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  const to = isAuthenticated ? '/dashboard' : '/'
  const fill = useColorModeValue(colors.primary[500], colors.primary[300])

  return (
    <NavBarContainer {...props} zIndex={9999}>
      <Logo
        w="100px"
        color={fill}
        cursor="pointer"
        onClick={() => navigate(to)}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  )
}

const CloseIcon = () => {
  const {colors} = useTheme() as any
  const fill = useColorModeValue(colors.primary[500], colors.primary[300])

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
  const fill = useColorModeValue(colors.primary[500], colors.primary[300])

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
  return (
    <Box display={{base: 'block', md: 'none'}} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  )
}

interface NavLinkProps extends LinkProps {
  to: string
}

function NavLink(props: NavLinkProps) {
  const {colors} = useTheme() as any
  const brand = useColorModeValue(colors.primary[500], colors.primary[600])
  return (
    <Link
      as={RouterLink}
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
      {...props}
    />
  )
}

function MenuLinks({isOpen}: {isOpen: boolean}) {
  const {isAuthenticated, user, logout, login} = useAuth()
  const {colors} = useTheme() as any
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
        {isAuthenticated && user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/Settings">Settings</NavLink>
            <Menu>
              <MenuButton
                alignSelf="flex-start"
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
                <MenuItem onClick={() => logout()} icon={<ExternalLinkIcon />}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <NavLink to="/features">Features </NavLink>
            <NavLink to="/pricing">Pricing </NavLink>
            <Text
              cursor="pointer"
              fontWeight="regular"
              fontSize="xl"
              textAlign="start"
              display="block"
              width="100%"
              height="100%"
              borderRadius="2px"
              borderLeft="5px solid transparent"
              _hover={{
                color: brand,
              }}
              onClick={login}
              color={brand}
            >
              Login
            </Text>
            <Text
              cursor="pointer"
              fontWeight="regular"
              fontSize="xl"
              onClick={login}
              color={brand}
            >
              Signup
            </Text>
          </>
        )}
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
