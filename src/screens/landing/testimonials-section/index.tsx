import {Box, Button, Grid, Heading, Text} from '@chakra-ui/react'
import {FaArrowRight} from 'react-icons/fa'
import {Testimonial} from './testimonial'

export const TestimonialSection = () => {
  return (
    <Box
      as="section"
      py={{base: '8', md: '16'}}
      px={{base: '6', md: '8'}}
      mt={{base: 0, md: 16}}
    >
      <Heading
        textAlign="center"
        fontWeight="semibold"
        letterSpacing="wide"
        maxW="4xl"
        mx="auto"
        size="2xl"
      >
        Join successful builders and designers all over the world
      </Heading>
      <Box
        maxW={{base: 'xl', md: '7xl'}}
        mx="auto"
        px={{base: '6', md: '8'}}
        py="10"
        bg="blue.800"
        rounded="2xl"
        color="white"
        mt="12"
      >
        <Grid
          templateColumns={{base: '1fr', lg: '460px 1fr'}}
          gap={{base: '10', lg: '8'}}
        >
          <Box>
            <Heading as="h3" size="xl" mt="7" lineHeight="shorter">
              Stop wasting time
            </Heading>
            <Text mt="4">
              Many creators and designers waste lots of time asking directly for
              feedback and gathering all the results manually.
            </Text>
            <Button
              colorScheme="blue"
              zIndex="999"
              bg="blue.900"
              transition="0.25s all"
              mt="8"
              rightIcon={<FaArrowRight />}
              size="lg"
              color="white"
              _hover={{
                bg: 'blue.800',
                shadow: 'lg',
              }}
            >
              Get started free
            </Button>
          </Box>
          <Box maxW={{base: 'unset', lg: '37.5rem'}} mx="auto">
            <Testimonial
              name="Robert Preoteasa"
              company="CEO &amp; Founder @ Framey"
              image="https://designvote-storage.fra1.digitaloceanspaces.com/0.jpeg"
            >
              &ldquo;We were wasting too much time getting feedback on our
              mobile app design versions from costumers and colleagues. With
              Designvote we were able to create and share surveys that solved
              this issue immediately.&ldquo;
            </Testimonial>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}
