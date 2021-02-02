import React from 'react'
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Flex,
  keyframes,
  Text,
} from '@chakra-ui/react'
import {FaMoon, FaSpinner, FaSun} from 'react-icons/fa'
import styled from '@emotion/styled'

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

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  'aria-label': 'loading',
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

export {ColorModeSwitcher, FullPageSpinner}
