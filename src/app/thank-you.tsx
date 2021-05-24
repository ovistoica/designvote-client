import {
  AlertIcon,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertDialogFooter,
} from '@chakra-ui/react'
import {Container} from 'components/lib'

export function ThankYouScreen() {
  return (
    <Container>
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Feedback submitted
        </AlertTitle>
        <AlertDescription maxWidth="sm" mt={4}>
          Thanks for submitting your ratings and comments. This helps more than
          you think :)
        </AlertDescription>
        <AlertDialogFooter mt={4}>
          You can safely close this page
        </AlertDialogFooter>
      </Alert>
    </Container>
  )
}
