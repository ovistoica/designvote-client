import * as React from 'react'
import {ViewIcon} from '@chakra-ui/icons'
import {
  useColorModeValue,
  Flex,
  Stack,
  Text,
  Divider,
  Button as ChakraButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  useToast,
  useClipboard,
  Spinner,
} from '@chakra-ui/react'
import {OpinionIcon, VotesIcon} from 'assets/icons'
import {FaShare} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {useDesign, usePublishDesign} from 'utils/designs'
import {Button} from 'components/lib'

function ShareModal({isOpen, onClose, designId}) {
  const {
    data: {design},
  } = useDesign(designId)
  const {mutate: publish} = usePublishDesign(designId)

  // get current website link (for production and development)
  const end = window.location.href.lastIndexOf(`/design/${designId}`)
  const websiteLink = window.location.href.slice(0, end)

  // When user wants to share the link
  React.useEffect(() => {
    if (isOpen && !design.public) {
      publish()
    }
  }, [design.public, publish, isOpen])

  const link = `${websiteLink}/vote/${design.shortUrl}`

  const linkBackground = useColorModeValue('gray.100', 'gray.600')
  const toast = useToast()
  const {onCopy} = useClipboard(link)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share design</ModalHeader>
        <ModalCloseButton _focus="none" />
        <ModalBody>
          {design.public ? (
            <FormControl>
              <FormLabel color="info">Share link</FormLabel>
              <Flex
                bg={linkBackground}
                p="0.8em"
                justify="space-between"
                align="center"
                borderRadius="10em"
                width="100%"
              >
                <Text>{link}</Text>
                <Button
                  borderRadius="10em"
                  _focus="none"
                  _active="none"
                  bg="primary.500"
                  color="white"
                  onClick={() => {
                    onCopy()
                    toast({
                      title: 'Link copied to clipboard.',
                      description: 'Design link copied to clipboard',
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    })
                  }}
                >
                  Copy
                </Button>
              </Flex>
            </FormControl>
          ) : (
            <Flex justify="center">
              <Text>Generating link </Text>
              <Spinner ml="1em" />
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <ChakraButton mr={3} onClick={onClose}>
            Cancel
          </ChakraButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export function DesignStats({totalVotes, totalOpinions, designId}) {
  const statsBg = useColorModeValue('white', 'gray.700')
  const iconColor = useColorModeValue('#1A202C', 'rgba(255, 255, 255, 0.92)')
  const navigate = useNavigate()
  const {isOpen, onClose, onOpen} = useDisclosure()
  return (
    <>
      <Flex
        flexDir="column"
        boxShadow="md"
        w="70%"
        minW="15em"
        bg={statsBg}
        borderRadius="0.5em"
        align="center"
        justify="space-evenly"
        overflow="hidden"
      >
        <Flex w="100%" justify="center" p="1em">
          <Stack p="1em" w="49%" align="center">
            <VotesIcon fill={iconColor} />
            <Text fontWeight="bold">{totalVotes}</Text>
            <Text>Votes</Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack p="1em" w="49%" align="center">
            <OpinionIcon fill={iconColor} />
            <Text fontWeight="bold">{totalOpinions}</Text>
            <Text>Opinions</Text>
          </Stack>
        </Flex>
        <Flex w="100%">
          <ChakraButton
            h="3em"
            borderRadius="0px"
            variant="ghost"
            borderWidth="0.1em"
            borderBottomWidth="0em"
            borderLeftWidth="0em"
            borderRightWidth="0.05em"
            leftIcon={<FaShare />}
            onClick={onOpen}
            w="100%"
            color="brand.500"
            _hover={{bg: 'brand.200', color: 'white'}}
            _focus="none"
            _active="none"
          >
            Share
          </ChakraButton>
          <ChakraButton
            borderTopWidth="0.1em"
            borderLeftWidth="0.05em"
            borderBottomWidth="0em"
            borderRightWidth="0em"
            borderRadius="0px"
            variant="ghost"
            h="3em"
            leftIcon={<ViewIcon />}
            onClick={() => navigate(`/preview/${designId}`)}
            w="100%"
            color="brand.500"
            _hover={{bg: 'brand.200', color: 'white'}}
            _focus="none"
            _active="none"
          >
            Preview
          </ChakraButton>
        </Flex>
      </Flex>
      <ShareModal isOpen={isOpen} onClose={onClose} designId={designId} />
    </>
  )
}
