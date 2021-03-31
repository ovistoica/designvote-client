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
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/layout'
import {ChooseIlustration} from 'assets/svg/choose-ilustration'
import {FeedbackIlustration} from 'assets/svg/feedback-ilustration'
import {LogoIcon} from 'assets/svg/logo-icon'
import {ShareIlustration} from 'assets/svg/share-ilustration'
import {MetaDecorator} from 'components/meta-decorator'
import {NavLink, SocialIcon} from 'components/lib'
import {FaTwitter} from 'react-icons/fa'
import {GrFacebookOption} from 'react-icons/gr'
import {IoMdMailOpen} from 'react-icons/io'

function HeroSection() {
  const textInfoColor = useColorModeValue('textSecondary', 'gray.400')

  return (
    <Box py="4em">
      <Grid
        gridTemplateColumns="1fr 1fr"
        columnGap="1em"
        align="center"
        // p={['4em 1em', '4em 2em', '2em 2em']}
      >
        <ChooseIlustration />

        <Flex flexDirection="column" alignItems="center" justify="center">
          <Heading fontWeight="400" as="h1" fontSize="3.3rem">
            Choose your best design.
          </Heading>
          <Text
            fontSize="1.5rem"
            fontWeight="300"
            textAlign="center"
            color={textInfoColor}
          >
            A toolbox to help you decide on the right version for your design
          </Text>
          <Button
            colorScheme="brand"
            mt="2em"
            fontSize="1rem"
            fontWeight="400"
            size="lg"
          >
            Choose your design
          </Button>
        </Flex>
      </Grid>
      <Stack spacing="0.5em" align="center" mt="4em" mb="2em">
        <Heading as="h2" textAlign="center" fontWeight="400" fontSize="2rem">
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
    </Box>
  )
}

function ShareSection() {
  const bg = useColorModeValue('surface', 'gray.700')

  const textInfoColor = useColorModeValue('textSecondary', 'gray.400')

  return (
    <Box bg={bg} w="100vw" py="4em">
      <SimpleGrid
        width="60em"
        columns={[1, 2, 2]}
        columnGap="1em"
        alignItems="center"
      >
        <Flex direction="column" maxW="30em">
          <Heading as="h3" fontWeight="300" fontSize="2.4rem">
            Share fast and easy.
          </Heading>
          <Text
            fontSize="1.4rem"
            mt="1em"
            color={textInfoColor}
            fontWeight="300"
          >
            Distribute designs with a private or public link and collect all the
            feedback in one place
          </Text>
          <Divider my="1em" />
          <Flex direction="row" alignItems="center">
            <Avatar
              mr="1em"
              src="https://designvote-storage.fra1.digitaloceanspaces.com/0.jpeg"
            />
            <Stack>
              <Heading
                as="p"
                fontSize="1.4rem"
                fontWeight="400"
                textAlign="start"
              >
                A great tool to decide on the most fitting version of your
                design
              </Heading>
              <Text
                fontSize="1.1rem"
                fontWeight="400"
                color={textInfoColor}
                textAlign="start"
              >
                Robert Preoteasa, Framey
              </Text>
            </Stack>
          </Flex>
        </Flex>
        <ShareIlustration />
      </SimpleGrid>
    </Box>
  )
}

function FeedbackSection() {
  const textInfoColor = useColorModeValue('textSecondary', 'gray.400')

  return (
    <Flex direction="column" align="center" py="4em" alignSelf="center">
      <Center maxW="48em" flexDirection="column" mb="1.5em">
        <Heading fontSize="2.7rem" fontWeight="400" fontStyle="normal">
          Analyze results and group feedback on tags.
        </Heading>
        <Text
          fontSize="1.5rem"
          fontWeight="300"
          color={textInfoColor}
          textAlign="center"
          width="80%"
        >
          Structure the feedback into readable data and use tags to separate
          designs.
        </Text>
      </Center>

      <FeedbackIlustration />
    </Flex>
  )
}

function Footer() {
  const textInfoColor = useColorModeValue('textInfoLight', 'gray.400')

  return (
    <Flex direction="column" align="center" mb="3.6em">
      <LogoIcon width="2em" height="2.5em" style={{marginTop: '2.5em'}} />
      <Flex mt="2em" color={textInfoColor} w="24em" justify="space-between">
        <NavLink to="/how-it-works">How it works</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/try">Try free</NavLink>
      </Flex>
      <Flex mt="2em">
        <SocialIcon icon={<GrFacebookOption />} />
        <SocialIcon icon={<FaTwitter />} />
        <SocialIcon icon={<IoMdMailOpen />} />
      </Flex>
      <Flex mt="2em" color={textInfoColor} justify="space-between" w="24em">
        <NavLink to="/terms-and-conditions">Terms and Conditions</NavLink>
        <NavLink to="/privacy">Privacy</NavLink>
      </Flex>
    </Flex>
  )
}

function CTASection() {
  const startGradient = useColorModeValue('surface', 'gray.700')
  const endGradient = useColorModeValue('white', 'gray.900')

  return (
    <Flex
      direction="column"
      align="center"
      bgGradient={`linear(to-b, ${startGradient},${endGradient})`}
    >
      <Center flexDirection="column" py="10em">
        <Heading fontSize="2.7rem" fontWeight="400" fontStyle="normal">
          Don’t let your best version wait.
        </Heading>
        <Text
          fontSize="2.5rem"
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
          w="20em"
          h="3em"
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
      <Grid minH="100vh" pt="6em" align="center" maxW="1440px">
        <HeroSection />
        <ShareSection />
        <FeedbackSection />
        <CTASection />
      </Grid>
    </>
  )
}
