import * as React from 'react'
import {
  Box,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import {useDesign} from 'utils/designs'
import {useDropzone} from 'react-dropzone'
import {HangedImage} from 'assets/icons'

function ImageDropInput({onDrop}) {
  const bg = useColorModeValue('surface', 'gray.700')
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
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
      {...getRootProps()}
    >
      <HangedImage />

      {isDragActive ? (
        <Text>Drop the image</Text>
      ) : (
        <>
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
        </>
      )}

      <Input
        type="file"
        _focus={{outline: 'none'}}
        _active={{outline: 'none'}}
        {...getInputProps()}
      />
    </Stack>
  )
}

function Design() {
  const {designId} = useParams()
  const design = useDesign(designId)
  const onDrop = React.useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])

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
        <ImageDropInput onDrop={onDrop} />
        <ImageDropInput onDrop={onDrop} />
        <ImageDropInput onDrop={onDrop} />
      </SimpleGrid>
    </Box>
  )
}

export {Design}
