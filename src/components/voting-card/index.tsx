import {NormalizedDesign, VoteStyle} from 'types'
import {VoteFunction} from 'utils/design-query'
import {ChooseBestVotingCard} from './choose-best-rating-card'
import {RateStarsVotingCard} from './start-rating-card'

interface RatingCardProps {
  versionId: string
  index: number
  onVote: VoteFunction
  designData: NormalizedDesign
  voteStyle: VoteStyle
}

export function VotingCard({voteStyle, ...restProps}: RatingCardProps) {
  if (voteStyle === VoteStyle.Choose) {
    return <ChooseBestVotingCard {...restProps} />
  }
  return <RateStarsVotingCard {...restProps} />
}
