import {useColorModeValue as mode} from '@chakra-ui/color-mode'
import {AddIcon} from '@chakra-ui/icons'
import {Image, ImageProps} from '@chakra-ui/image'
import {Box, Flex, SimpleGrid} from '@chakra-ui/layout'
import {DeleteTooltip} from 'components/delete-tooltip'
import {ImageDropInput} from 'components/image-input'
import {useCallback} from 'react'

import {
  useDesign,
  useDeleteDesignVersion,
  useCreateMultipleDesignVersions,
} from 'utils/design-query'

interface UploadedImageProps extends ImageProps {
  imageUrl: string
  description?: string
  onDeletePress: () => void
}

// TODO: Don't let user delete from the last two
function UploadedImage({
  imageUrl,
  description,
  onDeletePress,
  ...rest
}: UploadedImageProps) {
  return (
    <Box role="group" position="relative">
      <DeleteTooltip onClick={onDeletePress} />
      <Image
        rounded="sm"
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
  const {data: design, isLoading: isDesignLoading} = useDesign(designId)
  const {
    mutate: addVersions,
    isLoading: isCreateLoading,
  } = useCreateMultipleDesignVersions(designId)
  const {
    mutate: deleteVersion,
    isLoading: isDeleteLoading,
  } = useDeleteDesignVersion(designId)
  const iconColor = mode('gray.500', 'gray.300')

  const isLoading = isCreateLoading || isDeleteLoading || isDesignLoading
  const {versions} = design

  const onImageUpload = useCallback(
    (imageUrls: string[]) =>
      addVersions(
        imageUrls.map((imgUrl, index) => ({
          name: `#${versions.length + index + 1}`,
          pictures: [imgUrl],
          description: null,
        })),
      ),
    [addVersions, versions.length],
  )

  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} p="8">
      <Flex direction="column" align="center">
        <SimpleGrid
          columns={{base: 1, md: 2, lg: 3}}
          spacing={{base: '4', md: '4', lg: '8'}}
        >
          <ImageDropInput
            onImageUpload={onImageUpload}
            h={{base: '12rem', lg: '15em'}}
            w={{base: '12rem', lg: '15em'}}
            description="Upload 2 or more versions of your design"
            icon={<AddIcon w="3em" h="3em" color={iconColor} />}
            isLoading={isLoading}
          />
          {versions.map(v => {
            const {imageUrl, versionId} = v
            return (
              <UploadedImage
                imageUrl={imageUrl}
                h={{base: '12rem', lg: '15em'}}
                w={{base: '12rem', lg: '15em'}}
                key={`imageUpload${versionId}`}
                onDeletePress={() => deleteVersion(versionId)}
              />
            )
          })}
        </SimpleGrid>
      </Flex>
    </Box>
  )
}
