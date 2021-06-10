import {Box, Flex, GridItem, SimpleGrid, Text} from '@chakra-ui/react'
import {useDesigns} from 'utils/design-query'
import {useNavigate} from 'react-router-dom'
import {FullPageSpinner} from 'components/lib'
import {MetaDecorator} from 'components/meta-decorator'
import {Design} from 'types'
import {DesignCard, DesignInfo, VotesCount} from 'components/design-card'
import {NoDesigns} from './no-designs'
import {CreateDesignCard} from './create-design-card'
import React from 'react'

export function HomeScreen() {
  const navigate = useNavigate()
  const {data: designs, isLoading} = useDesigns()

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <>
      <MetaDecorator
        title="Designvote - Dashboard"
        description="Dashboard containing all of your designs. Share a design for people to vote."
      >
        {process.env.NODE_ENV === 'production' ? (
          <>
            {' '}
            <script type="text/javascript">
              {` var clickmagick_cmc = {
        uid: '145419',
        hid: '1945973',
        cmc_goal: 'a',
        cmc_ref: 'signup',
     }`}
            </script>
            <script src="//cdn.clkmc.com/cmc.js" />{' '}
          </>
        ) : null}
      </MetaDecorator>
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
    </>
  )
}
