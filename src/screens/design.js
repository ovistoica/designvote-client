import * as React from 'react'
import {
  Box,
  Input,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import {useDesign} from 'utils/designs'
import {useDropzone} from 'react-dropzone'
import {HangedImage} from 'assets/icons'
import {useUploadImage} from 'utils/file-upload'

function ImageDropInput() {
  const bg = useColorModeValue('surface', 'gray.700')
  const {uploadImage: onDrop, isLoading, progress} = useUploadImage()
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Stack align="center">
      <Stack
        w="18em"
        h="32em"
        _focus={{outline: 'none'}}
        bg={bg}
        align="center"
        px="3em"
        pt="10em"
        cursor="pointer"
        aria-label="Upload image"
        border="dashed"
        borderWidth="1px"
        borderColor="info"
        {...getRootProps()}
      >
        <HangedImage />
        {isDragActive ? (
          <Text textAlign="center" letterSpacing="0.02em" color="info">
            Drop the image
          </Text>
        ) : (
          <Text>
            <Text
              textTransform="uppercase"
              textAlign="center"
              letterSpacing="0.02em"
              color="info"
            >
              Drag and drop some images here or{' '}
              <Text as="span" textDecor="underline dashed">
                browse
              </Text>
            </Text>
            <Text textAlign="center" letterSpacing="0.02em" color="info">
              (jpg, png, gif, webp ideally oriented for mobile phones)
            </Text>
          </Text>
        )}
        <Input
          type="file"
          _focus={{outline: 'none'}}
          _active={{outline: 'none'}}
          {...getInputProps()}
        />
        {isLoading ? (
          <Progress colorScheme="orange" size="lg" value={progress} hasStripe />
        ) : null}
      </Stack>
      <Input
        w="14em"
        border="none"
        placeholder="Signature, for example, sign-up screen 1"
      />
    </Stack>
  )
}

function Design() {
  const {designId} = useParams()
  const design = useDesign(designId)

  return (
    <Box>
      <Text fontSize="2rem" textAlign="center">
        Upload two or more versions of the same design
      </Text>

      <SimpleGrid
        m="1em"
        mt="3em"
        column={3}
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap="2.5em"
        alignContent="center"
      >
        <ImageDropInput />
        <ImageDropInput />
        <ImageDropInput />
      </SimpleGrid>
    </Box>
  )
}

export {Design}
