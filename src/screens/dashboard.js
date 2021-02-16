import * as React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import {AddIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons'
import {HiDotsHorizontal} from 'react-icons/hi'
import {FiLink} from 'react-icons/fi'

import {CreateDesignModal} from 'components/create-design'
import {useDeleteDesign, useDesigns} from 'utils/designs'
import {useNavigate} from 'react-router-dom'

function DesignCard({designId, name}) {
  const navigate = useNavigate()
  const {mutate: deleteDesign} = useDeleteDesign()

  // dark mode support
  const cardBg = useColorModeValue('white', 'gray.700')
  const menuBG = useColorModeValue('white', 'gray.700')
  const cardHover = useColorModeValue('rgba(55, 53, 47, 0.03)', '#283240')

  // Delete alert specific
  const cancelRef = React.useRef()
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure()

  return (
    <>
      <Flex
        boxShadow="md"
        h="5em"
        align="center"
        justify="space-between"
        p="1em"
        borderRadius="8px"
        flex="1"
        maxW="300px"
        backgroundColor={cardBg}
        cursor="pointer"
        _hover={{background: cardHover}}
        transition="0.25s all"
        onClick={() => navigate(`/design/${designId}`)}
        role="group"
        position="relative"
      >
        <Text>{name}</Text>
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            w="1.5em"
            h="1.5em"
            m="0.5em"
            position="absolute"
            top="0"
            right="0"
            background={menuBG}
            onClick={e => e.stopPropagation()}
            opacity={0}
            _groupHover={{opacity: 1}}
            _focus={{border: 'none'}}
            _active={{border: 'none'}}
          >
            <HiDotsHorizontal />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<EditIcon />}>Edit</MenuItem>
            <MenuItem icon={<FiLink />}>Get link</MenuItem>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={e => {
                e.stopPropagation()
                onAlertOpen()
              }}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Design
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteDesign(designId)
                  onAlertClose()
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

function Dashboard() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {drafts: designs} = useDesigns()
  const cardBg = useColorModeValue('white', 'gray.700')

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
          <DesignCard
            key={design['design-id']}
            designId={design['design-id']}
            name={design.name}
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export {Dashboard}
