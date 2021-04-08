import * as React from 'react'
import {Box, Center, Flex, Grid, Image, Stack, Text} from '@chakra-ui/react'
import {useDesign} from 'utils/design-query'
import {getVotePercent} from 'utils/votes'
import {generateRandomColors} from 'utils/colors'
import {DesignStats} from './design-stats'
import {loadingDesign} from 'utils/loading-data'

interface SmallPreviewProps {
  onClick: () => void
  selected: boolean
  progressColor: string
  pictureUrl: string
  votePercent: number
  versionName: string
  versionVotes: number
}

function SmallPreview({
  onClick,
  selected,
  pictureUrl,
  progressColor,
  votePercent,
  versionName,
  versionVotes,
}: SmallPreviewProps) {
  return (
    <Box role="group" mx="0.5em" onClick={onClick}>
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
        <Image
          src={pictureUrl}
          boxSize="5em"
          w="8em"
          h="5em"
          objectFit="cover"
          transition="0.1s all"
          cursor="pointer"
        />
        <Center
          position="absolute"
          bg="blackAlpha.300"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
        />
        <Center
          position="absolute"
          bg={progressColor}
          left={0}
          right={0}
          h={`${votePercent}%`}
          opacity={0.6}
          bottom={0}
          zIndex={2}
        />
        <Flex
          zIndex={3}
          position="absolute"
          align="center"
          justify="center"
          direction="column"
        >
          <Text color="white" fontWeight="600">
            {votePercent}%
          </Text>
          <Text color="white" fontWeight="600">
            {versionVotes} vote{versionVotes === 1 ? '' : 's'}
          </Text>
        </Flex>
      </Center>

      <Text textAlign="center" fontSize="sm">
        {versionName}
      </Text>
    </Box>
  )
}

interface WebVersionsProps {
  designId: string
  versionsById: string[]
}
export function WebVersions({designId, versionsById}: WebVersionsProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const {data} = useDesign(designId)
  const {
    versions,
    pictures,
    design: {totalVotes, opinions},
  } = data ?? loadingDesign
  const selectedId = versionsById[selectedIndex]
  const version = versions[selectedId]
  const previewPicId = version.pictures[0]
  const pic = pictures[previewPicId]
  const randomColors = React.useRef(generateRandomColors(versionsById.length))
    .current
  return (
    <Flex justify="center">
      <Grid
        mt="1em"
        gridTemplateRows="1fr 5fr"
        rowGap="1em"
        w="60em"
        flex={0.8}
      >
        <Flex alignItems="center" justify="center" transition="0.1s all">
          {versionsById.map((vId, i) => {
            const version = versions[vId]
            const picture = pictures[version.pictures[0]]
            const selected = selectedIndex === i
            const versionVotes = version.votes.length
            const votePercent = getVotePercent(totalVotes, versionVotes)
            return (
              <SmallPreview
                key={`smallImage${picture.pictureId}`}
                selected={selected}
                votePercent={votePercent}
                versionVotes={versionVotes}
                versionName={version.name}
                onClick={() => setSelectedIndex(i)}
                pictureUrl={picture.uri}
                progressColor={randomColors[i]}
              />
            )
          })}
        </Flex>
        <Stack align="center" justify="center">
          <Image
            src={pic.uri}
            maxH="40em"
            borderRadius="6px"
            objectFit="cover"
          />
          <Text textAlign="center">{version.name}</Text>
        </Stack>
      </Grid>
      <Flex flex={0.2} h="13em" mt="1em">
        <DesignStats
          totalVotes={totalVotes}
          totalOpinions={opinions.length}
          designId={designId}
        />
      </Flex>
    </Flex>
  )
}
