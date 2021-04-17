import * as React from 'react'
import {Button} from '@chakra-ui/button'
import {useDisclosure} from '@chakra-ui/hooks'
import {Image} from '@chakra-ui/image'
import {useColorModeValue as mode} from '@chakra-ui/react'
import {Box, Flex, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import Rating from '@material-ui/lab/Rating'
import {useManageDesign} from 'store'
import {DesignTab, VoteStyle} from 'types'
import {useDesign} from 'utils/design-query'
import {ImageCarouselModal} from '../components/image-carousel-modal'
import {FullPageSpinner} from 'components/lib'

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
  const {data, isLoading} = useDesign(designId)
  const {design} = data
  const {setTab} = useManageDesign(
    React.useCallback(state => ({setTab: state.setTab}), []),
  )
  const bg = mode('gray.50', 'gray.800')

  if (isLoading) {
    return <FullPageSpinner h="100%" />
  }

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
    <Box as="section" bg={bg}>
      <Flex
        direction="column"
        align="center"
        maxW={{base: 'xl', md: '7xl'}}
        mx="auto"
        px={{base: '3', md: '8'}}
      >
        <Stack mb="1em" w="100%" align="center">
          <Heading textAlign="center">{design.question}</Heading>
          {design.description ? (
            <Text fontWeight="300" fontSize="xl">
              {design.description}
            </Text>
          ) : null}
        </Stack>
        <SimpleGrid
          columns={{base: 1, md: 3}}
          spacing={{base: '2', md: '4', lg: '8'}}
          rowGap={{base: 8, md: 8, lg: 8}}
          alignItems="center"
        >
          {design.versions.map((vId, index) => {
            return (
              <DesignVersion
                key={`preview${vId}`}
                versionId={vId}
                designId={designId}
                showRating={design.voteStyle === VoteStyle.FiveStar}
              />
            )
          })}
        </SimpleGrid>
      </Flex>
    </Box>
  )
}
