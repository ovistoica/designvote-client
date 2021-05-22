import {
  Box,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {FaFileSignature, FaRecycle} from 'react-icons/fa'
import {Feature} from './feature'
import {RiDashboardFill} from 'react-icons/ri'

const phoneImage = require('assets/phone-feature.png')

export const PhoneSection = () => {
  return (
    <Box
      as="section"
      bg={mode('gray.50', 'gray.800')}
      py={{base: '9', md: '16'}}
    >
      <Box maxW={{base: 'xl', md: '8xl'}} mx="auto" px={{base: '6', md: '8'}}>
        <Heading
          letterSpacing="wide"
          textAlign="center"
          fontWeight="semibold"
          display={{base: 'block', md: 'none'}}
        >
          Track the best versions
        </Heading>
        <SimpleGrid
          columns={{base: 1, md: 2}}
          spacing={{base: '16', md: '8', lg: '24'}}
          mt={{base: '10', md: '10', lg: '20'}}
          w="full"
          px={{base: '0', md: '0', lg: '10'}}
        >
          <Flex
            direction="column"
            justify="center"
            order={{base: 2, md: 1}}
            maxW="2xl"
          >
            <Heading
              letterSpacing="wide"
              textAlign="center"
              fontWeight="semibold"
              mb="8"
              display={{base: 'none', md: 'block'}}
            >
              Track the best versions
            </Heading>
            <Feature
              icon={<Box as={FaFileSignature} w="6" h="6" />}
              title="Create surveys fast"
            >
              Create design surveys and immediately share them for your audience
              to give you feedback.
            </Feature>
            <Feature
              icon={<Box as={RiDashboardFill} w="6" h="6" />}
              title="Keep everything in the dashboard"
            >
              All your finished surveys are kept your dashboard for future
              refference.
            </Feature>
            <Feature
              icon={<Box as={FaRecycle} w="6" h="6" />}
              title="Iterate based on feedback"
            >
              Choose the best received features to create your final result.
            </Feature>
          </Flex>
          <Flex
            order={{base: 1, md: 2}}
            justify={{base: 'center', md: 'flex-end'}}
            alignSelf={{base: 'center', md: 'flex-end'}}
            alignItems="center"
            h="full"
          >
            <Img
              shadow="full"
              rounded="lg"
              objectFit="cover"
              maxW={{base: '320px', md: '320px', lg: '350px'}}
              h="auto"
              src={phoneImage}
              alt="Holding phone with app installed"
              p={{base: '0', md: '2'}}
            />
          </Flex>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
