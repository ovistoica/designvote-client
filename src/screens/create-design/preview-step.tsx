import * as React from 'react'
import {Button} from '@chakra-ui/button'
import {useDisclosure} from '@chakra-ui/hooks'
import {Image} from '@chakra-ui/image'
import {Flex, Grid, Heading, Stack, Text} from '@chakra-ui/layout'
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

  const numOfColumns = design.imagesByUrl.length === 2 ? 2 : 3

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
    <Flex
      flex="1"
      align="center"
      flexDir="column"
      maxW={['512px', '1024px', '1440px']}
    >
      <Stack mb="1em" w="100%" p="1em" align="center">
        <Heading>{design.question}</Heading>
        {design.description ? (
          <Text fontWeight="300" fontSize="xl">
            {design.description}
          </Text>
        ) : null}
      </Stack>

      <Grid
        m="1em"
        mt="0em"
        column={numOfColumns}
        gridTemplateColumns={`repeat(${numOfColumns}, 1fr)`}
        rowGap="1.5em"
        columnGap="1.5em"
        alignContent="center"
      >
        {design.imagesByUrl.map((imageUrl, index) => {
          return (
            <DesignVersion
              imageUrl={imageUrl}
              showRating={design.voteStyle === VoteStyle.FiveStar}
            />
          )
        })}
      </Grid>
      <Button
        colorScheme="brand"
        size="lg"
        mt=".5em"
        onClick={() => setStep(CreateDesignStep.Share)}
      >
        Publish design
      </Button>
    </Flex>
  )
}
