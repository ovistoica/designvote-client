import * as React from 'react'
import {Button} from '@chakra-ui/button'
import {
  Input,
  Spinner,
  useColorModeValue as mode,
  useDisclosure,
} from '@chakra-ui/react'
import {Box, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import {useManageDesign} from 'store'
import {DesignTab, VoteStyle} from 'types'
import {useDesign} from 'utils/design-query'
import {FullPageSpinner} from 'components/lib'
import {RateStarsVotingCard} from 'screens/design/rate-five-stars/star-rating-card'
import {getDesignSurveyType} from 'utils/design'
import {ZoomModal, useZoomModalState} from 'components/zoom-modal'
import {useAuth} from 'context/auth-context'

interface PreviewTabProps {
  designId: string
}

export function PreviewTab({designId}: PreviewTabProps) {
  const {data: design, isLoading} = useDesign(designId)
  const {setTab} = useManageDesign(
    React.useCallback(state => ({setTab: state.setTab}), []),
  )

  const {user} = useAuth()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const setImages = useZoomModalState(state => state.setImages)
  const setStartSlide = useZoomModalState(state => state.setIndex)
  const isDesignValid = design.name && design.question
  const hasEnoughVersions = design.versions.length >= 2

  const surveyType = isLoading
    ? 'Loading...'
    : getDesignSurveyType(design.designType)
  const heading = isLoading
    ? 'Loading survey...'
    : `${user?.nickname} wants your feedback on their ${surveyType}`

  React.useEffect(() => {
    if (isDesignValid && hasEnoughVersions) {
      setImages(
        design.versions.map(v => ({url: v.imageUrl, versionId: v.versionId})),
      )
    }
  }, [design.versions, hasEnoughVersions, isDesignValid, setImages])

  if (isLoading) {
    return <FullPageSpinner h="100%" />
  }

  if (!isDesignValid) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You are missing the name or the targeted question for this design
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

  if (!hasEnoughVersions) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You need at least two versions of this design in order to publish it
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
                      inPreview
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
                <Button size="lg" colorScheme="orange" disabled={true}>
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
