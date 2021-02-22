import * as React from 'react'
import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {Button, FullPageSpinner} from 'components/lib'
import {useParams} from 'react-router-dom'
import {useDesign} from 'utils/designs'
import {useVoteDesignVersion} from 'utils/design-version'
import {Check, SelectedCheck} from 'assets/icons'
import picBg from 'assets/picture-backgrounds/1.png'

function VoteScreen() {
  const {designId} = useParams()
  const {design, isLoading} = useDesign(designId)
  const {mutate: vote} = useVoteDesignVersion(designId)
  const [selectedVersion, setSelectedVersion] = React.useState()
  const headerBg = useColorModeValue('white', 'gray.700')

  if (isLoading) {
    return <FullPageSpinner />
  }

  const versions = design.versions.map(version => ({
    pic: version?.pictures[0],
    versionId: version['version-id'],
    ...version,
  }))

  return (
    <Flex flex="1" align="center" flexDir="column">
      <SimpleGrid column={2} gridTemplateColumns="2fr 1fr" columnGap="2.5em">
        <Text fontSize="2rem" textAlign="center">
          {design.name}
        </Text>
      </SimpleGrid>
      <SimpleGrid
        m="1em"
        mt="1.5em"
        column={3}
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap="2.5em"
        alignContent="center"
      >
        {versions.map(({pic, versionId, name, description}, index) => {
          const selected = versionId === selectedVersion
          return (
            <Flex
              key={pic['picture-id']}
              direction="column"
              position="relative"
              flex="0"
              boxShadow="xl"
              role="group"
              transition="0.25s all"
              cursor="pointer"
              onClick={() => setSelectedVersion(versionId)}
            >
              <Flex h="5em" w="22em" bg={headerBg} align="center" p="1em">
                {selected ? <SelectedCheck /> : <Check />}
                <Box pl="1em">
                  <Text textTransform="uppercase" fontSize="0.95rem">
                    {name}
                  </Text>
                  {description ? (
                    <Text color="info" fontSize="0.8rem">
                      {description}
                    </Text>
                  ) : (
                    <Text color="info" fontSize="0.8rem">
                      Lorem ipsum dolores sine el
                    </Text>
                  )}
                </Box>
              </Flex>
              <Image
                backgroundImage={`url(${picBg})`}
                backgroundSize="cover"
                src={pic.uri}
                objectFit="contain"
                maxH="32em"
              />
            </Flex>
          )
        })}
      </SimpleGrid>
      <Button
        variant="secondary"
        w="12.5em"
        mt="1em"
        disabled={!selectedVersion}
        onClick={() => vote(selectedVersion)}
      >
        Choose
      </Button>
    </Flex>
  )
}

export {VoteScreen}
