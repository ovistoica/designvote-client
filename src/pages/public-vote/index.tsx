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
import {Footer} from 'components/footer'
import {RateStarsVotingCard} from 'components/voting-card/start-rating-card'
import {ZoomModal, useZoomModalState} from 'components/zoom-modal'
import {useNavigate, useParams} from 'react-router-dom'
import {canSubmit, useVoteDesignState} from 'store/vote-design'
import {VoteStyle} from 'types'
import {getDesignSurveyType} from 'utils/design'
import {useGiveDesignFeedback, useUrlDesign} from 'utils/design-query'

export function PublicVoteScreen() {
  const {shortUrl} = useParams()
  const {data, isLoading, isSuccess} = useUrlDesign(shortUrl)
  const {design, versions, pictures} = data
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
  const setImage = useZoomModalState(state => state.setImage)

  const surveyType = isLoading
    ? 'Loading...'
    : getDesignSurveyType(design.designType)
  const heading = isLoading
    ? 'Loading survey...'
    : `${design.nickname} wants your feedback on their ${surveyType}`

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
                  const {name: nameA} = versions[a]
                  const {name: nameB} = versions[b]
                  if (nameA === nameB) {
                    return 0
                  }
                  return nameA > nameB ? 1 : -1
                })
                .map((vId, index) => {
                  const {
                    pictures: [picId],
                    name,
                  } = versions[vId]
                  const {uri: imageUrl} = pictures[picId]
                  return (
                    <RateStarsVotingCard
                      index={index}
                      key={`designVersion${vId}`}
                      versionId={vId}
                      imageUrl={imageUrl}
                      onClick={() => {
                        setImage(imageUrl, name)
                        onOpen()
                      }}
                    />
                  )
                })
            )}
          </SimpleGrid>
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
              <Text
                color={mode('gray.600', 'gray.400')}
                mt={{base: '4', md: '4'}}
                fontSize="lg"
                fontWeight="extrabold"
              >
                Let {design.nickname} know who you are:
              </Text>
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
        </Box>
      </Box>
      <ZoomModal isOpen={isOpen} onClose={onClose} />
      <Footer />
    </>
  )
}

export default PublicVoteScreen
