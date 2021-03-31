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
  IconButtonProps,
  BoxProps,
  Link,
  LinkProps,
  Circle,
  SquareProps,
} from '@chakra-ui/react'
import {FaMoon, FaSun, FaTwitter} from 'react-icons/fa'
import * as colors from 'styles/colors'
import styled from '@emotion/styled/'
import {lightenDarkenColor} from 'utils/color'
import {useTheme} from '@emotion/react'
import {Link as RouterLink} from 'react-router-dom'
import {GrFacebookOption} from 'react-icons/gr'
import {IoMdMailOpen} from 'react-icons/io'
import {LogoIcon} from 'assets/svg/logo-icon'

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
  ({variant = 'primary'}) => (buttonVariants as any)[variant],
)

Button.defaultProps = {colorScheme: 'orange'}

const ColorModeSwitcher = (props: IconButtonProps) => {
  const {toggleColorMode} = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const {colors} = useTheme() as any
  const brand = useColorModeValue(colors.primary[500], colors.primary[600])

  return (
    <IconButton
      size="md"
      fontSize="lg"
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
      aria-label={`Switch to ${text} mode`}
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

interface ErrorMessageProps extends BoxProps {
  error: Error
  variant?: string
}

function ErrorMessage({
  error,
  variant = 'stacked',
  ...props
}: ErrorMessageProps) {
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
          (errorMessageVariants as any)[variant],
        ]}
      >
        {error.message}
      </Text>
    </Box>
  )
}

interface ErrorFallBackProps {
  error: Error
}

function FullPageErrorFallback({error}: ErrorFallBackProps) {
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

interface DeleteResourceAlertProps {
  onDeletePress: () => void
  isOpen: boolean
  onClose: () => void
  title?: string
  body?: string
}

function DeleteResourceAlert({
  title = 'Delete resource',
  body = "Are you sure? You can't undo this action afterwards.",
  onDeletePress,
  isOpen,
  onClose,
}: DeleteResourceAlertProps) {
  const cancelRef = React.createRef<HTMLButtonElement>()
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
      px="1em"
      {...props}
    />
  )
}

interface SocialIconProps extends SquareProps {
  icon: JSX.Element
}

function SocialIcon({icon, ...restProps}: SocialIconProps) {
  const {colors} = useTheme() as any
  const textInfoColor = useColorModeValue('textInfoLight', 'gray.400')
  const iconColor = useColorModeValue('white', 'gray.900')
  const brand = useColorModeValue(colors.primary[500], colors.primary[600])

  return (
    <Circle
      cursor="pointer"
      bg={textInfoColor}
      w="2.2em"
      h="2.2em"
      color={iconColor}
      mx="0.5em"
      transition="0.2s all"
      _hover={{
        bg: brand,
      }}
      {...restProps}
    >
      {icon}
    </Circle>
  )
}

function Footer() {
  const textInfoColor = useColorModeValue('textInfoLight', 'gray.400')

  return (
    <Flex direction="column" align="center" mb="3.6em" as="footer">
      <LogoIcon width="2em" height="2.5em" style={{marginTop: '2.5em'}} />
      <Flex
        direction={['column', 'column', 'row']}
        mt="2em"
        color={textInfoColor}
        w="24em"
        align="center"
        justify="space-between"
      >
        <NavLink to="/how-it-works" my={['0.5em', '0.5em', 0]}>
          How it works
        </NavLink>
        <NavLink to="/contact" my={['0.5em', '0.5em', 0]}>
          Contact
        </NavLink>
        <NavLink to="/login" my={['0.5em', '0.5em', 0]}>
          Login
        </NavLink>
        <NavLink to="/try" my={['0.5em', '0.5em', 0]}>
          Try free
        </NavLink>
      </Flex>
      <Flex mt="2em">
        <SocialIcon icon={<GrFacebookOption />} />
        <SocialIcon icon={<FaTwitter />} />
        <SocialIcon icon={<IoMdMailOpen />} />
      </Flex>
      <Flex
        direction={['column', 'column', 'row']}
        align="center"
        mt="2em"
        color={textInfoColor}
        justify="space-between"
        w="24em"
      >
        <NavLink to="/terms-and-conditions" my={['0.5em', '0.5em', 0]}>
          Terms and Conditions
        </NavLink>
        <NavLink to="/privacy" my={['0.5em', '0.5em', 0]}>
          Privacy
        </NavLink>
      </Flex>
    </Flex>
  )
}

export {
  ColorModeSwitcher,
  FullPageSpinner,
  ErrorMessage,
  FullPageErrorFallback,
  Button,
  DeleteResourceAlert,
  NavLink,
  SocialIcon,
  Footer,
}
