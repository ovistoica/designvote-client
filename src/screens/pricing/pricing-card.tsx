import {
  Box,
  BoxProps,
  Flex,
  LightMode,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import * as React from 'react'

interface PricingCardProps extends BoxProps {
  button: React.ReactElement
  data: {
    name: string
    description: string
    price: number
    amountSaved?: number | string
    duration: 'monthly' | 'yearly'
    benefits: string[]
    yearlyAmount: number
  }
}

const BillingBadge = (props: BoxProps) => (
  <Box
    rounded="full"
    fontSize="sm"
    bg="white"
    color="gray.900"
    px="3"
    py="1"
    pos="absolute"
    top="4"
    right="4"
    fontWeight="bold"
    {...props}
  />
)

export const PricingCard = (props: PricingCardProps) => {
  const {button, data, ...rest} = props
  const {
    name,
    description,
    price,
    amountSaved,
    duration,
    yearlyAmount,
    benefits,
  } = data
  const isFree = price === 0

  return (
    <Flex
      direction="column"
      px="6"
      py="8"
      rounded="lg"
      pos="relative"
      maxW="2xl"
      mx="auto"
      {...rest}
    >
      <Box flex="1">
        {!isFree && (
          <BillingBadge>
            {duration === 'monthly' ? 'Billed monthly' : `Save ${amountSaved}`}
          </BillingBadge>
        )}
        <Text fontSize="2xl" lineHeight="1" fontWeight="bold">
          {name}
        </Text>
        <Flex align="center" fontWeight="extrabold" mt="4" mb="3">
          <Text
            fontSize={{base: '6xl', xl: '7xl'}}
            lineHeight="1"
            flexShrink={0}
          >
            ${price}
          </Text>
        </Flex>
        <Box>{isFree ? <>&nbsp;</> : `$${yearlyAmount} billed annually`}</Box>
        <Box mt="6">
          <Text fontSize="xl" fontWeight="semibold" mb="6">
            {description}
          </Text>
          <UnorderedList spacing="3">
            {benefits.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Box>
      <Box mt="10">
        <LightMode>{button}</LightMode>
      </Box>
    </Flex>
  )
}
