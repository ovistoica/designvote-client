import {Box, Flex, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import {
  Button,
  Image,
  useColorModeValue as mode,
  useDisclosure,
  useToken,
} from '@chakra-ui/react'
import {FullPageSpinner} from 'components/lib'
import * as React from 'react'
import {useParams} from 'react-router'
import {ImageCarouselModal} from './full-image-modal'
import {VoteStyle} from 'types'
import {
  useUrlDesign,
  useVoteDesignVersion,
  VoteFunction,
} from 'utils/design-query'
import Rating from '@material-ui/lab/Rating'
import {withStyles} from '@material-ui/core'
import {useVoterId} from 'utils/votes'

interface DesignVersionProps {
  versionId: string
  designUrl: string
  showRating?: boolean
  index: number
  onVote: VoteFunction
}

function DesignVersion({
  designUrl,
  versionId,
  index,
  showRating = false,
  onVote,
}: DesignVersionProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {data} = useUrlDesign(designUrl)
  const {versions, pictures, design} = data
  const {
    pictures: [picId],
  } = versions[versionId]
  const {uri: imageUrl} = pictures[picId]
  const textColor = mode('gray.400', 'gray.600')
  const colorHex = useToken('colors', textColor)
  const voterId = useVoterId()

  const StyledRating = withStyles({
    iconEmpty: {
      color: colorHex,
    },
  })(Rating)

  return (
    <Stack spacing={1}>
      <Text
        alignSelf="flex-start"
        ml={2}
        color={mode('gray.500', 'gray.300')}
        fontSize="xl"
      >
        #{index + 1}
      </Text>
      <Flex
        py={1}
        key={imageUrl}
        direction="column"
        position="relative"
        bg={mode('inherit', 'gray.700')}
        flex="0"
        boxShadow="base"
        role="group"
        transition="0.25s all"
        cursor="zoom-in"
        _hover={{
          boxShadow: '2xl',
          bg: mode('inherit', 'gray.600'),
        }}
        onClick={onOpen}
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
        <Box pl={2}>
          <StyledRating
            name={`rating for ${versionId}`}
            precision={0.5}
            defaultValue={0}
            size="large"
            onChange={(e, rating) => {
              onVote({versionId, rating, voterId})
            }}
          />
        </Box>
      ) : null}
    </Stack>
  )
}

export function PublicVoteScreen() {
  const {shortUrl} = useParams()
  const {data, isLoading} = useUrlDesign(shortUrl)
  const {design} = data
  const {mutate: vote} = useVoteDesignVersion(design.designId)

  const bg = mode('gray.50', 'gray.800')

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      minH="100vh"
      pt={{base: '5em', md: '5em'}}
    >
      <Box as="section" bg={bg}>
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
            spacing={{base: '2', md: '8', lg: '8'}}
            rowGap={{base: 8, md: 8, lg: 8}}
            alignItems="center"
          >
            {design.versions.map((vId, index) => {
              return (
                <DesignVersion
                  index={index}
                  key={`designVersion${vId}`}
                  versionId={vId}
                  designUrl={shortUrl}
                  showRating={design.voteStyle === VoteStyle.FiveStar}
                  onVote={vote}
                />
              )
            })}
          </SimpleGrid>
          <Button colorScheme="brand" w={{base: '100%', md: '15em'}} m={8}>
            Finish
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}
