import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
// import {useAuth} from 'context/auth-context'

export const CTASection = () => (
  <Center
    as="section"
    bg={mode('gray.100', 'gray.700')}
    h={{base: 'auto', md: '3xl', lg: '2xl'}}
  >
    <Box
      maxW="3xl"
      mx="auto"
      px={{base: '6', lg: '8'}}
      py={{base: '16', sm: '20'}}
      textAlign="center"
    >
      {/* <Text fontWeight="semibold" color={mode('orange.500', 'blue.300')}>
          Prices now start at just $23/month
        </Text> */}
      <Heading
        my="4"
        as="h2"
        fontSize={{base: '4xl', md: '6xl'}}
        fontWeight="extrabold"
        letterSpacing="tight"
        lineHeight="1.2"
      >
        Finish your designs faster with{' '}
        <Box
          as="mark"
          bg="unset"
          color={mode('orange.500', 'orange.300')}
          whiteSpace="nowrap"
        >
          Designvote
        </Box>
      </Heading>
      <Text fontSize="lg" maxW="xl" mx="auto">
        Stop guessing what your users want and start asking them directly.
      </Text>
      <Stack
        direction={{base: 'column', sm: 'row'}}
        mt="10"
        justify="center"
        spacing={{base: '3', md: '5'}}
        maxW="md"
        mx="auto"
      >
        <Button
          size="lg"
          h="16"
          px="10"
          colorScheme="orange"
          fontWeight="bold"
          flex={{md: '1'}}
          // onClick={login}
        >
          Get started free
        </Button>
      </Stack>
    </Box>
  </Center>
)
