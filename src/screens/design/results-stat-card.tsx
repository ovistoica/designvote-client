import {
  Box,
  Flex,
  Image,
  Progress,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
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
  designId: string
  versionId: string
  numberOfOpinions?: number
  onClick: () => void
}

type SpecificVoteStyleCardProps = Omit<
  StatCardProps,
  'voteStyle' | 'designId' | 'versionId'
> & {onClick: () => void}

function StarsRatingCard(props: SpecificVoteStyleCardProps) {
  const {id, title, imageUrl, votes, onClick} = props
  const averageRating = getAverageRating(votes)
  const ratingsGivenText = `${votes.length} rating${
    votes.length !== 1 ? 's' : ''
  } given`

  return (
    <Flex
      direction="column"
      bg={mode('white', 'gray.700')}
      rounded="md"
      overflow="hidden"
      shadow="base"
      cursor="pointer"
      transition="0.25s all"
      _hover={{
        shadow: 'xl',
      }}
      onClick={onClick}
      pt="4"
    >
      <Box d={id} srOnly>
        {votes.length} total ratings given
      </Box>
      <Image
        alignSelf="center"
        src={imageUrl}
        boxSize={{base: '2xs', md: '2xs'}}
        objectFit="contain"
        align="center"
        // p="5"
      />
      <Box
        flex="1"
        as="dl"
        px={{base: '4', lg: '8'}}
        py="2"
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
            <Text ps="1">5 rating</Text>
          </Flex>
        </Stack>
        <Rating
          value={averageRating}
          size="medium"
          precision={0.1}
          style={{marginTop: '.5em'}}
          readOnly
        />
        <Flex px="1" align="center" justify="space-between">
          <Text>{ratingsGivenText}</Text>
        </Flex>
      </Box>
    </Flex>
  )
}

function ChooseBestRatingCard(props: SpecificVoteStyleCardProps) {
  const {id, title, imageUrl, votes, totalVotes, onClick} = props

  return (
    <Flex
      direction="column"
      bg={mode('white', 'gray.700')}
      rounded="md"
      overflow="hidden"
      shadow="base"
      cursor="pointer"
      onClick={onClick}
      transition="0.25s all"
      _hover={{
        shadow: 'xl',
      }}
    >
      <Box d={id} srOnly>
        {votes.length} out of {totalVotes} {title}
      </Box>
      <Image
        alignSelf="center"
        src={imageUrl}
        boxSize={{base: 'xs', md: 'sm'}}
        objectFit="contain"
        align="center"
        m="2"
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
        </Stack>
        <Flex align="center" justify="space-between" mt="2">
          <Text
            fontSize={{base: 'xl', lg: '3xl'}}
            fontWeight="bold"
            color={mode('gray.600', 'white')}
            lineHeight="1"
          >
            {getVotePercent(totalVotes, votes.length)}%
          </Text>
        </Flex>
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
  const {voteStyle, designId, versionId, onClick, ...restProps} = props

  return (
    <>
      {voteStyle === VoteStyle.FiveStar ? (
        <StarsRatingCard {...restProps} onClick={onClick} />
      ) : (
        <ChooseBestRatingCard {...restProps} onClick={onClick} />
      )}
    </>
  )
}
