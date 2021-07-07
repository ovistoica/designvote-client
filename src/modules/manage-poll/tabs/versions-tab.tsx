import {useCallback} from 'react'

import {AddIcon} from '@chakra-ui/icons'
import {
  Image,
  ImageProps,
  Box,
  Flex,
  SimpleGrid,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {DeleteTooltip} from 'components/delete-tooltip'
import {ImageDropInput} from 'components/image-input'
import {
  usePoll,
  useDeleteDesignVersion,
  useCreateMultipleDesignVersions,
} from 'utils/design-query'

interface UploadedImageProps extends ImageProps {
  imageUrl: string
  description?: string
  onDeletePress: () => void
}

// TODO: Don't let user delete from the last two
function UploadedImage({imageUrl, onDeletePress, ...rest}: UploadedImageProps) {
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
  pollId: string
}

export function VersionsTab({pollId}: VersionsTabProps) {
  const {data, isLoading: isDesignLoading} = usePoll(pollId)
  const {
    mutate: addVersions,
    isLoading: isCreateLoading,
  } = useCreateMultipleDesignVersions(pollId)
  const {
    mutate: deleteVersion,
    isLoading: isDeleteLoading,
  } = useDeleteDesignVersion(pollId)
  const {poll, versions} = data
  const iconColor = mode('gray.500', 'gray.300')

  const isLoading = isCreateLoading || isDeleteLoading || isDesignLoading
  const {versions: versionsById} = poll

  const onImageUpload = useCallback(
    (imageUrls: string[]) =>
      addVersions(
        imageUrls.map((imgUrl, index) => ({
          name: `#${versionsById.length + index + 1}`,
          pictures: [imgUrl],
          description: null,
        })),
      ),
    [addVersions, versionsById.length],
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
            description="Upload 2 or more versions of your poll"
            icon={<AddIcon w="3em" h="3em" color={iconColor} />}
            isLoading={isLoading}
          />
          {versionsById.map(vId => {
            const {img: uri} = versions[vId]
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
