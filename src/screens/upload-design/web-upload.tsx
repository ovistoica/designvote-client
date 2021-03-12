import * as React from 'react'
import {Box, Circle, Grid} from '@chakra-ui/layout'
import {ImageDropInput} from './image-input'
import {Image} from '@chakra-ui/image'
import {useSafeDispatch} from 'utils/hooks'
import {Button} from 'components/lib'
import {DeleteBin} from 'assets/icons'
import {SmallImageInput} from './small-image-input'

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
      <Grid
        gridTemplateColumns="repeat(5, 1fr)"
        columnGap="1em"
        transition="0.25s all"
      >
        {images.map((image, i) => {
          const selected = selectedIndex === i
          return image ? (
            <Box role="group" position="relative">
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
                src={image}
                boxSize="5em"
                w="8em"
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
            </Box>
          ) : (
            <SmallImageInput
              onImageUpload={imageUrl => {
                setImage(imageUrl, i)
                setSelectedIndex(i)
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
        // isLoading={isLoading}
      >
        Share designs
      </Button>
    </Grid>
  )
}
