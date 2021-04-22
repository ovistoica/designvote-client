import {useColorModeValue as mode} from '@chakra-ui/color-mode'
import {AddIcon} from '@chakra-ui/icons'
import {Image, ImageProps} from '@chakra-ui/image'
import {Box, Circle, Flex, SimpleGrid} from '@chakra-ui/layout'
import {DeleteBin} from 'assets/icons'
import {ImageDropInput} from 'components/image-input'
import {useCallback} from 'react'

import {
  useDesign,
  useCreateDesignVersion,
  useDeleteDesignVersion,
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
  const iconColor = mode('gray.500', 'gray.300')

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
          {versionsById.map(vId => {
            const {
              pictures: [picId],
            } = versions[vId]
            const {uri} = pictures[picId]
            return (
              <UploadedImage
                imageUrl={uri}
                h={{base: '12rem', lg: '15em'}}
                w={{base: '12rem', lg: '15em'}}
                key={`imageUpload${vId}`}
                onDeletePress={() => deleteVersion(vId)}
              />
            )
          })}
        </SimpleGrid>
      </Flex>
    </Box>
  )
}
