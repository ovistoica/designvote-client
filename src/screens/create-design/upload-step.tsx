import {Box, Flex, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import {useColorModeValue as mode} from '@chakra-ui/react'
import {ImageDropInput} from 'components/image-input'
import {useCreateDesignStore} from 'store'
import {Image, ImageProps} from '@chakra-ui/image'
import shallow from 'zustand/shallow'
import {useCallback} from 'react'
import {AddIcon} from '@chakra-ui/icons'
import {Button} from '@chakra-ui/button'
import {CreateDesignStep} from 'types'
import {DeleteTooltip} from 'components/delete-tooltip'

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

  return (
    <Box role="group" position="relative">
      <DeleteTooltip onClick={() => onDeletePress(imageUrl)} />
      <Image
        borderRadius="6px"
        border={selected ? 'solid' : 'none'}
        borderWidth={selected ? '4px' : '1px'}
        borderColor={selected ? 'orange.500' : 'info'}
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
    (imageUrls: string[]) => {
      imageUrls.forEach(imageUrl => addVersion({url: imageUrl}))
    },
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
          onClick={() => setStep(CreateDesignStep.Create)}
          colorScheme="orange"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  return (
    <Box as="section" pt="8">
      <Flex
        direction="column"
        align="center"
        mx="auto"
        px={{base: '3', md: '0'}}
      >
        <Text fontSize="xl" textAlign="center" mb="8">
          Upload two or more versions of your design
        </Text>
        <SimpleGrid
          columns={{base: 1, md: 2, lg: 3}}
          spacing={{base: '4', md: '4', lg: '8'}}
          maxW={{base: 'inherit', md: '3xl'}}
        >
          <ImageDropInput
            onImageUpload={onImageUpload}
            h="15em"
            w="15em"
            description="Upload 2 or more versions of your design"
            icon={
              <AddIcon w="3em" h="3em" color={mode('gray.500', 'gray.300')} />
            }
            bg={mode('gray.50', 'gray.800')}
          />
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
        </SimpleGrid>
        <Button
          colorScheme="orange"
          size="lg"
          my="8"
          onClick={() => setStep(CreateDesignStep.Preview)}
          disabled={imagesByUrl.length < 2}
        >
          Next
        </Button>
      </Flex>
    </Box>
  )
}
