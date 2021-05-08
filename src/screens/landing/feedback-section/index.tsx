import {
  Box,
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
      pt={{base: '6', md: '16'}}
      pb="24"
    >
      <Box maxW={{base: 'xl', md: '8xl'}} mx="auto" px={{base: '6', md: '6'}}>
        <Stack
          direction={{base: 'column', lg: 'row'}}
          spacing={{base: '3rem', lg: '2rem'}}
          mt="8"
          align={{lg: 'center'}}
          justify="space-between"
          overflow="hidden"
        >
          <Box flex="1" maxW={{lg: '3xl'}}>
            <Heading
              as="h2"
              size="2xl"
              mt="8"
              fontWeight="semibold"
              letterSpacing="wide"
              textAlign={{base: 'center', md: 'left'}}
            >
              Get feedback from your audience
            </Heading>
            <Text
              color={mode('gray.600', 'gray.400')}
              mt="8"
              fontSize="lg"
              fontWeight="medium"
              textAlign={{base: 'center', md: 'left'}}
            >
              Your audience can vote and leave comments on all your variations
              for you to build on the already existent designs
            </Text>
          </Box>
          <Box
            pos="relative"
            w={{base: 'full', md: '90%'}}
            h={{base: 'auto'}}
            shadow="lg"
            mr="-25rem"
            rounded="lg"
            overflow="hidden"
          >
            <Img
              w="full"
              zIndex="1"
              h={{lg: '90%'}}
              objectFit="cover"
              src={feedbackFeature}
              alt="Screening talent"
              mr="-15em"
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
