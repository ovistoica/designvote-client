import {Box, Flex, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/layout'
import {
  AlertIcon,
  Alert,
  Button,
  AlertDescription,
  AlertTitle,
  AlertDialogFooter,
} from '@chakra-ui/react'
import {Container, FullPageSpinner} from 'components/lib'
import * as React from 'react'
import {useParams} from 'react-router'
import {getChosen, useVoteDesignState} from 'store/vote-design'
import {VoteStyle} from 'types'
import {useUrlDesign, useVoteDesignVersion} from 'utils/design-query'
import {useVoterId} from 'utils/votes'
import {VotingCard} from '../../components/voting-card'

interface VoteSuccessProps {
  voteStyle: VoteStyle
}

function VoteSuccess({voteStyle}: VoteSuccessProps) {
  return (
    <Container>
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {voteStyle === VoteStyle.Choose ? 'Vote' : 'Ratings'} submitted!
        </AlertTitle>
        <AlertDescription maxWidth="sm" mt={4}>
          Thanks for submitting your{' '}
          {voteStyle === VoteStyle.Choose ? 'vote' : 'ratings'} and opinions.
          This helps more than you think :)
        </AlertDescription>
        <AlertDialogFooter mt={4}>
          You can safely close this page
        </AlertDialogFooter>
      </Alert>
    </Container>
  )
}

export function PublicVoteScreen() {
  const {shortUrl} = useParams()
  const {data, isLoading} = useUrlDesign(shortUrl)
  const {design} = data
  const {
    mutate: vote,
    isLoading: isVoteLoading,
    isSuccess: isVoteSuccess,
  } = useVoteDesignVersion(design.designId)
  const currentChosen = useVoteDesignState(getChosen(design.designId))
  const voterId = useVoterId()
  const [pressedFinish, setPressedFinish] = React.useState(false)

  const shouldShowSuccess =
    (design.voteStyle === VoteStyle.Choose && isVoteSuccess) ||
    (design.voteStyle === VoteStyle.FiveStar && pressedFinish)

  // const bg = mode('gray.50', 'gray.800')

  if (isLoading) {
    return <FullPageSpinner />
  }

  if (shouldShowSuccess) {
    return <VoteSuccess voteStyle={design.voteStyle} />
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      minH="100vh"
      pt={{base: '5em', md: '5em'}}
    >
      <Box as="section">
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
          {design.voteStyle === VoteStyle.Choose ? (
            <Button
              colorScheme="teal"
              w={{base: '100%', md: '15em'}}
              m={8}
              disabled={!currentChosen}
              isLoading={isVoteLoading}
              onClick={() => {
                vote({
                  versionId: currentChosen!,
                  rating: null,
                  voteStyle: design.voteStyle,
                  voterId,
                })
              }}
            >
              Vote
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              w={{base: '100%', md: '15em'}}
              m={8}
              onClick={() => setPressedFinish(true)}
            >
              Finish
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  )
}
