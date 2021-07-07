import {Box, Flex, GridItem, SimpleGrid, Text} from '@chakra-ui/react'
import {DesignCard, DesignInfo, VotesCount} from 'components/design-card'
import {FullPageSpinner} from 'components/lib'
import {Poll} from 'types'
import {usePolls} from 'utils/design-query'

import {CreateDesignCard} from './create-design-card'
import {NoDesigns} from './no-designs'
import {useRouter} from 'next/router'
import {AppContainer} from 'components/app-container'

function HomePage() {
  const {push: navigate} = useRouter()
  const {data: polls, isLoading} = usePolls()

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <AppContainer>
      {/* TODO Add NEXT JS HEAD */}
      {/* <MetaDecorator */}
      {/*  title="Designvote - Dashboard" */}
      {/*  description="Dashboard containing all of your designs.
      Share a design for people to vote." */}
      {/* /> */}
      <Box as="section" maxW={{base: 'full', md: '3xl'}} px={{base: 4, md: 0}}>
        <Flex alignItems="center" flex="0">
          <Text fontSize="xl" fontWeight="500">
            Designs
          </Text>
        </Flex>
        {polls.length ? (
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
            {polls.map((poll: Poll) => {
              const {name, description, totalVotes, voteStyle, pollId} = poll
              const onClick = () => navigate(`/poll/${pollId}`)
              return (
                <GridItem>
                  <DesignCard key={name} designId={pollId} onClick={onClick}>
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
