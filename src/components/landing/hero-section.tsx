import {
  Box,
  Button,
  Heading,
  Img,
  Stack,
  Text,
  LightMode,
} from '@chakra-ui/react'
import {useAuth0} from '@auth0/auth0-react'

const heroImage = require('assets/feedback-feature.png')
// import heroImage from 'assets/hero-image.png'
// import heroImage from 'assets/feedback-feature.png'

export const HeroSection = () => {
  const {loginWithRedirect} = useAuth0()
  return (
    <Box
      as="section"
      bg="gray.800"
      color="white"
      pt="7.5rem"
      pb={{base: '8', md: '16'}}
    >
      <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
        <Box textAlign="center">
          <Heading
            as="h1"
            size="3xl"
            fontWeight="extrabold"
            maxW="48rem"
            mx="auto"
            lineHeight="1.2"
            letterSpacing="tight"
          >
            Get feedback FAST!
          </Heading>
          <Text fontSize="xl" mt="4" maxW="xl" mx="auto">
            A service to seamlessly create design surveys. We make it easy for
            you to gather feedback from your audience on the best version of
            your design.
          </Text>
        </Box>

        <Stack
          justify="center"
          direction={{base: 'column', md: 'row'}}
          mt="10"
          mb="20"
          spacing="4"
        >
          <LightMode>
            <Button
              size="lg"
              colorScheme="orange"
              px="8"
              fontWeight="bold"
              fontSize="md"
              onClick={() => loginWithRedirect()}
            >
              Get started free
            </Button>
          </LightMode>
        </Stack>

        <Box
          className="group"
          position="relative"
          rounded="lg"
          overflow="hidden"
          pb="10"
        >
          <Img
            alt="Screenshot of Designvote App"
            src={heroImage}
            rounded="lg"
          />
        </Box>
      </Box>
    </Box>
  )
}
