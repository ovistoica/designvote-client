import {
  Button,
  useColorModeValue as mode,
  SimpleGrid,
  Flex,
  Text,
  Link,
} from '@chakra-ui/react'
import {RateStarsVotingCard} from 'components/voting-grid/rate-five-stars/star-rating-card'
import {canSubmitRatings, useRatingsState} from 'store/ratings'
import {useUrlDesign} from 'api/design-query'
import {useAddDesignRatings} from 'api/design-voting-queries'
import {useAuth} from 'context/auth-context'
import {VoteAccess} from '../../../types'

interface RateFiveStarsGridProps {
  designUrl: string
  onVersionClick: (index: number) => void
}

export function RateFiveStarsGrid({
  designUrl,
  onVersionClick,
}: RateFiveStarsGridProps) {
  const {isAuthenticated, login} = useAuth()
  const {data: design} = useUrlDesign(designUrl)
  const canSubmitFeedback = useRatingsState(canSubmitRatings)
  const {
    mutate: submitFeedback,
    isLoading: isVoteLoading,
  } = useAddDesignRatings(design.designId, designUrl, design.voteAccess)

  let canVote
  if (design.voteAccess === VoteAccess.Anonymous) {
    canVote = canSubmitFeedback
  } else {
    canVote = isAuthenticated && canSubmitFeedback
  }
  return (
    <>
      <SimpleGrid
        alignContent="center"
        alignItems="center"
        columns={{base: 1, md: 2, lg: design.versions.length > 2 ? 3 : 2}}
        spacing={{base: '2', md: '8', lg: '8'}}
        rowGap={{base: 8, md: 8, lg: 8}}
        mt="8"
        maxW={{base: 'xl', md: '6xl'}}
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
          .map((version, index) => {
            const {imageUrl, versionId} = version
            return (
              <RateStarsVotingCard
                index={index}
                key={`designVersion${versionId}`}
                versionId={versionId}
                imageUrl={imageUrl}
                onClick={() => onVersionClick(index)}
              />
            )
          })}
      </SimpleGrid>

      <Flex mt="12" alignItems="center">
        {!isAuthenticated && design.voteAccess === VoteAccess.LoggedIn ? (
          <Text color={mode('gray.600', 'gray.400')} px="2">
            Only logged in users can vote. Please{' '}
            <Link
              fontWeight="700"
              px={'1'}
              textDecoration={'underline'}
              onClick={() => {
                login({
                  appState: {
                    returnTo: `${window.location.origin}/design/${designUrl}`,
                  },
                })
              }}
            >
              Sign in
            </Link>{' '}
            to continue
          </Text>
        ) : null}
        <Button
          size="lg"
          width={{base: 'full', md: 'auto'}}
          colorScheme="orange"
          disabled={!canVote}
          onClick={() => submitFeedback()}
          isLoading={isVoteLoading}
        >
          Submit feedback
        </Button>
      </Flex>
    </>
  )
}
