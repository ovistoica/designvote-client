import {
  HStack,
  Icon,
  StackProps,
  useColorModeValue,
  Text,
} from '@chakra-ui/react'
import {HiCheck, HiStar} from 'react-icons/hi'
import {VoteStyle} from 'types'

interface FollowerCountProps extends StackProps {
  count: number
  voteStyle: VoteStyle
}

export const VotesCount = (props: FollowerCountProps) => {
  const {count, voteStyle, ...stackProps} = props
  const icon = voteStyle === VoteStyle.Choose ? HiCheck : HiStar

  return (
    <HStack
      spacing="1"
      fontSize="sm"
      color={useColorModeValue('gray.600', 'gray.300')}
      {...stackProps}
    >
      <Icon as={icon} color={useColorModeValue('orange.500', 'orange.300')} />
      <Text>
        {count} {voteStyle === VoteStyle.Choose ? 'votes' : 'ratings'}
      </Text>
    </HStack>
  )
}
