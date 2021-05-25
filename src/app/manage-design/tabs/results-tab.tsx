import {Box, SimpleGrid, useColorModeValue as mode} from '@chakra-ui/react'
import {useDesign} from 'utils/design-query'

import {StatCard} from '../components/result-stat-card'

interface ResultsTabProps {
  designId: string
}

export function ResultsTab({designId}: ResultsTabProps) {
  const {
    data: {design, versions, pictures},
  } = useDesign(designId)

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
              const [picId] = version.pictures
              const {uri: imageUrl} = pictures[picId]
              const numberOfOpinions = version.opinions.length

              return (
                <StatCard
                  id={title}
                  key={`resultCard${vId}`}
                  votes={version.votes}
                  totalVotes={design.totalVotes}
                  voteStyle={design.voteStyle}
                  title={title}
                  imageUrl={imageUrl}
                  designId={design.designId}
                  versionId={vId}
                  numberOfOpinions={numberOfOpinions}
                />
              )
            })}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
