import {AddIcon} from '@chakra-ui/icons'
import {Image, ImageProps} from '@chakra-ui/image'
import {Input} from '@chakra-ui/input'
import {Box, Circle, Grid, Text} from '@chakra-ui/layout'
import {DeleteBin} from 'assets/icons'
import {ImageDropInput} from 'components/image-input'
import {useCallback} from 'react'

import {useDesign, useCreateDesignVersion} from 'utils/design-query'

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
  //   const onDeletePress = useCreateDesignStore(
  //     useCallback(state => state.deleteVersion, []),
  //   )
  //   const setDescription = useCreateDesignStore(
  //     useCallback(state => state.setVersionDescrption, []),
  //   )

  //   const currentValue = useCreateDesignStore(
  //     useCallback(state => state.images[imageUrl].description, [imageUrl]),
  //   )

  //   const onInputChange = (value: string) => setDescription(imageUrl, value)

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
        // onClick={() => onDeletePress(imageUrl)}
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
        // onChange={e => onInputChange(e.target.value)}
        // value={currentValue}
      />
    </Box>
  )
}

interface VersionsTabProps {
  designId: string
}

export function VersionsTab({designId}: VersionsTabProps) {
  const {data} = useDesign(designId)
  const {mutate: addVersion} = useCreateDesignVersion(designId)
  const {design, versions, pictures} = data

  const {versions: versionsById} = design

  const onImageUpload = useCallback(
    (imageUrl: string) =>
      addVersion({
        name: `#${versionsById.length + 1}`,
        pictures: [imageUrl],
        description: null,
      }),
    [addVersion, versionsById.length],
  )

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
        {versionsById.map(vId => {
          const {
            pictures: [picId],
          } = versions[vId]
          const {uri} = pictures[picId]
          return (
            <UploadedImage
              imageUrl={uri}
              w="15em"
              h="15em"
              key={`imageUpload${uri}`}
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
    </>
  )
}
