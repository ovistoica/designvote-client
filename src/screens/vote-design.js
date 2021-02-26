import * as React from 'react'
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {Button, FullPageSpinner} from 'components/lib'
import {useNavigate, useParams} from 'react-router-dom'
import {useDesign} from 'utils/designs'
import {useVoteDesignVersion} from 'utils/design-version'
import {Check, SelectedCheck} from 'assets/icons'

function VoteScreen() {
  const [opinion, setOpinion] = React.useState('')
  const {designId} = useParams()
  const {design, isLoading} = useDesign(designId)
  const {
    mutate: vote,
    isSuccess,
    isLoading: isVoteLoading,
  } = useVoteDesignVersion(designId)
  const [selectedVersion, setSelectedVersion] = React.useState()
  const headerBg = useColorModeValue('white', 'gray.700')
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isSuccess) {
      navigate(`/design/${designId}`)
    }
  }, [isSuccess, navigate, designId])

  if (isLoading || isVoteLoading) {
    return <FullPageSpinner />
  }

  const versions = design.versions.map(version => ({
    pic: version?.pictures[0],
    versionId: version['version-id'],
    ...version,
  }))

  return (
    <Flex flex="1" align="center" flexDir="column">
      <SimpleGrid
        m="1em"
        mt="0em"
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
              <Flex h="5em" maxW="20em" bg={headerBg} align="center" p="1em">
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
                src={pic.uri}
                objectFit="contain"
                maxH="28em"
                maxW="20em"
              />
            </Flex>
          )
        })}
      </SimpleGrid>
      <FormControl id="opinion" maxW="40em" mt="1em">
        <FormLabel fontSize="sm">Leave opinion (optional)</FormLabel>
        <Input
          type="text"
          as="textarea"
          placeholder="Opinions help the designer to better understand your choice"
          minH="5em"
          onChange={e => setOpinion(e.target.value)}
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <Button
        variant="secondary"
        w="12.5em"
        mt="1em"
        disabled={!selectedVersion}
        onClick={() => {
          vote({versionId: selectedVersion, opinion})
        }}
      >
        Choose
      </Button>
    </Flex>
  )
}

export {VoteScreen}
