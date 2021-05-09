import {
  Box,
  Center,
  Heading,
  Img,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import feedbackFeature from 'assets/feedback-feature.png'

export function FeedbackSection() {
  return (
    <Box
      as="section"
      bg={mode('gray.50', 'gray.800')}
      py={{base: '8', md: '16'}}
    >
      <Box maxW={{base: 'xl', md: '8xl'}} mx="auto" px={{base: '6', md: '6'}}>
        <Stack
          direction={{base: 'column', lg: 'row'}}
          spacing={{base: '3rem', lg: '2rem'}}
          align={'center'}
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
            w={{base: 'full', md: '95%', lg: '90%'}}
            mr={{lg: '-25rem'}}
            overflow={{lg: 'hidden'}}
            p={{lg: '9'}}
          >
            <Img
              w="full"
              zIndex="1"
              h={{base: 'auto', lg: '90%'}}
              objectFit="cover"
              src={feedbackFeature}
              alt="Design feedback screen"
              shadow="full"
              rounded="lg"
            />
          </Center>
        </Stack>
      </Box>
    </Box>
  )
}
