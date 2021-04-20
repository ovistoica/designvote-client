import {Box, Flex, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import {Button, useColorModeValue as mode} from '@chakra-ui/react'
import {FullPageSpinner} from 'components/lib'
import * as React from 'react'
import {useParams} from 'react-router'
import {useUrlDesign, useVoteDesignVersion} from 'utils/design-query'
import {VotingCard} from '../../components/voting-card'

export function PublicVoteScreen() {
  const {shortUrl} = useParams()
  const {data, isLoading} = useUrlDesign(shortUrl)
  const {design} = data
  const {mutate: vote} = useVoteDesignVersion(design.designId)

  const bg = mode('gray.50', 'gray.800')

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      minH="100vh"
      pt={{base: '5em', md: '5em'}}
    >
      <Box as="section" bg={bg}>
        <Flex
          direction="column"
          align="center"
          maxW={{base: 'xl', md: '7xl'}}
          mx="auto"
          px={{base: '3', md: '8'}}
        >
          <Stack mb="2em" w="100%" align="center">
            <Heading textAlign="center">{design.question}</Heading>
            {design.description ? (
              <Text
                fontWeight="300"
                fontSize="xl"
                w={{base: '100%', lg: '75%'}}
                textAlign="center"
              >
                {design.description}
              </Text>
            ) : null}
          </Stack>

          <SimpleGrid
            columns={{base: 1, md: 2, lg: 3}}
            spacing={{base: '2', md: '8', lg: '8'}}
            rowGap={{base: 8, md: 8, lg: 8}}
            alignItems="center"
          >
            {design.versions.map((vId, index) => {
              return (
                <VotingCard
                  index={index}
                  key={`designVersion${vId}`}
                  versionId={vId}
                  voteStyle={design.voteStyle}
                  designData={data}
                  onVote={vote}
                />
              )
            })}
          </SimpleGrid>
          <Button colorScheme="brand" w={{base: '100%', md: '15em'}} m={8}>
            Finish
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}
