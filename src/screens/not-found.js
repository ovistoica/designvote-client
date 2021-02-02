import {Grid, Link} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

function NotFoundScreen() {
  return (
    <Grid h="100%" alignContent="center" justifyContent="center">
      <div>
        Sorry... nothing here.{' '}
        <Link as={RouterLink} to="/dashboard">
          Go to dashboard
        </Link>
      </div>
    </Grid>
  )
}

export {NotFoundScreen}
