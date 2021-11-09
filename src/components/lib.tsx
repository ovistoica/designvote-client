import React from 'react'
import {
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
  BoxProps,
  Grid,
} from '@chakra-ui/react'
import * as colors from 'styles/colors'

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

const Container: React.FC<BoxProps> = ({children, ...rest}) => {
  return (
    <Grid
      minH="100vh"
      py={{base: '5em'}}
      px={{base: '1', md: '4'}}
      m="0 auto"
      maxW={['512px', '1024px', '1440px']}
      w="100%"
    >
      <Box as="main" w="100%" sx={{scrollPaddingTop: '8em'}} {...rest}>
        {children}
      </Box>
    </Grid>
  )
}

export {
  FullPageSpinner,
  ErrorMessage,
  FullPageErrorFallback,
  DeleteResourceAlert,
  Container,
}
