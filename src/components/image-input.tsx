import * as React from 'react'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {useDropzone} from 'react-dropzone'
import {useUploadImage} from 'utils/file-upload'
import {Stack, StackProps, Text} from '@chakra-ui/layout'
import {Input, InputProps} from '@chakra-ui/input'
import {HangedImage} from 'assets/icons'
import {Progress} from '@chakra-ui/progress'

interface ImageDropInputProps extends StackProps {
  onImageUpload: (imageUrl: string) => void
  description?: string
  icon?: JSX.Element
}

export function ImageDropInput({
  onImageUpload,
  description,
  icon,
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
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  React.useEffect(() => {
    if (isSuccess && imageUrl) {
      onImageUpload(imageUrl)
    }
  }, [isSuccess, imageUrl, onImageUpload])

  const inputProps = (getInputProps() as unknown) as InputProps

  return (
    <Stack align="center">
      <Stack
        w={['auto', 'auto', '18em']}
        h={['auto', 'auto', '32em']}
        _focus={{outline: 'none'}}
        bg={bg}
        align="center"
        cursor="pointer"
        aria-label="Upload image"
        border="dashed"
        borderWidth="1px"
        borderColor="info"
        borderRadius="6px"
        p="1em"
        {...getRootProps()}
        {...stackProps}
      >
        {isDragActive ? (
          <>
            {icon ?? <HangedImage />}

            <Text textAlign="center" letterSpacing="0.02em" color="info">
              Drop the image
            </Text>
          </>
        ) : (
          <>
            <Text textAlign="center" letterSpacing="0.02em" color="info">
              jpg, png, gif, webp
            </Text>
            {icon ?? <HangedImage />}
            <Text textAlign="center" color="info" fontWeight="semibold">
              {description ?? 'Drag and drop some images here or browse'}
            </Text>
          </>
        )}

        <Input
          type="file"
          _focus={{outline: 'none'}}
          _active={{outline: 'none'}}
          {...inputProps}
        />
        {isLoading ? (
          <Progress colorScheme="orange" size="lg" value={progress} hasStripe />
        ) : null}
      </Stack>
    </Stack>
  )
}
