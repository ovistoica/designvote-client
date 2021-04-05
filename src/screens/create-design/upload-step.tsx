import {Text} from '@chakra-ui/layout'
import {useCreateDesignStore} from 'store'

export function UploadStep() {
  const state = useCreateDesignStore()

  return <Text>{JSON.stringify(state)}</Text>
}
