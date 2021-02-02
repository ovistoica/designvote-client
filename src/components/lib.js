import React from 'react'
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Flex,
  Text,
  Box,
  Spinner,
} from '@chakra-ui/react'
import {FaMoon, FaSun} from 'react-icons/fa'
import * as colors from 'styles/colors'

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

export {ColorModeSwitcher, FullPageSpinner, ErrorMessage, FullPageErrorFallback}
