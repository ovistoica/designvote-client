import * as React from 'react'
import {Box, Grid} from '@chakra-ui/layout'
import {ImageDropInput} from './image-input'
import {Image} from '@chakra-ui/image'
import {useSafeDispatch} from 'utils/hooks'

type ImageSrc = string | null

type ImagesArray = [ImageSrc, ImageSrc, ImageSrc, ImageSrc, ImageSrc]

interface ImageState {
  images: ImagesArray
}

const defaultInitialState: ImageState = {
  images: [null, null, null, null, null],
}

type Action = {type: 'add'; image: ImageSrc; index: number}

function useImageState() {
  const [{images}, setImages] = React.useReducer(
    (state: ImageState, action: Action): ImageState => {
      if (action.type === 'add') {
        const {image, index} = action
        const newImages: ImagesArray = [...state.images]
        newImages[index] = image
        return {...state, images: newImages}
      }
      return state
    },
    defaultInitialState,
  )

  const safeSetImages = useSafeDispatch(setImages)

  const setImage = React.useCallback(
    (image: ImageSrc, index: number) =>
      safeSetImages({type: 'add', image, index}),
    [safeSetImages],
  )
  return {images, setImage}
}

interface WebUploadProps {
  designId: string
}

export function WebUpload(props: WebUploadProps) {
  const {images, setImage} = useImageState()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const previewImage = images[selectedIndex]

  return (
    <Grid mt="1em" gridTemplateRows="5fr 1fr" rowGap="1em">
      {previewImage ? (
        <Image src={previewImage} w="40em" h="25em" objectFit="contain" />
      ) : (
        <ImageDropInput
          onImageUpload={imageUrl => setImage(imageUrl, selectedIndex)}
          w="40em"
          h="25em"
        />
      )}
      <Grid gridTemplateColumns="repeat(5, 1fr)" columnGap="1em">
        {images.map((image, i) => {
          return image ? (
            <Image
              borderRadius="6px"
              key={`uploadImg${i}`}
              border="dashed"
              borderWidth="1px"
              borderColor="info"
              src={image}
              maxH="5em"
              maxW="8em"
              objectFit="contain"
              onClick={() => setSelectedIndex(i)}
            />
          ) : (
            <Box
              borderRadius="6px"
              key={`uploadImg${i}`}
              border="dashed"
              borderWidth="1px"
              borderColor="info"
              onClick={() => setSelectedIndex(i)}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}
