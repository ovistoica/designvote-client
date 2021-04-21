import * as React from 'react'
import {Button} from '@chakra-ui/button'
import {useColorModeValue as mode} from '@chakra-ui/react'
import {Box, Flex, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import {useManageDesign} from 'store'
import {DesignTab} from 'types'
import {useDesign} from 'utils/design-query'
import {FullPageSpinner} from 'components/lib'
import {VotingCard} from 'components/voting-card'

interface PreviewTabProps {
  designId: string
}

export function PreviewTab({designId}: PreviewTabProps) {
  const {data, isLoading} = useDesign(designId)
  const {design} = data
  const {setTab} = useManageDesign(
    React.useCallback(state => ({setTab: state.setTab}), []),
  )
  const bg = mode('gray.50', 'gray.800')

  if (isLoading) {
    return <FullPageSpinner h="100%" />
  }

  if (!design.name || !design.question) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You are missing the name or the targeted question for this design
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setTab(DesignTab.Info)}
          colorScheme="brand"
        >
          Go back and complete
        </Button>
      </Stack>
    )
  }

  if (design.versions.length < 2) {
    return (
      <Stack spacing="1em" mt="1em" align="center">
        <Heading fontWeight="400" fontSize="xl">
          You need at least two versions of this design in order to publish it
        </Heading>
        <Button
          mt="1em"
          size="lg"
          onClick={() => setTab(DesignTab.Versions)}
          colorScheme="brand"
        >
          Go back and upload
        </Button>
      </Stack>
    )
  }
  return (
    <Box as="section" bg={bg}>
      <Flex direction="column" align="center" mx="auto">
        <Stack mb="1em" w="100%" align="center">
          <Heading textAlign="center">{design.question}</Heading>
          {design.description ? (
            <Text fontWeight="300" fontSize="xl">
              {design.description}
            </Text>
          ) : null}
        </Stack>
        <SimpleGrid
          columns={{base: 1, md: 2, lg: 3}}
          spacing={{base: '2', md: '6', lg: '8'}}
          rowGap={{base: 8, md: 8, lg: 8}}
          alignItems="center"
        >
          {design.versions.map((vId, index) => {
            return (
              <VotingCard
                key={`preview${vId}`}
                versionId={vId}
                voteStyle={design.voteStyle}
                designData={data}
                index={index}
                onVote={() => {
                  /* Dummy function */
                }}
              />
            )
          })}
        </SimpleGrid>
      </Flex>
    </Box>
  )
}
