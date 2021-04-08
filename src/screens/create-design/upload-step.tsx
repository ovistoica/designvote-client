import {Box, Circle, Grid, Heading, Stack, Text} from '@chakra-ui/layout'
import {ImageDropInput} from 'components/image-input'
import {useCreateDesignStore} from 'store'
import {Image, ImageProps} from '@chakra-ui/image'
import {DeleteBin} from 'assets/icons'
import shallow from 'zustand/shallow'
import {useCallback} from 'react'
import {Input} from '@chakra-ui/input'
import {AddIcon} from '@chakra-ui/icons'
import {Button} from '@chakra-ui/button'
import {DesignStep} from 'types'

interface UploadedImageProps extends ImageProps {
  selected?: boolean
  imageUrl: string
  description?: string
}

function UploadedImage({
  selected = false,
  imageUrl,
  description,
  ...rest
}: UploadedImageProps) {
  const onDeletePress = useCreateDesignStore(
    useCallback(state => state.deleteVersion, []),
  )
  const setDescription = useCreateDesignStore(
    useCallback(state => state.setVersionDescrption, []),
  )

  const currentValue = useCreateDesignStore(
    useCallback(state => state.images[imageUrl].description, [imageUrl]),
  )

  const onInputChange = (value: string) => setDescription(imageUrl, value)

  return (
    <Box role="group" position="relative">
      <Circle
        position="absolute"
        right="-2"
        top="-2"
        bg="info"
        size="2em"
        boxShadow="md"
        opacity={0}
        transition="0.25s all"
        cursor="pointer"
        onClick={() => onDeletePress(imageUrl)}
        _groupHover={{
          opacity: 1,
        }}
      >
        <DeleteBin />
      </Circle>
      <Image
        borderRadius="6px"
        border={selected ? 'solid' : 'none'}
        borderWidth={selected ? '4px' : '1px'}
        borderColor={selected ? 'brand.500' : 'info'}
        src={imageUrl}
        objectFit="contain"
        transition="0.25s all"
        boxShadow="md"
        _groupHover={{
          boxShadow: '2xl',
        }}
        {...rest}
      />
      <Input
        mt="0.2em"
        textAlign="center"
        placeholder="Version description"
        onChange={e => onInputChange(e.target.value)}
        value={currentValue}
      />
    </Box>
  )
}

export function UploadStep() {
  const design = useCreateDesignStore(
    useCallback(
      state => ({
        question: state.question,
        name: state.name,
      }),
      [],
    ),
  )

  const addVersion = useCreateDesignStore(
    useCallback(state => state.addVersion, []),
  )
  const imagesByUrl = useCreateDesignStore(
    useCallback(state => state.imagesByUrl, []),
    shallow,
  )
  const setStep = useCreateDesignStore(useCallback(state => state.setStep, []))

  const onImageUpload = useCallback(
    (imageUrl: string) => addVersion({url: imageUrl}),
    [addVersion],
  )

  if (!design.name || !design.question) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You are missing the name or the targeted question for this design
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setStep(DesignStep.Create)}
          colorScheme="brand"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  return (
    <>
      <Text mt="1em" fontSize="xl">
        Upload two or more versions of your design
      </Text>

      <Grid
        mt="1em"
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap="1em"
        rowGap="1em"
      >
        {imagesByUrl.map(url => {
          return (
            <UploadedImage
              imageUrl={url}
              w="15em"
              h="15em"
              key={`imageUpload${url}`}
            />
          )
        })}
        <ImageDropInput
          onImageUpload={onImageUpload}
          h="15em"
          w="15em"
          description="Upload 2 or more versions of your design"
          justifyContent="space-between"
          icon={<AddIcon w="3em" h="3em" color="info" />}
        />
      </Grid>
      <Button
        colorScheme="brand"
        size="lg"
        mt="1em"
        disabled={imagesByUrl.length < 2}
        onClick={() => setStep(DesignStep.Preview)}
      >
        Next
      </Button>
    </>
  )
}
