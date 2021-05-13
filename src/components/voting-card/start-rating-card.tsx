import {useColorModeValue as mode} from '@chakra-ui/color-mode'
import {useToken} from '@chakra-ui/system'
import {getRating, getComment, useVoteDesignState} from 'store/vote-design'
import {withStyles} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import {Box, Flex, Stack, Text} from '@chakra-ui/layout'
import {Image} from '@chakra-ui/image'
import {CommentInput} from 'components/comment-input'

interface RateStarsCardProps {
  versionId: string
  index: number
  imageUrl: string
  onClick: () => void

  /**
   * Prop used if component is in preview mode
   * If set to true, leaving ratings will not have
   * side effects
   */
  inPreview?: boolean
}

export function RateStarsVotingCard({
  versionId,
  index,
  imageUrl,
  onClick,
  inPreview = false,
}: RateStarsCardProps) {
  const textColor = mode('gray.400', 'gray.600')
  const colorHex = useToken('colors', textColor)
  const currentRating = useVoteDesignState(getRating(versionId))
  const currentComment = useVoteDesignState(getComment(versionId))
  const setRating = useVoteDesignState(state => state.setRating)
  const setComment = useVoteDesignState(state => state.setComment)
  const StyledRating = withStyles({
    iconEmpty: {
      color: colorHex,
    },
  })(Rating)

  const onCommentChange = inPreview
    ? (comment: string) => {}
    : (comment: string) => setComment(versionId, comment)

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
        onClick={onClick}
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
            !inPreview && setRating(versionId, rating ?? undefined)
          }}
        />
      </Box>
      <CommentInput onChange={onCommentChange} initialValue={currentComment} />
    </Stack>
  )
}
