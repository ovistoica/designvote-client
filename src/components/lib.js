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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'
import {FaMoon, FaSun} from 'react-icons/fa'
import * as colors from 'styles/colors'
import styled from '@emotion/styled/'
import {lightenDarkenColor} from 'utils/color'
import {useTheme} from '@emotion/react'

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
  outlined: {
    border: ' 2px solid #059FA3',
    color: '#059FA3',
    ':hover': {
      background: '#059FA3',
      color: 'white',
    },
    ':active': {
      background: '#059FA3',
      color: 'white',
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
  const {colors} = useTheme()
  const brand = useColorModeValue(colors.primary[500], colors.primary[600])

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color={['white', 'white', 'current']}
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      _hover={{
        color: ['white', 'white', brand],
        textDecoration: 'none',
      }}
      _focus={{outline: 'none'}}
      _active={{outline: 'none'}}
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

function DeleteResourceAlert({
  title = 'Delete resource',
  body = "Are you sure? You can't undo this action afterwards.",
  onDeletePress,
  isOpen,
  onClose,
}) {
  const cancelRef = React.useRef()
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" aria-label={title}>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <ChakraButton ref={cancelRef} onClick={onClose}>
              Cancel
            </ChakraButton>
            <ChakraButton
              colorScheme="red"
              onClick={() => {
                onDeletePress()
                onClose()
              }}
              ml={3}
            >
              Delete
            </ChakraButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export {
  ColorModeSwitcher,
  FullPageSpinner,
  ErrorMessage,
  FullPageErrorFallback,
  Button,
  DeleteResourceAlert,
}
