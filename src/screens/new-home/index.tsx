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
  Tag,
  Icon,
  VStack,
  StackProps,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react'
import {useLatestDesigns} from 'api/design-query'
import {DesignerBanner} from './designers-banner'
import {Footer} from 'components/footer'
import {TopExperts} from './experts'
import {useNavigate} from 'react-router'
import {useAuth} from 'context/auth-context'
import {DesignInfo} from './cards/design-info'
import {FaComment, FaStamp} from 'react-icons/fa'

interface DesignProps {
  question: string
  img: string
  votes: number
  opinions: number
  createdAt: string
  onClick: () => void
  ownerPicture?: string
  ownerName: string
}

function DesignCard({
  question,
  img,
  votes,
  onClick,
  ownerName,
  ownerPicture,
  createdAt,
  opinions,
  ...flexProps
}: DesignProps & StackProps) {
  return (
    <VStack
      cursor="pointer"
      onClick={onClick}
      {...flexProps}
      alignItems="flex-start"
    >
      <Img src={img} rounded="md" shadow="md" w="full" />
      <Text fontWeight="semibold">{question}</Text>
      <Flex justify="space-between" align="center" w="full">
        <HStack maxW="35%">
          <Avatar size="xs" src={ownerPicture} name={ownerName} />
          <Text fontWeight="600" fontSize="sm" noOfLines={1}>
            {ownerName}
          </Text>
        </HStack>

        <HStack align="center">
          <Icon as={FaStamp} color="gray.400" />
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={mode('gray.600', 'gray.300')}
          >
            <b>{votes}</b>
          </Text>
          <Icon as={FaComment} color="gray.400" />
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={mode('gray.600', 'gray.300')}
          >
            <b>{opinions}</b>
          </Text>
        </HStack>
      </Flex>
    </VStack>
  )
}

function BannerSection() {
  const {login, isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const onClick = () => {
    if (isAuthenticated) {
      navigate('/create')
    } else {
      login({redirectUri: `${window.location.origin}/create`})
    }
  }
  return (
    <Flex
      as="section"
      align="center"
      justify="center"
      bg={mode('whiteAlpha.900', 'blackAlpha.600')}
      shadow="sm"
      pt="24"
      w="full"
    >
      <Stack
        direction={{base: 'column', lg: 'row'}}
        spacing="0"
        align="center"
        maxW={{base: 'full', xl: '7xl'}}
      >
        <Stack
          h="100%"
          spacing={{base: '8', lg: '4', xl: '8'}}
          px={{base: '4', md: '12', lg: '0', xl: '20'}}
          ml={{lg: 8, xl: 0}}
        >
          <Heading size="xl">
            Quick visual feedback from other designers
          </Heading>
          <Text>
            Find out the best version of your design, get feedback faster from
            top experts in your field and help others decide on the best version
            on their design.
          </Text>
          <Button
            maxW="2xs"
            onClick={onClick}
            colorScheme="orange"
            mb={{base: 4, md: 8, lg: 0}}
          >
            Create your first design poll
          </Button>
        </Stack>
        <Box display={{base: 'none', md: 'block'}}>
          <DesignerBanner />
        </Box>
      </Stack>
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
    <Tag colorScheme="blue" m="1" variant="solid" size="lg">
      {name}
    </Tag>
  )
}

function Topics() {
  return (
    <Box
      mt="4"
      rounded="lg"
      bg={mode('white', 'gray.700')}
      maxW="3xl"
      mx="auto"
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

  const nrOfDesigns = useBreakpointValue({base: 4, lg: 4, xl: 4})
  return (
    <>
      <Flex justifyContent="center" align="center" direction="column">
        <BannerSection />
        <Flex
          direction="column"
          w={{base: 'full', lg: '5xl', xl: '6xl'}}
          py="8"
          px={{base: '4', md: '8', lg: '8', xl: '4'}}
        >
          <Flex align="center" pb="4" w={{base: 'full', lg: '3xl', xl: '6xl'}}>
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
          <SimpleGrid
            columns={{base: 1, md: 2, lg: 4, xl: 4}}
            gridGap="4"
            rowGap="6"
          >
            {designs.slice(0, nrOfDesigns).map((design, index) => (
              <DesignCard
                opinions={design?.totalOpinions ?? 0}
                key={design.designId}
                question={design.question}
                img={design.img}
                votes={design.totalVotes}
                onClick={() => navigate(`/design/${design.shortUrl}`)}
                createdAt={design.createdAt}
                ownerPicture={design.ownerPicture}
                ownerName={design.ownerNickname}
              />
            ))}
          </SimpleGrid>
        </Flex>
        <Box as="section" py="4" w="full" px={{base: '4', lg: '8', xl: '4'}}>
          <Box maxW={{base: 'xl', md: '5xl', lg: '6xl'}} mx="auto">
            <Grid
              templateColumns={{base: '1fr', lg: '2fr 1fr'}}
              gap={4}
              justifyContent="center"
              gridAutoFlow={{base: 'row', lg: 'row'}}
            >
              <Box
                rounded="lg"
                bg={mode('white', 'gray.700')}
                maxW={{base: 'xl', md: '3xl'}}
                w="full"
                mx="auto"
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
                      <DesignInfo
                        key={`latestDesign${design.shortUrl}`}
                        question={design.question}
                        votes={design.totalVotes}
                        opinions={design?.totalOpinions ?? 0}
                        createdAt={design.createdAt}
                        img={design.img}
                        ownerPicture={design.ownerPicture}
                        ownerName={design.ownerName ?? design.ownerNickname}
                        onClick={() => navigate(`/design/${design.shortUrl}`)}
                      />
                      {index !== 4 ? <Divider borderColor="gray.200" /> : null}
                    </>
                  ))}

                  <Button
                    variant="outline"
                    colorScheme="orange"
                    w="full"
                    rightIcon={<ArrowForwardIcon />}
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
