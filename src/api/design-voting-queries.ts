import {AxiosError} from 'axios'
import {
  QueryOptions,
  useQueryClient,
  useMutation,
  UseMutationOptions,
} from 'react-query'
import {useRatingsState} from 'store/ratings'
import {Opinion, VoteAccess} from 'types'
import {postRequest} from './axios-client'
import {filterNullValues} from '../utils/object'
import {invalidateDesign} from './query-utils'
import {useVoteHistoryState} from '../store/voting-history'

interface AddOpinionBody {
  opinion: string
}

interface VoteDesignVersionParams {
  designId: string
  versionId: string
  voteAccess: VoteAccess
}

type DesignRatingVoteBody = {
  ratings: Record<string, number>
  voteAccess: VoteAccess
  voterName?: string
}

/******************************* Api calls ********************************** */

function addOpinion(designId: string, body: AddOpinionBody) {
  return postRequest<Opinion, AddOpinionBody>(
    `v1/designs/${designId}/opinion`,
    body,
  )
}

function addDesignRating(designId: string, body: DesignRatingVoteBody) {
  return postRequest<undefined, DesignRatingVoteBody>(
    `v1/designs/${designId}/vote/rating`,
    body,
  )
}

function voteDesignVersion({
  designId,
  versionId,
  voteAccess,
}: VoteDesignVersionParams) {
  return postRequest<null>(`v1/designs/${designId}/vote/choose`, {
    versionId,
    voteAccess,
  })
}

/**********************************Queries ********************************** */

export function useAddDesignRatings(
  designId: string,
  shortUrl: string,
  voteAccess: VoteAccess,
  options: UseMutationOptions<undefined, AxiosError> = {},
) {
  const qc = useQueryClient()

  // Get necessary data from vote state
  const ratings = useRatingsState(state =>
    filterNullValues(state.currentRatings),
  )
  const voterName = useVoteHistoryState(state => state.voterName)

  const clearVoteState = useRatingsState(state => state.clearState)
  const setVotedDesign = useVoteHistoryState(state => state.setVotedDesign)

  return useMutation(
    () => addDesignRating(designId, {ratings, voterName, voteAccess}),
    {
      ...options,
      onSettled: () => {
        invalidateDesign(qc, designId, shortUrl)
        clearVoteState()
        setVotedDesign(shortUrl)
      },
    },
  )
}

export function useAddOpinion(
  designId: string,
  shortUrl: string,
  options: QueryOptions<Opinion, AxiosError> = {},
) {
  const qc = useQueryClient()

  return useMutation(
    (opinion: string) =>
      addOpinion(designId, {
        opinion,
      }),
    {
      ...options,
      onSettled: () => invalidateDesign(qc, designId, shortUrl),
    },
  )
}

export function useVoteDesignVersion(
  designId: string,
  shortUrl: string,
  voteAccess: VoteAccess,
  options: QueryOptions<null, AxiosError> = {},
) {
  const qc = useQueryClient()

  const clearVoteState = useRatingsState(state => state.clearState)
  const setVotedDesign = useVoteHistoryState(state => state.setVotedDesign)

  return useMutation(
    (versionId: string) => voteDesignVersion({designId, versionId, voteAccess}),
    {
      ...options,
      onSettled: () => {
        invalidateDesign(qc, designId, shortUrl)
        clearVoteState()
        setVotedDesign(shortUrl)
      },
    },
  )
}
