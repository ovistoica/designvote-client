import {
  Box,
  Flex,
  Image,
  Progress,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

export interface StatCardProps {
  id: string
  title: string
  value: number
  limit: number
  imageUrl: string
  formattedData?: {
    value: string
    limit: string
  }
}

export const StatCard = (props: StatCardProps) => {
  const {id, title, limit, value, formattedData, imageUrl} = props

  const _value = formattedData?.value ?? value
  const _limit = formattedData?.limit ?? limit

  return (
    <Flex
      direction="column"
      bg={mode('white', 'gray.700')}
      rounded="md"
      overflow="hidden"
      shadow="base"
    >
      <Box d={id} srOnly>
        {value} out of {limit} {title} used
      </Box>
      <Image
        alignSelf="center"
        src={imageUrl}
        boxSize={{base: 'xs', md: '2xs'}}
        objectFit="contain"
        align="center"
        p="5"
      />
      <Box
        flex="1"
        as="dl"
        px={{base: '4', lg: '8'}}
        py="4"
        color={mode('gray.500', 'gray.400')}
      >
        <Text as="dt" fontSize="sm" fontWeight="medium">
          {title}
        </Text>
        <Stack
          direction="row"
          as="dd"
          mt="2"
          align="flex-end"
          textTransform="uppercase"
        >
          <Box
            fontSize={{base: '2xl', lg: '3xl'}}
            as="span"
            fontWeight="bold"
            color={mode('gray.800', 'white')}
            lineHeight="1"
          >
            {_value}
          </Box>
          <Flex fontWeight="semibold">
            <Box as="span" aria-hidden>
              /
            </Box>
            <Box srOnly>out of</Box>
            <Text ps="1">{_limit} </Text>
          </Flex>
        </Stack>
      </Box>
      <Progress
        aria-labelledby={id}
        value={value}
        max={limit}
        min={0}
        size="xs"
        colorScheme="blue"
      />
    </Flex>
  )
}
