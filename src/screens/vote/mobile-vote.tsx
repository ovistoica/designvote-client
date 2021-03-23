import {useColorModeValue} from '@chakra-ui/color-mode'
import {Image} from '@chakra-ui/image'
import {Box, Flex, SimpleGrid, Text} from '@chakra-ui/layout'
import {Check, SelectedCheck} from 'assets/icons'
import {useUrlDesign} from 'utils/designs'

interface MobileVersionsProps {
  onVersionClick: (versionId: string) => void
  shortUrl: string
  selectedVersion?: string
}

export function MobileVersions({
  onVersionClick,
  shortUrl,
  selectedVersion,
}: MobileVersionsProps) {
  const {data} = useUrlDesign(shortUrl)
  const {design, versions, pictures} = data
  const headerBg = useColorModeValue('white', 'gray.700')

  return (
    <SimpleGrid
      m="1em"
      column={3}
      gridTemplateColumns="repeat(3, 1fr)"
      columnGap="2.5em"
      rowGap="1em"
      alignContent="center"
    >
      {design.versions.map((versionId, index) => {
        const selected = versionId === selectedVersion
        const version = versions[versionId]
        const pictureId = version.pictures[0]
        const picture = pictures[pictureId]
        return (
          <Flex
            key={pictureId}
            direction="column"
            position="relative"
            flex="0"
            boxShadow="base"
            role="group"
            transition="0.25s all"
            cursor="pointer"
            borderRadius="0.5em"
            onClick={() => onVersionClick(versionId)}
            pb="1em"
          >
            <Flex
              h="5em"
              w="100%"
              bg={headerBg}
              align="center"
              p="1em"
              borderTopRightRadius="0.5em"
              borderTopLeftRadius="0.5em"
            >
              {selected ? <SelectedCheck /> : <Check />}
              <Box pl="1em">
                <Text textTransform="uppercase" fontSize="0.95rem">
                  {version.name}
                </Text>
                {version.description ? (
                  <Text color="info" fontSize="0.8rem">
                    {version.description}
                  </Text>
                ) : (
                  <Text color="info" fontSize="0.8rem">
                    Version {index + 1}
                  </Text>
                )}
              </Box>
            </Flex>
            <Image src={picture.uri} objectFit="contain" maxH="28em" w="100%" />
          </Flex>
        )
      })}
    </SimpleGrid>
  )
}
