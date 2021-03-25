import {Grid, Heading, Link} from '@chakra-ui/react'
import {MetaDecorator} from 'components/meta-decorator'
import {Link as RouterLink} from 'react-router-dom'

function NotFoundScreen() {
  return (
    <Grid h="100%" alignContent="center" justifyContent="center">
      <MetaDecorator
        title="Designvote - 404"
        description="This is the 404 page. You've been redirected here because the page you 
        requested does not exist! You can go to the homepage"
      />
      <Heading textAlign="center">404. Sorry... nothing here. </Heading>
      <Link
        as={RouterLink}
        to="/"
        textAlign="center"
        color="primary.500"
        mt="1em"
      >
        Go to home page
      </Link>
    </Grid>
  )
}

export {NotFoundScreen}
