import {
  Button as ChakraButton,
  Circle,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  Progress,
} from '@chakra-ui/react'
import {DeleteResourceAlert} from 'components/lib'
import {useDeleteDesignVersion} from 'utils/design-version'
import {useDesign} from 'utils/designs'
import {DeleteIcon, EditIcon} from '@chakra-ui/icons'
import {HiDotsHorizontal} from 'react-icons/hi'
import {FiLink} from 'react-icons/fi'
import {Check} from 'assets/icons'
import {getVotePercent} from 'utils/votes'

interface VersionMenuProps {
  designId: string
  versionId: string
}

interface VersionHeaderProps {
  totalVotes: number
  votes: string[]
  name: string
}

interface DesignVersionProps {
  versionId: string
  designId: string
}

export function DesignVersionMenu({versionId, designId}: VersionMenuProps) {
  const {mutate: deleteDesignVersion, isLoading} = useDeleteDesignVersion(
    designId,
  )
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
      <Circle
        position="absolute"
        right="-2"
        top="-2"
        bg="info"
        size="1.5em"
        boxShadow="md"
        opacity={isLoading ? 1 : 0}
        transition="0.25s all"
        _groupHover={{
          opacity: 1,
        }}
      >
        <Menu>
          <MenuButton
            as={ChakraButton}
            variant="ghost"
            size="sm"
            w="1.5em"
            h="1.5em"
            onClick={e => e.stopPropagation()}
            opacity={isLoading ? 1 : 0}
            _groupHover={{opacity: 1}}
            _focus={{border: 'none'}}
            _active={{border: 'none'}}
            _hover={{}}
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
      </Circle>
      <DeleteResourceAlert
        isOpen={isOpen}
        onClose={onClose}
        onDeletePress={() => deleteDesignVersion(versionId)}
      />
    </>
  )
}

function VersionHeader({totalVotes, votes, name}: VersionHeaderProps) {
  const headerBg = useColorModeValue('white', 'gray.700')
  const votePercent = getVotePercent(totalVotes, votes.length)
  return (
    <Flex
      h="5em"
      w="100%"
      bg={headerBg}
      align="center"
      p="1em"
      borderTopRightRadius="0.5em"
      borderTopLeftRadius="0.5em"
    >
      <Check />
      <Flex direction="column" pl="1em" w="100%">
        <Stack direction="row" align="center" justify="space-between">
          <Flex direction="column">
            <Text textTransform="uppercase" fontSize="0.95rem" mb="0">
              {name}
            </Text>
            <Text color="info" fontSize="0.8rem">
              {votes.length} votes
            </Text>
          </Flex>
          <Text fontSize="xl" color="brand.500" fontWeight="bold">
            {votePercent}%
          </Text>
        </Stack>
        <Progress
          value={votePercent}
          borderRadius="20em"
          h="0.3em"
          background="brand.200"
          colorScheme="brand"
        />
      </Flex>
    </Flex>
  )
}

export function DesignVersion({versionId, designId}: DesignVersionProps) {
  const {data} = useDesign(designId)
  const {
    versions,
    pictures,
    design: {totalVotes},
  } = data
  const version = versions[versionId]
  const pictureId = version.pictures[0]
  const {uri} = pictures[pictureId] ?? 'not found'
  return (
    <Flex
      direction="column"
      role="group"
      transition="0.25s all"
      borderRadius="0.5em"
      boxShadow="base"
      align="center"
      position="relative"
    >
      <DesignVersionMenu designId={designId} versionId={versionId} />
      <VersionHeader
        name={version.name}
        votes={version.votes}
        totalVotes={totalVotes}
      />
      <Image src={uri} objectFit="contain" maxH="28em" w="100%" />
    </Flex>
  )
}
