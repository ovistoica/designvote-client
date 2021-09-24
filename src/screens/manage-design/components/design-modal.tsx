import {
  Avatar,
  Image,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Heading,
  Stack,
  Divider,
} from '@chakra-ui/react'
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
  const {data: design} = useDesign(designId)
  const version = design.versions.find(
    version => version.versionId === versionId,
  )!
  const {imageUrl} = version
  return (
    <Modal onClose={onClose} size="3xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {design.name} {version.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid rows={2} w="full">
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
            <GridItem mt="4">
              <Divider />
              <Heading size="lg" fontWeight="medium" my="4">
                Comments:{' '}
              </Heading>
              <Stack align="flex-start" spacing="4">
                {version.opinions.map((op, index) => {
                  const {opinion, voterName, opinionId} = op
                  return (
                    <SimpleGrid
                      columns={2}
                      key={`opin${opinionId}`}
                      alignItems="flex-start"
                      w="full"
                      templateColumns={{base: '2fr 11.5fr', md: '1fr 11fr'}}
                    >
                      <Avatar size="sm" name={voterName} my="auto" />
                      <Flex direction="column" w="full">
                        <Text fontWeight="semibold">
                          {voterName ?? 'anonymus'}
                        </Text>
                        <Text>{opinion}</Text>
                      </Flex>
                    </SimpleGrid>
                  )
                })}
              </Stack>
            </GridItem>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
