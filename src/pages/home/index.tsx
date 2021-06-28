import {Box, Flex, GridItem, SimpleGrid, Text} from '@chakra-ui/react'
import {DesignCard, DesignInfo, VotesCount} from 'components/design-card'
import {FullPageSpinner} from 'components/lib'
import {MetaDecorator} from 'components/meta-decorator'
import {Design} from 'types'
import {useDesigns} from 'utils/design-query'

import {CreateDesignCard} from './create-design-card'
import {NoDesigns} from './no-designs'
import {useRouter} from 'next/router'
import {AppContainer} from 'components/app-container'

function HomePage() {
  const {push: navigate} = useRouter()
  const {data: designs, isLoading} = useDesigns()

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <AppContainer>
      <MetaDecorator
        title="Designvote - Dashboard"
        description="Dashboard containing all of your designs. Share a design for people to vote."
      />
      <Box as="section" maxW={{base: 'full', md: '3xl'}} px={{base: 4, md: 0}}>
        <Flex alignItems="center" flex="0">
          <Text fontSize="xl" fontWeight="500">
            Designs
          </Text>
        </Flex>
        {designs.length ? (
          <SimpleGrid
            columns={{base: 2, md: 3}}
            spacing={{base: '4', md: '4', lg: '6'}}
            mt="4"
            p="1"
            maxW="xl"
            pb="4"
          >
            <GridItem>
              <CreateDesignCard />
            </GridItem>
            {designs.map((design: Design) => {
              const {
                name,
                description,
                totalVotes,
                voteStyle,
                designId,
              } = design
              const onClick = () => navigate(`/design/${designId}`)
              return (
                <GridItem>
                  <DesignCard key={name} designId={designId} onClick={onClick}>
                    <DesignInfo mt="3" name={name} description={description} />
                    <VotesCount
                      my="4"
                      count={totalVotes}
                      voteStyle={voteStyle}
                    />
                  </DesignCard>
                </GridItem>
              )
            })}
          </SimpleGrid>
        ) : (
          <NoDesigns onClick={() => navigate('/create')} />
        )}
      </Box>
    </AppContainer>
  )
}

export default HomePage
