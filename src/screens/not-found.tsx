import {Flex, Heading, Link} from '@chakra-ui/react'
import {MetaDecorator} from 'components/meta-decorator'
import {Link as RouterLink} from 'react-router-dom'

function NotFoundScreen() {
  return (
    <Flex
      direction="column"
      minH="100vh"
      w="100vw"
      pt={['4.5em', '6em', '6em']}
      py={['1em', '2em', '4em']}
      as="main"
      justify="center"
    >
      <MetaDecorator
        title="Designvote - 404"
        description="This is the 404 page. You've been redirected here because the page you 
        requested does not exist! You can go to the homepage"
      />
      <Heading textAlign="center" fontSize={['1.6em', '2.2em']}>
        404. Sorry... nothing here.{' '}
      </Heading>
      <Link
        as={RouterLink}
        to="/"
        textAlign="center"
        color="orange.500"
        mt="1em"
      >
        Go to home page
      </Link>
    </Flex>
  )
}

export {NotFoundScreen}
