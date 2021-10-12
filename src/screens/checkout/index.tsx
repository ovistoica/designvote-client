import * as React from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {PriceDuration} from 'types'
import {PricingSwitch} from 'components/pricing-switch'
import {PricingCard} from './pricing-card'
import {AuthenticatedNavBar} from 'components/nav-bar'
import {Footer} from 'components/footer'
import {HiLockClosed} from 'react-icons/hi'
import {createCheckoutSession} from 'api/payment-query'
import {useStripe} from '@stripe/react-stripe-js'
import {useState} from 'react'

interface FAQProps {
  question: string
  answer: string
}
const FAQ = ({question, answer}: FAQProps) => {
  return (
    <Flex
      direction="column"
      rounded="xl"
      my="4"
      bg={mode('white', 'gray.700')}
      w="100%"
      p="4"
      maxW="60em"
    >
      <Text fontSize="xl" fontWeight="bold" py="1">
        {question}
      </Text>
      <Text>{answer}</Text>
    </Flex>
  )
}

const MonthlyCard = ({onClick}: {onClick?: () => void}) => {
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()

  const handleClick = () => {
    setIsLoading(true)
    createCheckoutSession({
      success_url: `${document.location.origin}/home?payment_success=true`,
      cancel_url: `${document.location.origin}/home?payment_failure=true`,
      duration: 'monthly',
    }).then(async session => {
      if (session.status === 200) {
        await stripe?.redirectToCheckout({sessionId: session.id})
      }
    })
  }

  return (
    <PricingCard
      flex="1"
      colorScheme="orange"
      name="Premium"
      description="The full designvote experience"
      price="$8"
      duration="Per month"
      extras=""
      onClick={onClick}
      button={
        <Button
          my="8"
          size="lg"
          isLoading={isLoading}
          fontSize="md"
          colorScheme="orange"
          onClick={handleClick}
          leftIcon={<HiLockClosed />}
        >
          Continue to checkout
        </Button>
      }
      features={[
        'Unlimited design surveys',
        'Unlimited ratings',
        'Social sharing & email templates',
        '24/7 Excellent customer support',
      ]}
    />
  )
}
const YearlyCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()

  const handleClick = () => {
    setIsLoading(true)
    createCheckoutSession({
      success_url: `${document.location.origin}/home?payment_success=true`,
      cancel_url: `${document.location.origin}/home?payment_failure=true`,
      duration: 'yearly',
    }).then(async session => {
      if (session.status === 200) {
        await stripe?.redirectToCheckout({sessionId: session.id})
      }
    })
  }
  return (
    <PricingCard
      flex="1"
      colorScheme="orange"
      name="Premium"
      description="The full designvote experience"
      price={`$${Math.floor(75 / 12)}`}
      duration="Per month"
      extras=""
      button={
        <Button
          my="8"
          size="lg"
          isLoading={isLoading}
          fontSize="md"
          colorScheme="orange"
          onClick={handleClick}
          leftIcon={<HiLockClosed />}
        >
          Continue to checkout
        </Button>
      }
      features={[
        'Unlimited design surveys',
        'Unlimited ratings',
        'Social sharing & email templates',
        '24/7 Excellent customer support',
      ]}
    />
  )
}

export const CheckoutScreen = () => {
  const [duration, setDuration] = React.useState<PriceDuration>(
    PriceDuration.Monthly,
  )
  return (
    <>
      <AuthenticatedNavBar />
      <Box as="section" bg={mode('gray.100', 'gray.800')} py="24">
        <Box maxW={{base: 'xl', md: '5xl'}} mx="auto" px={{base: '6', md: '8'}}>
          <Flex
            direction="column"
            align={{base: 'flex-start', md: 'center'}}
            maxW="2xl"
            mx="auto"
          >
            <Heading
              as="h1"
              size="2xl"
              letterSpacing="tight"
              fontWeight="extrabold"
              textAlign={{base: 'start', md: 'center'}}
            >
              Upgrade your plan
            </Heading>
            <Text
              mt="4"
              fontSize="xl"
              textAlign={{base: 'left', md: 'center'}}
              color={mode('gray.600', 'gray.400')}
            >
              Upgrade your feedback with Designvote
            </Text>
            <PricingSwitch
              value={duration}
              onValueChange={setDuration}
              mt="10"
            />
          </Flex>

          <Flex
            direction={{base: 'column', lg: 'row'}}
            maxW={{base: '560px', lg: 'unset'}}
            mx="auto"
            mt="10"
            bg={mode('white', 'gray.700')}
            rounded="xl"
          >
            <PricingCard
              flex="1"
              colorScheme="gray"
              name="Free"
              description="Suited for people who just want some fast feedback"
              price="$0"
              duration="per month"
              extras=""
              features={[
                '2 design surveys',
                'Unlimited ratings',
                'Unlimited comments',
              ]}
              button={
                <Button my="8" size="lg" fontSize="md" disabled>
                  Your current plan
                </Button>
              }
            />
            <Box
              w={{base: 'unset', lg: '1px'}}
              minH="0"
              h={{base: '1px', lg: 'unset'}}
              bg={mode('gray.100', 'gray.600')}
            />
            {duration === PriceDuration.Monthly ? (
              <MonthlyCard />
            ) : (
              <YearlyCard />
            )}
          </Flex>
        </Box>
        <Flex
          direction="column"
          alignItems="center"
          mt="10"
          px="12"
          py="10"
          rounded="xl"
        >
          <Heading as="h4" py="10">
            Frequently Asked Questions
          </Heading>
          <FAQ
            question="Can I get a refund?"
            answer="Sure! We're offering a 7 days 100% refund window if you don't like what you see."
          />
          <FAQ
            question="Can you send me an invoice?"
            answer="Yes. In the order confirmation email, you'll be able to generate an invoice automatically."
          />
          <FAQ
            question="How do you process payment?"
            answer="We use Stripe to process our subscriptions."
          />
        </Flex>
      </Box>
      <Footer />
    </>
  )
}
