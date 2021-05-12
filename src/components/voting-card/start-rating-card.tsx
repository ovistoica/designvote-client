import {useColorModeValue as mode} from '@chakra-ui/color-mode'
import {VoteFunction} from 'utils/design-query'
import {useToken} from '@chakra-ui/system'
import {useVoterId} from 'utils/votes'
import {getRating, getComment, useVoteDesignState} from 'store/vote-design'
import {withStyles} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import {Box, Flex, Stack, Text} from '@chakra-ui/layout'
import {Image} from '@chakra-ui/image'
import {NormalizedDesign} from 'types'
import {CommentInput} from 'components/comment-input'

interface RateStarsCardProps {
  versionId: string
  index: number
  onVote: VoteFunction
  designData: NormalizedDesign
}

export function RateStarsVotingCard({
  versionId,
  index,
  onVote,
  designData,
}: RateStarsCardProps) {
  const {versions, pictures, design} = designData
  const {
    pictures: [picId],
  } = versions[versionId]
  const {uri: imageUrl} = pictures[picId]
  const textColor = mode('gray.400', 'gray.600')
  const colorHex = useToken('colors', textColor)
  const voterId = useVoterId()
  const currentRating = useVoteDesignState(getRating(versionId))
  const currentComment = useVoteDesignState(getComment(versionId))
  const setRating = useVoteDesignState(state => state.setRating)
  const setComment = useVoteDesignState(state => state.setComment)
  const StyledRating = withStyles({
    iconEmpty: {
      color: colorHex,
    },
  })(Rating)

  return (
    <Stack spacing={1}>
      <Text
        alignSelf="flex-start"
        ml={2}
        color={mode('gray.500', 'gray.300')}
        fontSize="xl"
      >
        #{index + 1}
      </Text>
      <Flex
        py={1}
        key={imageUrl}
        direction="column"
        position="relative"
        bg={mode('inherit', 'gray.700')}
        flex="0"
        boxShadow="base"
        role="group"
        transition="0.25s all"
        cursor="zoom-in"
        _hover={{
          boxShadow: '2xl',
          bg: mode('inherit', 'gray.600'),
        }}
        alignItems="center"
      >
        <Image
          src={imageUrl}
          objectFit="contain"
          boxSize="15em"
          align="center"
        />
      </Flex>
      <Box pl={2}>
        <StyledRating
          name={`rating for ${versionId}`}
          precision={0.5}
          defaultValue={currentRating ?? 0}
          size="large"
          onChange={(e, rating) => {
            onVote({versionId, rating, voterId, voteStyle: design.voteStyle})
            setRating(versionId, rating ?? undefined)
          }}
        />
      </Box>
      <CommentInput
        onChange={comment => setComment(versionId, comment)}
        initialValue={currentComment}
      />
    </Stack>
  )
}
