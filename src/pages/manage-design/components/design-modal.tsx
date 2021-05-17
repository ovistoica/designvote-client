import {Avatar} from '@chakra-ui/avatar'
import {Image} from '@chakra-ui/image'
import {Flex, GridItem, SimpleGrid, Text} from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import {useDesign} from 'utils/design-query'

interface DesignModalProps {
  onClose: () => void
  isOpen: boolean
  designId: string
  versionId: string
}

export function DesignModal({
  onClose,
  isOpen,
  designId,
  versionId,
}: DesignModalProps) {
  const {
    data: {versions, design, pictures, opinions},
  } = useDesign(designId)
  const version = versions[versionId]
  const {
    pictures: [picId],
  } = version
  const {uri: imageUrl} = pictures[picId]
  return (
    <Modal onClose={onClose} size="3xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {design.name} {version.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid
            columns={{base: undefined, md: 2}}
            rows={{base: 2, md: undefined}}
            spacing={1}
          >
            <GridItem position="relative">
              <Flex direction="column" alignItems="center">
                <Image
                  src={imageUrl}
                  objectFit="contain"
                  align="center"
                  boxSize="sm"
                />
              </Flex>
            </GridItem>
            <GridItem boxShadow="xl" position="relative">
              <Flex direction="column" alignItems="flex-start" p="1">
                {version.opinions.map((opId, index) => {
                  const {opinion} = opinions[opId]
                  return (
                    <Flex p="1" mt={index !== 0 ? '2' : undefined}>
                      <Avatar size="sm" m="1" mt="0" />
                      <Text ml="2">{opinion}</Text>
                    </Flex>
                  )
                })}
              </Flex>
            </GridItem>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
