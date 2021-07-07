import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {MetaDecorator} from 'components/meta-decorator'
import {PricingCard} from './pricing-card'
import {Footer} from 'components/footer'

const MontlyCard = () => (
  <PricingCard
    bg="gray.700"
    color="white"
    button={
      <Button w="full" h="16" colorScheme="orange" size="lg">
        Add to cart
      </Button>
    }
    data={{
      name: 'Monthly',
      description: 'At erat pellentesque adipiscing commodo elit at imperdiet.',
      price: 6.99,
      yearlyAmount: 84,
      duration: 'monthly',
      benefits: [
        'Unlimited design surveys',
        'Unlimited comments on surveys',
        'Full access to all features',
        '24h Excellent Support',
      ],
    }}
  />
)

const YearlyCard = () => (
  <PricingCard
    bg="orange.600"
    color="white"
    button={
      <Button w="full" color="revert" h="16" size="lg">
        Add to cart
      </Button>
    }
    data={{
      name: 'Yearly',
      description: 'Proin sagittis nisl rhoncus mattis rhoncus urna neque.',
      price: 60,
      duration: 'yearly',
      amountSaved: '30%',
      yearlyAmount: 60,
      benefits: [
        'Unlimited design surveys',
        'Unlimited comments on surveys',
        'Full access to all features',
        '24h Excellent Support',
      ],
    }}
  />
)

export const PricingScreen = () => (
  <Box as="section" bg={useColorModeValue('gray.50', 'gray.800')} py="24">
    <MetaDecorator
      title="Designvote - pricing"
      description="Designvote pricing plans. Choose your design. Convenient offers for anyone."
    />
    <Flex
      direction="column"
      justify="center"
      maxW={{base: 'xl', md: '7xl'}}
      mx="auto"
      px={{base: '6', md: '8'}}
    >
      <Heading
        size="3xl"
        lineHeight="normal"
        color={useColorModeValue('orange.500', 'orange.400')}
        letterSpacing="tight"
        fontWeight="extrabold"
        textAlign="center"
      >
        Ready to Get Started?
      </Heading>
      <Text
        fontSize={{base: 'xl', lg: '2xl'}}
        mt="4"
        maxW="2xl"
        alignSelf="center"
        textAlign="center"
      >
        Jumpstart your feedback requirements with Designvote. Choose the best
        plan for your needs!
      </Text>
      <SimpleGrid mt="10" columns={{base: 1, lg: 3}} spacing="10">
        <PricingCard
          bg="gray.700"
          color="white"
          button={
            <Button w="full" size="lg" h="16" colorScheme="orange">
              Start for Free
            </Button>
          }
          data={{
            name: 'Free',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            yearlyAmount: 0,
            price: 0,
            duration: 'monthly',
            benefits: [
              'No credit card needed',
              'Create 2 design surveys for free',
              'Up to ten comments from users',
            ],
          }}
        />
        <MontlyCard />
        <YearlyCard />
      </SimpleGrid>
    </Flex>
    <Footer />
  </Box>
)
