import {Box, Circle, Grid, Text} from '@chakra-ui/layout'
import {ImageDropInput} from 'components/image-input'
import {useCreateDesignStore} from 'store'
import {Image, ImageProps} from '@chakra-ui/image'
import {DeleteBin} from 'assets/icons'
import shallow from 'zustand/shallow'
import {useCallback} from 'react'

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
  const onDeletePress = useCreateDesignStore(state => state.deleteVersion)

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
        {...rest}
      />
      <Text textAlign="center" fontSize="sm">
        {description}
      </Text>
    </Box>
  )
}

export function UploadStep() {
  const addVersion = useCreateDesignStore(
    useCallback(state => state.addVersion, []),
  )
  const imagesByUrl = useCreateDesignStore(
    useCallback(state => state.imagesByUrl, []),
    shallow,
  )

  const onImageUpload = useCallback(
    (imageUrl: string) => addVersion({url: imageUrl}),
    [addVersion],
  )
  return (
    <Grid
      mt="1em"
      gridTemplateColumns="repeat(3, 1fr)"
      columnGap="1em"
      rowGap="1em"
    >
      {imagesByUrl.map(url => {
        return <UploadedImage imageUrl={url} w="15em" h="15em" />
      })}
      <ImageDropInput onImageUpload={onImageUpload} h="15em" w="15em" />
    </Grid>
  )
}
