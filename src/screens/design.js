import {Flex, Image, SimpleGrid, Text} from '@chakra-ui/react'
import {FullPageSpinner} from 'components/lib'
import {useParams} from 'react-router-dom'
import {useDesign} from 'utils/designs'

function Design() {
  const {designId} = useParams()
  const {design, isLoading} = useDesign(designId)

  if (isLoading) {
    return <FullPageSpinner />
  }

  const pictures = design.versions.map(version => version?.pictures[0])

  return (
    <Flex flex="1" align="center" flexDir="column">
      <Text fontSize="2rem" textAlign="center">
        {design.name}
      </Text>
      <SimpleGrid
        m="1em"
        mt="1.5em"
        column={3}
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap="2.5em"
        alignContent="center"
      >
        {pictures.map(pic => (
          <Image key={pic['picture-id']} src={pic.uri} maxH="32em" />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export {Design}
