import React from 'react'
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Flex,
  Text,
  Box,
  Spinner,
  Button as ChakraButton,
  Link,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import {FaMoon, FaSun} from 'react-icons/fa'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import styled from '@emotion/styled/'
import {lightenDarkenColor} from 'utils/color'
import {useMatch, Link as RouterLink} from 'react-router-dom'

const buttonVariants = {
  primary: {
    background:
      'linear-gradient(69.05deg, #F07320 2.77%, #F19852 73.44%, #F3CE9A 94.45%)',
    ':hover': {
      background: `linear-gradient(69.05deg, ${lightenDarkenColor(
        '#F07320',
        -10,
      )} 2.77%,${lightenDarkenColor(
        '#F19852',
        -10,
      )} 73.44%,${lightenDarkenColor('#F3CE9A', -10)} 94.45%)`,
    },
    ':active': {
      background: `linear-gradient(69.05deg, ${lightenDarkenColor(
        '#F07320',
        -10,
      )} 2.77%,${lightenDarkenColor(
        '#F19852',
        -10,
      )} 73.44%,${lightenDarkenColor('#F3CE9A', -10)} 94.45%)`,
    },
  },
  secondary: {
    background: '#059FA3',
    ':hover': {
      background: '#00868A',
    },
    ':active': {
      background: '#00868A',
    },
  },
}

const Button = styled(ChakraButton)(
  {
    color: 'white',
    transition: 'all .25s ease',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    ':focus': {
      boxShadow: 'none',
    },
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

Button.defaultProps = {colorScheme: 'orange'}

const ColorModeSwitcher = props => {
  const {toggleColorMode} = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  )
}

function FullPageSpinner() {
  return (
    <Flex
      direction="column"
      h="100vh"
      align="center"
      justify="center"
      fontSize="4em"
    >
      <Spinner />
    </Flex>
  )
}

const errorMessageVariants = {
  stacked: {display: 'block'},
  inline: {display: 'inline-block'},
}

function ErrorMessage({error, variant = 'stacked', ...props}) {
  return (
    <Box
      role="alert"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={variant === 'stacked' ? 'column' : 'row'}
      {...props}
    >
      <Text as="span" color={colors.danger}>
        There was an error:{'  '}
      </Text>
      <Text
        color={colors.danger}
        as="pre"
        css={[
          {whiteSpace: 'break-spaces', margin: '0', marginBottom: -5},
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </Text>
    </Box>
  )
}

function FullPageErrorFallback({error}) {
  return (
    <Box
      role="alert"
      bg="background3"
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </Box>
  )
}

function NavLink(props) {
  const match = useMatch(props.to)
  return (
    <Link
      as={RouterLink}
      _hover={{
        color: colors.brand,
        textDecoration: 'none',
      }}
      _focus={{outline: 'none'}}
      _active={{outline: 'none'}}
      display="block"
      padding="8px 15px 8px 10px"
      margin="5px 0"
      width="100%"
      height="100%"
      borderRadius="2px"
      borderLeft="5px solid transparent"
      {...(match
        ? {
            color: 'brand',
            borderLeft: `5px solid ${colors.brand}`,
          }
        : null)}
      {...props}
    />
  )
}

function Nav(params) {
  return (
    <Box
      as="nav"
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <UnorderedList
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <ListItem>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/settings">Settings</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/account">Account</NavLink>
        </ListItem>
      </UnorderedList>
    </Box>
  )
}

export {
  ColorModeSwitcher,
  FullPageSpinner,
  ErrorMessage,
  FullPageErrorFallback,
  Button,
  Nav,
  NavLink,
}
