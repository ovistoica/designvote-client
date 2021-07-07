import {Box, SimpleGrid, useColorModeValue as mode} from '@chakra-ui/react'
import {usePoll} from 'utils/design-query'

import {StatCard} from '../components/result-stat-card'

interface ResultsTabProps {
  designId: string
}

export function ResultsTab({designId}: ResultsTabProps) {
  const {
    data: {poll, versions},
  } = usePoll(designId)

  return (
    <Box
      as="section"
      bg={mode('gray.50', 'gray.800')}
      py={{base: '2', md: '8'}}
    >
      <Box mx="auto" px={{base: '3'}}>
        <SimpleGrid
          columns={{base: 1, md: 2, lg: 3}}
          spacing={{base: '4', md: '8'}}
          w="full"
        >
          {poll.versions
            .sort((a, b) => {
              const {name: nameA} = versions[a]
              const {name: nameB} = versions[b]
              if (nameA === nameB) {
                return 0
              }
              return nameA > nameB ? 1 : -1
            })
            .map((vId, index) => {
              const version = versions[vId]
              const title = `Version #${index + 1} votes`

              return (
                <StatCard
                  id={title}
                  key={`resultCard${vId}`}
                  votes={version.votes}
                  totalVotes={poll.totalVotes}
                  voteStyle={poll.voteStyle}
                  title={title}
                  imageUrl={version.img}
                  designId={poll.pollId}
                  versionId={vId}
                  numberOfOpinions={0} // TODO FIX THIS
                />
              )
            })}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
