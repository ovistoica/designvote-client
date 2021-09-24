import {Box, SimpleGrid} from '@chakra-ui/layout'
import {useColorModeValue as mode} from '@chakra-ui/react'
import {useDesign} from 'utils/design-query'
import {StatCard} from '../components/result-stat-card'

interface ResultsTabProps {
  designId: string
}

export function ResultsTab({designId}: ResultsTabProps) {
  const {data: design} = useDesign(designId)

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
          {design.versions
            .sort((a, b) => {
              const {name: nameA} = a
              const {name: nameB} = b
              if (nameA === nameB) {
                return 0
              }
              return nameA > nameB ? 1 : -1
            })
            .map((v, index) => {
              const title = `Version #${index + 1} votes`
              const {imageUrl, opinions, versionId, votes} = v
              const numberOfOpinions = opinions.length

              return (
                <StatCard
                  id={title}
                  key={`resultCard${versionId}`}
                  votes={votes}
                  totalVotes={design.totalVotes}
                  voteStyle={design.voteStyle}
                  title={title}
                  imageUrl={imageUrl}
                  designId={design.designId}
                  versionId={versionId}
                  numberOfOpinions={numberOfOpinions}
                />
              )
            })}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
