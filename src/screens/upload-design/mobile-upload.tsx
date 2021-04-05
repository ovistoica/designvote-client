import {Image} from '@chakra-ui/image'
import {Input} from '@chakra-ui/input'
import {SimpleGrid, Stack} from '@chakra-ui/layout'
import {Button} from 'components/lib'
import * as React from 'react'
import {useNavigate} from 'react-router'
import {useUploadDesignVersions} from 'utils/design-version'
import {ImageDropInput} from 'components/image-input'

function useCurrentMobileVersions() {
  const [image1, setImage1] = React.useState<string>()
  const [image2, setImage2] = React.useState<string>()
  const [image3, setImage3] = React.useState<string>()

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

interface MobileUploadProps {
  designId: string
}

export function MobileUpload({designId}: MobileUploadProps) {
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
  } = useCurrentMobileVersions()
  const {isLoading, mutate: uploadVersions} = useUploadDesignVersions(designId)
  const navigate = useNavigate()

  return (
    <>
      <SimpleGrid
        m="1em"
        mt="1.5em"
        column={3}
        gridTemplateColumns="repeat(3, 1fr)"
        columnGap={['0.5em', '1em', '2.5em']}
        alignItems="center"
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
              navigate(`/design/${designId}`)
            },
          })
        }}
        isLoading={isLoading}
      >
        Share designs
      </Button>
    </>
  )
}
