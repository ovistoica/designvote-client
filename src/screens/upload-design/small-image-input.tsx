import * as React from 'react'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {useDropzone} from 'react-dropzone'
import {useUploadImage} from 'utils/file-upload'
import {Center, Stack, StackProps} from '@chakra-ui/layout'
import {Input, InputProps} from '@chakra-ui/input'
import {Progress} from '@chakra-ui/progress'
import {AddIcon} from '@chakra-ui/icons'

interface ImageDropInputProps extends StackProps {
  onImageUpload: (imageUrl: string) => void
}

export function SmallImageInput({
  onImageUpload,
  ...stackProps
}: ImageDropInputProps) {
  const bg = useColorModeValue('surface', 'gray.700')
  const {
    uploadImage: onDrop,
    isLoading,
    progress,
    isSuccess,
    imageUrl,
  } = useUploadImage()
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  React.useEffect(() => {
    if (isSuccess && imageUrl) {
      onImageUpload(imageUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, imageUrl])

  const inputProps = (getInputProps() as unknown) as InputProps

  return (
    <Stack
      _focus={{outline: 'none'}}
      bg={bg}
      align="center"
      justifyContent="center"
      cursor="pointer"
      aria-label="Upload image"
      border="dashed"
      borderWidth="1px"
      borderColor="info"
      borderRadius="6px"
      color="info"
      position="relative"
      {...getRootProps()}
      {...stackProps}
    >
      <Input
        type="file"
        _focus={{outline: 'none'}}
        _active={{outline: 'none'}}
        position="absolute"
        {...inputProps}
      />
      <Center
        alignSelf="center"
        position="absolute"
        top="auto"
        bottom="auto"
        mt="0em"
      >
        <AddIcon />
      </Center>

      {isLoading ? (
        <Progress colorScheme="orange" size="lg" value={progress} hasStripe />
      ) : null}
    </Stack>
  )
}
