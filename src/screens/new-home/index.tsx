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
} from '@chakra-ui/react'
import {useLatestDesigns} from 'api/design-query'
import {DesignerBanner} from './designers-banner'
import {Comment, Stamp} from '../../assets/icons'
import {Footer} from 'components/footer'
import {TopExperts} from './experts'
import {useNavigate} from 'react-router'
import {formatCreatedAt} from 'utils/date'
import {useAuth} from 'context/auth-context'

interface DesignProps {
  question: string
  img: string
  votes: number
  createdAt: string
  onClick: () => void
  ownerPicture?: string
  ownerName: string
}

export const Design = (props: DesignProps) => {
  const {
    votes,
    question,
    img,
    createdAt,
    onClick,
    ownerName,
    ownerPicture,
  } = props
  const timeAgo = formatCreatedAt(createdAt)

  return (
    <Box position="relative" onClick={onClick} cursor="pointer">
      <HStack>
        <Img w="125px" h="94px" rounded="md" src={img} shadow="md" />
        <Stack pl="5">
          <HStack>
            <Avatar size="xs" src={ownerPicture} name={ownerName} />
            <Text fontWeight="600" fontSize="sm">
              {ownerName}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {timeAgo}
            </Text>
          </HStack>
          <Box maxW="xl" fontSize="xl" noOfLines={1}>
            {question}
          </Box>
          <HStack spacing="8">
            <HStack color={mode('blackAlpha.600', 'gray.300')}>
              <Stamp mb="1" fill={mode('blackAlpha.600', 'gray.300')} />
              <Text>{votes} Votes</Text>{' '}
            </HStack>
            <HStack color={mode('blackAlpha.600', 'gray.300')}>
              <Comment fill={mode('blackAlpha.600', 'gray.300')} />
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
  img,
  votes,
  onClick,
}: {
  question: string
  img: string
  votes: number
  onClick: () => void
}) {
  return (
    <Flex direction="column" cursor="pointer" onClick={onClick}>
      <Img src={img} rounded="md" shadow="md" />
      <Text fontWeight="semibold" maxW="250px" noOfLines={1} pt="2">
        {question}
      </Text>
      <HStack align="center">
        <Stamp fill={mode('gray.700', 'gray.300')} mb="1" />
        <Text>{votes} Votes</Text>
      </HStack>
    </Flex>
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
            Find out the best version of your design, get feedback faster from
            top experts in your field and help others decide on the best version
            on their design.
          </Text>
          <Button maxW="2xs" onClick={onClick} colorScheme="orange">
            Create your first design poll
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
    <Tag colorScheme="blue" m="1" variant="solid" size="lg">
      {name}
    </Tag>
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
                onClick={() => navigate(`/design/${design.shortUrl}`)}
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
                        key={`latestDesign${design.shortUrl}`}
                        question={design.question}
                        votes={design.totalVotes}
                        createdAt={design.createdAt}
                        img={design.img}
                        ownerPicture={design.ownerPicture}
                        ownerName={design.ownerName ?? design.ownerNickname}
                        onClick={() => navigate(`/design/${design.shortUrl}`)}
                      />
                      {index !== 4 ? <Divider /> : null}
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
