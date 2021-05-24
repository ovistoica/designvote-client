import * as React from 'react'
import {useCallback} from 'react'

import {Button} from '@chakra-ui/button'
import {Box, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import {Input, useColorModeValue as mode, useDisclosure} from '@chakra-ui/react'
import {RateStarsVotingCard} from 'components/voting-card/start-rating-card'
import {useZoomModalState, ZoomModal} from 'components/zoom-modal'
import {useAuth} from 'context/auth-context'
import {useCreateDesignStore} from 'store'
import {CreateDesignStep, VoteStyle} from 'types'
import {getDesignSurveyType} from 'utils/design'

export function PreviewStep() {
  const design = useCreateDesignStore(
    useCallback(
      state => ({
        question: state.question,
        name: state.name,
        description: state.description,
        images: state.images,
        imagesByUrl: state.imagesByUrl,
        voteStyle: state.voteStyle,
        designType: state.type,
      }),
      [],
    ),
  )
  const {user} = useAuth()

  const surveyType = getDesignSurveyType(design.designType)
  const heading = `${user?.nickname} wants your feedback on their ${surveyType}`

  const isDesignInvalid = !design.name || !design.question
  const notEnoughVersions = design.imagesByUrl.length < 2
  const {isOpen, onOpen, onClose} = useDisclosure()

  const setStep = useCreateDesignStore(useCallback(state => state.setStep, []))
  const setImage = useZoomModalState(state => state.setImage)

  if (isDesignInvalid) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You are missing the name or the targeted question for this design
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setStep(CreateDesignStep.Create)}
          colorScheme="orange"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  if (notEnoughVersions) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="semibold" fontSize="xl">
          You need at least two versions of this design in order to publish it
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setStep(CreateDesignStep.Upload)}
          colorScheme="orange"
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
            {design.imagesByUrl.map((imageUrl, i) => (
              <RateStarsVotingCard
                index={i}
                key={`designVersion${imageUrl}${i}`}
                versionId="irelevant"
                inPreview
                imageUrl={imageUrl}
                onClick={() => {
                  onOpen()
                  setImage(imageUrl, '')
                }}
              />
            ))}
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
                Let {user?.nickname} know who you are:
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
