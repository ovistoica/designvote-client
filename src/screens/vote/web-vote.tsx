import * as React from 'react'
import {Box, Center, Flex, Grid, Stack, Text} from '@chakra-ui/layout'
import {useUrlDesign} from 'utils/design-query'
import {Image} from '@chakra-ui/image'
import {SelectedCheck} from 'assets/icons'

interface SmallPreviewProps {
  onClick: () => void
  selected: boolean
  pictureUrl: string
  versionName: string
}

function SmallPreview({
  onClick,
  selected,
  pictureUrl,
  versionName,
}: SmallPreviewProps) {
  return (
    <Box role="group" mx={['0.5em']} onClick={onClick} transition="0.2s all">
      <Center
        position="relative"
        borderRadius="6px"
        border={selected ? 'solid' : 'none'}
        borderWidth={selected ? '4px' : '1px'}
        borderColor={selected ? 'brand.500' : 'info'}
        _groupHover={
          selected
            ? {}
            : {
                borderColor: 'info',
                borderWidth: '2px',
                borderStyle: 'solid',
              }
        }
        overflow="hidden"
      >
        {selected ? <SelectedCheck style={{position: 'absolute'}} /> : null}
        <Image
          src={pictureUrl}
          boxSize="5em"
          w={['5em', '5em', '8em']}
          h={['3em', '3em', '5em']}
          objectFit="cover"
          transition="0.1s all"
          cursor="pointer"
        />
      </Center>

      <Text textAlign="center" fontSize="sm">
        {versionName}
      </Text>
    </Box>
  )
}

interface WebVoteProps {
  onVersionClick: (versionId: string) => void
  shortUrl: string
  selectedVersion?: string
}

export function WebVote({
  onVersionClick,
  shortUrl,
  selectedVersion,
}: WebVoteProps) {
  const {data} = useUrlDesign(shortUrl)
  const {design, versions, pictures} = data

  const selectedVId = selectedVersion ?? design.versions[0]
  const version = versions[selectedVId]
  const previewPicId = version.pictures[0]
  const pic = pictures[previewPicId]

  return (
    <Grid mt="1em" gridTemplateRows="1fr 5fr" rowGap="1em">
      <Flex alignItems="center" justify="center" transition="0.1s all">
        {design.versions.map((vId, i) => {
          const version = versions[vId]
          const picture = pictures[version.pictures[0]]
          const selected = selectedVersion === vId
          return (
            <SmallPreview
              key={`smallImage${picture.pictureId}`}
              selected={selected}
              versionName={version.name}
              onClick={() => {
                onVersionClick(vId)
              }}
              pictureUrl={picture.uri}
            />
          )
        })}
      </Flex>
      <Stack align="center" justify="center">
        <Image src={pic.uri} maxH="40em" borderRadius="6px" objectFit="cover" />
        <Text textAlign="center">{version.name}</Text>
      </Stack>
    </Grid>
  )
}
