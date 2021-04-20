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
import {Vote, VoteStyle} from 'types'
import {getAverageRating, getVotePercent} from 'utils/votes'
import Rating from '@material-ui/lab/Rating'

export interface StatCardProps {
  id: string
  title: string
  imageUrl: string
  votes: Vote[]
  totalVotes: number
  voteStyle: VoteStyle
}

type SpecificVoteStyleCardProps = Omit<StatCardProps, 'voteStyle'>

function StarsRatingCard(props: SpecificVoteStyleCardProps) {
  const {id, title, imageUrl, votes} = props
  const averageRating = getAverageRating(votes)

  return (
    <Flex
      direction="column"
      bg={mode('white', 'gray.700')}
      rounded="md"
      overflow="hidden"
      shadow="base"
    >
      <Box d={id} srOnly>
        {votes.length} total ratings given
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
            {averageRating}
          </Box>
          <Flex fontWeight="semibold">
            <Box as="span" aria-hidden>
              /
            </Box>
            <Box srOnly>out of</Box>
            <Text ps="1">5 average rating</Text>
          </Flex>
        </Stack>
        <Rating
          value={averageRating}
          size="medium"
          precision={0.01}
          style={{marginTop: '.5em'}}
          readOnly
        />
        <Text ps="1">{votes.length} ratings given</Text>
      </Box>
    </Flex>
  )
}

function ChooseBestRatingCard(props: SpecificVoteStyleCardProps) {
  const {id, title, imageUrl, votes, totalVotes} = props

  return (
    <Flex
      direction="column"
      bg={mode('white', 'gray.700')}
      rounded="md"
      overflow="hidden"
      shadow="base"
    >
      <Box d={id} srOnly>
        {votes.length} out of {totalVotes} {title}
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
          w="100%"
        >
          <Stack
            direction="row"
            as="dd"
            mt="2"
            align="flex-end"
            textTransform="uppercase"
            w="100%"
          >
            <Box
              fontSize={{base: '2xl', lg: '3xl'}}
              as="span"
              fontWeight="bold"
              color={mode('gray.800', 'white')}
              lineHeight="1"
            >
              {votes.length}
            </Box>
            <Flex fontWeight="semibold">
              <Box as="span" aria-hidden>
                /
              </Box>
              <Box srOnly>out of</Box>
              <Text ps="1">{totalVotes} votes</Text>
            </Flex>
          </Stack>
          <Text
            fontSize={{base: '2xl', lg: '3xl'}}
            as="span"
            fontWeight="bold"
            color={mode('gray.600', 'white')}
            lineHeight="1"
          >
            {getVotePercent(totalVotes, votes.length)}%
          </Text>
        </Stack>
      </Box>
      <Progress
        aria-labelledby={id}
        value={votes.length}
        max={totalVotes}
        min={0}
        size="xs"
        colorScheme="blue"
      />
    </Flex>
  )
}

export const StatCard = (props: StatCardProps) => {
  const {voteStyle, ...restProps} = props

  if (voteStyle === VoteStyle.FiveStar) {
    return <StarsRatingCard {...restProps} />
  }

  return <ChooseBestRatingCard {...restProps} />
}
