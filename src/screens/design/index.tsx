import * as React from 'react'
import {
  Box,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue as mode,
  Button,
  useDisclosure,
  Grid,
  Flex,
  Divider,
  HStack,
  StackDivider,
  Tag,
  Image,
} from '@chakra-ui/react'
import {useParams} from 'react-router'
import {useUrlDesign} from 'utils/design-query'
import {ZoomModal, useZoomModalState} from 'components/zoom-modal'
import {Footer} from 'components/footer'
import {Comment, Stamp} from '../../assets/icons'
import {FaShare, FaStar} from 'react-icons/fa'
import {ArrowUpIcon} from '@chakra-ui/icons'
import {ChooseOneDesignGrid} from './choose-one/choose-one-grid'
import {VoteStyle} from 'types'
import {RateFiveStarsGrid} from './rate-five-stars/rate-five-stars-grid'

interface DesignStatsProps {
  votes: number
  opinions: number
}
function DesignStats({votes, opinions}: DesignStatsProps) {
  const statsBg = mode('white', 'gray.700')
  const iconColor = mode('#1A202C', 'rgba(255, 255, 255, 0.92)')
  return (
    <Flex
      flexDir="column"
      shadow="base"
      w="22em"
      h="15em"
      p="4"
      bg={statsBg}
      rounded="md"
      align="center"
      justify="space-evenly"
    >
      <Flex w="100%" justify="center">
        <Stack p="1em" w="49%" align="center">
          <Stamp fill={iconColor} />
          <Text fontWeight="bold">{votes}</Text>
          <Text>Votes</Text>
        </Stack>
        <Divider orientation="vertical" />
        <Stack p="1em" w="49%" align="center">
          <Comment fill={iconColor} />
          <Text fontWeight="bold">{opinions}</Text>
          <Text>Opinions</Text>
        </Stack>
      </Flex>
      <HStack gridTemplateColumns="1fr 1fr" w="full" pt="8">
        <Button
          w="full"
          color="orange.400"
          borderWidth="1px"
          variant="outlined"
          borderColor="orange.400"
          leftIcon={<FaStar />}
          _hover={{bg: 'orange.300', color: 'white'}}
        >
          Favorite
        </Button>
        <Button
          w="full"
          color="orange.400"
          borderWidth="1px"
          variant="outlined"
          borderColor="orange.400"
          role="group"
          leftIcon={<FaShare />}
          _hover={{bg: 'orange.300', color: 'white'}}
        >
          Share
        </Button>
      </HStack>
    </Flex>
  )
}

interface OpinionsSectionProps {
  designUrl: string
}

interface OpinionProps {
  imageUrl: string
  opinion: string
  userId: string
}

function OpinionView({imageUrl, opinion, userId}: OpinionProps) {
  return (
    <Grid gridTemplateColumns="1fr 9fr 1.5fr" alignItems="center" py="4">
      <ArrowUpIcon />
      <Stack px="2">
        <Text fontWeight="600" color="gray.800">
          Andrew Cohen
        </Text>
        <Text color="gray.700">{opinion}</Text>
      </Stack>
      <Image src={imageUrl} rounded="md"></Image>
    </Grid>
  )
}

function OpinionsSection({designUrl}: OpinionsSectionProps) {
  return (
    <Box
      maxW={{base: 'xl', md: '5xl', lg: '6xl'}}
      mt="12"
      alignSelf="center"
      px={{base: '6', md: '8'}}
      py="8"
      bg="white"
      rounded="md"
      shadow="base"
    >
      <Stack divider={<StackDivider color="gray.200" />}>
        <OpinionView
          opinion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
          userId=""
          imageUrl="https://designvote-storage.fra1.cdn.digitaloceanspaces.com/54afe9d9-18e4-4cfc-89a6-421525186d36-1.jpeg"
        />
        <OpinionView
          opinion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
          userId=""
          imageUrl="https://designvote-storage.fra1.cdn.digitaloceanspaces.com/54afe9d9-18e4-4cfc-89a6-421525186d36-2.jpeg"
        />
        <OpinionView
          opinion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
          userId=""
          imageUrl="https://designvote-storage.fra1.cdn.digitaloceanspaces.com/54afe9d9-18e4-4cfc-89a6-421525186d36-4.jpeg"
        />
      </Stack>
    </Box>
  )
}

// TODO: Change these
const DEFAULT_TAGS = ['ui', 'mood', 'style', 'banking', 'mobile']

export function DesignScreen() {
  const {shortUrl} = useParams()
  const {data: design, isLoading, isSuccess} = useUrlDesign(shortUrl)
  const {question, description} = design
  const {isOpen, onOpen, onClose} = useDisclosure()
  const setImages = useZoomModalState(state => state.setImages)
  const setStartSlide = useZoomModalState(state => state.setIndex)

  const VotingGrid =
    isSuccess && design.voteStyle === VoteStyle.Choose
      ? ChooseOneDesignGrid
      : RateFiveStarsGrid

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
          <Grid gridTemplateColumns="65fr 35fr" gap="6">
            <Stack>
              <Heading fontWeight="600" color="gray.700">
                {question}
              </Heading>
              {description ? <Text color="gray.600">{description}</Text> : null}

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
          {isLoading ? (
            <Spinner />
          ) : (
            <VotingGrid
              designUrl={shortUrl}
              onVersionClick={(index: number) => {
                onOpen()
                setStartSlide(index)
              }}
            />
          )}
          <OpinionsSection designUrl={design.shortUrl!} />
        </Box>
      </Box>
      <ZoomModal isOpen={isOpen} onClose={onClose} />
      <Footer />
    </>
  )
}
