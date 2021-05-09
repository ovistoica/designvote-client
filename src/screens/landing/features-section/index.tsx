import {Box, Center, DarkMode, Heading, SimpleGrid} from '@chakra-ui/react'
import {
  FcComments,
  FcDoughnutChart,
  FcLink,
  FcMultipleDevices,
  FcRating,
  FcTimeline,
} from 'react-icons/fc'
import {Feature} from './feature'

export const FeaturesSection = () => (
  <Center
    as="section"
    bg="blue.700"
    py={{base: '8', md: '16'}}
    h={{base: 'auto', md: '3xl', lg: '2xl'}}
  >
    <Box maxW={{base: 'xl', md: '8xl'}} mx="auto" px={{base: '6', md: '6'}}>
      <DarkMode>
        <Heading
          as="h2"
          fontWeight="medium"
          color="white"
          textAlign="center"
          letterSpacing="wide"
          size="2xl"
          mb={{base: '8', md: '16', lg: '24'}}
        >
          Everything you need to get validation.
        </Heading>
        <SimpleGrid
          columns={{base: 1, md: 2, lg: 3}}
          spacingX="10"
          spacingY={{base: '8', md: '14'}}
        >
          <Feature title="Share designs fast" icon={<FcLink />}>
            Seamlessy share surveys so you can start building the best versions.
          </Feature>
          <Feature title="Support for user comments" icon={<FcComments />}>
            Users can leave comments on every design so you can take the best
            from each variation.
          </Feature>
          <Feature
            title="Support for different voting styles"
            icon={<FcRating />}
          >
            Choose how your audience votes on your designs. Either choose the
            best version or rate each one with 1-5 stars.
          </Feature>
          <Feature title="Always up to date" icon={<FcTimeline />}>
            Feedback from users is displayed in real time.
          </Feature>
          <Feature
            title="Analyse results and draw conclusions"
            icon={<FcDoughnutChart />}
          >
            See which design variant performed better and why.
          </Feature>
          <Feature
            title="Support for multiple devices"
            icon={<FcMultipleDevices />}
          >
            Create, share and analyse design surveys even if you are on the
            move.
          </Feature>
        </SimpleGrid>
      </DarkMode>
    </Box>
  </Center>
)
