import {useColorModeValue} from '@chakra-ui/color-mode'
import {Flex, Stack, Text} from '@chakra-ui/layout'
import {Progress} from '@chakra-ui/progress'
import {Check} from 'assets/icons'
import {getVotePercent} from 'utils/votes'

interface VersionHeaderProps {
  totalVotes: number
  votes: string[]
  name: string
}

export function VersionHeader({totalVotes, votes, name}: VersionHeaderProps) {
  const headerBg = useColorModeValue('white', 'gray.700')
  const votePercent = getVotePercent(totalVotes, votes.length)
  return (
    <Flex
      h="5em"
      w="100%"
      bg={headerBg}
      align="center"
      p="1em"
      borderTopRightRadius="0.5em"
      borderTopLeftRadius="0.5em"
    >
      <Check />
      <Flex direction="column" pl="1em" w="100%">
        <Stack direction="row" align="center" justify="space-between">
          <Flex direction="column">
            <Text textTransform="uppercase" fontSize="0.95rem" mb="0">
              {name}
            </Text>
            <Text color="info" fontSize="0.8rem">
              {votes.length} votes
            </Text>
          </Flex>
          <Text fontSize="xl" color="teal.500" fontWeight="bold">
            {votePercent}%
          </Text>
        </Stack>
        <Progress
          value={votePercent}
          borderRadius="20em"
          h="0.3em"
          background="teal.200"
          colorScheme="teal"
        />
      </Flex>
    </Flex>
  )
}

export function SmallVersionHeader({
  totalVotes,
  votes,
  name,
}: VersionHeaderProps) {
  const headerBg = useColorModeValue('white', 'gray.700')
  const votePercent = getVotePercent(totalVotes, votes.length)
  return (
    <Flex
      bg={headerBg}
      align="center"
      borderTopRightRadius="0.5em"
      borderTopLeftRadius="0.5em"
    >
      <Check width="1em" height="1em" />
      <Flex direction="column" pl="0.5em" w="100%">
        <Stack direction="row" align="center" justify="space-between">
          <Flex direction="column">
            <Text textTransform="uppercase" fontSize="xxs" mb="0">
              {name}
            </Text>
            <Text color="info" fontSize="sm">
              {votes.length} votes
            </Text>
          </Flex>
          <Text fontSize="sm" color="teal.500" fontWeight="bold">
            {votePercent}%
          </Text>
        </Stack>
        <Progress
          value={votePercent}
          borderRadius="20em"
          h="0.1em"
          colorScheme="teal"
        />
      </Flex>
    </Flex>
  )
}
