import {Box, SimpleGrid} from '@chakra-ui/layout'
import {useColorModeValue as mode} from '@chakra-ui/react'
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
    <Box as="section" bg={mode('gray.50', 'gray.800')} p="8">
      <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '3', md: '8'}}>
        <SimpleGrid
          columns={{base: 1, md: 3}}
          spacing={{base: '2', md: '4', lg: '8'}}
        >
          {design.versions.map((vId, index) => {
            const version = versions[vId]
            const value = version.votes.length
            const limit = design.totalVotes
            const title = `Version #${index + 1} votes`
            const [picId] = version.pictures
            const {uri: imageUrl} = pictures[picId]

            return (
              <StatCard
                id={title}
                key={`resultCard${vId}`}
                value={value}
                limit={limit}
                title={title}
                imageUrl={imageUrl}
              />
            )
          })}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
