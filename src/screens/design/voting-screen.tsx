import * as React from 'react'
import {
  Box,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue as mode,
  useDisclosure,
  Grid,
  Flex,
  Tag,
} from '@chakra-ui/react'
import {useNavigate, useParams} from 'react-router'
import {useUrlDesign} from 'api/design-query'
import {ZoomModal, useZoomModalState} from 'components/zoom-modal'
import {Footer} from 'components/footer'
import {DesignStats} from '../../components/design-stats'
import {DEFAULT_TAGS} from './dummy-data'
import {useHasVoted} from 'utils/hooks'
import {getDesignSurveyType} from 'utils/design'
import {VotingGrid} from 'components/voting-grid'

export function DesignScreen() {
  const {shortUrl} = useParams()
  const {data: design, isLoading, isSuccess} = useUrlDesign(shortUrl)
  const {question, description} = design
  const {isOpen, onOpen, onClose} = useDisclosure()
  const setImages = useZoomModalState(state => state.setImages)
  const setStartSlide = useZoomModalState(state => state.setIndex)
  const navigate = useNavigate()

  const surveyType = isLoading
    ? 'Loading...'
    : getDesignSurveyType(design.designType)
  const defaultDescription = isLoading
    ? 'Loading survey...'
    : `${
        design.ownerName ?? design.ownerNickname
      } wants your feedback on their ${surveyType}`

  // Check if current user already voted on this design
  const hasVoted = useHasVoted(design)

  React.useEffect(() => {
    if (isSuccess && hasVoted) {
      navigate(`/results/${shortUrl}`)
    }
  }, [hasVoted, isSuccess, navigate, shortUrl])

  React.useEffect(() => {
    if (isSuccess) {
      setImages(
        design.versions.map(v => ({url: v.imageUrl, versionId: v.versionId})),
      )
    }
  }, [design.versions, isSuccess, setImages])

  return (
    <>
      <Box as="section" bg={mode('gray.50', 'gray.800')} pt="16" pb="24">
        <Box
          maxW={{base: 'xl', md: '7xl'}}
          mx="auto"
          px={{base: '6', md: '8'}}
          pt="8"
        >
          <Grid gridTemplateColumns={{base: '1fr', md: '65fr 35fr'}} gap="6">
            <Stack>
              <Heading fontWeight="600" color={mode('gray.700', 'gray.200')}>
                {question}
              </Heading>
              <Text color={mode('gray.700', 'gray.300')}>
                {description ?? defaultDescription}
              </Text>

              <Flex wrap="wrap" py="5">
                {
                  // TODO: Change default tags
                }
                {DEFAULT_TAGS.map(t => (
                  <Tag
                    variant="solid"
                    colorScheme="blue"
                    key={`tag${t}`}
                    m="1"
                    size="lg"
                  >
                    {t}
                  </Tag>
                ))}
              </Flex>
            </Stack>
            <DesignStats
              votes={design.totalVotes}
              opinions={design.opinions.length}
            />
          </Grid>
        </Box>
        <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
          {isLoading ? (
            <Spinner />
          ) : (
            <VotingGrid
              voteStyle={design.voteStyle}
              designUrl={shortUrl}
              onVersionClick={(index: number) => {
                onOpen()
                setStartSlide(index)
              }}
            />
          )}
        </Box>
      </Box>
      <ZoomModal isOpen={isOpen} onClose={onClose} />
      <Footer />
    </>
  )
}
