import {
  Button,
  Center,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import {DeleteResourceAlert, FullPageSpinner} from 'components/lib'
import {useParams} from 'react-router-dom'
import {useDeleteDesignVersion} from 'utils/design-version'
import {useDesign} from 'utils/designs'
import {DeleteIcon, EditIcon} from '@chakra-ui/icons'
import {HiDotsHorizontal} from 'react-icons/hi'
import {FiLink} from 'react-icons/fi'

function DesignVersionMenu({versionId, designId}) {
  const {mutate: deleteDesignVersion, isLoading} = useDeleteDesignVersion(
    designId,
  )
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
      <Center
        position="absolute"
        right="-2"
        top="-2"
        bg="info"
        w="1.5em"
        h="1.5em"
        borderRadius="10em"
        boxShadow="md"
        opacity={isLoading ? 1 : 0}
        transition="0.25s all"
        _groupHover={{
          opacity: 1,
        }}
      >
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            size="sm"
            w="1.5em"
            h="1.5em"
            onClick={e => e.stopPropagation()}
            opacity={isLoading ? 1 : 0}
            _groupHover={{opacity: 1}}
            _focus={{border: 'none'}}
            _active={{border: 'none'}}
            _hover="none"
          >
            {isLoading ? <Spinner /> : <HiDotsHorizontal fill="white" />}
          </MenuButton>
          <MenuList>
            <MenuItem icon={<EditIcon />}>Edit</MenuItem>
            <MenuItem icon={<FiLink />}>Get link</MenuItem>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={e => {
                e.stopPropagation()
                onOpen()
              }}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Center>
      <DeleteResourceAlert
        isOpen={isOpen}
        onClose={onClose}
        onDeletePress={() => deleteDesignVersion(versionId)}
      />
    </>
  )
}

function Design() {
  const {designId} = useParams()
  const {design, isLoading} = useDesign(designId)

  if (isLoading) {
    return <FullPageSpinner />
  }

  const pictures = design.versions.map(version => ({
    ...version?.pictures[0],
    versionId: version['version-id'],
  }))

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
          <Flex
            key={pic['picture-id']}
            direction="column"
            position="relative"
            flex="0"
            role="group"
            transition="0.25s all"
          >
            <DesignVersionMenu designId={designId} versionId={pic.versionId} />
            <Image src={pic.uri} maxH="32em" />
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export {Design}
