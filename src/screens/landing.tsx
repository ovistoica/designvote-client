import {Avatar} from '@chakra-ui/avatar'
import {Button} from '@chakra-ui/button'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/layout'
import {ChooseIlustration} from 'assets/svg/choose-ilustration'
import {FeedbackIlustration} from 'assets/svg/feedback-ilustration'
import {ShareIlustration} from 'assets/svg/share-ilustration'
import {ShareIlustrationMobile} from 'assets/svg/share-ilustration-mobile'
import {MetaDecorator} from 'components/meta-decorator'
import {Footer} from 'components/lib'
import {useIsMobile} from 'utils/hooks'
import {ChooseIlustrationMobile} from 'assets/svg/choose-ilustration-mobile'
import {FeedbackIlustrationMobile} from 'assets/svg/feedback-ilustration-mobile'
import {useAuth} from 'context/auth-context'

function HeroSection() {
  const textInfoColor = useColorModeValue('textSecondary', 'gray.400')
  const isMobile = useIsMobile()
  const {login} = useAuth()

  return (
    <Flex
      pb={['2em', '2em', '4em']}
      as="section"
      maxW={['375px', '1024px', '1440px']}
      direction="column"
      alignItems="center"
      alignSelf="center"
      px="0.5em"
    >
      <Grid
        gridTemplateColumns={['1fr', '1fr', '1fr 1fr']}
        columnGap="1em"
        rowGap="1em"
        align="center"
      >
        <Box order={[2, 2, 1]} p="auto">
          {isMobile ? <ChooseIlustrationMobile /> : <ChooseIlustration />}
        </Box>

        <Flex
          flexDirection="column"
          alignItems="center"
          justify="center"
          order={[1, 1, 2]}
        >
          <Heading
            fontWeight="400"
            as="h1"
            fontSize={['1.8em', '2.5em', '3.3rem']}
          >
            Choose your best design.
          </Heading>
          <Text
            fontSize={['1rem', '1rem', '1.5rem']}
            fontWeight="300"
            textAlign="center"
            color={textInfoColor}
            mt="0.5em"
          >
            A toolbox to help you decide on the right version for your design
          </Text>
          {isMobile ? null : (
            <Button
              colorScheme="brand"
              mt="2em"
              fontSize="1rem"
              fontWeight="400"
              size="lg"
              onClick={login}
            >
              Choose your design
            </Button>
          )}
        </Flex>
      </Grid>
      <Stack spacing="1em" align="center" mt="4em" mb="2em">
        {isMobile ? (
          <Button
            colorScheme="brand"
            fontSize="1rem"
            mt="-2em"
            fontWeight="400"
            size="lg"
            onClick={login}
          >
            Choose your design
          </Button>
        ) : null}
        <Heading
          as="h2"
          textAlign="center"
          fontWeight="400"
          fontSize={['1.5rem', '1.5rem', '2rem']}
        >
          Let the people who matter vote
        </Heading>

        <Text
          fontSize="1.2rem"
          lineHeight="2rem"
          fontWeight="300"
          textAlign="center"
          color={textInfoColor}
          mt="0.5em"
          maxW="30em"
        >
          Designvote let’s you share your work with your friends and coworkers
          in order to collect feedback faster
        </Text>
      </Stack>
    </Flex>
  )
}

function ShareSection() {
  const bg = useColorModeValue('surface', 'gray.700')

  const textInfoColor = useColorModeValue('textSecondary', 'gray.400')
  const isMobile = useIsMobile()

  return (
    <Flex justify="center" bg={bg} py={['2em', '2em', '4em']} as="section">
      <Grid
        gridTemplateColumns={['1fr', '1fr', '1fr 1fr']}
        columnGap="1em"
        rowGap="1em"
        align="center"
        maxW={['375px', '1024px', '1440px']}
      >
        <Flex
          direction="column"
          maxW={['30em', '30em', '30em']}
          order={[2, 2, 1]}
          justify="center"
        >
          <Heading as="h3" fontWeight="300" fontSize={['2em', '2em', '2.4rem']}>
            Share fast and easy.
          </Heading>
          <Text
            fontSize={['1em', '1.2em', '1.4rem']}
            mt="1em"
            color={textInfoColor}
            fontWeight="300"
          >
            Distribute designs with a private or public link and collect all the
            feedback in one place
          </Text>
          <Divider my="2em" />
          <Flex direction={['column', 'column', 'row']} alignItems="center">
            <Avatar
              mr={[0, 0, '1em']}
              mb={['1em', 0, 0]}
              src="https://designvote-storage.fra1.digitaloceanspaces.com/0.jpeg"
            />
            <Stack>
              <Heading
                as="p"
                fontSize={['1rem', '1.2rem', '1.4rem']}
                fontWeight="400"
                textAlign={['center', 'center', 'start']}
              >
                A great tool to decide on the most fitting version of your
                design
              </Heading>
              <Text
                fontSize="1.1rem"
                fontWeight="400"
                color={textInfoColor}
                textAlign={['center', 'center', 'start']}
              >
                Robert Preoteasa,{' '}
                <Text color="brand.500" as="span">
                  Framey
                </Text>
              </Text>
            </Stack>
          </Flex>
        </Flex>
        <Flex justify="center" align="center" order={[1, 1, 2]}>
          {isMobile ? <ShareIlustrationMobile /> : <ShareIlustration />}
        </Flex>
      </Grid>
    </Flex>
  )
}

function FeedbackSection() {
  const textInfoColor = useColorModeValue('textSecondary', 'gray.400')
  const isMobile = useIsMobile()

  return (
    <Flex
      direction="column"
      align="center"
      py={['2em', '2em', '4em']}
      alignSelf="center"
      as="section"
    >
      <Center maxW="48em" flexDirection="column" mb="1.5em">
        <Heading
          fontSize={['1.8rem', '2rem', '2.7rem']}
          fontWeight="400"
          fontStyle="normal"
          textAlign="center"
        >
          Analyze results and group feedback on tags.
        </Heading>
        <Text
          fontSize={['1.1rem', '1.2rem', '1.5rem']}
          fontWeight="300"
          color={textInfoColor}
          textAlign="center"
          width="80%"
        >
          Structure the feedback into readable data and use tags to separate
          designs.
        </Text>
      </Center>

      {isMobile ? <FeedbackIlustrationMobile /> : <FeedbackIlustration />}
    </Flex>
  )
}

function CTASection() {
  const startGradient = useColorModeValue('surface', 'gray.700')
  const endGradient = useColorModeValue('white', 'gray.900')
  const {login} = useAuth()

  return (
    <Flex
      direction="column"
      align="center"
      bgGradient={`linear(to-b, ${startGradient},${endGradient})`}
      as="section"
    >
      <Center flexDirection="column" py={['6em', '6em', '10em']}>
        <Heading
          fontSize={['1.6rem', '2rem', '2.8rem']}
          fontWeight="400"
          fontStyle="normal"
          textAlign="center"
        >
          Don’t let your best version wait.
        </Heading>
        <Text
          fontSize={['1.4rem', '2rem', '2.4rem']}
          lineHeight="2em"
          textAlign="center"
          fontWeight="300"
        >
          Choose yours with Designvote
        </Text>
        <Button
          colorScheme="brand"
          mt="2em"
          fontSize="1rem"
          fontWeight="400"
          size="lg"
          w={['16em', '18em', '20em']}
          h="3em"
          onClick={login}
        >
          Choose your design
        </Button>
      </Center>
      <Divider />
      <Footer />
    </Flex>
  )
}

export function LandingPage() {
  return (
    <>
      <MetaDecorator
        title="Designvote - Choose your design"
        description="Prototype and share ux designs. Let people vote on design versions. 
          Choose design variation. Design the perfect feature. Design principles for ranked choice voting."
      />
      <Flex
        direction="column"
        minH="100vh"
        w="100vw"
        pt={['4.5em', '6em', '6em']}
        as="main"
      >
        <HeroSection />
        <ShareSection />
        <FeedbackSection />
        <CTASection />
      </Flex>
    </>
  )
}
