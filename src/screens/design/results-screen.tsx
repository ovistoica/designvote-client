import * as React from 'react'
import {
  Box,
  Text,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Tag,
  useDisclosure,
  useColorModeValue as mode,
  SimpleGrid,
} from '@chakra-ui/react'
import {useZoomModalState, ZoomModal} from 'components/zoom-modal'
import {useParams} from 'react-router-dom'
import {useUrlDesign} from 'api/design-query'
import {Footer} from 'components/footer'
import {OpinionsSection} from './opinions'
import {DEFAULT_TAGS} from './dummy-data'
import {DesignStats} from './design-stats'
import {StatCard} from './results-stat-card'

export function ResultsScreen() {
  const {shortUrl} = useParams()
  const {data: design, isLoading, isSuccess} = useUrlDesign(shortUrl)
  const {question, description} = design
  const {isOpen, onOpen, onClose} = useDisclosure()
  const setImages = useZoomModalState(state => state.setImages)
  const setStartSlide = useZoomModalState(state => state.setIndex)

  React.useEffect(() => {
    if (isSuccess) {
      setImages(
        design.versions.map(v => ({url: v.imageUrl, versionId: v.versionId})),
      )
    }
  }, [design.versions, isSuccess, setImages])

  return (
    <>
      <Box as="section" bg={mode('gray.50', 'gray.800')} pt="16" pb="24">
        <Box
          maxW={{base: 'xl', md: '7xl'}}
          mx="auto"
          px={{base: '6', md: '8'}}
          pt="8"
        >
          <Grid gridTemplateColumns={{base: '1fr', md: '65fr 35fr'}} gap="6">
            <Stack>
              <Heading
                fontWeight="600"
                size="2xl"
                color={mode('gray.700', 'gray.300')}
              >
                {question}
              </Heading>
              {description ? (
                <Text color={mode('gray.600', 'gray.400')} fontSize="lg">
                  {description}
                </Text>
              ) : null}

              <Flex wrap="wrap" py="5">
                {
                  // TODO: Change default tags
                }
                {DEFAULT_TAGS.map(t => (
                  <Tag
                    variant="solid"
                    colorScheme="blue"
                    key={`tag${t}`}
                    m="1"
                    size="lg"
                  >
                    {t}
                  </Tag>
                ))}
              </Flex>
            </Stack>
            <DesignStats
              votes={design.totalVotes}
              opinions={design.opinions.length}
            />
          </Grid>
        </Box>
        <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
          <Heading size="md" color={mode('gray.700', 'gray.400')}>
            Current results:
          </Heading>
          {isLoading ? (
            <Spinner />
          ) : (
            <SimpleGrid
              alignContent="center"
              alignItems="center"
              columns={{
                base: 1,
                md: 2,
                lg: design.versions.length > 2 ? 3 : 2,
              }}
              spacing={{base: '2', md: '8', lg: '8'}}
              rowGap={{base: 8, md: 8, lg: 8}}
              mt="8"
              maxW={{base: 'xl', md: '6xl'}}
            >
              {design.versions
                .sort((a, b) => {
                  const {name: nameA} = a
                  const {name: nameB} = b
                  if (nameA === nameB) {
                    return 0
                  }
                  return nameA > nameB ? 1 : -1
                })
                .map((version, index) => {
                  const {imageUrl, versionId} = version
                  const title = `Version #${index + 1} votes`
                  return (
                    <StatCard
                      id={title}
                      imageUrl={imageUrl}
                      key={`designVersion${versionId}`}
                      designId={design.designId}
                      versionId={versionId}
                      title={title}
                      voteStyle={design.voteStyle}
                      totalVotes={design.totalVotes}
                      votes={design.votes.filter(
                        v => v.versionId === versionId,
                      )}
                      onClick={() => {
                        onOpen()
                        setStartSlide(index)
                      }}
                    />
                  )
                })}
            </SimpleGrid>
          )}
          <OpinionsSection designUrl={design.shortUrl!} />
        </Box>
      </Box>
      <ZoomModal isOpen={isOpen} onClose={onClose} />
      <Footer />
    </>
  )
}
