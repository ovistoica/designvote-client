import * as React from 'react'
import {Box, Flex, Grid, Image, Stack, Text} from '@chakra-ui/react'
import {useDesign} from 'utils/designs'
import {VersionHeader} from 'components/version-header'

interface WebVersionsProps {
  designId: string
  versionsById: string[]
}
export function WebVersions({designId, versionsById}: WebVersionsProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const {
    data: {
      versions,
      pictures,
      design: {totalVotes},
    },
  } = useDesign(designId)
  const selectedId = versionsById[selectedIndex]
  const version = versions[selectedId]
  const previewPicId = version.pictures[0]
  const pic = pictures[previewPicId]
  return (
    <Grid
      mt="1em"
      gridTemplateRows="5fr 1fr"
      rowGap="1em"
      maxW="60em"
      alignItems="center"
      alignSelf="center"
    >
      <Stack align="center" justify="center">
        <VersionHeader
          name={version.name}
          votes={version.votes}
          totalVotes={totalVotes}
        />
        <Image src={pic.uri} maxH="40em" borderRadius="6px" objectFit="cover" />
        <Text textAlign="center">{version.name}</Text>
      </Stack>

      <Flex alignItems="center" justify="center" transition="0.1s all">
        {versionsById.map((vId, i) => {
          const version = versions[vId]
          const picture = pictures[version.pictures[0]]
          const selected = selectedIndex === i
          return (
            <Box
              role="group"
              position="relative"
              mx="0.5em"
              key={`smallImage${picture.pictureId}`}
            >
              <Image
                borderRadius="6px"
                border={selected ? 'solid' : 'none'}
                borderWidth={selected ? '4px' : '1px'}
                borderColor={selected ? 'brand.500' : 'info'}
                src={picture.uri}
                boxSize="5em"
                w="8em"
                h="5em"
                objectFit="cover"
                transition="0.1s all"
                cursor="pointer"
                _groupHover={
                  selected
                    ? {}
                    : {
                        borderColor: 'info',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                      }
                }
                onClick={() => setSelectedIndex(i)}
              />
              <Text textAlign="center" fontSize="sm">
                {version.name}
              </Text>
            </Box>
          )
        })}
      </Flex>
    </Grid>
  )
}
