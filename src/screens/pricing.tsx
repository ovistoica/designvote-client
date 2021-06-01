import {MetaDecorator} from 'components/meta-decorator'
import {
  Box,
  Flex,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import {HiShieldCheck} from 'react-icons/hi'
import {Footer} from 'components/footer'
import {useAuth} from 'context/auth-context'

export function Pricing() {
  const {login} = useAuth()
  return (
    <>
      <Flex
        direction="column"
        pt={{base: '8', md: '16'}}
        w="full"
        as="main"
        justify="center"
        bg={mode('gray.100', 'gray.700')}
      >
        <MetaDecorator
          title="Designvote - pricing"
          description="Designvote pricing plans. Choose your design. Convenient offers for anyone."
        />
        <Box as="section" py="12">
          <Heading
            textAlign="center"
            mx="auto"
            fontSize={['1.6em', '2.2em']}
            my="8"
            maxW="90%"
          >
            Pricing page coming soon. Until then:
          </Heading>
          <Box
            textAlign="center"
            bg={mode('white', 'gray.800')}
            shadow="lg"
            maxW={{base: 'xl', md: '3xl'}}
            mx="auto"
            px={{base: '6', md: '8'}}
            py="12"
            rounded="lg"
          >
            <Box maxW="md" mx="auto">
              <Text
                color={mode('green.600', 'green.400')}
                fontWeight="bold"
                fontSize="sm"
                letterSpacing="wide"
              >
                LIMITED INVITES. JOIN NOW ❤️️
              </Text>
              <Heading mt="4" fontWeight="extrabold">
                Enroll in the beta testing program for lifetime premium access
              </Heading>
              <Box mt="6">
                <form
                  onSubmit={e => {
                    login()
                    // your subscribe logic here
                  }}
                >
                  <Stack>
                    <Input
                      aria-label="Enter your email"
                      placeholder="Enter your email to join"
                      rounded="base"
                    />
                    <Button
                      type="submit"
                      w="full"
                      colorScheme="orange"
                      size="lg"
                      textTransform="uppercase"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      Join now
                    </Button>
                  </Stack>
                </form>
                <Text color={mode('gray.600', 'gray.400')} fontSize="sm" mt="5">
                  <Box
                    aria-hidden
                    as={HiShieldCheck}
                    display="inline-block"
                    marginEnd="2"
                    fontSize="lg"
                    color={mode('green.600', 'green.400')}
                  />
                  No spams. We will contact you with further steps after
                  enrollment
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <Footer /> */}
      </Flex>
      <Footer />
    </>
  )
}
