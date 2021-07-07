import * as React from 'react'

import {
  Input,
  Spinner,
  useColorModeValue as mode,
  useDisclosure,
  Button,
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import {FullPageSpinner} from 'components/lib'
import {RateStarsVotingCard} from 'components/voting-card/start-rating-card'
import {ZoomModal, useZoomModalState} from 'components/zoom-modal'
import {useManageDesign} from 'store'
import {DesignTab, VoteStyle} from 'types'
import {getDesignSurveyType} from 'utils/design'
import {usePoll} from 'utils/design-query'

interface PreviewTabProps {
  pollId: string
}

export function PreviewTab({pollId}: PreviewTabProps) {
  const {data, isLoading} = usePoll(pollId)
  const {poll, versions} = data
  const {setTab} = useManageDesign(
    React.useCallback(state => ({setTab: state.setTab}), []),
  )

  const {isOpen, onOpen, onClose} = useDisclosure()
  const setImage = useZoomModalState(state => state.setImage)

  const surveyType = isLoading
    ? 'Loading...'
    : getDesignSurveyType(poll.designType)
  const heading = isLoading
    ? 'Loading survey...'
    : `TODO FIX THIS wants your feedback on their ${surveyType}`

  if (isLoading) {
    return <FullPageSpinner h="100%" />
  }

  if (!poll.name || !poll.question) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You are missing the name or the targeted question for this poll
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setTab(DesignTab.Info)}
          colorScheme="teal"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  if (poll.versions.length < 2) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You need at least two versions of this poll in order to publish it
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setTab(DesignTab.Versions)}
          colorScheme="teal"
        >
          Go back and upload
        </Button>
      </Stack>
    )
  }
  return (
    <>
      <Box as="section" bg={mode('gray.50', 'gray.800')} pb="24">
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
                {poll.question}
              </Text>
              <Text
                color={mode('gray.600', 'gray.400')}
                mt={{base: '8', md: 16}}
                fontSize="md"
                fontWeight="extrabold"
              >
                {poll.voteStyle === VoteStyle.Choose
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
              poll.versions
                .sort((a, b) => {
                  const {name: nameA} = versions[a]
                  const {name: nameB} = versions[b]
                  if (nameA === nameB) {
                    return 0
                  }
                  return nameA > nameB ? 1 : -1
                })
                .map((vId, index) => {
                  const {img, name} = versions[vId]
                  return (
                    <RateStarsVotingCard
                      index={index}
                      key={`pollVersion${vId}`}
                      versionId={vId}
                      inPreview
                      imageUrl={img}
                      onClick={() => {
                        setImage(img, name)
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
                Let TODO FIX THIS know who you are:
              </Text>
              <Stack direction={{base: 'column', md: 'row'}} spacing="8" mt="4">
                <Input size="lg" placeholder="Enter your name" maxW="md" />
                <Button size="lg" colorScheme="orange" disabled>
                  Submit feedback
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
      <ZoomModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
