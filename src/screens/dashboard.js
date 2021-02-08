import {
  Button,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'

import {CreateDesignModal} from 'components/create-design'
import {useDesigns} from 'utils/designs'
import {useNavigate} from 'react-router-dom'

function Dashboard() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {drafts: designs} = useDesigns()
  const cardBg = useColorModeValue('white', 'gray.700')
  const navigate = useNavigate()
  return (
    <Flex h="100%" w="100%" flexDir="column">
      <CreateDesignModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex alignItems="center" flex="0">
        <Text fontSize="xl" fontWeight="500">
          Designs
        </Text>
        <Button
          variant="ghost"
          ml="1em"
          size="sm"
          boxShadow="md"
          align="center"
          justify="center"
          borderRadius="100px"
          p="0.1em"
          _hover={{
            color: 'brand',
          }}
          _focus={{outline: 'none'}}
          background={cardBg}
          onClick={onOpen}
        >
          <AddIcon />
        </Button>
      </Flex>
      <SimpleGrid
        mt="1em"
        gridTemplateColumns={{sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)'}}
        minChildWidth="300px"
        spacing="1.5em"
      >
        {designs.map(design => (
          <Flex
            key={design['design-id']}
            boxShadow="md"
            h="65px"
            align="center"
            p="1em"
            borderRadius="8px"
            flex="1"
            maxW="300px"
            backgroundColor={cardBg}
            cursor="pointer"
            _hover={{color: 'brand'}}
            transition="0.25s all"
            onClick={() => navigate(`/design/${design['design-id']}`)}
          >
            <Text>{design.name}</Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export {Dashboard}
