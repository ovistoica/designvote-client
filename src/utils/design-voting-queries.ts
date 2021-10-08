import {AxiosError} from 'axios'
import {
  QueryOptions,
  useQueryClient,
  useMutation,
  UseMutationOptions,
  Query,
} from 'react-query'
import {useVoteDesignState} from 'store/vote-design'
import {Opinion} from 'types'
import {postRequest} from './axios-client'
import {filterNullValues} from './object'

interface AddOpinionBody {
  'voter-id': string
  'version-id': string
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
    `v1/designs/${designId}/opinions`,
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
      qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]})
      clearVoteState()
    },
  })
}

export function useAddOpinion(
  designId: string,
  options: QueryOptions<Opinion, AxiosError> = {},
) {
  const qc = useQueryClient()

  return useMutation(
    (params: {voterId: string; opinion: string; versionId: string}) =>
      addOpinion(designId, {
        'version-id': params.versionId,
        opinion: params.opinion,
        'voter-id': params.voterId,
      }),
    {
      ...options,
      onSettled: () =>
        qc.invalidateQueries({exact: true, queryKey: ['design', {designId}]}),
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
        qc.invalidateQueries({
          predicate: (query: Query) =>
            query.queryKey[0] === 'design' &&
            ((query.queryKey[1] as {designId: string})?.designId === designId ||
              (query.queryKey[1] as {shortUrl: string})?.shortUrl === shortUrl),
        })
        clearVoteState()
      },
    },
  )
}
