import * as React from 'react'
import {Button} from '@chakra-ui/button'
import {useDisclosure} from '@chakra-ui/hooks'
import {Image} from '@chakra-ui/image'
import {Flex, Grid, Heading, Stack, Text} from '@chakra-ui/layout'
import Rating from '@material-ui/lab/Rating'
import {useManageDesign} from 'store'
import {DesignTab, VoteStyle} from 'types'
import {useDesign} from 'utils/design-query'
import {ImageCarouselModal} from './image-carousel-modal'

interface DesignVersionProps {
  versionId: string
  designId: string
  showRating?: boolean
}

function DesignVersion({
  designId,
  versionId,
  showRating = false,
}: DesignVersionProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {data} = useDesign(designId)
  const {versions, pictures} = data
  const {
    pictures: [picId],
  } = versions[versionId]
  const {uri: imageUrl} = pictures[picId]
  return (
    <Stack align="center">
      <Flex
        key={imageUrl}
        direction="column"
        position="relative"
        flex="0"
        boxShadow="md"
        role="group"
        transition="0.25s all"
        cursor="zoom-in"
        _hover={{
          boxShadow: '2xl',
        }}
        onClick={onOpen}
        pb="1em"
        alignItems="center"
      >
        <Image
          src={imageUrl}
          objectFit="contain"
          boxSize="15em"
          align="center"
        />
        <ImageCarouselModal
          designId={designId}
          onClose={onClose}
          isOpen={isOpen}
          initialVersionId={versionId}
        />
      </Flex>
      {showRating ? (
        <Rating
          name={`rating for ${imageUrl}`}
          precision={0.5}
          defaultValue={0}
          size="large"
        />
      ) : null}
    </Stack>
  )
}

interface PreviewTabProps {
  designId: string
}

export function PreviewTab({designId}: PreviewTabProps) {
  const {data} = useDesign(designId)
  const {design} = data
  const {setTab} = useManageDesign(
    React.useCallback(state => ({setTab: state.setTab}), []),
  )

  const numOfColumns = design.versions.length === 2 ? 2 : 3

  if (!design.name || !design.question) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You are missing the name or the targeted question for this design
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setTab(DesignTab.Info)}
          colorScheme="brand"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  if (design.versions.length < 2) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You need at least two versions of this design in order to publish it
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setTab(DesignTab.Versions)}
          colorScheme="brand"
        >
          Go back and upload
        </Button>
      </Stack>
    )
  }
  return (
    <Flex
      flex="1"
      align="center"
      flexDir="column"
      maxW={['512px', '1024px', '1440px']}
    >
      <Stack mb="1em" w="100%" p="1em" align="center">
        <Heading>{design.question}</Heading>
        {design.description ? (
          <Text fontWeight="300" fontSize="xl">
            {design.description}
          </Text>
        ) : null}
      </Stack>

      <Grid
        m="1em"
        mt="0em"
        column={numOfColumns}
        gridTemplateColumns={`repeat(${numOfColumns}, 1fr)`}
        rowGap="1.5em"
        columnGap="1.5em"
        alignContent="center"
      >
        {design.versions.map((vId, index) => {
          return (
            <DesignVersion
              versionId={vId}
              designId={designId}
              showRating={design.voteStyle === VoteStyle.FiveStar}
            />
          )
        })}
      </Grid>
      <Button
        colorScheme="brand"
        size="lg"
        mt=".5em"
        onClick={() => setTab(DesignTab.Share)}
      >
        Publish design
      </Button>
    </Flex>
  )
}
