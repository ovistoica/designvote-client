import {Box, Flex, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import {
  Button,
  Image,
  useColorModeValue as mode,
  useDisclosure,
} from '@chakra-ui/react'
import {FullPageSpinner} from 'components/lib'
import * as React from 'react'
import {useCookies} from 'react-cookie'
import {useParams} from 'react-router'
import {ImageCarouselModal} from './full-image-modal'
import {VoteStyle} from 'types'
import {useUrlDesign, useVoteDesignVersion} from 'utils/design-query'
import Rating from '@material-ui/lab/Rating'

interface DesignVersionProps {
  versionId: string
  designUrl: string
  showRating?: boolean
}

function DesignVersion({
  designUrl,
  versionId,
  showRating = false,
}: DesignVersionProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {data} = useUrlDesign(designUrl)
  const {versions, pictures, design} = data
  const {
    pictures: [picId],
  } = versions[versionId]
  const {uri: imageUrl} = pictures[picId]
  return (
    <Stack align="center">
      <Flex
        key={imageUrl}
        direction="column"
        position="relative"
        flex="0"
        boxShadow="md"
        role="group"
        transition="0.25s all"
        cursor="zoom-in"
        _hover={{
          boxShadow: '2xl',
        }}
        onClick={onOpen}
        pb="1em"
        alignItems="center"
      >
        <Image
          src={imageUrl}
          objectFit="contain"
          boxSize="15em"
          align="center"
        />
        <ImageCarouselModal
          designId={design.designId}
          onClose={onClose}
          isOpen={isOpen}
          initialVersionId={versionId}
        />
      </Flex>
      {showRating ? (
        <Rating
          name={`rating for ${imageUrl}`}
          precision={0.5}
          defaultValue={0}
          size="large"
        />
      ) : null}
    </Stack>
  )
}

export function PublicVoteScreen() {
  const {shortUrl} = useParams()
  const {data, isLoading} = useUrlDesign(shortUrl)
  const {design} = data
  const {
    mutate: vote,
    isSuccess,
    isLoading: isVoteLoading,
  } = useVoteDesignVersion(design.designId)
  const [cookies, setCookie] = useCookies([shortUrl])

  const {voted} = cookies[shortUrl] ?? {voted: false}

  React.useEffect(() => {
    if (!voted && isSuccess) {
      setCookie(shortUrl, {voted: true})
    }
  }, [isSuccess, setCookie, shortUrl, voted])

  if (isLoading || isVoteLoading) {
    return <FullPageSpinner />
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      minH="100vh"
      pt={{base: '5em', md: '5em'}}
    >
      <Box as="section" bg={mode('gray.50', 'gray.800')}>
        <Flex
          direction="column"
          align="center"
          maxW={{base: 'xl', md: '7xl'}}
          mx="auto"
          px={{base: '3', md: '8'}}
        >
          <Stack mb="1em" w="100%" align="center">
            <Heading textAlign="center">{design.question}</Heading>
            {design.description ? (
              <Text fontWeight="300" fontSize="xl">
                {design.description}
              </Text>
            ) : null}
          </Stack>

          <SimpleGrid
            columns={{base: 1, md: 2, lg: 3}}
            spacing={{base: '2', md: '4', lg: '8'}}
            rowGap={{base: 8, md: 8, lg: 8}}
            alignItems="center"
          >
            {design.versions.map((vId, index) => {
              return (
                <DesignVersion
                  versionId={vId}
                  designUrl={shortUrl}
                  showRating={design.voteStyle === VoteStyle.FiveStar}
                />
              )
            })}
          </SimpleGrid>
          <Button colorScheme="brand" size="lg">
            Finish
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}
