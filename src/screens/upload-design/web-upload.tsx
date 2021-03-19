import * as React from 'react'
import {Box, Circle, Grid, Stack, Text} from '@chakra-ui/layout'
import {ImageDropInput} from './image-input'
import {Image} from '@chakra-ui/image'
import {useSafeDispatch} from 'utils/hooks'
import {Button} from 'components/lib'
import {DeleteBin} from 'assets/icons'
import {SmallImageInput} from './small-image-input'
import {Input} from '@chakra-ui/input'
import {useUploadDesignVersions} from 'utils/design-version'
import {useNavigate} from 'react-router'

type ImageSrc = {url: string; description?: string} | null

type ImagesArray = [ImageSrc, ImageSrc, ImageSrc, ImageSrc, ImageSrc]

interface ImageState {
  images: ImagesArray
}

const defaultInitialState: ImageState = {
  images: [null, null, null, null, null],
}

type Action =
  | {type: 'add'; image: ImageSrc; index: number}
  | {type: 'description'; description: string; index: number}

function sortNullLast(a: ImageSrc, b: ImageSrc) {
  if (a === null) {
    return 1
  }
  if (b === null) {
    return -1
  }
  return 0
}

function useImageState() {
  const [{images}, setImages] = React.useReducer(
    (state: ImageState, action: Action): ImageState => {
      switch (action.type) {
        case 'add': {
          const {image, index} = action

          if (typeof image === 'string' && state.images.includes(image)) {
            return state
          }

          let newImages: ImagesArray = [...state.images]
          newImages[index] = image

          if (image === null) {
            newImages = newImages.sort(sortNullLast)
          }

          return {...state, images: newImages}
        }
        case 'description': {
          const {description, index} = action
          let original = state.images[index]
          if (!original) {
            return state
          }
          let newImages: ImagesArray = [...state.images]
          newImages[index] = {...original, description}

          return {...state, images: newImages}
        }
        default: {
          return state
        }
      }
    },
    defaultInitialState,
  )

  const safeSetImages = useSafeDispatch(setImages)

  const setImage = React.useCallback(
    (image: ImageSrc, index: number) =>
      safeSetImages({type: 'add', image, index}),
    [safeSetImages],
  )
  const setDescription = React.useCallback(
    (description: string, index: number) =>
      safeSetImages({type: 'description', description, index}),
    [safeSetImages],
  )
  return {images, setImage, setDescription}
}

interface WebUploadProps {
  designId: string
}

export function WebUpload({designId}: WebUploadProps) {
  const {images, setImage, setDescription} = useImageState()
  const {isLoading, mutate: uploadVersions} = useUploadDesignVersions(designId)
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const previewImage = images[selectedIndex]
  let nextIndex = images.indexOf(null)

  const uploadImages = () => {
    let versions = images
      .filter(im => im !== null)
      .map((im, index) => ({
        name: im?.description ?? `Version ${index + 1}`,
        pictures: [im?.url],
      }))
    uploadVersions(versions, {
      onSettled: () => {
        navigate(`/design/${designId}`)
      },
    })
  }

  return (
    <Grid mt="1em" gridTemplateRows="5fr 1fr" rowGap="1em" w="40em">
      {previewImage ? (
        <Stack align="center" justify="center">
          <Image
            src={previewImage.url}
            maxW="40em"
            h="25em"
            borderRadius="6px"
            objectFit="cover"
          />
          <Input
            key={`Input${previewImage.url}`}
            textAlign="center"
            placeholder="Version description"
            value={previewImage.description}
            onChange={e => setDescription(e.target.value, selectedIndex)}
          />
        </Stack>
      ) : (
        <ImageDropInput
          onImageUpload={imageUrl =>
            setImage({url: imageUrl, description: ''}, selectedIndex)
          }
          w="40em"
          h="25em"
        />
      )}

      <Grid
        gridTemplateColumns="repeat(5, 1fr)"
        columnGap="1em"
        transition="0.25s all"
      >
        {images.map((image, i) => {
          const selected = selectedIndex === i
          return image ? (
            <Box
              role="group"
              position="relative"
              key={`smallImage${image.url}${i}`}
            >
              <Circle
                position="absolute"
                right="-2"
                top="-2"
                bg="info"
                size="1.5em"
                boxShadow="md"
                opacity={0}
                transition="0.25s all"
                onClick={() => setImage(null, i)}
                _groupHover={{
                  opacity: 1,
                }}
              >
                <DeleteBin />
              </Circle>
              <Image
                borderRadius="6px"
                key={`uploadImg${i}`}
                border={selected ? 'solid' : 'none'}
                borderWidth={selected ? '4px' : '1px'}
                borderColor={selected ? 'brand.500' : 'info'}
                src={image.url}
                boxSize="5em"
                w="8em"
                h="5em"
                objectFit="cover"
                transition="0.25s all"
                cursor="pointer"
                _groupHover={
                  selected
                    ? {}
                    : {
                        borderColor: 'info',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                      }
                }
                onClick={() => setSelectedIndex(i)}
              />
              <Text textAlign="center" fontSize="sm">
                {image.description}
              </Text>
            </Box>
          ) : (
            <SmallImageInput
              onImageUpload={imageUrl => {
                setImage({url: imageUrl, description: ''}, nextIndex)
                setSelectedIndex(nextIndex)
              }}
              key={`uploadImg${i}`}
              transition="0.25s all"
              color="info"
              boxSize="5em"
              w="8em"
              h="5em"
              _hover={{
                borderColor: 'brand.500',
              }}
            />
          )
        })}
      </Grid>
      <Button
        w="14em"
        h="3em"
        mt="1em"
        disabled={images.filter(image => image !== null).length < 2}
        alignSelf="center"
        mx="auto"
        isLoading={isLoading}
        onClick={uploadImages}
      >
        Share designs
      </Button>
    </Grid>
  )
}
