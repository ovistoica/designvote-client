import * as React from 'react'
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Input,
  Text,
  useColorModeValue as mode,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import {RateStarsVotingCard} from 'components/voting-card/start-rating-card'
import {useNavigate, useParams} from 'react-router'
import {canSubmit, useVoteDesignState} from 'store/vote-design'
import {VoteStyle} from 'types'
import {getDesignSurveyType} from 'utils/design'
import {useGiveDesignFeedback, useUrlDesign} from 'utils/design-query'
import {ZoomModal, useZoomModalState} from 'components/zoom-modal'
import {Footer} from 'components/footer'

export function PublicVoteScreen() {
  const {shortUrl} = useParams()
  const {data: design, isLoading, isSuccess} = useUrlDesign(shortUrl)
  const setVoterName = useVoteDesignState(state => state.setVoterName)
  const canSubmitFeedback = useVoteDesignState(canSubmit)
  const {
    mutate: submitFeedback,
    isSuccess: isVotingSuccess,
    isLoading: isVoteLoading,
  } = useGiveDesignFeedback(design.designId, {
    enabled: isSuccess,
  })
  const navigate = useNavigate()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const setImages = useZoomModalState(state => state.setImages)
  const setStartSlide = useZoomModalState(state => state.setIndex)

  React.useEffect(() => {
    if (isSuccess) {
      setImages(
        design.versions.map(v => ({url: v.imageUrl, versionId: v.versionId})),
      )
    }
  }, [design.versions, isSuccess, setImages])

  const surveyType = isLoading
    ? 'Loading...'
    : getDesignSurveyType(design.designType)
  const heading = isLoading
    ? 'Loading survey...'
    : `${design.owner?.nickname} wants your feedback on their ${surveyType}`

  React.useEffect(() => {
    if (isVotingSuccess) {
      navigate('/thank-you')
    }
  }, [isVotingSuccess, navigate])

  return (
    <>
      <Box as="section" bg={mode('gray.50', 'gray.800')} pt="16" pb="24">
        <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
          <Stack
            direction={{base: 'column', lg: 'row'}}
            spacing={{base: '3rem', lg: '2rem'}}
            mt="8"
            align={{lg: 'center'}}
            justify="space-between"
          >
            <Box flex="1">
              <Text
                size="xs"
                textTransform="uppercase"
                fontWeight="semibold"
                color={mode('gray.600', 'gray.300')}
                letterSpacing="wide"
              >
                {surveyType}
              </Text>
              <Heading
                as="h1"
                size="xl"
                color={mode('gray.700', 'gray.300')}
                mt="4"
                fontWeight="bold"
                letterSpacing="tight"
              >
                {heading}
              </Heading>
              <Text mt="4" fontSize="lg" fontWeight="medium">
                {design.question}
              </Text>
              <Text
                color={mode('gray.600', 'gray.400')}
                mt={{base: '8', md: 16}}
                fontSize="md"
                fontWeight="extrabold"
              >
                {design.voteStyle === VoteStyle.Choose
                  ? 'Choose your favorite '
                  : 'Rate your favorites '}
                and leave your feedback below:
              </Text>
            </Box>
          </Stack>
          <Stack
            direction={{base: 'column', lg: 'row'}}
            spacing={{base: '3rem', lg: '2rem'}}
            mt="8"
            align={{lg: 'center'}}
            justify="space-between"
          >
            <Box flex="1">
              <Heading
                as="h1"
                size="xl"
                color={mode('gray.700', 'gray.300')}
                mt="4"
                fontWeight="bold"
                letterSpacing="tight"
              >
                Send your feedback
              </Heading>
              {/*<Text
                color={mode('gray.600', 'gray.400')}
                mt={{base: '4', md: '4'}}
                fontSize="lg"
                fontWeight="extrabold"
              >
                Let {design.nickname} know who you are:
              </Text>*/}
              <Stack direction={{base: 'column', md: 'row'}} spacing="8" mt="4">
                <Input
                  size="lg"
                  placeholder="Enter your name"
                  maxW="md"
                  onChange={e => setVoterName(e.target.value)}
                />
                <Button
                  size="lg"
                  colorScheme="orange"
                  disabled={!canSubmitFeedback}
                  onClick={() => submitFeedback()}
                  isLoading={isVoteLoading}
                >
                  Submit feedback
                </Button>
              </Stack>
            </Box>
          </Stack>
          <SimpleGrid
            columns={{base: 1, md: 2, lg: 3}}
            spacing={{base: '2', md: '8', lg: '8'}}
            rowGap={{base: 8, md: 8, lg: 8}}
            mt="8"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              design.versions
                .sort((a, b) => {
                  const {name: nameA} = a
                  const {name: nameB} = b
                  if (nameA === nameB) {
                    return 0
                  }
                  return nameA > nameB ? 1 : -1
                })
                .map((v, index) => {
                  const {imageUrl, versionId} = v
                  return (
                    <RateStarsVotingCard
                      index={index}
                      key={`designVersion${versionId}`}
                      versionId={versionId}
                      imageUrl={imageUrl}
                      onClick={() => {
                        onOpen()
                        setStartSlide(index)
                      }}
                    />
                  )
                })
            )}
          </SimpleGrid>
        </Box>
      </Box>
      <ZoomModal isOpen={isOpen} onClose={onClose} />
      <Footer />
    </>
  )
}
