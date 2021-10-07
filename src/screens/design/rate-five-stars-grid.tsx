import {Button, SimpleGrid} from '@chakra-ui/react'
import {RateStarsVotingCard} from 'components/voting-card/start-rating-card'
import {canSubmit, useVoteDesignState} from 'store/vote-design'
import {useUrlDesign} from 'utils/design-query'
import {useAddDesignRatings} from 'utils/design-voting-queries'

interface RateFiveStarsGridProps {
  designUrl: string
  onVersionClick: (index: number) => void
}

export function RateFiveStarsGrid({
  designUrl,
  onVersionClick,
}: RateFiveStarsGridProps) {
  const {data: design} = useUrlDesign(designUrl)
  const canSubmitFeedback = useVoteDesignState(canSubmit)
  const {
    mutate: submitFeedback,
    isLoading: isVoteLoading,
  } = useAddDesignRatings(design.designId)
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

      <Button
        size="lg"
        mt="12"
        colorScheme="orange"
        disabled={!canSubmitFeedback}
        onClick={() => submitFeedback()}
        isLoading={isVoteLoading}
      >
        Submit feedback
      </Button>
    </>
  )
}
