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
import {useDesign, useUrlDesign} from 'utils/designs'
import {useVoteDesignVersion} from 'utils/design-version'
import {Check, SelectedCheck} from 'assets/icons'

export function VoteDesign() {
  const [opinion, setOpinion] = React.useState('')
  const {shortUrl} = useParams()
  const {data, isLoading} = useUrlDesign(shortUrl)
  const {design, versions, pictures} = data
  const {
    mutate: vote,
    isSuccess,
    isLoading: isVoteLoading,
  } = useVoteDesignVersion(design.designId)
  const [selectedVersion, setSelectedVersion] = React.useState()
  const headerBg = useColorModeValue('white', 'gray.700')

  if (isLoading || isVoteLoading) {
    return <FullPageSpinner />
  }

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
        {design.versions.map((versionId, index) => {
          const selected = versionId === selectedVersion
          const version = versions[versionId]
          const pictureId = version.pictures[0]
          const picture = pictures[pictureId]
          return (
            <Flex
              key={pictureId}
              direction="column"
              position="relative"
              flex="0"
              boxShadow="base"
              role="group"
              transition="0.25s all"
              cursor="pointer"
              borderRadius="0.5em"
              onClick={() => setSelectedVersion(versionId)}
              pb="1em"
            >
              <Flex
                h="5em"
                w="100%"
                bg={headerBg}
                align="center"
                p="1em"
                borderTopRightRadius="0.5em"
                borderTopLeftRadius="0.5em"
              >
                {selected ? <SelectedCheck /> : <Check />}
                <Box pl="1em">
                  <Text textTransform="uppercase" fontSize="0.95rem">
                    {version.name}
                  </Text>
                  {version.description ? (
                    <Text color="info" fontSize="0.8rem">
                      {version.description}
                    </Text>
                  ) : (
                    <Text color="info" fontSize="0.8rem">
                      Lorem ipsum dolores sine el
                    </Text>
                  )}
                </Box>
              </Flex>
              <Image
                src={picture.uri}
                objectFit="contain"
                maxH="28em"
                w="100%"
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
