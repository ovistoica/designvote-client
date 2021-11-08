import * as React from 'react'
import {useCallback} from 'react'
import {Button} from '@chakra-ui/button'
import {Box, Heading, Stack, Text} from '@chakra-ui/layout'
import {
  Grid,
  HStack,
  useColorModeValue as mode,
  useDisclosure,
} from '@chakra-ui/react'
import {useCreateDesignStore, useUploadDesignImagesStore} from 'store'
import {CreateDesignStep} from 'types'
import {getDesignSurveyType} from 'utils/design'
import {useAuth} from 'context/auth-context'
import {useZoomModalState, ZoomModal} from 'components/zoom-modal'
import {DesignStats} from 'components/design-stats'
import {VotingGrid} from './preview-voting-grid'
import {FaRegThumbsUp} from 'react-icons/fa'

export function PreviewStep() {
  const design = useCreateDesignStore(
    useCallback(
      state => ({
        question: state.question,
        name: state.name,
        description: state.description,
        voteStyle: state.voteStyle,
        designType: state.type,
      }),
      [],
    ),
  )
  const images = useUploadDesignImagesStore(state => state.images)

  const {user} = useAuth()

  const surveyType = getDesignSurveyType(design.designType)
  const heading = `${user?.nickname} wants your feedback on their ${surveyType}`

  const isDesignValid = design.name && design.question
  const hasEnoughVersions = images.length >= 2
  const {isOpen, onOpen, onClose} = useDisclosure()

  const setStep = useCreateDesignStore(useCallback(state => state.setStep, []))
  const setImages = useZoomModalState(state => state.setImages)
  const setStartSlide = useZoomModalState(state => state.setIndex)

  React.useEffect(() => {
    if (isDesignValid && hasEnoughVersions) {
      setImages(images.map(({url}) => ({url, versionId: 'preview'})))
    }
  }, [hasEnoughVersions, images, isDesignValid, setImages])

  if (!isDesignValid) {
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

  if (!hasEnoughVersions) {
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
      <Box as="section" bg={mode('gray.50', 'gray.800')} pt="0" pb="24">
        <Box
          maxW={{base: 'xl', md: '7xl'}}
          mx="auto"
          px={{base: '6', md: '8'}}
          pt="8"
        >
          <Grid gridTemplateColumns={{base: '1fr', md: '65fr 35fr'}} gap="6">
            <Stack>
              <HStack
                align="center"
                justifyContent={'space-between'}
                maxW={{base: 'xl', md: '7xl'}}
                w={'full'}
              >
                <Heading fontWeight="600" color={mode('gray.700', 'gray.200')}>
                  {design.question}
                </Heading>
                <Button
                  colorScheme={'orange'}
                  rightIcon={<FaRegThumbsUp />}
                  size={'sm'}
                  onClick={() => setStep(CreateDesignStep.Share)}
                >
                  Looks good
                </Button>
              </HStack>
              <Text color={mode('gray.700', 'gray.300')}>
                {design.description ?? heading}
              </Text>
            </Stack>
            <DesignStats votes={0} opinions={0} />
          </Grid>
        </Box>
        <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
          <VotingGrid
            voteStyle={design.voteStyle}
            onVersionClick={(index: number) => {
              onOpen()
              setStartSlide(index)
            }}
          />
        </Box>
      </Box>
      <ZoomModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
