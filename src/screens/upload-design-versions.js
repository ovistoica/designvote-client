import * as React from 'react'
import {
  Flex,
  Image,
  Input,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {useNavigate, useParams} from 'react-router-dom'
import {useDropzone} from 'react-dropzone'
import {HangedImage} from 'assets/icons'
import {useUploadImage} from 'utils/file-upload'
import {Button} from 'components/lib'
import {useUploadDesignVersions} from 'utils/design-version'

function ImageDropInput({onImageUpload}) {
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
        {isLoading ? (
          <Progress colorScheme="orange" size="lg" value={progress} hasStripe />
        ) : null}
      </Stack>
    </Stack>
  )
}

function useCurrentVersions() {
  const [image1, setImage1] = React.useState()
  const [image2, setImage2] = React.useState()
  const [image3, setImage3] = React.useState()

  const [description1, setDescription1] = React.useState('')
  const [description2, setDescription2] = React.useState('')
  const [description3, setDescription3] = React.useState('')

  let versions = []
  if (image1) {
    versions.push({
      pictures: [image1],
      name: description1 ?? '',
      description: null,
    })
  }
  if (image2) {
    versions.push({
      pictures: [image2],
      name: description2 ?? '',
      description: null,
    })
  }
  if (image3) {
    versions.push({
      pictures: [image3],
      name: description3 ?? '',
      description: null,
    })
  }
  return {
    versions,
    image1,
    image2,
    image3,
    setImage1,
    setImage2,
    setImage3,
    setDescription1,
    setDescription2,
    setDescription3,
  }
}

function UploadDesign() {
  const {designId} = useParams()
  const navigate = useNavigate()
  const {
    versions,
    image1,
    image2,
    image3,
    setImage1,
    setImage2,
    setImage3,
    setDescription1,
    setDescription2,
    setDescription3,
  } = useCurrentVersions()

  const {isLoading, mutate: uploadVersions} = useUploadDesignVersions(designId)

  return (
    <Flex flex="1" align="center" flexDir="column">
      <Text fontSize="2rem" textAlign="center">
        Upload two or more versions of the same design
      </Text>

      <SimpleGrid
        m="1em"
        mt="1.5em"
        column={3}
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap="2.5em"
        alignContent="center"
      >
        <Stack align="center">
          {image1 ? (
            <Image src={image1} maxH="32em" />
          ) : (
            <ImageDropInput onImageUpload={setImage1} />
          )}
          <Input
            textAlign="center"
            w="14em"
            border="none"
            placeholder="Version description"
            disabled={!image1}
            onChange={e => setDescription1(e.target.value)}
          />
        </Stack>
        <Stack align="center">
          {image2 ? (
            <Image src={image2} maxH="32em" />
          ) : (
            <ImageDropInput onImageUpload={setImage2} />
          )}
          <Input
            disabled={!image2}
            textAlign="center"
            w="14em"
            border="none"
            placeholder="Version description"
            onChange={e => setDescription2(e.target.value)}
          />
        </Stack>
        <Stack align="center">
          {image3 ? (
            <Image src={image3} maxH="32em" />
          ) : (
            <ImageDropInput onImageUpload={setImage3} />
          )}
          <Input
            disabled={!image3}
            textAlign="center"
            w="14em"
            border="none"
            placeholder="Version description"
            onChange={e => setDescription3(e.target.value)}
          />
        </Stack>
      </SimpleGrid>
      <Button
        w="14em"
        h="3em"
        mt="1em"
        disabled={versions.length < 2}
        onClick={() => {
          uploadVersions(versions, {
            onSettled: () => {
              console.log('Called from component')
              navigate(`/design/${designId}`)
            },
          })
        }}
        isLoading={isLoading}
      >
        Share designs
      </Button>
    </Flex>
  )
}

export {UploadDesign}
