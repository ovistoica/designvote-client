import * as React from 'react'
import {Button} from '@chakra-ui/button'
import {useDisclosure} from '@chakra-ui/hooks'
import {Image} from '@chakra-ui/image'
import {Box, Flex, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import {useColorModeValue as mode} from '@chakra-ui/react'
import {useToast} from '@chakra-ui/toast'
import Rating from '@material-ui/lab/Rating'
import {PreviewDesignFullImageModal} from 'components/full-image-modal'
import {useCallback} from 'react'
import {useCreateDesignStore} from 'store'
import {CreateDesignStep, VoteStyle} from 'types'

interface DesignVersionProps {
  imageUrl: string
  showRating?: boolean
}

function DesignVersion({imageUrl, showRating = false}: DesignVersionProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
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
        <PreviewDesignFullImageModal
          initialImage={imageUrl}
          onClose={onClose}
          isOpen={isOpen}
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

function useInitiallyShowPreviewTooltip() {
  const {
    name,
    question,
    imagesByUrl,
    shownTooltip,
    setShownTooltip,
  } = useCreateDesignStore(
    useCallback(
      state => ({
        question: state.question,
        name: state.name,
        imagesByUrl: state.imagesByUrl,

        shownTooltip: state.shownPreviewTooltip,
        setShownTooltip: state.setShownTooltip,
      }),
      [],
    ),
  )
  const toast = useToast()

  const canShowTooltip =
    name && question && imagesByUrl.length >= 2 && !shownTooltip

  React.useEffect(() => {
    if (canShowTooltip) {
      toast({
        title: 'Preview your design',
        description:
          'This is how your design will look to voters. Your votes here do not count. If everything looks good, press publish to continue',
        position: 'bottom',
        isClosable: true,
        variant: 'subtle',
      })
      setShownTooltip(true)
    }
  }, [canShowTooltip, setShownTooltip, toast])
}

// TODO: Different design for choosing system
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
      }),
      [],
    ),
  )
  useInitiallyShowPreviewTooltip()

  const isDesignInvalid = !design.name || !design.question
  const notEnoughVersions = design.imagesByUrl.length < 2

  const setStep = useCreateDesignStore(useCallback(state => state.setStep, []))

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
          colorScheme="brand"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  if (notEnoughVersions) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You need at least two versions of this design in order to publish it
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setStep(CreateDesignStep.Upload)}
          colorScheme="brand"
        >
          Go back and upload
        </Button>
      </Stack>
    )
  }
  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} mt="4">
      <Flex
        direction="column"
        align="center"
        maxW={{base: '3xl', md: '7xl'}}
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
          columns={{base: 1, md: 3}}
          spacing={{base: '2', md: '4', lg: '8'}}
          rowGap={{base: 8, md: 8, lg: 8}}
          alignItems="center"
        >
          {design.imagesByUrl.map((imageUrl, index) => {
            return (
              <DesignVersion
                imageUrl={imageUrl}
                showRating={design.voteStyle === VoteStyle.FiveStar}
              />
            )
          })}
        </SimpleGrid>
        <Button
          colorScheme="brand"
          size="lg"
          my="8"
          onClick={() => setStep(CreateDesignStep.Share)}
        >
          Publish design
        </Button>
      </Flex>
    </Box>
  )
}
