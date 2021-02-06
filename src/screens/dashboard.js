import {Box, Flex, Grid, Heading, Text, useDisclosure} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import {Button} from 'components/lib'

import {CreateDesignModal} from 'components/create-design'
import {useDesigns} from 'utils/designs'

function Dashboard() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {drafts} = useDesigns()
  return (
    <Flex h="100%" w="100%" flexDir="column">
      <CreateDesignModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex alignItems="center" flex="0">
        <Text fontSize="xl" fontWeight="500">
          Designs
        </Text>
        <Flex
          ml="0.2em"
          boxShadow="md"
          align="center"
          justify="center"
          borderRadius="80px"
          p="0.15em"
        >
          <AddIcon color="brand" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export {Dashboard}
