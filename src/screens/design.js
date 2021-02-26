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
  Progress,
  Heading,
} from '@chakra-ui/react'
import {DeleteResourceAlert, FullPageSpinner, Button} from 'components/lib'
import {useNavigate, useParams} from 'react-router-dom'
import {useDeleteDesignVersion} from 'utils/design-version'
import {useDesign} from 'utils/designs'
import {DeleteIcon, EditIcon, LinkIcon, ArrowUpIcon} from '@chakra-ui/icons'
import {HiDotsHorizontal} from 'react-icons/hi'
import {FiLink} from 'react-icons/fi'
import {Check, OpinionIcon, VotesIcon} from 'assets/icons'
import {getVotePercent} from 'utils/votes'

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
      p="1em"
      w="16em"
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

function VersionHeader({totalVotes, votes, designId, versionId, name}) {
  const headerBg = useColorModeValue('white', 'gray.700')
  const votePercent = getVotePercent(totalVotes, votes.length)
  return (
    <Flex
      h="5em"
      w="100%"
      bg={headerBg}
      align="center"
      p="1em"
      position="relative"
    >
      <DesignVersionMenu designId={designId} versionId={versionId} />
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
    <Flex flex="1" flexDir="column">
      <SimpleGrid
        column={2}
        gridTemplateColumns="2fr 1fr"
        columnGap="2.5em"
        alignItems="center"
      >
        <Stack maxW="40em" align="flex-start">
          <Heading fontSize="2rem">{design.name}</Heading>
          {/*//TODO: change this */}
          <Text fontWeight="300" fontSize="xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Stack>
        <DesignStats
          totalVotes={totalVotes}
          totalOpinions={totalOpinions}
          designId={designId}
        />
      </SimpleGrid>
      <SimpleGrid
        m="1em"
        column={3}
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap="2em"
        alignContent="center"
        maxW="80%"
      >
        {versions.map(({pic, versionId, name, votes}) => {
          return (
            <Flex
              key={pic['picture-id']}
              direction="column"
              role="group"
              transition="0.25s all"
              borderRadius="0.5em"
              boxShadow="base"
              align="center"
              overflow="hidden"
              // sx={{
              //   boxShadow: '2px 2px 14px -6px rgba(0,0,0,0.56)',
              // }}
            >
              <VersionHeader
                versionId={versionId}
                name={name}
                votes={votes}
                totalVotes={totalVotes}
              />
              <Image src={pic.uri} objectFit="contain" maxH="28em" w="100%" />
            </Flex>
          )
        })}
      </SimpleGrid>
      <Stack
        maxW="80%"
        m="1em"
        p="1em"
        borderRadius="0.5em"
        boxShadow="base"
        // sx={{
        //   boxShadow: '2px 2px 14px -6px rgba(0,0,0,0.56)',
        // }}
      >
        <Text fontSize="xl">
          <Text as="span" fontWeight="bold">
            {totalOpinions}{' '}
          </Text>
          Opinions
        </Text>
        {design?.opinions?.map((opinion, index, array) => {
          const versionId = opinion['version-id']
          const version = design?.versions.find(
            version => version['version-id'] === versionId,
          )
          return (
            <>
              <SimpleGrid
                columns={3}
                gridTemplateColumns="1fr 6fr 1fr"
                columnGap="1em"
                align="center"
                p="1em"
              >
                <Stack
                  borderWidth="1px"
                  maxW="3em"
                  align="center"
                  justify="center"
                  color="info"
                  cursor="pointer"
                  borderRadius="0.5em"
                >
                  <ArrowUpIcon />
                  <Text>15</Text>
                </Stack>
                <Flex alignItems="center">
                  <Text>{opinion.opinion}</Text>
                </Flex>
                <Image
                  src={version?.pictures[0]?.uri}
                  maxH="6em"
                  maxW="6em"
                  objectFit="contain"
                  borderRadius="0.5em"
                  resize="contain"
                />
              </SimpleGrid>
              {index !== array.length - 1 ? <Divider /> : null}
            </>
          )
        })}
      </Stack>
    </Flex>
  )
}

export {Design}
