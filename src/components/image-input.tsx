import * as React from 'react'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {useDropzone} from 'react-dropzone'
import {Stack, StackProps, Text} from '@chakra-ui/layout'
import {Input, InputProps} from '@chakra-ui/input'
import {HangedImage} from 'assets/icons'

interface ImageDropInputProps extends StackProps {
  onImageUpload: (imageUrls: File[]) => void
  description?: string
  icon?: JSX.Element
  isLoading?: boolean
}

export function ImageDropInput({
  onImageUpload,
  description,
  icon,
  isLoading = false,
  ...stackProps
}: ImageDropInputProps) {
  const bg = useColorModeValue('surface', 'gray.700')
  const text = useColorModeValue('gray.500', 'gray.300')
  // const {
  //   uploadImages: onDrop,
  //   isLoading: isUploadLoading,
  //   isSuccess,
  //   imageUrl,
  //   reset,
  // } = useUploadImage()

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: onImageUpload,
  })

  const inputProps = (getInputProps() as unknown) as InputProps

  const inputIcon = icon ?? <HangedImage />

  const renderContent = () => (
    // loading ? (
    //   <Stack
    //     spacing={5}
    //     flexDirection="column"
    //     align="center"
    //     justify="center"
    //     h="100%"
    //   >
    //     <Text textAlign="center" color={text} fontWeight="semibold">
    //       Loading...
    //     </Text>
    //     <Spinner color={text} />
    //   </Stack>
    // ) : (
    <Stack spacing={5} align="center">
      <Text textAlign="center" letterSpacing="0.02em" color={text}>
        jpg, png, gif, webp
      </Text>
      {icon ?? <HangedImage />}
      <Text textAlign="center" color={text} fontWeight="semibold">
        {description ?? 'Drag and drop some images here or browse'}
      </Text>
    </Stack>
  )
  // )

  return (
    <Stack align="center">
      <Stack
        w={['auto', 'auto', '18em']}
        h={['auto', 'auto', '32em']}
        _focus={{outline: 'none'}}
        bg={bg}
        align="center"
        cursor={'pointer'}
        aria-label="Upload image"
        border="dashed"
        borderWidth="1px"
        borderColor={text}
        borderRadius="6px"
        justifyContent="center"
        p="1em"
        {...getRootProps()}
        {...stackProps}
      >
        {isDragActive ? (
          <>
            {inputIcon}

            <Text textAlign="center" letterSpacing="0.02em" color={text}>
              Drop the image
            </Text>
          </>
        ) : (
          renderContent()
        )}

        <Input
          disabled={isLoading}
          type="file"
          _focus={{outline: 'none'}}
          _active={{outline: 'none'}}
          {...inputProps}
        />
      </Stack>
    </Stack>
  )
}
