import {ArrowForwardIcon} from '@chakra-ui/icons'
import {
  Text,
  Box,
  Heading,
  HStack,
  Stack,
  Button,
  Flex,
  Img,
  useColorModeValue as mode,
  Avatar,
  Divider,
  Grid,
  DarkMode,
  GridItem,
} from '@chakra-ui/react'
import {useLatestDesigns} from 'utils/design-query'
import {DesignerBanner} from './designers-banner'
import heroImage from 'assets/dummy-pic.png'
import dummyAvatar from 'assets/dummy-avatar.png'
import {Comment, Stamp} from '../../assets/icons'
import {Footer} from 'components/footer'
import {TopExperts} from './experts'
import {useNavigate} from 'react-router'
import {formatCreatedAt} from 'utils/date'

interface DesignProps {
  question: string
  img?: string
  votes: number
  createdAt: string
  onClick: () => void
}

export const Design = (props: DesignProps) => {
  const {votes, question, img, createdAt, onClick} = props
  const timeAgo = formatCreatedAt(createdAt)

  return (
    <Box position="relative" onClick={onClick} cursor="pointer">
      <HStack>
        <Img
          w="125px"
          h="94px"
          rounded="md"
          src={img ?? heroImage}
          shadow="md"
        />
        <Stack pl="5">
          <HStack>
            {
              // TODO Remove dummy avatar for the real thing
            }
            <Avatar size="xs" src={dummyAvatar} />
            <Text fontWeight="600" fontSize="sm">
              Andrew Cohen
            </Text>
            <Text color="gray.500" fontSize="sm">
              {timeAgo}
            </Text>
          </HStack>
          <Box maxW="xl" fontSize="xl" noOfLines={1}>
            {question}
          </Box>
          <HStack spacing="8">
            <HStack color="blackAlpha.600">
              <Stamp mb="1" fill="blackAlpha.600" />
              <Text>{votes} Votes</Text>
            </HStack>
            <HStack color="blackAlpha.600">
              <Comment fill="blackAlpha.600" />
              <Text>{votes} Opinions</Text>
            </HStack>
          </HStack>
        </Stack>
      </HStack>
    </Box>
  )
}

function DesignCard({
  question,
  img = heroImage,
  votes,
}: {
  question: string
  img?: string | null
  votes: number
}) {
  return (
    <Flex direction="column">
      <Img src={img ?? heroImage} rounded="md" shadow="md" />
      <Text fontWeight="semibold" maxW="250px" noOfLines={1} pt="2">
        {question}
      </Text>
      <HStack>
        <Stamp />
        <Text>{votes} Votes</Text>
      </HStack>
    </Flex>
  )
}

function BannerSection() {
  return (
    <Flex
      as="section"
      align="center"
      justify="center"
      bg="whiteAlpha.900"
      shadow="sm"
      pt="24"
      w="full"
    >
      <HStack
        maxW={{base: 'full', md: '7xl'}}
        justify="center"
        mx="auto"
        my="auto"
      >
        <Stack h="100%" spacing="8" px="20">
          <Heading size="xl">
            Quick visual feedback from other designers
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Button
            bg="orange.400"
            maxW="2xs"
            _hover={{bg: 'orange.300'}}
            color="white"
          >
            Create your first poll
          </Button>
        </Stack>
        <Box>
          <DesignerBanner />
        </Box>
      </HStack>
    </Flex>
  )
}

const data = [
  'ui',
  'style',
  'mobile',
  'app',
  'illustration',
  'dashboard',
  'logo',
  'experience',
  'website',
  'marketing',
]

function Topic({name}: {name: string}) {
  return (
    <Box rounded="md" color="white" bg="blue.400" m="1" py="1" px="2">
      {name}
    </Box>
  )
}

function Topics() {
  return (
    <Box
      mt="4"
      rounded={{lg: 'lg'}}
      bg={mode('white', 'gray.700')}
      maxW="2xl"
      maxH="24rem"
      shadow="base"
      overflow="hidden"
    >
      <Flex align="center" justify="space-between" px="6" py="4">
        <Text as="h3" fontWeight="bold" fontSize="lg">
          Popular Topics
        </Text>
      </Flex>
      <Flex wrap="wrap" py="5" px="8">
        {data.map(name => (
          <Topic name={name} key={`Topic${name}`} />
        ))}
      </Flex>
    </Box>
  )
}

export function Home() {
  const {
    data: {designs},
  } = useLatestDesigns()
  const navigate = useNavigate()
  return (
    <>
      <Flex justifyContent="center" align="center" direction="column">
        <BannerSection />
        <Flex direction="column" w={{base: 'full', md: '6xl'}} py="8">
          <Flex align="center" pb="4">
            <Heading size="md">Popular</Heading>
            <Button
              mx="2"
              variant="link"
              colorScheme="orange"
              rightIcon={<ArrowForwardIcon />}
            >
              View all
            </Button>
          </Flex>
          <HStack spacing="6">
            {designs.slice(0, 4).map(design => (
              <DesignCard
                key={design.designId}
                question={design.question}
                img={design.img}
                votes={design.totalVotes}
              />
            ))}
          </HStack>
        </Flex>
        <Box as="section" py="12" w="full">
          <Box maxW={{base: 'xl', md: '6xl'}} mx="auto">
            <Grid templateColumns="2fr 1fr" gap={4}>
              <Box
                rounded={{lg: 'lg'}}
                bg={mode('white', 'gray.700')}
                maxW="3xl"
                shadow="base"
                overflow="hidden"
              >
                <Flex align="center" justify="space-between" px="6" py="4">
                  <Text as="h3" fontWeight="bold" fontSize="lg">
                    Latest Designs
                  </Text>
                </Flex>
                <Stack spacing="6" py="5" px="8" flex={1}>
                  {designs.slice(0, 5).map((design, index) => (
                    <>
                      <Design
                        question={design.question}
                        votes={design.totalVotes}
                        createdAt={design.createdAt}
                        img={design.img ?? undefined}
                        onClick={() => navigate(`/design/${design.shortUrl}`)}
                      />
                      {index !== 4 ? <Divider /> : null}
                    </>
                  ))}

                  <Button
                    variant="outline"
                    w="full"
                    borderColor="orange.400"
                    color="orange.400"
                    rightIcon={<ArrowForwardIcon />}
                    _hover={{bg: 'orange.300', color: 'white'}}
                  >
                    View All
                  </Button>
                </Stack>
              </Box>
              <GridItem>
                <TopExperts />
                <Topics />
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Flex>

      <Box bg="gray.700" maxW="full" w="full">
        <DarkMode>
          <Footer color="gray.200" />
        </DarkMode>
      </Box>
    </>
  )
}
