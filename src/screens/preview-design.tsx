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
  Button,
  useColorModeValue,
  Heading,
  Stack,
} from '@chakra-ui/react'
import {FullPageSpinner} from 'components/lib'
import {useNavigate, useParams} from 'react-router-dom'
import {useDesign} from 'utils/designs'
import {Check, SelectedCheck} from 'assets/icons'
import {ArrowBackIcon} from '@chakra-ui/icons'

function PreviewScreen() {
  const {designId} = useParams()
  const {data, isLoading} = useDesign(designId)
  const {design, versions, pictures} = data

  const [selectedVersion, setSelectedVersion] = React.useState<
    string | undefined
  >()
  const headerBg = useColorModeValue('white', 'gray.700')
  const navigate = useNavigate()

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Flex flex="1" align="center" flexDir="column">
      <Button
        variant="ghost"
        alignSelf="flex-start"
        mb="1em"
        color="info"
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        _focus={{}}
        _active={{}}
      >
        Back
      </Button>
      <Stack mb="1em" w="100%" p="1em">
        <Heading>{design.question}</Heading>
        {design.description ? (
          <Text fontWeight="300" fontSize="xl">
            {design.description}
          </Text>
        ) : null}
      </Stack>

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
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <Button
        variant="secondary"
        w="12.5em"
        mt="1em"
        disabled={!selectedVersion}
      >
        Choose
      </Button>
    </Flex>
  )
}

export {PreviewScreen}
