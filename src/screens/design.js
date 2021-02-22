import {
  Button as ChakraButton,
  Circle,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import {DeleteResourceAlert, FullPageSpinner, Button} from 'components/lib'
import {useNavigate, useParams} from 'react-router-dom'
import {useDeleteDesignVersion} from 'utils/design-version'
import {useDesign} from 'utils/designs'
import {DeleteIcon, EditIcon, LinkIcon} from '@chakra-ui/icons'
import {HiDotsHorizontal} from 'react-icons/hi'
import {FiLink} from 'react-icons/fi'
import {OpinionIcon, VotesIcon} from 'assets/icons'

function DesignVersionMenu({versionId, designId}) {
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
      </Circle>
      <DeleteResourceAlert
        isOpen={isOpen}
        onClose={onClose}
        onDeletePress={() => deleteDesignVersion(versionId)}
      />
    </>
  )
}

function DesignStats({totalVotes, totalOpinions, designId}) {
  const statsBg = useColorModeValue('white', 'gray.700')
  const iconColor = useColorModeValue('#1A202C', 'rgba(255, 255, 255, 0.92)')
  const navigate = useNavigate()
  return (
    <Flex
      flexDir="column"
      boxShadow="md"
      w="22em"
      h="15em"
      p="1em"
      bg={statsBg}
      borderRadius="0.5em"
      align="center"
      justify="space-evenly"
    >
      <Flex w="100%" justify="center">
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
      <Button
        variant="outlined"
        w="10em"
        h="3em"
        leftIcon={<LinkIcon />}
        onClick={() => navigate(`/vote/${designId}`)}
      >
        SHARE DESIGN
      </Button>
    </Flex>
  )
}

function Design() {
  const {designId} = useParams()
  const {design, isLoading} = useDesign(designId)

  if (isLoading) {
    return <FullPageSpinner />
  }

  const versions = design.versions.map(version => ({
    pic: version?.pictures[0],
    versionId: version['version-id'],
    ...version,
  }))
  const totalVotes = design['total-votes'] ?? 0
  const totalOpinions = design?.opinions?.length ?? 0

  return (
    <Flex flex="1" align="center" flexDir="column">
      <SimpleGrid column={2} gridTemplateColumns="2fr 1fr" columnGap="2.5em">
        <Text fontSize="2rem" textAlign="center">
          {design.name}
        </Text>
        <DesignStats
          totalVotes={totalVotes}
          totalOpinions={totalOpinions}
          designId={designId}
        />
      </SimpleGrid>
      <SimpleGrid
        m="1em"
        mt="1.5em"
        column={3}
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap="2.5em"
        alignContent="center"
      >
        {versions.map(({pic, versionId, name}) => (
          <Flex
            key={pic['picture-id']}
            direction="column"
            position="relative"
            flex="0"
            role="group"
            transition="0.25s all"
          >
            <DesignVersionMenu designId={designId} versionId={versionId} />
            <Image src={pic.uri} maxH="32em" />
            <Text textAlign="center">{name}</Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export {Design}
