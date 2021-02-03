import {Grid, Text} from '@chakra-ui/react'
import {useDesigns} from 'utils/designs'

function Dashboard() {
  const designs = useDesigns()
  return (
    <Grid h="100%" alignContent="center" justifyContent="center">
      <div>
        <Text as="h1">Dashboard</Text>
      </div>
    </Grid>
  )
}

export {Dashboard}
