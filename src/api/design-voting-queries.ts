import {AxiosError} from 'axios'
import {
  QueryOptions,
  useQueryClient,
  useMutation,
  UseMutationOptions,
} from 'react-query'
import {useVoteDesignState} from 'store/vote-design'
import {Opinion} from 'types'
import {postRequest} from './axios-client'
import {filterNullValues} from '../utils/object'
import {invalidateDesign} from './query-utils'

interface AddOpinionBody {
  opinion: string
}

interface VoteDesignVersionParams {
  designId: string
  versionId: string
}

type DesignRatingVoteBody = {
  ratings: Record<string, number>
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

function voteDesignVersion({designId, versionId}: VoteDesignVersionParams) {
  return postRequest<null>(`v1/designs/${designId}/vote/choose`, {
    versionId,
  })
}

/**********************************Queries ********************************** */

export function useAddDesignRatings(
  designId: string,
  shortUrl: string,
  options: UseMutationOptions<undefined, AxiosError> = {},
) {
  const qc = useQueryClient()

  // Get necessary data from vote state
  const feedbackBody = useVoteDesignState(state => ({
    ratings: filterNullValues(state.currentRatings),
  }))

  const clearVoteState = useVoteDesignState(state => state.clearState)

  return useMutation(() => addDesignRating(designId, feedbackBody), {
    ...options,
    onSettled: () => {
      invalidateDesign(qc, designId, shortUrl)
      clearVoteState()
    },
  })
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
  options: QueryOptions<null, AxiosError> = {},
) {
  const qc = useQueryClient()

  const clearVoteState = useVoteDesignState(state => state.clearState)

  return useMutation(
    (versionId: string) => voteDesignVersion({designId, versionId}),
    {
      ...options,
      onSettled: () => {
        invalidateDesign(qc, designId, shortUrl)
        clearVoteState()
      },
    },
  )
}
