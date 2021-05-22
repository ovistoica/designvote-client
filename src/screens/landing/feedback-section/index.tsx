import {
  Box,
  Center,
  Heading,
  Img,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
// import feedbackFeature from 'assets/feedback-feature.png'
import feedbackFeature from 'assets/hero-image.png'

export function FeedbackSection() {
  return (
    <Center
      as="section"
      bg={mode('gray.50', 'gray.800')}
      py={{base: '8', md: '16'}}
      mx="auto"
    >
      <Box maxW={{base: 'xl', md: '8xl', lg: '100vw'}} mx="auto" pl={{lg: 6}}>
        <Stack
          direction={{base: 'column', lg: 'row'}}
          spacing={{base: '3rem', lg: '2rem'}}
          align="center"
          mx="auto"
          w="full"
          px={{base: '6', md: '6', lg: '0'}}
          overflow={{lg: 'hidden'}}
        >
          <Box flex="1" maxW={{lg: '3xl'}}>
            <Heading
              as="h2"
              size="2xl"
              fontWeight="semibold"
              letterSpacing="wide"
              textAlign={{base: 'center', lg: 'left'}}
            >
              Get feedback from your audience
            </Heading>
            <Text
              color={mode('gray.600', 'gray.400')}
              mt="8"
              fontSize="lg"
              fontWeight="medium"
              textAlign={{base: 'center', lg: 'left'}}
            >
              Your audience can vote and leave comments on all your variations
              for you to build on the already existent designs
            </Text>
          </Box>
          <Center
            pos="relative"
            w={{base: 'full', md: '95%', lg: 'auto'}}
            overflow={{lg: 'hidden'}}
            p={{lg: '9'}}
            mr={{lg: '-5rem', xl: '0'}}
          >
            <Img
              zIndex="1"
              objectFit="contain"
              src={feedbackFeature}
              alt="Design feedback screen"
              h={{base: 'auto', lg: '500px'}}
              shadow="full"
              rounded="lg"
              objectPosition={{lg: 'left center'}}
            />
          </Center>
        </Stack>
      </Box>
    </Center>
  )
}
