import {useColorModeValue} from '@chakra-ui/color-mode'
import {AddIcon} from '@chakra-ui/icons'
import {Image, ImageProps} from '@chakra-ui/image'
import {Box, Circle, Grid} from '@chakra-ui/layout'
import {DeleteBin} from 'assets/icons'
import {ImageDropInput} from 'components/image-input'
import {useCallback} from 'react'

import {
  useDesign,
  useCreateDesignVersion,
  useDeleteDesignVersion,
} from 'utils/design-query'

interface UploadedImageProps extends ImageProps {
  selected?: boolean
  imageUrl: string
  description?: string
  onDeletePress: () => void
}

// TODO: Don't let user delete from the last two
function UploadedImage({
  selected = false,
  imageUrl,
  description,
  onDeletePress,
  ...rest
}: UploadedImageProps) {
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
        onClick={onDeletePress}
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
    </Box>
  )
}

interface VersionsTabProps {
  designId: string
}

export function VersionsTab({designId}: VersionsTabProps) {
  const {data, isLoading: isDesignLoading} = useDesign(designId)
  const {
    mutate: addVersion,
    isLoading: isCreateLoading,
  } = useCreateDesignVersion(designId)
  const {
    mutate: deleteVersion,
    isLoading: isDeleteLoading,
  } = useDeleteDesignVersion(designId)
  const {design, versions, pictures} = data
  const iconColor = useColorModeValue('gray.500', 'gray.300')

  const isLoading = isCreateLoading || isDeleteLoading || isDesignLoading
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
    <Grid
      mt="2em"
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
            onDeletePress={() => deleteVersion(vId)}
          />
        )
      })}
      <ImageDropInput
        onImageUpload={onImageUpload}
        h="15em"
        w="15em"
        description="Upload 2 or more versions of your design"
        icon={<AddIcon w="3em" h="3em" color={iconColor} />}
        isLoading={isLoading}
      />
    </Grid>
  )
}
