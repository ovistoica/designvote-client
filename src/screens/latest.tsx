import {Flex, Heading} from '@chakra-ui/react'

function LatestScreen() {
  return (
    <Flex direction="column" minH="80vh" w="full" as="main" justify="center">
      <Heading textAlign="center" fontSize={['1.6em', '2.2em']}>
        Latest designs
      </Heading>
    </Flex>
  )
}

export {LatestScreen}
