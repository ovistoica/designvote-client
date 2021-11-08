import {VoteStyle} from 'types'
import {ChooseOneDesignGrid} from './choose-one/choose-one-grid'
import {RateFiveStarsGrid} from './rate-five-stars/rate-five-stars-grid'

interface DesignGridProps {
  onVersionClick: (index: number) => void
  voteStyle: VoteStyle
}

export function VotingGrid({voteStyle, ...rest}: DesignGridProps) {
  return voteStyle === VoteStyle.Choose ? (
    <ChooseOneDesignGrid {...rest} />
  ) : (
    <RateFiveStarsGrid {...rest} />
  )
}
