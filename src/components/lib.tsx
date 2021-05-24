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
  Grid,
} from '@chakra-ui/react'
import {useTheme} from '@emotion/react'
import NextLink from 'next/link'
import {FaMoon, FaSun} from 'react-icons/fa'
import * as appColors from 'styles/colors'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const {toggleColorMode} = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      size="md"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}

function FullPageSpinner(props: BoxProps) {
  return (
    <Flex
      direction="column"
      h="100vh"
      align="center"
      justify="center"
      fontSize="4em"
      {...props}
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
      <Text as="span" color={appColors.danger}>
        There was an error:{'  '}
      </Text>
      <Text
        color={appColors.danger}
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
        color: appColors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
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
      isCentered
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
  href: string
}

function NavLink(props: NavLinkProps) {
  const {colors} = useTheme() as any
  const brand = useColorModeValue(colors.orange[500], colors.orange[600])
  return (
    <Link
      as={NextLink}
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
  const brand = useColorModeValue(colors.orange[500], colors.orange[600])

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

const Container: React.FC<BoxProps> = ({children, ...rest}) => (
  <Grid
    minH="100vh"
    p={['5em 1em', '5em 2em', '5em 4em']}
    m="0 auto"
    maxW={['512px', '1024px', '1440px']}
    w="100%"
  >
    <Box as="main" w="100%" sx={{scrollPaddingTop: '8em'}} {...rest}>
      {children}
    </Box>
  </Grid>
)

export {
  ColorModeSwitcher,
  FullPageSpinner,
  ErrorMessage,
  FullPageErrorFallback,
  DeleteResourceAlert,
  NavLink,
  SocialIcon,
  Container,
}
