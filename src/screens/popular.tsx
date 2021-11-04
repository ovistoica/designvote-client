import {Flex, Heading} from '@chakra-ui/react'

function PopularScreen() {
  return (
    <Flex direction="column" minH="80vh" w="full" as="main" justify="center">
      <Heading textAlign="center" fontSize={['1.6em', '2.2em']}>
        Popular designs
      </Heading>
    </Flex>
  )
}

export {PopularScreen}
